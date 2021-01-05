import { Message } from 'discord.js';
import { Command, Context } from '../types';
import { Guild } from '../entities';
import * as embeds from '../messageEmbeds';

class Prefix implements Command {
  readonly name: string = 'prefix';
  readonly aliases: string[] = ['p'];
  readonly usage: string = '<prefix>';
  readonly options: string[] = [];
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
    const { guildId, maxReplies, maxLength, allowedRole, id } = guild;
    await new Guild(guildId, matches[0], maxReplies, maxLength, allowedRole, id).save();
    message.channel.send(
      embeds.success(user, `You set the prefix to '${matches[0]}'`)
    );
  }
}
export default new Prefix();
