const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;

const spiels = require('./spiels.json').spiels;
const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const mongodbUrl = 'mongodb://localhost:27017/';

const bot = new Discord.Client();

bot.on('ready', () => { 
  console.log('Connected to discord');
});

bot.on('message', msg => {
  if(msg.member.id == bot.user.id) {
    return;
  }

  const guildId = msg.member.guild.id;
  MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
    if(err) throw err;
    const db = client.db('riposte');
    db.createCollection('spiels', (err, res) => {
      if(err) throw err;
      console.log('Created collection');
    });
    db.collection('spiels').find();
    // console.log(spiels);
    // client.close();
  });

  // const spiel = spiels.find(o => o.key.toLowerCase() === msg.content.toLowerCase());
  // if(spiel) {
  //   console.log(`${msg.createdAt} [${msg.member.displayName}]:  ${msg.content}`);
  //   msg.reply(spiel.value);
  // }
});
bot.login(token);
