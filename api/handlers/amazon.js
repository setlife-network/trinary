var AWS = require('aws-sdk');
const { AMAZON_AWS } = require('../config/credentials')

const amazon = module.exports = (() => {

    const cred = () => {
        // Create S3 service object
        s3 = new AWS.S3();

        // Call S3 to list the buckets
        s3.listBuckets(function(err, data) {
            // if (err) {
            //     console.log('Error', err);
            // } else {
            //     console.log('Success', data.Buckets);
            // }
        });

        // Create the parameters for calling listObjects
        var bucketParams = {
            Bucket: 'project-trinary',
        };

        // Call S3 to obtain a list of the objects in the bucket
        s3.listObjects(bucketParams, function(err, data) {
            // if (err) {
            //     console.log('Error', err);
            // } else {
            //     console.log('Success', data);
            // }
        });

        var params = {
            Bucket: 'project-trinary',
            Key: 'documents/payments/invoices-2019.csv'
        }

        return new Promise((resolve, reject) => {
            s3.getObject(params, function(err, data) {
                if (err) reject(err, err.stack); // an error occurred
                else {
                    //console.log(data)
                    resolve(data)
                } // successful response
            })
        })

    };

    return {
        cred
    }
})()
