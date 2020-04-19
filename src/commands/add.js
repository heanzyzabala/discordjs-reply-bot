const Spiels = require('../spiels');
const Views = require('../views');
const Logger = require('../logger');

module.exports = {
  name: 'add',
  aliases: ['a'],
  usage: '"<key>" "<value>" --includes? --ignoreCase?',
  async execute(message, args) {
    const pattern = '^"([^"]+)" "([^"]+)"\\s*(--includes)?\\s*(--ignoreCase)?$';
    const matches = args.match(pattern);
    if (!matches) {
      message.channel.send(Views.usage(message.member.user.username, this.usage));
      return;
    }
    const mapping = {
      key: matches[1],
      value: matches[2],
      criteria: {
        format: (matches[4] && matches[4].slice(2)) || 'exact',
        match: (matches[3] && matches[3].slice(2)) || 'caseSensitive',
      },
    };
    const { error } = await Spiels.save(message.member.guild.id, mapping);
    Logger.info({
      src: 'save.js#execute()', error, mapping,
    });
    if (error) {
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    message.channel.send(Views.ok(message.member.user.username, 'You\'ve added a new mapping'));
  },
};
