const Spiels = require('./spiels');
const Logger = require('./logger');

module.exports = {
  execute: async (message) => {
    const { value, error } = await Spiels.find(message.member.guild.id, message.content);
    if (error) {
      message.reply('Something went wrong.');
      return;
    }
    if (value) {
      message.reply(value);
    }
  },
};
