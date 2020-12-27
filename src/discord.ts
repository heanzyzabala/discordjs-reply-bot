import discord, { Message } from 'discord.js';

import { error } from './messageEmbeds';
import { Command, Context } from './types';
import { commands, Find } from './commands';
import { Guild } from './entities';

const client = new discord.Client();
client.on('ready', async () => {
  console.log('up');
});
client.on(
  'message',
  async (message: Message): Promise<void | discord.Message> => {
    try {
      if (message.author.bot) return;
      const { content, guild: discordGuild } = message;
      if (!discordGuild) {
        return message.channel.send(error());
      }
      let guild = await Guild.findOne({ guildId: discordGuild.id });
      if (!guild) {
        guild = await new Guild(discordGuild.id, '--', 15, 350).save();
      }
      const context: Context = {
        id: message.id,
        content: message.content,
        user: {
          id: message.author.id,
          username:
            message.author.username + '#' + message.author.discriminator,
        },
        guild: {
          id: guild.id,
          guildId: guild.guildId,
          prefix: guild.prefix,
          maxReplies: guild.maxReplies,
          maxChars: guild.maxChars,
        },
      };
      const prefix = guild.prefix;
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
      console.log(err);
      message.channel.send(error());
    }
  }
);
const get = (commandName: string): Command | undefined => {
  return commands.find(
    (cmd) => cmd.name === commandName || cmd.aliases.includes(commandName)
  );
};
client.login(process.env.TOKEN);
