const fs = require('fs')
const moment = require('moment')

const db = require('../models')

const { slice, indexOf, split, join } = require('lodash')

module.exports = (() => {
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
        //Iterate object collection and create the data object into the db
        dataObject.map( async d => {
            //Look for the id of the client based on the name
            //TODO: Consider make the name of the client in the DB Unique
            const matchClients = await db.models.Client.findAll({ where: {
                name: d['Client']
            } })

            if (matchClients) {
                await db.models.Payment.create({
                    amount: parseFloat(d['Total'].split(',').join('')),
                    date_incurred: new moment(d['Date Issued']),
                    date_paid: new moment.utc(d['Date Paid']),
                    client_id: matchClients[0].id
                })
            }

        })
        return dataObject
    }

    return {
        modelCSV
    }

})();
