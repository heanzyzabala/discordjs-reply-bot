const Spiels = require('../spiels');
const Views = require('../views');
const Logger = require('../logger');

module.exports = {
  name: 'remove',
  aliases: ['r'],
  usage: '"<key>"|<index>',
  matches(args) {
    const keyPattern = '^"([^"]*)"$';
    let matches = args.match(keyPattern);
    if (matches) {
      return {
        match: matches[1],
        type: 'key',
      };
    }
    const indexPattern = '^(\\d+)$';
    matches = args.match(indexPattern);
    if (matches) {
      return {
        match: matches[1],
        type: 'index',
      };
    }
    return { match: null, type: null };
  },
  async remove(match, type) {
    if (type === 'key') {
      return Spiels.removeByKey(match);
    }
    return Spiels.removeByIndex(match);
  },
  async execute(message, args) {
    const { match, type } = this.matches(args);
    if (!match) {
      message.channel.send(Views.usage(message.member.user.username, this.usage));
      return;
    }
    const { removed, error } = await this.remove(match, type);
    Logger.info({
      src: 'remove.js#execute()', match, type, removed, error,
    });
    if (error) {
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    if (!removed) {
      message.channel.send(Views.warning(message.member.user.username, 'Unable to remove mapping'));
      return;
    }
    message.channel.send(Views.ok(message.member.user.username, 'You\'ve removed a mapping'));
  },
};
