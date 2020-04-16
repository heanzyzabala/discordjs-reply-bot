const Spiels = require('../spiels');

module.exports = {
  name: 'list',
  aliases: ['l'],
  usage: '',
  async execute(message) {
    const { mappings, error } = await Spiels.list(message.member.guild.id);
    if (error) {
      message.reply('Something went wrong.');
      return;
    }
    if (mappings.length === 0) {
      message.channel.send(`${message.author}.There are no mappings saved.`);
      return;
    }
    message.channel.send(`${message.author}.\n${JSON.stringify(mappings, null, 2)}`);
  },
};
