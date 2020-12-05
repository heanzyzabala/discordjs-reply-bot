import discord, { Message } from 'discord.js';
import { v4 as uuid } from 'uuid';

import './config';
import './db';

import commands from './commands';
import { Context, Server, User } from './types';

const client = new discord.Client();
client.on('ready', async () => {
  console.log('up');
});
client.on('message', (message: Message) => {
  if (message.author.bot) return;

  const { content, author, guild } = message;
  const prefix = '--';
  if (content.slice(0, prefix.length) === prefix) {
    const commandName = content.slice(prefix.length).split(' ', 1)[0];
    const command =
      commands.get(commandName) ||
      [...commands.values()].find((c) => c.aliases.includes(commandName));
    if (command) {
      const user: User = {
        id: author.id,
      };
      const server: Server = {
        id: guild?.id || uuid(),
      };
      const body = content.slice(prefix.length + commandName.length);
      const context: Context = {
        body,
        user,
        server,
      };
      command.execute(context);
    }
  }
  console.log(
    `${message.member?.user.username}#${message.member?.user.discriminator}: ${message.content}`
  );
});

client.login(process.env.TOKEN);
