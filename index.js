const Discord = require('discord.js');
const Spiels = require('./spiels');

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const bot = new Discord.Client();

bot.on('ready', () => { console.log('Connected to discord'); });

bot.on('message', msg => {
  if(msg.member.id == bot.user.id) {
    return;
  }
  const guildId = msg.member.guild.id;
  const message = msg.content;
  console.log(`guildId: ${guildId}`);
  Spiels.find(guildId, message, function(reply) {
    if(reply) {
      console.log(`${msg.createdAt} [${msg.member.displayName}]:  ${msg.content}`);
      msg.reply(reply);
    }
  });
});
bot.login(token);
