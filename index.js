const Discord = require('discord.js');
const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;

const bot = new Discord.Client();
bot.on('ready', () => {
  console.log('Connected');
});
bot.login(token);
