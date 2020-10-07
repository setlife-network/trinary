var AWS = require('aws-sdk');
const { AMAZON_AWS } = require('../config/credentials')

const amazon = module.exports = (() => {

    const fetchCSV = (params) => {

        s3 = new AWS.S3();
        return new Promise((resolve, reject) => {
            s3.getObject(params, function(err, data) {
                if (err) reject(err, err.stack);
                else {
                    resolve(data)
                }
            })
        })

    };

    return {
        fetchCSV
    }
})()
