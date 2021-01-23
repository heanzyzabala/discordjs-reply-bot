import { Message } from 'discord.js';
import { Command } from 'src/classes';
import { Reply } from '../entities';
import { Context } from '../types';

export default class extends Command {
	name: string = '';
	aliases: string[] = [];
	usage: string = '';
	options: string[] = [];
	async execute({ guild }: Context, body: string, message: Message): Promise<void> {
		const replies: Reply[] = await Reply.find({ guildId: guild.id });
		const reply = replies.find((r) => {
			const { matchers, key } = r;
			const matcherFns = matchers.map((m) => this.toMatcherFn(m));
			const matchesAll = matcherFns.every((fn) => fn(key, body));
			if (matchesAll) return true;
			return false;
		});
		if (reply) {
			message.reply(reply.value);
			return;
		}
	}

	toMatcherFn = (matcher: string) => {
		switch (matcher) {
			case 'INCLUDES':
				return (source: string, target: string) => source.includes(target);
			case 'PRECISE':
				return (source: string, target: string) => source === target;
			default:
				return () => true;
		}
	};
}
