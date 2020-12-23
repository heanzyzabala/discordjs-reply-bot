import { Message } from 'discord.js';
import { Reply } from '../entities';
import { Command, Context } from '../types';

class Find implements Command {
  readonly name: string = '';
  readonly aliases: string[] = [];
  readonly usage: string = '';
  readonly options: string[] = [];
  async execute(
    { guild }: Context,
    body: string,
    message: Message
  ): Promise<void> {
    const replies: Reply[] = await Reply.find({ guildId: guild.id });
    const reply = replies.find((rply) => {
      return rply.key === body;
    });
    if (reply) {
      message.reply(reply.value);
      return;
    }
  }
}
export default new Find();
