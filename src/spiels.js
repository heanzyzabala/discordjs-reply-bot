const Mongo = require('./mongo');
const Logger = require('./logger');

function Spiels() {
  const matchesByCriteria = (mappingKey, key, criteria) => {
    const { format, matching } = criteria;
    let key1 = mappingKey;
    let key2 = key;
    if (format === 'ignoreCase') {
      key1 = key1.toLowerCase();
      key2 = key2.toLowerCase();
    }
    if (matching === 'includes') {
      return key2.includes(key1);
    }
    return key1 === key2;
  };

  this.find = async (guildId, key) => {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const reply = spiel.mappings.find((m) => matchesByCriteria(m.key, key, m.criteria));
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
        return { mappings: spiel.mappings, error: false };
      }
      return { mappings: [], error: false };
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
