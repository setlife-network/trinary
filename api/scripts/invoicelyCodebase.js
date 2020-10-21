const fs = require('fs')
const moment = require('moment')
const { slice, indexOf, split, join } = require('lodash')

const db = require('../models')

module.exports = (() => {

    const formatTotal = (total) => {
        return parseFloat(total.split(',').join(''))
    }

    const formatTotalWithQuotes = (total) => {
        return total.slice(1, total.length).concat(split(total, '.', 1)[0])
    }

    const totalToCents = (total) => {
        return total * 100
    }

    const matchingPayments = (...payment) => {
        return db.models.Payment.findAll(
            {
                where: {
                    date_incurred: moment.utc(dateIssued),
                    amount: totalToCents(total)
                }
            }
        )
    }

    const modelCSV = async (data) => {

        //This script does the following:
        // 1. Transform the csv that comes as a a string into a json format,
        //     the json keys are the column names of the csv, and each row of data becomes an object
        // 2. The final format is an array of objects, conformed by each of the data rows of the csv and the keys
        // 3. We look for the objects that the company attribute matchs to a company stored in the db
        // 4. We insert the payments into the db
        // This scripts supports both csv format, the one that comes with double quotes in each word,
        // and the one who doesent

        //deletes all the quotes in the file
        const quotes = data[0] == '"'
        var keysLine = data.slice(0, data.indexOf('\n'))
        keysLine = (
            quotes
                ? keysLine.slice(1, keysLine.length - 1)
                : keysLine.slice(0, keysLine.length - 1)
        )
        keysLine = (
            quotes
                ? split(keysLine, '","')
                : split(keysLine, ',')
        )
        //create an array with each line of data of the file
        dataLines = split(data, '\n')
        dataLines.shift()
        //create subarrays with each piece of data of each line
        dataLines.map((d, i) => {
            d = d.slice(1, d.length - 1);
            dataLines[i] = (
                quotes
                    ? split(d, '","')
                    : split(d, ','))
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
        dataObject.map(async d => {

            //The following code does the following:
            //1. Check if the client of the object is stored in Trinary db Clients table
            //2. Then look if the payment is not already in the Payments table
            //3. If not insert the payment on the Payments table

            //1:
            //Look for the id of the client based on the name
            const matchClients = await db.models.Client.findAll(
                {
                    where: {
                        name: d['Client']
                    }
                }
            )
            if (matchClients[0]) {
                //the way to format the total to be stores in the db it's different depending on the csv file format
                const total = (
                    !quotes && d['Payments'][0] == '"'
                        ? formatTotalWithQuotes(d['Payments'])
                        : formatTotal(d['Total'])
                )
                //2:
                //check if the payments is not already stored using external UID
                //if exists or clientName + amount + dateIssued as UUID if not
                //then if not exists insert the object in the db
                if (d['Statement ID'] || !matchingPayments({ total: total, dateIssued: d['Date Issued'] })) {
                    //3:
                    await db.models.Payment.create({
                        amount: totalToCents(total),
                        external_uuid: d['Statement ID'],
                        date_incurred: moment.utc(d['Date Issued'], 'MMM D YYYY'),
                        date_paid: d['Date Paid']
                            ? moment.utc(d['Date Paid'], 'MMM D YYYY')
                            : null,
                        client_id: matchClients[0].id
                    })
                }
            }

        })
        return dataObject
    }

    return {
        modelCSV
    }

})();
