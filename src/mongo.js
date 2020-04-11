const { MongoClient } = require('mongodb');
const log4js = require('log4js');

const logger = log4js.getLogger();

function Mongo() {
  const mongoUrl = process.env.MONGO_URL;
  const mongoDbName = process.env.MONGO_RIPOSTE_DB;
  this.connect = async () => {
    try {
      const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
      return { db: client.db(mongoDbName), client, error: false };
    } catch (err) {
      logger.fatal(err);
      return { db: null, client: null, error: true };
    }
  };
}
module.exports = new Mongo();
