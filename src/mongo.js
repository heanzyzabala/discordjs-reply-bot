const { MongoClient } = require('mongodb');

const Logger = require('./logger');

module.exports = {
  async connect() {
    try {
      const mongoUrl = process.env.MONGO_URL;
      const mongoDbName = process.env.MONGO_DISCORD_REPLY_BOT_DB;
      const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
      return { db: client.db(mongoDbName), client, error: false };
    } catch (error) {
      Logger.error({ src: 'mongo.js#connect()', error });
      return { db: null, client: null, error: true };
    }
  },
};
