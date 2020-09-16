var TogglClient = require('toggl-api');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {
    TOGGL
} = require('../../config/credentials')

//var togglClient = new TogglClient({apiToken: TOGGL.API_KEY});

const toggl = module.exports = (() => {

    const authenticate = (params) => {
        var promise = new Promise((resolve, reject) => {
            var req = new XMLHttpRequest()
            req.open('POST', 'https://api.track.toggl.com/api/v8/sessions')
            req.send(
                `api_token = ${TOGGL.API_KEY}`
            )
            req.onreadystatechange = (() => {
                if (req.readyState == 4){
                    if (req.status == 200){
                        var resp = req.responseText;
                        var respJson = JSON.parse(resp);
                        resolve(respJson);
                    }else {
                        reject(req.status);
                    }
                }
            })
        })

        return promise

    }

    const fetchTimeEntries = (params) => {;

        var promise = new Promise(function(resolve, reject){
            var req = new  XMLHttpRequest();
            req.open('GET', 'https://api.track.toggl.com/reports/api/v2/details?workspace_id=123&since=2013-05-19&until=2013-05-20&user_agent=api_test', true)
            req.send()
            req.onreadystatechange = (() => {
                if (req.readyState == 4){
                    if (req.status == 200) {
                        var resp = req.responseText;
                        var respJson = JSON.parse(resp);
                        resolve(respJson);
                    }else {
                        reject(req.status);
                    }
                }
            })

        });

        return promise
    }

    const timeEntries = () => {
        authenticate()
        .then((response) => {
            console.log('response 1')
            console.log(response)
        })
        .catch((error) => {
            console.log('promise error 1');
            console.log(error);
        })
        fetchTimeEntries()
        .then((response) => {
            console.log('response 2')
            console.log(response)
        })
        .catch((error) => {
            console.log('promise error 2');
            console.log(error);
        })
    }


    return{
        fetchTimeEntries,
        timeEntries
    }

})();
