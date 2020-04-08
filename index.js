require('dotenv').config();
const Discord = require('discord.js');
const Spiels = require('./spiels');

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const bot = new Discord.Client();

bot.on('ready', () => { console.log('Connected to discord'); });

bot.on('message', msg => {
  if (msg.member.id == bot.user.id) {
    return;
  }
  const guildId = msg.member.guild.id;
  const message = msg.content;
  const splt_message = message.split(' ');
  if (splt_message[0] === '!!save') {
    if (splt_message.length != 3) {
      msg.reply('Invalid arguments, should be: ~save <key> <value>');
    } else {
      const mapping = { key: splt_message[1], value: splt_message[2] };
      Spiels.save(guildId, mapping, function (res) {
        if(res) {
          msg.reply(`Added: ${res.key} => ${res.value}`);
        } else {
          msg.reply(`Unable to add. Something went wrong.`);
        }
      });
    }
  } else if (splt_message[0] === '!!list') {
    Spiels.list(guildId, function (mapping) {
      msg.reply(JSON.stringify(mapping));
    });
  } else {
    console.log(`guildId: ${guildId}`);
    Spiels.find(guildId, message, function (reply) {
      if (reply) {
        console.log(`${msg.createdAt} [${msg.member.displayName}]:  ${msg.content}`);
        msg.reply(reply);
      }
    });
  }
});
bot.login(token);
