const Spiels = require('../spiels');
const Views = require('../views');
const Logger = require('../logger');

module.exports = {
  name: 'remove',
  aliases: ['r'],
  usage: '"<key>"',
  async execute(message, args) {
    const pattern = '^"([^"]*)"$';
    const matches = args.match(pattern);
    if (!matches) {
      message.channel.send(Views.usage(message.member.user.username, this.usage));
      return;
    }
    const { removed, error } = await Spiels.remove(message.member.guild.id, matches[1]);
    if (error) {
      Logger.error(error);
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    if (removed) {
      message.channel.send(Views.ok(message.member.user.username, 'You\'ve removed a mapping'));
      return;
    }
    message.channel.send(Views.warning(message.member.user.username, 'Unable to remove mapping'));
  },
};
