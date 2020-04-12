const Mongo = require('./mongo');
const Logger = require('./logger');

function Spiels() {
  this.find = async (guildId, key) => {
    let db;
    let client;
    let error;
    try {
      const mongo = await Mongo.connect();
      db = mongo.db;
      client = mongo.client;
      error = mongo.error;
      if (error) {
        return { value: null, error: true };
      }
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const reply = spiel.mappings.find((m) => m.key === key);
        if (reply) {
          return { value: reply.value, error: false };
        }
      }
      return { value: null, error: false };
    } catch (err) {
      Logger.error(err);
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
      Logger.error(err);
      return { error: true };
    } finally {
      client.close();
    }
  };

  this.list = async (guildId) => {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        return { spiel, error: false };
      }
      return { spiel: null, error: false };
    } catch (err) {
      Logger.error(err);
      return { error: true };
    } finally {
      client.close();
    }
  };

  this.remove = async (guildId, key) => {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const { mappings } = spiel;
        const index = mappings.findIndex((m) => m.key === key);
        if (index === -1) {
          return { removed: false, error: false };
        }
        mappings.splice(index, 1);
        await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings } });
        return { removed: true, error: false };
      }
      return { removed: false, error: true };
    } catch (err) {
      Logger.error(err);
      return { error: true };
    } finally {
      client.close();
    }
  };
}

module.exports = new Spiels();
