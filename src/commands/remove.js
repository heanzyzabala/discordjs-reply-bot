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
        match: matches[0],
        type: 'key',
      };
    }
    const indexPattern = '^(\\d+)$';
    matches = args.match(indexPattern);
    if (matches) {
      return {
        match: matches[0],
        type: 'index',
      };
    }
    return { match: null, type: null };
  },
  remove(match, type) {
    if (type === 'key') {
      return { error: Spiels.removeByKey(match) };
    }
    return { error: Spiels.removeByIndex(match) };
  },
  async execute(message, args) {
    const { match, type } = this.matches(args);
    if (!match) {
      message.channel.send(Views.usage(message.member.user.username));
      return;
    }
    const { removed, error } = this.remove(match, type);
    Logger.info({
      src: 'remove.js#execute()', error, match,
    });
    if (error) {
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    if (!removed) {
      message.channel.send(Views.warning(message.member.user.username, 'Unable to remove'));
      return;
    }
    message.channel.send(Views.ok(message.member.user.username, 'You\'ve removed a mapping'));
  },
};
