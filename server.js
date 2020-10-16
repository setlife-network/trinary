const express = require('express')
const bodyParser = require('body-parser') //transform req into JSON format
const fs = require('fs') //module to read files
const cors = require('cors') //handle CORS issues
const { ApolloServer } = require('apollo-server-express') //Apollo server for graphql integration

const schema = require('./api/schema')
const db = require('./api/models');
const apiModules = require('./api/modules');
const github = require('./api/handlers/github')

const { GITHUB } = require('./api/config/credentials')

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
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/api/readPayments', apiModules.dataSyncs.syncInvoicelyCSV)

app.get('/api/v/:vid/ping', (req, res) => {
    res.send('Hello World')
})

app.get('/api/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB.CLIENT_ID}`)
})

app.get('/api/oauth-redirect', (req, res) => { //redirects to the url configured in te Github App

    github.fetchAccessToken({ code: req.query.code })
        .then(accesToken => {
            return apiModules.authentication.getContributor(accesToken)
        })
        .then(contributorInfo => {
            if (!contributorInfo.contributor) apiModules.authentication.createContributor(contributorInfo.githubContributor)
        })
        .then(() => {
            res.redirect('http://localhost:6002')
        })
        .catch(err => {
            console.log('An error ocurred ' + err);
        })
})

const server = new ApolloServer({
    schema,
    context: db
})

server.applyMiddleware({
    app,
    path: '/api/graph',
});

app.listen(port, () => {
    console.log(`Trinary project app listening at http://localhost:${port}`)
})
