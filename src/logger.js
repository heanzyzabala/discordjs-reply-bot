const log4js = require('log4js');
const { uuid } = require('uuidv4');

function Logger() {
  log4js.addLayout('json', (config) => (logEvent) => JSON.stringify(logEvent, null, 2) + config.separator);
  log4js.configure({
    appenders: {
      out: {
        type: 'stdout',
        layout: {
          type: 'json',
          separator: ',',
        },
      },
    },
    categories: { default: { appenders: ['out'], level: 'all' } },
  });
  const logger = log4js.getLogger();
  logger.level = 'all';

  this.initContext = (message, command) => {
    const meta = {
      id: uuid(),
      command,
      user: {
        id: message.member.user.id,
        username: message.member.user.username,
        discriminator: message.member.user.discriminator,
        tag: message.member.user.tag,
        nickname: message.member.nickname,
        displayName: message.member.displayName,
        createdTimestamp: message.member.user.createdTimestamp,
      },
      message: {
        id: message.id,
        content: message.content,
        clean: message.cleanContent,
        createdTimestamp: message.createdTimestamp,
      },
      guild: {
        id: message.guild.id,
        name: message.guild.name,
        nameAcronym: message.guild.nameAcronym,
        ownerId: message.guild.ownerId,
        createdTimestamp: message.guild.createdTimestamp,
      },
      channel: {
        id: message.channel.id,
        name: message.channel.name,
        guildId: message.channel.guildId,
        createdTimestamp: message.channel.createdTimestamp,
      },
    };
    logger.info({ ...meta });
    logger.addContext('logId', meta.id);
  };

  this.info = (msg) => {
    logger.info(msg);
  };

  this.error = ({ src, error }) => {
    const { name, message, stack } = error;
    logger.error({ src, error: { name, message, stack } });
  };

  this.fatal = (msg) => {
    logger.fatal(msg);
  };
}
module.exports = new Logger();
