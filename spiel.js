const Spiel = function() {
  const MongoClient = require('mongodb').MongoClient;
  const mongodbUrl = 'mongodb://localhost:27017/';
  
  this.find = function(guildId, message, cb) {
    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
      if(err) throw err;
      const db = client.db('riposte');
      const spiels = db.collection('spiels').find({ guild_id: guildId });
      client.close();
      cb(spiels);
    });
  }

  this.save = function(guildId, spiel, cb) {
    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
      if(err) throw err;
      const db = client.db('riposte');
      db.collection('spiels').findAndModify({ guild_id: guildId, });
      client.close();
      cb(spiels);
    });
  }
}
module.exports = Spiel;