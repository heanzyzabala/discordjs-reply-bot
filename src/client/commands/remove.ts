import { Message } from 'discord.js';

import * as embed from '../embed';
import { Command } from '../classes';

import { Reply } from '../../entities';
import { Context } from '../../types';

export default class extends Command {
	name: string = 'remove';
	aliases: string[] = ['rm'];
	usage: string = 'remove <index>';
	options: string[] = [];
	async execute(context: Context, body: string, { channel }: Message): Promise<any> {
		const { user, guild } = context;
		const matches = body.match(/^(\d{1,3})$/);
		if (!matches) {
			this.log.info({ ...context }, 'Invalid Usage');
			return channel.send(embed.usage(user, guild.prefix + this.usage));
		}

		const replies = await Reply.find({ guildId: guild.id });
		replies.sort((a, b) => a.id - b.id);
		const reply = replies[parseInt(matches[0])];
		if (!reply) {
			this.log.info({ ...context }, 'Index Not Found');
			return channel.send(embed.usage(user, guild.prefix + this.usage));
		}

		this.log.info({ ...context }, 'Removing Reply');
		await Reply.delete({ id: reply.id });
		return channel.send(embed.success(user, 'You removed a reply.'));
	}
}
