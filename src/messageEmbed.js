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

  this.list = ({
    user, title, message, mappings,
  }) => {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(user)
      .setTitle(title)
      .setDescription(message);
    for (let i = 0; i < mappings.length; i += 1) {
      const { key, value, criteria } = mappings[i];
      embed.addFields(
        { name: 'key', value: key, inline: true },
        { name: 'value', value, inline: true },
        { name: 'format', value: criteria.format },
        { name: 'matching', value: criteria.matching },
      );
    }
    return embed;
  };

  this.removed = ({
    user, title, message, key,
  }) => new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(user)
    .setTitle(title)
    .setDescription(message)
    .addField({ name: 'key', value: key });
}
module.exports = new MessageEmbed();
