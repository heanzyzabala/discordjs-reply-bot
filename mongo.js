const Mongo = function() {
  const MongoClient = require('mongodb').MongoClient;
  const mongoUrl = process.env.MONGO_URL;
  const mongoDbName = process.env.MONGO_RIPOSTE_DB;

  this.connect = function(cb) {
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
      if(err) throw err;
      cb(client.db(mongoDbName), client);
    });
  };
}
module.exports = new Mongo();
