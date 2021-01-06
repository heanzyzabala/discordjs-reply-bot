import { Message } from 'discord.js';
import { Command, Context } from '../types';
import * as embeds from '../messageEmbeds';

class Help implements Command {
  name: string = 'help';
  aliases: string[] = ['h'];
  usage: string = 'help';
  options: string[] = [];
  async execute({ user }: Context, _body: string, { channel }: Message): Promise<void> {
    channel.send(embeds.help(user));
  }
}
export default new Help();
