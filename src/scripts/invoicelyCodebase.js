const fs = require('fs')

const { slice, indexOf, replace, split, join } = require('lodash')

module.exports = (() => {

    readCsv = (csvFilePath) => {

        const csvFile = fs.readFile(csvFilePath, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            } else {
                return modelData(data)
            }
        })
    }

    modelData = async (data) => {

        //create an array with the keys of the file
        var keysLine = data.slice(0, data.indexOf('\n'))
        keysLine = split(keysLine, ',')
        //create an array with each line of data of the file
        dataLines = split(data, '\n')
        dataLines.shift()
        //create subarrays with each piece of data of each line
        dataLines.map((d, i) => {
            dataLines[i] = split(d, '","')
        })
        //create objects with each data line
        var dataObject = []
        dataLines.map((d, di) => {
            object = {}
            keysLine.map((k, ki) => {
                object[k] = d[ki]
            })
            dataObject.push(object)
        })

        //Iterate object collection and create the data object into the db
        dataObject.map(d => {
            //TODO: call function create from db functions
            //Example:
            //client_id = dbFunctions.findClient(name:d.Client)
            //dbFunctions.addUser({
            //amount:d[Total]
            //date_incurred: d['date issued']
            //client_id: client_id
            //})
        })

        console.log('dataObject');
        console.log(dataObject);

        return dataObject

    }

    console.log('readCsv');
    readCsv('../../docs/invoicely/invoices/invoices-2019.csv');

    return {

    }
})();
