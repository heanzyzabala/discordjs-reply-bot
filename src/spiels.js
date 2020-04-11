const { getLogger } = require('log4js');

const Mongo = require('./mongo');

const logger = getLogger();

function Spiels() {
  this.find = async (guildId, key) => {
    const { db, client, error } = Mongo.connect();
    if (error) {
      return { value: null, error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const reply = spiel.mappings.find((m) => m.key === key);
        if (reply) {
          return { value: reply.value, error: false };
        }
      }
      return { value: null, error: false };
    } catch (err) {
      logger.error(err);
      return { value: null, error: true };
    } finally {
      client.close();
    }
  };

  this.save = async (guildId, mapping) => {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const { mappings } = spiel;
        const index = mappings.findIndex((m) => m.key === mapping.key);
        if (index === -1) {
          mappings.push(mapping);
        } else {
          mappings[index] = mapping;
        }
        await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings } });
      } else {
        await db.collection('spiels').insertOne({ guild_id: guildId, mappings: [mapping] });
      }
      return { error: false };
    } catch (err) {
      logger.error(err);
      return { error: true };
    } finally {
      client.close();
    }
  };

  this.list = async (guildId) => {
    const { db, client, error } = Mongo.connect();
    if (error) {
      return { error: true };
    }
    const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
    client.close();
    if (spiel) {
      return { mappings: spiel.mappings };
    }
    return { mappings: [] };
  };
}

// this.delete = function (guildId, key, cb) {
//   Mongo.connect(async function (db, connection) {
//     const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
//     if (spiel) {
//       const mappings = spiel.mappings;
//       const index = mappings.findIndex(m => m.key === key);
//       if (index === -1) {
//         cb();
//       } else {
//         mappings.splice(index, 1);
//         const res = await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings: mappings } });
//         if (res.result.ok === 1) {
//           cb('ok')
//         } else {
//           cb();
//         }
//       }
//     } else {
//       cb();
//     }
//     connection.close();
//   });
// }
module.exports = new Spiels();