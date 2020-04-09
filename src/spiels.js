const log4js = require('log4js');
const Mongo = require('./mongo');

const logger = log4js.getLogger();

function Spiels() {
  this.find = async (guildId, key, cb) => {
    const { db, client, error } = Mongo.connect();
    if (error) {
      return { error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      client.close();
      if (spiel) {
        const reply = spiel.mappings.find((m) => m.key === key);
        if (reply) {
          return { value: reply.value };
        }
        return { value: null };
      }
    } catch (err) {
      logger.error(err);
      return { error: true };
    }
  }
}

this.save = function (guildId, mapping, cb) {
  Mongo.connect(async function (db, client) {
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const mappings = spiel.mappings;
        const index = mappings.findIndex(m => m.key === mapping.key);
        if (index === -1) {
          mappings.push(mapping);
        } else {
          mappings[index] = mapping;
        }
        const res = await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings: mappings } });
        if (res.result.ok === 1) {
          cb({ key: mapping.key, value: mapping.value });
        } else {
          cb();
        }
      } else {
        cb(await db.collection('spiels').insertOne({ guild_id: guildId, mappings: [mapping] }));
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      client.close();
    }
  });
}


this.list = function (guildId, cb) {
  Mongo.connect(async function (db, connection) {
    const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
    if (spiel) {
      cb(spiel.mappings);
    } else {
      cb([]);
    }
    connection.close();
  });
}

this.delete = function (guildId, key, cb) {
  Mongo.connect(async function (db, connection) {
    const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
    if (spiel) {
      const mappings = spiel.mappings;
      const index = mappings.findIndex(m => m.key === key);
      if (index === -1) {
        cb();
      } else {
        mappings.splice(index, 1);
        const res = await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings: mappings } });
        if (res.result.ok === 1) {
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