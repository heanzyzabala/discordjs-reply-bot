require('dotenv').config();

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;

const Discord = require('discord.js');

const commands = require('./commands');

const Save = require('./commands/save');
const Find = require('./commands/find');
const List = require('./commands/list');
const Remove = require('./commands/remove');
const MessageEmbed = require('./messageEmbed');
const Logger = require('./logger');

const bot = new Discord.Client();

bot.on('ready', () => {
  Logger.info('UP');
});

bot.on('message', async (msg) => {
  if (msg.member.id === bot.user.id) {
    return;
  }
  const guildId = msg.member.guild.id;
  const { content } = msg;
  const paramsArr = content.split(' ');
  const command = paramsArr[0];

  if (command === '--save') {
    const params = content.slice(command.length + 1, content.length);
    const pattern = '"(.*)" "(.*)"\\s?(--includes)?\\s?(--ignoreCase)?';
    const matches = params.match(pattern);
    if (!matches) {
      msg.reply('Invalid command, it should be: --save "key" "value" --includes? --ignoreCase?');
      return;
    }
    const criteria = {
      format: 'caseSensitive',
      matching: 'exact',
    };
    if (matches[3]) {
      criteria.matching = 'includes';
    }
    if (matches[4]) {
      criteria.format = 'ignoreCase';
    }
    const mapping = {
      key: matches[1],
      value: matches[2],
      criteria,
    };
    const { error } = await Save.execute(guildId, mapping);
    if (error) {
      msg.reply('Something went wrong :[');
      return;
    }
    const messageDetails = {
      user: msg.member.user.username,
      title: 'Added',
      message: 'You\'ve added a new mapping!',
      key: mapping.key,
      value: mapping.value,
      format: mapping.criteria.format,
      matching: mapping.criteria.matching,
    };
    msg.channel.send(MessageEmbed.saved(messageDetails));
  } else if (command === '--remove') {
    const key = paramsArr[1];
    if (!key) {
      msg.reply('Invalid command, it should be: --remove {key}');
      return;
    }
    const { removed, error } = await Remove.execute(guildId, key);
    if (error) {
      msg.reply('Something went wrong :[');
    } else if (removed) {
      const messageDetails = {
        user: msg.member.user.username,
        title: 'Removed',
        message: 'You\'ve remove key',
        key,
      };
      msg.channel.send(MessageEmbed.removed(messageDetails));
    } else {
      msg.reply('Unable to remove :o');
    }
  } else if (command === '--list') {
    const { mappings, error } = await List.execute(guildId);
    if (error) {
      msg.reply('Something went wrong :[');
    }
    const messageDetails = {
      user: msg.member.user.username,
      title: 'List',
      message: 'Available mappings:',
      mappings,
    };
    msg.channel.send(MessageEmbed.list(messageDetails));
  } else {
    const { reply, error } = await Find.execute(guildId, msg.content);
    if (error) {
      msg.reply('Something went wrong :[');
    } else if (reply) {
      msg.reply(reply);
    }
  }
});
bot.login(token);
