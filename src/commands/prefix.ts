import { Message } from 'discord.js';
import { Guild } from '../entities';
import { Command, Context } from '../types';
import * as embeds from '../messageEmbeds';

class Prefix implements Command {
  name: string = 'prefix';
  aliases: string[] = ['p'];
  usage: string = '--prefix <prefix>';
  options: string[] = [];
  async execute(
    { user, guild: contextGuild }: Context,
    body: string,
    message: Message
  ): Promise<void> {
    const matches = body.match('');
    if (!matches) {
      message.channel.send(embeds.usage(user, this.usage));
      return;
    }
    const guild = await Guild.findOne({ guildId: contextGuild.id });
  }
}
export default new Prefix();
