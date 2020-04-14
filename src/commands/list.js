const Spiels = require('../spiels');

module.exports = {
  name: 'list',
  aliases: ['l'],
  usage: '',
  execute: async (message) => {
    const { spiel, error } = await Spiels.list(message.member.guild.id);
    if (error) {
      message.reply('Something went wrong.');
      return;
    }
    message.reply(spiel);
  },
};
