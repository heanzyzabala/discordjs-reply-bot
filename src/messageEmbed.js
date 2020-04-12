const Discord = require('discord.js');

function MessageEmbed() {
  this.saved = ({
    user, title, message, key, value, format, matching,
  }) => new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(user)
    .setTitle(title)
    .setDescription(message)
    .addFields(
      { name: 'key', value: key, inline: true },
      { name: 'value', value, inline: true },
    )
    .addFields(
      { name: 'format', value: format },
      { name: 'matching', value: matching },
    );
}
module.exports = new MessageEmbed();
