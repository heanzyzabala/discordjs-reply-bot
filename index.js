require('dotenv').config();
const Discord = require('discord.js');
const Spiels = require('./spiels');

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const bot = new Discord.Client();

bot.on('ready', () => { 
  console.log(`UP: ${bot.readyAt}`);
});

bot.on('message', msg => {
  if (msg.member.id == bot.user.id) {
    return;
  }
  const guildId = msg.member.guild.id;
  const message = msg.content;
  const splt_message = message.split(' ');
  if (splt_message[0] === '!save') {
    console.log(`TAG: SAVE`);
    console.log(`DATE: ${msg.createdAt}`);
    console.log(`GUILD: ${guildId}`);
    console.log(`USER: ${msg.member.user.id}/${msg.member.user.username}#${msg.member.user.discriminator}/${msg.member.displayName}`);
    if (splt_message.length != 3) {
      msg.reply('Invalid arguments, should be: !save <key> <value>');
      console.log(`STATUS: FAILED`);
    } else {
      const mapping = { key: splt_message[1], value: splt_message[2] };
      console.log(`MAPPING: ${mapping.key} -> ${mapping.value}`);
      Spiels.save(guildId, mapping, function (res) {
        if (res) {
          msg.reply(`Added: ${res.key} -> ${res.value}`);
          console.log(`STATUS: OK`);
        } else {
          msg.reply(`Unable to add mapping: ${mapping.key} -> ${mapping.value}`);
          console.log(`STATUS: FAILED`);
        }
      });
    }
  } else if (splt_message[0] === '!list') {
    console.log(`TAG: LIST`);
    console.log(`DATE: ${msg.createdAt}`);
    console.log(`GUILD: ${guildId}`);
    console.log(`USER: ${msg.member.user.id}/${msg.member.user.username}#${msg.member.user.discriminator}/${msg.member.displayName}`);
    Spiels.list(guildId, function (mapping) {
      msg.reply(JSON.stringify(mapping));
    });
  } else if (splt_message[0] === '!delete') {
    console.log(`TAG: DELETE`);
    console.log(`DATE: ${msg.createdAt}`);
    console.log(`GUILD: ${guildId}`);
    console.log(`USER: ${msg.member.user.id}/${msg.member.user.username}#${msg.member.user.discriminator}/${msg.member.displayName}`);
    console.log(`KEY: ${key}`);
    if (splt_message.length != 2) {
      msg.reply('Invalid arguments, should be: !delete <key>');
      console.log(`STATUS: FAILED`);
    } else {
      const key = splt_message[1];
      Spiels.delete(guildId, key, function (ok) {
        if(ok) {
          msg.reply(`Deleted key: ${key}`);
          console.log(`STATUS: OK`);
        } else {
          msg.reply(`Unable to delete key: ${key}`);
          console.log(`STATUS: FAILED`);
        }
      });
    }
  } else {
    Spiels.find(guildId, message, function (reply) {
      if (reply) {
        console.log(`TAG: REPLY`);
        console.log(`DATE: ${msg.createdAt}`);
        console.log(`GUILD: ${guildId}`);
        console.log(`USER: ${msg.member.user.id}/${msg.member.user.username}#${msg.member.user.discriminator}/${msg.member.displayName}`);
        console.log(`MESSAGE: ${msg.content}`);
        console.log(`REPLY: ${reply}`);
        msg.reply(reply);
      }
    });
  }
});
bot.login(token);
