const parse = require('csv-parse');
const fs = require('fs');

const processFile = async () => {
    records = []
    const parser = fs
        .createReadStream(`./csvToParse.csv`)
        .pipe(parse({
        }));
    for await (const record of parser) {
        records.push(record[0].trim().split(','))
    }
    return records
}

(async () => {
    let csvString = ''
    const records = await processFile()
    console.info(records);
    records.forEach((record) => {
        csvString += `'${record[0]}',`
    })
    fs.writeFile('./test.txt', csvString, function (err) {
        if (err) {
            return console.log(err)
        }
    })
})()




