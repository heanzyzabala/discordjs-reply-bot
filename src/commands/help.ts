import { Message } from 'discord.js';
import { Command, Context } from '../types';
import * as embeds from '../messageEmbeds';

class Help implements Command {
  readonly name: string = 'help';
  readonly aliases: string[] = ['h'];
  readonly usage: string = 'help';
  readonly options: string[] = [];
  async execute(
    { user }: Context,
    _body: string,
    message: Message
  ): Promise<void> {
    message.channel.send(embeds.help(user));
  }
}
export default new Help();
