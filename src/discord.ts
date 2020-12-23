import discord, { Message } from 'discord.js';

import { error } from './messageEmbeds';
import { Command, Context } from './types';
import { commands, Find } from './commands';

const client = new discord.Client();
client.on('ready', async () => {
  console.log('up');
});
client.on('message', async (message: Message) => {
  try {
    if (message.author.bot) return;
    const { content, guild: discordGuild } = message;
    if (!discordGuild) {
      return message.channel.send(error());
    }
    const context = toContext(message);
    const prefix = '--';
    if (content.slice(0, prefix.length) === prefix) {
      const commandName = content.slice(prefix.length).split(' ', 1)[0];
      const command = get(commandName);
      if (command) {
        const body = content.slice(prefix.length + commandName.length).trim();
        return await command.execute(context, body, message);
      }
    } else {
      return await Find.execute(context, context.content, message);
    }
  } catch (err) {
    message.channel.send(error());
  }
});
const toContext = (message: Message): Context => {
  return {
    id: message.id,
    content: message.content,
    user: {
      id: message.author.id,
    },
    guild: {
      id: message.guild?.id || 'NO_GUILD_ID',
    },
  };
};
const get = (commandName: string): Command | undefined => {
  return commands.find(
    (cmd) => cmd.name === commandName || cmd.aliases.includes(commandName)
  );
};
client.login(process.env.TOKEN);
