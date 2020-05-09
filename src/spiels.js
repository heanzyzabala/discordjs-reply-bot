const Mongo = require('./mongo');
const Logger = require('./logger');

const maxMappings = parseInt(process.env.MAX_MAPPINGS, 10);

module.exports = {
  matches(mappingKey, key, criteria) {
    const { format, match } = criteria;
    let key1 = mappingKey;
    let key2 = key;
    if (format === 'ignoreCase') {
      key1 = key1.toLowerCase();
      key2 = key2.toLowerCase();
    }
    if (match === 'includes') {
      return key2.includes(key1);
    }
    return key1 === key2;
  },
  async find(guildId, key) {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { value: null, error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const reply = spiel.mappings.find((m) => this.matches(m.key, key, m.criteria));
        if (reply) {
          return { value: reply.value, error: false };
        }
      }
      return { value: null, error: false };
    } catch (err) {
      Logger.error({ src: 'spiels.js#find()', error: err });
      return { value: null, error: true };
    } finally {
      client.close();
    }
  },
  async save(guildId, mapping) {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const { mappings } = spiel;
        if (mappings.length >= maxMappings) {
          return { limit: { reached: true, count: maxMappings }, error: false };
        }
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
      return { limit: { reached: false, count: maxMappings }, error: false };
    } catch (err) {
      Logger.error({ error: err });
      return { limit: { reached: false, count: maxMappings }, error: true };
    } finally {
      client.close();
    }
  },
  async list(guildId) {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { mappings: [], error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        return { mappings: spiel.mappings, error: false };
      }
      return { mappings: [], error: false };
    } catch (err) {
      Logger.error({ src: 'spiels.js#list()', error: err });
      return { error: true };
    } finally {
      client.close();
    }
  },
  async removeByKey(guildId, key) {
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
      return { removed: false, error: false };
    } catch (err) {
      Logger.error({ src: 'spiels.js#removeByKey()', error: err });
      return { remove: false, error: true };
    } finally {
      client.close();
    }
  },
  async removeByIndex(guildId, index) {
    const { db, client, error } = await Mongo.connect();
    if (error) {
      return { removed: false, error: true };
    }
    try {
      const spiel = await db.collection('spiels').findOne({ guild_id: guildId });
      if (spiel) {
        const { mappings } = spiel;
        console.log(mappings);
        const mapping = mappings[index];
        if (!mapping) {
          return { removed: false, error: false };
        }
        mappings.splice(index, 1);
        await db.collection('spiels').updateOne({ guild_id: guildId }, { $set: { mappings } });
        return { removed: true, error: false };
      }
      return { removed: false, error: false };
    } catch (err) {
      Logger.error({ src: 'spiels.js#removeByIndex', error: err });
      return { removed: false, error: true };
    } finally {
      client.close();
    }
  },
};
