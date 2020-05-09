const Spiels = require('../spiels');
const Views = require('../views');
const Logger = require('../logger');

module.exports = {
  name: 'list',
  aliases: ['l'],
  usage: '',
  async execute(message) {
    const { mappings, error } = await Spiels.list(message.member.guild.id);
    Logger.info({ src: 'list.js#execute()', mappings, error });
    if (error) {
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    message.channel.send(Views.list(message.member.user.username, mappings));
  },
};
