import { Message } from 'discord.js';
import { Command, Context } from '../types';
import { Guild } from '../entities';
import * as embeds from '../messageEmbeds';

class Prefix implements Command {
  readonly name: string = 'prefix';
  readonly aliases: string[] = ['p'];
  readonly usage: string = '<prefix>';
  readonly options: string[] = [];
  readonly onSuccess = 'You updated the prefix!';
  async execute(
    { user, guild }: Context,
    body: string,
    message: Message
  ): Promise<void> {
    const matches = body.match('^(.*)$');
    if (!matches) {
      message.channel.send(embeds.usage(user, this.usage));
      return;
    }
    const { guildId, maxReplies, maxChars, id } = guild;
    await new Guild(guildId, matches[0], maxReplies, maxChars, id).save();
    message.channel.send(embeds.success(user, this.onSuccess));
  }
}
export default new Prefix();
