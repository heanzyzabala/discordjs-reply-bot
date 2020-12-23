import { Message, MessageEmbed } from 'discord.js';
import { Find, commands } from './commands';
import { Command, Context } from './types';

export const handle = async ({ body: content, user, guild }: Context) => {
  const prefix = '--';
  if (content.slice(0, prefix.length) === prefix) {
    const commandName = content.slice(prefix.length).split(' ', 1)[0];
    const command = get(commandName);
    if (command) {
      const body = content.slice(prefix.length + commandName.length).trim();
      await command.execute({ body, user, guild });
      // message.channel.send(msg);
    }
  }
};

export const get = (commandName: string): Command | undefined => {
  return commands.find(
    (cmd) => cmd.name === commandName || cmd.aliases.includes(commandName)
  );
};
