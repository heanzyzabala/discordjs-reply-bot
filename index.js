const Discord = require('discord.js');
const redis = require('redis').createClient();

const { promisify } = require('util');
const getAsync = promisify(redis.get).bind(redis);

const spiels = require('./spiels.json').spiels;
const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;

const bot = new Discord.Client();

bot.on('ready', () => { console.log('Connected'); });
bot.on('message', msg => {
  if(msg.member.id == bot.user.id) {
    return;
  }

  const guildId = msg.member.guild.id;
  redis.set(guildId, 'henlo');
  redis.get(guildId, value => {
    console.log('value');
    console.log(value);
  });

  console.log(msg.member.guild.id);
  const spiel = spiels.find(o => o.key.toLowerCase() === msg.content.toLowerCase());
  if(spiel) {
    console.log(`${msg.createdAt} [${msg.member.displayName}]:  ${msg.content}`);
    msg.reply(spiel.value);
  }
});
bot.login(token);
