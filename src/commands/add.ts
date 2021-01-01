import { Message } from 'discord.js';
import { Reply } from '../entities';
import { Command, Context } from '../types';
import * as embeds from '../messageEmbeds';
class Add implements Command {
  readonly name: string = 'add';
  readonly aliases: string[] = ['a'];
  readonly usage: string = '"<key>" "<value>" --includes? --ignoreCase?';
  readonly options: string[] = ['--includes', '--ignoreCase'];
  async execute(
    { guild, user }: Context,
    body: string,
    message: Message
  ): Promise<void> {
    const matches = body.match(
      '^"([^"]+)" "([^"]+)"\\s*(--includes)?\\s*(--ignoreCase)?$'
    );
    if (!matches) {
      message.channel.send(embeds.usage(user, this.usage));
      return;
    }
    const key = matches[1];
    const value = matches[2];
    if (key.length > guild.maxLength || value.length > guild.maxLength) {
      message.channel.send(
        embeds.constraint(
          user,
          'Invalid length',
          `Key and value should be less than or equal to ${guild.maxLength} characters.`
        )
      );
      return;
    }
    const guildId = guild.id;
    const replies = await Reply.find({ guildId });
    if (replies.length >= guild.maxReplies) {
      message.channel.send(
        embeds.constraint(
          user,
          'Max replies reached',
          `You can only add up to ${guild.maxReplies} replies.`
        )
      );
      return;
    }
    const reply = replies.find((r) => r.key === key);
    const options = '';
    if (!reply) {
      await new Reply(key, value, options, guildId).save();
      message.channel.send(embeds.success(user, 'You added a reply.'));
      return;
    }
    await new Reply(key, value, options, guildId, reply.id).save();
    message.channel.send(embeds.success(user, 'You updated a reply.'));
    return;
  }
}
export default new Add();
