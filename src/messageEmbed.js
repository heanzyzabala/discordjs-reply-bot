const Discord = require('discord.js');

function MessageEmbed() {
  this.saved = ({
    user, title, message, key, value, format, matching,
  }) => new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(user)
    .setTitle(title)
    .setDescription(message)
    .addField('key', key, true)
    .addField('value', value, true)
    .addField('format', format)
    .addField('matching', matching);
}
module.exports = new MessageEmbed();
