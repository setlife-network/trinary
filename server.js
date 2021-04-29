const express = require('express')
const bodyParser = require('body-parser') //transform req into JSON format
const fs = require('fs') //module to read files
const cors = require('cors') //handle CORS issues
const { ApolloServer } = require('apollo-server-express') //Apollo server for graphql integration
const cookieSession = require('cookie-session') //store the user session key
const cookieParser = require('cookie-parser') //transform cooki session into object with key name
const moment = require('moment') //momentjs libreary for expitation cookie date
const { findIndex } = require('lodash')

const schema = require('./api/schema')
const db = require('./api/models');
const apiModules = require('./api/modules');
const github = require('./api/handlers/github')

const { GITHUB } = require('./api/config/credentials')
const { SITE_ROOT } = require('./api/config/constants')

const app = express()

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 6001;

// Serve static assets
app.use(express.static(__dirname + '/build'));

app.get('*', function(req, res, next) {
    if (req.path.indexOf('/api/') != -1) {
        //route to the next middleware function
        return next()
    }
    fs.readFile(__dirname + '/build/index.html', 'utf8', function (err, text) {
        res.send(text);
    });
})

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:6001',
    'http://localhost:6002',
    'http://github.com/',
    'https://github.com/',
    'https://project-trinary.herokuapp.com/',
    'https://trinary.setlife.tech',
    'https://trinary-staging.herokuapp.com'
];

var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
    methods: ['GET,PUT,POST,DELETE,OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control']
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(cookieParser())
app.use(cookieSession({
    name: 'session',
    keys: ['userSession'],
    expires: moment().add(180, 'days').toDate()
}))

app.get('/api/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB.OAUTH_CLIENT_ID}&scope=repo`)
})

app.get('/api/oauth-redirect', (req, res) => { //redirects to the url configured in the Github App
    github.fetchAccessToken({ code: req.query.code })
        .then(async githubAccessToken => {
            const contributorInfo = await apiModules.authentication.getContributor({ githubAccessToken })
            contributorInfo.githubContributor['accessToken'] = githubAccessToken
            return contributorInfo
        })
        .then(async (contributorInfo) => {
            //if it's a new user store it in contributors table
            //if the user is already in th db but 1st time loggin in store the github access token
            if (!contributorInfo.contributor) {
                contributorInfo.contributor = await apiModules.authentication.createContributor({ ...contributorInfo.githubContributor })
            } else if (!contributorInfo.contributor['github_access_token']) {
                contributorInfo.contributor = await apiModules.authentication.updateGithubAccessTokenContributor({ ...contributorInfo.githubContributor })
            }
            //store contributor id in the cookie session
            req.session.userSession = contributorInfo.contributor.id
            return contributorInfo
        })
        .then((contributorInfo) => {
            //sync the permissions for the contributor
            apiModules.authentication.grantProjectPermissions({
                contributor: contributorInfo.contributor.dataValues,
                githubContributor: contributorInfo.githubContributor
            })
        })
        .then(() => {
            res.redirect(SITE_ROOT)
        })
        .catch(err => {
            console.log('An error ocurred ' + err);
        })
})

app.post('/api/webhooks/invoices/sent', (req, res) => {
    const data = req.body.data.object
    const paymentInformation = {
        amount: data.total,
        external_uuid: data.id,
        date_incurred: data.created,
        customer_id: data.customer,
        external_uuid_type: 'STRIPE',
    }
    apiModules.automations.createPayment({ paymentInformation })
        .then(() => {
            res.send('payment created')
        })
        .catch(err => {
            console.log(`An error ocurred: ${err}`)
        })
})
app.post('/api/webhooks/invoice/paid', async (req, res) => {
    const data = req.body.data.object
    try {
        const paymentInformation = {
            date_paid: data.webhooks_delivered_at,
            external_uuid: data.id
        }
        await apiModules.automations.updateDatePaidPayment({ paymentInformation })
        res.send('payment updated')
    } catch (err) {
        console.log(`An error ocurred: ${err}`)
    }
})
app.post('/api/webhooks/invoice/updated', (req, res) => {
    const data = req.body.data.object
    if (data.custom_fields[findIndex(data.custom_fields, { 'name': 'ready_to_allocate', 'value': 'true' })]) {
        const paymentInformation = {
            amount: data.total,
            external_uuid: data.id,
            date_incurred: data.created,
            customer_id: data.customer,
            external_uuid_type: 'STRIPE',
        }
        apiModules.automations.updatePaymentFromStripe({ paymentInformation })
            .then(() => {
                res.send('payment updated')
            })
            .catch((err) => {
                console.log(`An error ocurred: ${err}`)
            })
    } else {
        res.send('payment not ready to allocate')
    }
})
app.post('/api/webhooks/payment_intent/succeeded', (req, res) => {
    const data = req.body.data
    try {
        if (data.status == 'succeeded') {
            throw 'Payment not succeeded'
        }
        const paymentInformation = {
            date_paid: data.object.created,
            external_uuid: data.object.invoice
        }
        apiModules.automations.updateDatePaidPayment({ paymentInformation })
        res.send('payment updated')
    } catch (err) {
        console.log(`An error ocurred: ${err}`)
    }
})

app.use('/api/graph/v/:vid', express.json(), (req, res, next) => {
    console.log(`Incoming API v${req.params.vid} request on worker PID ${process.pid}`)
    next()
})

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
        ...db,
        cookies: req.session
    }),
    introspection: true,
    playground: {
        settings: {
            'editor.theme': 'dark',
            'request.credentials': 'include',
        },
    },
})

server.applyMiddleware({
    app,
    path: ['/api/graph/v/:vid', '/api/graph'],
    cors: corsOptions
});

app.listen(port, () => {
    console.log(`Trinary project app listening at http://localhost:${port}`)
})
