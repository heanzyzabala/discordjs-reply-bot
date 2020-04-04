const Spiels = function() {
  const MongoClient = require('mongodb').MongoClient;
  const mongodbUrl = 'mongodb://localhost:27017/';
  
  this.find = function(guildId, message, cb) {
    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, async (err, client) => {
      if(err) throw err;
      const db = client.db('riposte');
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if(spiel) {
        const mappings = spiel.mappings;
        const reply = mappings.find(m => { return m.key === message; });
        cb(reply.value);
      }
      client.close();
    });
  }

  this.save = function(guildId, mapping, cb) {
    MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
      if(err) throw err;
      const db = client.db('riposte');
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if(spiel) {
        const mappings = spiel.mappings:
        const index = mappings.findIndex(m => m.key === )
      } else {
        await db.collection.insert({ guild_id: guildId, mappings: [ mapping ] });
      }
      client.close();
    });
  }
}
module.exports = new Spiels();