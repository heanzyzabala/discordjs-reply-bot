const Discord = require('discord.js');
const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;

const bot = new Discord.Client();
bot.on('ready', () => {
  console.log('Connected');
});
bot.on('message', msg => {
  if(msg.member.id == '693108033601011762') {
    return;
  }
});
bot.login(token);
