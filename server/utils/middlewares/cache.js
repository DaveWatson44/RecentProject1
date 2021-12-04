const redis = require("redis");
const client = redis.createClient({host: 'redis'});


client.on("error", function(error) {
    console.error(error);
  });

module.exports = function cache(req, res, next){
    
    client.get()
}