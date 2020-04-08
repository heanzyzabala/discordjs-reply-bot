// TOOD: Optimize mongo queries
const Mongo = require('./mongo');
const Spiels = function() {
  
  this.find = function(guildId, message, cb) {
    Mongo.connect(async function(db, connection) {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if(spiel) {
        const mappings = spiel.mappings;
        const reply = mappings.find(m => { return m.key === message; });
        if(reply) {
          cb(reply.value);
        } else {
          cb();
        }
      }
      connection.close();
    });
  }

  this.save = function(guildId, mapping, cb) {
    Mongo.connect(async function(db, connection) {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if(spiel) {
        const mappings = spiel.mappings;
        const index = mappings.findIndex(m => m.key === mapping.key);
        if(index === -1) {
          mappings.push(mapping);
        } else {
          mappings[index] = mapping;
        }
        const result = await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings: mappings }});
        console.log(result);
        if(result.modifiedCount === 1) {
          console.log('mapping bitch');
          console.log(mapping);
          cb(mapping)
        } else {
          cb();
        }
      } else {
        cb(await db.collection('spiels').insertOne({ guild_id: guildId, mappings: [ mapping ] }));
      }
      connection.close();
    });
  }

  this.list = function(guildId, cb) {
    Mongo.connect(async function(db, connection) {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if(spiel) {
        cb(spiel.mappings);
      } else {
        cb([]);
      }
    });
  }
}
module.exports = new Spiels();