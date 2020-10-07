const fs = require('fs')
const moment = require('moment')

const db = require('../models')

const { slice, indexOf, replace, split, join } = require('lodash')

module.exports = (() => {

    // readCsv = (csvFilePath) => {
    //
    //     const csvFile = fs.readFile(csvFilePath, 'utf-8', (err, data) => {
    //         if (err) {
    //             throw err;
    //         } else {
    //             return modelData(data)
    //         }
    //     })
    // }

    modelCSV = async (data) => {
        //create an array with the keys of the file
        var keysLine = data.slice(0, data.indexOf('\n'))
        keysLine = keysLine.slice(1, keysLine.length - 1);
        keysLine = split(keysLine, '","')

        //create an array with each line of data of the file
        dataLines = split(data, '\n')
        dataLines.shift()
        //create subarrays with each piece of data of each line
        dataLines.map((d, i) => {
            d = d.slice(1, d.length - 1);
            dataLines[i] = split(d, '","')
        })
        //create objects with each data line
        var dataObject = []
        dataLines.map((d, di) => {
            object = {}
            keysLine.map((k, ki) => {
                if (d[ki] != null && d[ki] != '') object[k] = d[ki]
            })
            if (Object.keys(object).length) dataObject.push(object)
        })
        // console.log('dataObject');
        // console.log(dataObject);

        //Iterate object collection and create the data object into the db
        dataObject.map( async d => {

            // console.log('d');
            // console.log(d);
            // console.log(`d['Date Issued']`);
            // console.log(d['Date Issued']);
            //
            // console.log(Object.keys(d))

            //TODO: call function create from db functions
            //client_id = dbFunctions.findClient(name:d.Client)
            /*Example:
                dbFunctions.addInvoice({
                    amount:d[Total]
                    date_incurred: d['date issued']
                    date_paid: d['date paid']
                    client_id: client_id
                })
            */

            const payment = await db.models.Payment.create({
                amount: d['Total'],
                date_incurred: moment.utc(d['Date Issued']),
                date_paid: moment.utc(d['Date Paid']),
                client_id: 1
            })

        })
        return dataObject
    }

    return {
        modelCSV
    }

})();
