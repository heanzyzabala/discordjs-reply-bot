import { Message } from 'discord.js';
import { Command, Context } from 'src/types';
import { Reply } from '../entities';
import * as embeds from '../messageEmbeds';

class List implements Command {
  name: string = 'list';
  aliases: string[] = ['l'];
  usage: string = '--list';
  options: string[] = [];
  async execute({ user, guild }: Context, _body: string, { channel }: Message): Promise<void> {
    const replies: Reply[] = await Reply.find({ guildId: guild.id });
    channel.send(embeds.list(user, replies));
  }
}
export default new List();
