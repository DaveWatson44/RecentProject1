const parse = require('csv-parse');
const fs = require('fs');
 
const processFile = async () => {
  records = []
  const parser = fs
  .createReadStream(`./apgt0121.csv`)
  .pipe(parse({
  }));
  for await (const record of parser) {
    records.push(record[0].trim().split(','))
  }
  return records
}

(async () => {
  const records = await processFile()
  console.info(records);
  records.forEach((record) => {
      console.log(record)
      fs.appendFile('./test.txt', `'${record[0]}',\n`, function(err) {
          if(err){
              return console.log(err)
          }
      })
  })
})()


