require('dotenv').config();

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;

const Discord = require('discord.js');

const Save = require('./actions/save');
const Find = require('./actions/find');

const bot = new Discord.Client();

bot.on('ready', () => { Logger.info(`UP: ${bot.readyAt}`); });

bot.on('message', async (msg) => {
  if (msg.member.id === bot.user.id) {
    return;
  }
  const guildId = msg.member.guild.id;
  const params = msg.content.split(' ');
  const command = params[0];

  if (command === '--save') {
    const mapping = {
      key: params[1],
      value: params[2],
    };
    const { error } = Save.execute(guildId, mapping);
    if (error) {
      msg.reply('Something went wrong :[');
    }
    msg.reply('Added :]');
  }

  const { reply, error } = Find.execute(guildId, msg.content);
  if (error) {
    msg.reply('Something went wrong :[');
  } else if (reply) {
    msg.reply(reply);
  }
});
bot.login(token);
