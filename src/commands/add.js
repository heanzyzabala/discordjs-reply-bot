const Spiels = require('../spiels');
const Views = require('../views');
const Logger = require('../logger');

module.exports = {
  name: 'add',
  aliases: ['a'],
  usage: '"<key>" "<value>" --includes? --ignoreCase?',
  matches (args) {
    const pattern = '^"([^"]+)" "([^"]+)"\\s*(--includes)?\\s*(--ignoreCase)?$';
    return { matches: args.match(pattern) };
  },
  map (matches) {
    return {
      key: matches[1],
      value: matches[2],
      criteria: {
        format: (matches[4] && matches[4].slice(2)) || 'exact',
        match: (matches[3] && matches[3].slice(2)) || 'caseSensitive',
      }
    };
  },
  async execute(message, args) {
    const { matches } = this.matches(args);
    if(!matches) {
      message.channel.send(Views.usage(message.member.user.username, this.usage));
      return;
    }
    const mapping = this.map(matches);
    const { limit, error } = await Spiels.save(message.member.guild.id, mapping);
    Logger.info({
      src: 'save.js#execute()', limit, mapping, error,
    });
    if (error) {
      message.channel.send(Views.error(message.member.user.username));
      return;
    }

    if (limit.reached) {
      message.channel.send(Views.warning(message.member.user.username, 'Limit reached', `You can only add ${limit.count} mappings.`));
      return;
    }
    message.channel.send(Views.ok(message.member.user.username, 'You\'ve added a new mapping'));
  },
};
