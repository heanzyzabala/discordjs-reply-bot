require('dotenv').config();

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

const Find = require('./find');
const Logger = require('./logger');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'));
Object.values(commandFiles).forEach((file) => {
  // eslint-disable-next-line import/no-dynamic-require
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.on('ready', () => { Logger.info('UP'); });

client.on('message', async (message) => {
  if (message.member.id === client.user.id) {
    return;
  }
  const prefix = '--';
  const commandName = message.content.slice(prefix.length).split(' ', 1)[0];
  const command = client.commands.get(commandName)
  || client.commands.find((cmd) => cmd.aliases.includes(commandName));

  if (!command) {
    Find.execute(message);
  } else {
    const args = message.content.slice(
      commandName.length + prefix.length + 1, message.content.length,
    );
    command.execute(message, args);
  }

  // const { content } = message;
  // const paramsArr = content.split(' ');
  // const command = paramsArr[0];

  // if (command === '--save') {
  //   const params = content.slice(command.length + 1, content.length);
  //   const pattern = '"(.*)" "(.*)"\\s?(--includes)?\\s?(--ignoreCase)?';
  //   const matches = params.match(pattern);
  //   if (!matches) {
  //     message.reply('Invalid command, it should be: --save "key" "value" --includes? --ignoreCase?');
  //     return;
  //   }
  //   const criteria = {
  //     format: 'caseSensitive',
  //     matching: 'exact',
  //   };
  //   if (matches[3]) {
  //     criteria.matching = 'includes';
  //   }
  //   if (matches[4]) {
  //     criteria.format = 'ignoreCase';
  //   }
  //   const mapping = {
  //     key: matches[1],
  //     value: matches[2],
  //     criteria,
  //   };
  //   const { error } = await Save.execute(guildId, mapping);
  //   if (error) {
  //     message.reply('Something went wrong :[');
  //     return;
  //   }
  //   const messageDetails = {
  //     user: message.member.user.username,
  //     title: 'Added',
  //     message: 'You\'ve added a new mapping!',
  //     key: mapping.key,
  //     value: mapping.value,
  //     format: mapping.criteria.format,
  //     matching: mapping.criteria.matching,
  //   };
  //   message.channel.send(MessageEmbed.saved(messageDetails));
  // } else if (command === '--remove') {
  //   const key = paramsArr[1];
  //   if (!key) {
  //     message.reply('Invalid command, it should be: --remove {key}');
  //     return;
  //   }
  //   const { removed, error } = await Remove.execute(guildId, key);
  //   if (error) {
  //     message.reply('Something went wrong :[');
  //   } else if (removed) {
  //     const messageDetails = {
  //       user: message.member.user.username,
  //       title: 'Removed',
  //       message: 'You\'ve remove key',
  //       key,
  //     };
  //     message.channel.send(MessageEmbed.removed(messageDetails));
  //   } else {
  //     message.reply('Unable to remove :o');
  //   }
  // } else if (command === '--list') {
  //   const { mappings, error } = await List.execute(guildId);
  //   if (error) {
  //     message.reply('Something went wrong :[');
  //   }
  //   const messageDetails = {
  //     user: message.member.user.username,
  //     title: 'List',
  //     message: 'Available mappings:',
  //     mappings,
  //   };
  //   message.channel.send(MessageEmbed.list(messageDetails));
  // } else {
  //   const { reply, error } = await Find.execute(guildId, message.content);
  //   if (error) {
  //     message.reply('Something went wrong :[');
  //   } else if (reply) {
  //     message.reply(reply);
  //   }
  // }
});
client.login(token);
