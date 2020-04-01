const Discord = require('discord.js');
const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const spiels = require('./spiels.json').spiels;

const bot = new Discord.Client();
bot.on('ready', () => {
  console.log('Connected');
});
bot.on('message', msg => {
  if(msg.member.id == '693108033601011762') {
    return;
  }
  const spiel = spiels.find(o => o.key.toLowerCase() === msg.content.toLowerCase());
  if(spiel) {
    console.log(`[${msg.member.displayName}]:  ${msg.content}`);
    msg.reply(spiel.value);
  }
});
bot.login(token);
