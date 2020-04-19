/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('dotenv').config();

const token = process.env.DISCORD_BOT_RIPOSTE_TOKEN;
const prefix = process.env.PREFIX;

const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

const Find = require('./find');
const Logger = require('./logger');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'));
Object.values(commandFiles).forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

const getCommand = (commandName) => client.commands.get(commandName)
    || client.commands.find((cmd) => cmd.aliases.includes(commandName));

client.on('ready', () => Logger.info('UP'));

client.on('message', async (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content.slice(0, prefix.length) === prefix) {
    const commandName = message.content.slice(prefix.length).split(' ', 1)[0];
    const command = getCommand(commandName);
    if (command) {
      Logger.initContext(message);
      const args = message.content.slice(
        commandName.length + prefix.length + 1, message.content.length,
      );
      command.execute(message, args);
      return;
    }
  }
  Find.execute(message);
});

client.login(token);
