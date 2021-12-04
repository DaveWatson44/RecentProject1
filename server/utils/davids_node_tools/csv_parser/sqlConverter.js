// This class takes a filename (csv file) and extracts the first column into a string.
// Intended use is to take data from one database query and use it in another database's query using the IN clause.


const parse = require('csv-parse');
const fs = require('fs');

class SQLConverter {
    constructor(fileName) {
        this.records = [];
        this.fileName = fileName;

    }

    async processFile() {
        const parser = fs
            .createReadStream(`${this.fileName}.csv`)
            .pipe(parse({
            }));
        for await (const record of parser) {
            this.records.push(record[0].trim().split(','))
        }
        return this.records
    };

    async createStringFile() {
        let csvString = ''
        await this.processFile()
        console.info(this.records);
        this.records.forEach((record) => {
            csvString += `'${record[0]}',`
        })
        fs.writeFile('./test2.txt', csvString, function (err) {
            if (err) {
                return console.log(err)
            }
        })
    };

}

module.exports =  SQLConverter;