import { Message } from 'discord.js';
import { Command, Context } from '../types';
import { Guild } from '../entities';
import * as embeds from '../messageEmbeds';

class Role implements Command {
  readonly name: string = 'role';
  readonly aliases: string[] = ['r'];
  readonly usage: string = '<role>';
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
    const { guildId, maxReplies, maxLength, prefix, id } = guild;
    await new Guild(guildId, prefix, maxReplies, maxLength, matches[0], id).save();
    message.channel.send(
      embeds.success(user, `You set the role to '${matches[0]}'`)
    );
  }
}
export default new Role();
