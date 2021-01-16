import { Message } from 'discord.js';
import { Command, Context } from '../types';
import { Reply } from '../entities';
import * as embeds from '../messageEmbeds';

class Remove implements Command {
	name: string = 'remove';
	aliases: string[] = ['rm'];
	usage: string = 'remove <index>';
	options: string[] = [];
	async execute({ user, guild }: Context, body: string, { channel }: Message): Promise<void> {
		const matches = body.match(/^(\d{1,3})$/);
		if (!matches) {
			channel.send(embeds.usage(user, guild.prefix + this.usage));
			return;
		}

		const replies = await Reply.find({ guildId: guild.id });
		const reply = replies[parseInt(matches[0])]
		if (!reply) {
			channel.send(embeds.usage(user, guild.prefix + this.usage));
			return;
		}

		await Reply.delete({ id: reply.id })
		channel.send(embeds.success(user, 'You removed a reply.'));
	}
}
export default new Remove();