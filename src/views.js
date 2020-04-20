const Discord = require('discord.js');

module.exports = {
  list(user, mappings) {
    const message = new Discord.MessageEmbed()
      .setColor('#4caf50')
      .setAuthor(user)
      .setTitle('Current Mappings');
    this.generateRows(mappings, (row) => {
      if (!row) {
        message.setDescription('There are no mappings added yet.');
        return;
      }
      const { index } = row;
      const { key, value, criteria } = row.mapping;
      message.addField(`[${index}]`, `
\`\`\`
key:    ${key}
value:  ${value}
format: ${criteria.format}
match:  ${criteria.match}
\`\`\`
      `);
    });
    return message;
  },
  usage(user, message) {
    return new Discord.MessageEmbed()
      .setColor('#cddc39')
      .setAuthor(user)
      .setTitle('Invalid command')
      .addField('Usage', `\`\`\`${message}\`\`\``);
  },
  error(user) {
    return new Discord.MessageEmbed()
      .setColor('#f44336')
      .setAuthor(user)
      .setTitle('Oof. Something went wrong!')
      .setDescription('Please contact the developer if you keep seeing this message.');
  },
  warning(user, message, description) {
    const msg = new Discord.MessageEmbed()
      .setColor('#cddc39')
      .setAuthor(user)
      .setTitle(message);
    if (description) {
      msg.setDescription(description);
    }
    return msg;
  },
  ok(user, message) {
    return new Discord.MessageEmbed()
      .setColor('#4caf50')
      .setAuthor(user)
      .setTitle(message);
  },
  generateRows(mappings, cb) {
    const { length } = mappings;
    if (length === 0) {
      cb(null);
    } else {
      for (let i = 0; i < length; i += 1) {
        cb({ index: i, mapping: mappings[i] });
      }
    }
  },
};
