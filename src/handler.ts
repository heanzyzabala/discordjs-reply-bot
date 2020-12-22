import { Message, MessageEmbed } from 'discord.js';
import commands from './commands';
import { Command, Context } from './types';

export const handle = (commandName: string, context: Context): void => {
  commands.forEach((command: Command) => {
    if (command.name === commandName || command.aliases.includes(commandName)) {
      command.execute(context);
    }
  });
};
