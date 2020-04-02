const Discord = require('discord.js');
const Spiel = require('./spiel');

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const bot = new Discord.Client();

bot.on('ready', () => { 
  console.log('Connected to discord');
  const spiel = new Spiel();
  spiel.find('guildId', 'message', spiels => {
  });
});

bot.on('message', msg => {
  if(msg.member.id == bot.user.id) {
    return;
  }
  const guildId = msg.member.guild.id;
  console.log(`${msg.createdAt} [${msg.member.displayName}]:  ${msg.content}`);
});
bot.login(token);
