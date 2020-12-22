import discord, { Message } from 'discord.js';

import { CommandError } from './error';
import { usage, success, error } from './messageEmbeds';
import { Find, commands } from './commands';

import { Command, Server, User } from './types';

const client = new discord.Client();
client.on('ready', async () => {
  console.log('up');
});
client.on('message', async (message: Message) => {
  try {
    if (message.author.bot) return;
    const { content, author, guild } = message;
    if (!guild) {
      return message.channel.send(error());
    }
    const user: User = {
      id: author.id,
    };
    const server: Server = {
      id: guild.id,
    };

    const prefix = '--';
    if (content.slice(0, prefix.length) === prefix) {
      const commandName = content.slice(prefix.length).split(' ', 1)[0];
      const command = getOrDefault(commandName);

      if (command.name) {
        const body = content.slice(prefix.length + commandName.length).trim();
        const { result, msg } = await command.execute({ body, user, server });
        message.channel.send(msg);
      }
    } else {
      const reply = await find.execute({
        body: content,
        user,
        server,
      });
      if (reply) {
        message.reply(reply.value);
      }
    }
  } catch (err) {
    if (err instanceof CommandError) {
      const commandError = err as CommandError;
      if (commandError.id === 'E01') {
        message.channel.send(usage(user, commandError.message));
      }
    }
  }
});

const toContext = (message: Message): Context => {
  return {
    user: {
      id: message.author.id,
    },
  };
};
const get = (commandName: string): Command | undefined => {
  return commands.find(
    (cmd) => cmd.name === commandName || cmd.aliases.includes(commandName)
  );
};

client.login(process.env.TOKEN);
