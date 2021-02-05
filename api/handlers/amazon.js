var AWS = require('aws-sdk');
// const { AMAZON_AWS } = require('../config/credentials')

const amazon = module.exports = (() => {

    const bucket = 'project-trinary'

    const fetchFile = (params) => {
        
        const fileBucket = {
            Bucket: bucket,
            Key: params.file
        }

        console.log('fileBucket')
        console.log(fileBucket)
        console.log(params.file)

        const s3 = new AWS.S3();
        return new Promise((resolve, reject) => {
            s3.getObject(fileBucket, function(err, data) {
                if (err) reject(err, err.stack);
                else {
                    data = data.Body.toString('utf8')
                    resolve(data)
                }
            })
        })

    };

    return {
        fetchFile
    }
})()
