const fs = require('fs')

const { slice, indexOf, replace, split, join } = require('lodash')

module.exports = (() => {

    readCsv = () => {
        const csvFile = fs.readFile('../../docs/invoicely/invoices/invoices-2019.csv', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

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

            console.log('dataObject');
            console.log(dataObject);
            return dataObject
        })
    }

    console.log('readCsv');
    readCsv();

    return {

    }
})();
