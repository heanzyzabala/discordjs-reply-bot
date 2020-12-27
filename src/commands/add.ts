import { Message } from 'discord.js';
import { Reply } from '../entities';
import { Command, Context } from '../types';
import * as embeds from '../messageEmbeds';
class Add implements Command {
  readonly name: string = 'add';
  readonly aliases: string[] = ['a'];
  readonly usage: string = '"<key>" "<value>" --includes? --ignoreCase?';
  readonly options: string[] = ['--includes', '--ignoreCase'];
  readonly onSuccess = 'You added a reply!';
  readonly onUpdate = 'You updated a reply!';
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
    const guildId = guild.id;
    const reply = await Reply.findOne({ key, guildId });
    const options = '';
    if (!reply) {
      await new Reply(key, value, options, guildId).save();
      message.channel.send(embeds.success(user, this.onSuccess));
      return;
    }
    await new Reply(key, value, options, guildId, reply.id).save();
    message.channel.send(embeds.success(user, this.onUpdate));
    return;
  }
}
export default new Add();
