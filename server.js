const express = require('express')
const bodyParser = require('body-parser') //transform req into JSON format
const fs = require('fs') //module to read files
const cors = require('cors') //handle CORS issues
const { ApolloServer } = require('apollo-server-express') //Apollo server for graphql integration
const cookieSession = require('cookie-session') //store the user session key
const cookieParser = require('cookie-parser') //transform cooki session into object with key name
const moment = require('moment') //momentjs libreary for expitation cookie date

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
    'https://project-trinary.herokuapp.com/'
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

app.get('/api/v/:vid/ping', (req, res) => {
    res.send('Hello World')
})

app.get('/api/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB.CLIENT_ID}`)
})

// app.get('/api/check-session', async (req, res) => {
//     if (req.session.userSession) res.send({ result: 1 })
//     else res.send({ result: 0 })
// })

app.get('/api/oauth-redirect', (req, res) => { //redirects to the url configured in the Github App
    github.fetchAccessToken({ code: req.query.code })
        .then(githubAccessToken => {
            return apiModules.authentication.getContributor({ githubAccessToken })
        })
        .then(async contributorInfo => {
            //if it's a new user store it in contributors table
            if (!contributorInfo.contributor) {
                const githubContributor = contributorInfo.githubContributor
                contributorInfo.contributor = await apiModules.authentication.createContributor({ githubContributor })
            }
            //store contributor id in the cookie session
            req.session.userSession = contributorInfo.contributor.id
        })
        .then(() => {
            res.redirect(SITE_ROOT)
        })
        .catch(err => {
            console.log('An error ocurred ' + err);
        })
})

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
        ...db,
        cookies: req.session
    })
})

server.applyMiddleware({
    app,
    path: '/api/graph',
});

app.listen(port, () => {
    console.log(`Trinary project app listening at http://localhost:${port}`)
})
