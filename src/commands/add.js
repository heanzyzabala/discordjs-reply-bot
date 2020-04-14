const Spiels = require('../spiels');

module.exports = {
  name: 'add',
  aliases: ['a'],
  usage: '$"[key]" "[value]" [--include?] [--ignoreCase?]',
  execute: async (message, args) => {
    const pattern = '"(.*)" "(.*)"\\s?(--includes)?\\s?(--ignoreCase)?';
    const matches = args.match(pattern);
    if (!matches) {
      message.reply(`Usage: ${this.usage}`);
      return;
    }
    const criteria = {
      format: 'caseSensitive',
      matching: 'exact',
    };
    if (matches[3]) {
      criteria.matching = 'includes';
    }
    if (matches[4]) {
      criteria.format = 'ignoreCase';
    }
    const mapping = {
      key: matches[1],
      value: matches[2],
      criteria,
    };

    const { error } = await Spiels.save(message.member.guild.id, mapping);
    if (error) {
      message.reply('Error');
      return;
    }
    message.reply('Ok');
  },
};
