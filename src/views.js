const Discord = require('discord.js');

module.exports = {
  test() {
    return new Discord.MessageEmbed()
      .setColor('#cddc39')
      .setAuthor('Twinstar')
      .setTitle('Invalid command')
      .addField('`dfdkjfdkfjdkfjd`', `
\`\`\`
Hellosdflsjfldksjfskdfjlsdkjflskdjflskdfjsdlsdfjslkdfjsdjd; lkfjlsdkjsldkjflsdkfjalsdjlasdjf;alskdjfalsjflaksjdhlaksjdhfal;sjdhflka
\`\`\`
`);
  },
  usage(user, message) {
    return new Discord.MessageEmbed()
      .setColor('#cddc39')
      .setAuthor(user)
      .setTitle('Invalid command')
      .addField('Usage', message);
  },
  error(user) {
    return new Discord.MessageEmbed()
      .setColor('#f44336')
      .setAuthor(user)
      .setTitle('Oof. Something went wrong')
      .setDescription('Please contact the developer if you keep seeing this message.');
  },
  warning(user, message) {
    return new Discord.MessageEmbed()
      .setColor('#cddc39')
      .setAuthor(user)
      .setTitle(message);
  },
  ok(user, message) {
    return new Discord.MessageEmbed()
      .setColor('#4caf50')
      .setAuthor(user)
      .setTitle(message);
  },
  list(mappings) {
    const rows = this.generateRows(mappings);
    return `
\`\`\`
Current mappings:

${rows}
\`\`\`
`;
  },
  generateRows(mappings) {
    const { length } = mappings;
    let rows = '';
    if (length === 0) {
      rows = 'There are no mappings added yet.';
    } else {
      for (let i = 0; i < mappings.length; i += 1) {
        const { key, value, criteria } = mappings[i];
        rows += `[${i}]: ${key} -> ${value} [${criteria.format}, ${criteria.matching}]\n`;
      }
    }
    return rows;
  },
};
