const Spiels = require('../spiels');

module.exports = {
  name: 'remove',
  aliases: ['r'],
  usage: '[key]',
  execute: async (message, args) => {
    const { removed, error } = await Spiels.remove(message.member.guild.id, args);
    if (error) {
      message.reply('Something went wrong.');
      return;
    }
    if (removed) {
      message.reply('Removed');
      return;
    }
    message.reply('Unable to remove');
  },
};
