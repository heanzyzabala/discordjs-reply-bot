import { Message } from 'discord.js';
import { Reply } from '../entities';
import { Command, Context } from '../types';

class Find implements Command {
	name: string = '';
	aliases: string[] = [];
	usage: string = '';
	options: string[] = [];
	async execute({ guild }: Context, body: string, message: Message): Promise<void> {
		const replies: Reply[] = await Reply.find({ guildId: guild.id });
		// prettier-ignore
		const reply = replies.find((r) => { r.key === body });
		if (reply) {
			message.reply(reply.value);
			return;
		}
	}
}
export default new Find();
