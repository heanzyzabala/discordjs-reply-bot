const Spiels = require('../spiels');
const Views = require('../views');
const Logger = require('../logger');

module.exports = {
  name: 'remove',
  aliases: ['r'],
  usage: '"<key>"|<index>',
  async execute(message, args) {
    const { removed, error, match } = await this.remove(message.member.guild.id, args);
    Logger.info({
      src: 'remove.js#execute()', removed, error, match,
    });
    if (error) {
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    if (!match) {
      message.channel.send(Views.usage(message.member.user.username, this.usage));
      return;
    }
    if (!removed) {
      message.channel.send(Views.warning(message.member.user.username, 'Unable to remove mapping'));
      return;
    }
    message.channel.send(Views.ok(message.member.user.username, 'You\'ve removed a mapping'));
  },
  async remove(guildId, args) {
    const keyPattern = '^"([^"]*)"$';
    let matches = args.match(keyPattern);
    if (matches) {
      return {
        ...await Spiels.removeByKey(guildId, matches[1]),
        match: true,
      };
    }
    const indexPattern = '^(\\d+)$';
    matches = args.match(indexPattern);
    if (matches) {
      return {
        ...await Spiels.removeByIndex(guildId, matches[1]),
        match: true,
      };
    }
    return { removed: false, error: false, match: false };
  },
};
