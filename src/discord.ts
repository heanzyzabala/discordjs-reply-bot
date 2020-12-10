import discord, { Message } from 'discord.js';

import { getCommands } from './commands';
import { Find } from './commands/find';
import { CommandError } from './error';
import { Usage, Success } from './messageEmbeds';
const find = new Find();

import { Command, Server, User } from './types';

const client = new discord.Client();
client.on('ready', async () => {
  console.log('up');
});
client.on('message', async (message: Message) => {
  if (message.author.bot) return;
  const { content, author, guild } = message;
  const user: User = {
    id: author.id,
  };
  try {
    if (!guild) {
      throw new Error();
    }
    const server: Server = {
      id: guild.id,
    };
    const prefix = '--';
    if (content.slice(0, prefix.length) === prefix) {
      console.log('command ' + content);
      const commandName = content.slice(prefix.length).split(' ', 1)[0];
      const command: Command | undefined =
        getCommands().get(commandName) ||
        [...getCommands().values()].find((c) =>
          c.aliases.includes(commandName)
        );
      if (command) {
        const body = content.slice(prefix.length + commandName.length).trim();
        const { result, msg } = await command.execute({ body, user, server });
        message.channel.send(msg);
      }
    } else {
      const { msg } = await find.execute({
        body: content,
        user,
        server,
      });
      if (msg) {
        message.reply(msg);
      }
    }
  } catch (err) {
    if (err instanceof CommandError) {
      const commandError = err as CommandError;
      if (commandError.id === 'E01') {
        message.channel.send(Usage(user, commandError.message));
      }
    }
    console.log('went to here');
    console.log(JSON.stringify(err));
  }
});

client.login(process.env.TOKEN);
