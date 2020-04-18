const Spiels = require('./spiels');
const Views = require('./views');
const Logger = require('./logger');

module.exports = {
  execute: async (message) => {
    const { value, error } = await Spiels.find(message.member.guild.id, message.content);
    if (error) {
      Logger.error(error);
      message.channel.send(Views.error(message.member.user.username));
      return;
    }
    if (value) {
      message.channel.send(`${message.author}: ${value}`);
    }
  },
};
