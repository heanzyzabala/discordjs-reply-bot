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
        const res = await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings: mappings }});
        if(res.result.ok === 1) {
          cb({ key: mapping.key, value: mapping.value });
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
      connection.close();
    });
  }

  this.delete = function(guildId, key, cb) {
    Mongo.connect(async function(db, connection) {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if(spiel) {
        const mappings = spiel.mappings;
        const index = mappings.findIndex(m => m.key === key);
        if(index === -1) {
          cb();
        } else {
          mappings.splice(index, 1);
          const res = await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings: mappings }});
          if(res.result.ok === 1) {
            cb('ok')
          } else {
            cb();
          }
        }
      } else {
        cb();
      }
      connection.close();
    });
  }
}
module.exports = new Spiels();