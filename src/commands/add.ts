import { Message } from 'discord.js';
import { Reply } from '../entities';
import { Context } from '../types';
import * as embeds from '../messageEmbeds';
import { Command } from '../classes';
export default class extends Command {
	name: string = 'add';
	aliases: string[] = ['a'];
	usage: string = '"[key]" "[value]" --include';
	options: string[] = ['--include'];
	async execute({ guild, user }: Context, body: string, { channel }: Message): Promise<void> {
		const matches = body.match('^"([^"]+)" "([^"]+)"\\s*(--include)?\\s*(--ignoreCase)?$');
		if (!matches) {
			channel.send(embeds.usage(user, this.usage));
			return;
		}
		const key = matches[1];
		const value = matches[2];
		if (key.length > guild.maxLength || value.length > guild.maxLength) {
			// prettier-ignore
			channel.send(embeds.constraint(user.username, 'Invalid length', `Key and value should be less than or equal to ${guild.maxLength} characters.`));
			return;
		}
		const replies = await Reply.find({ guildId: guild.id });
		if (replies.length >= guild.maxReplies) {
			channel.send(
				embeds.constraint(
					user.username,
					'Max replies reached',
					`You can only add up to ${guild.maxReplies} replies.`,
				),
			);
			return;
		}
		const reply = replies.find((r) => r.key === key && r.guildId === guild.id);
		const matchers = [];
		if (matches[3]) {
			matchers.push(matches[3]);
		}
		if (!reply) {
			await new Reply(key, value, matchers, guild.id).save();
			channel.send(embeds.success(user, 'You added a reply.'));
			return;
		}
		await new Reply(key, value, matchers, guild.id, reply.id).save();
		channel.send(embeds.success(user, 'You updated a reply.'));
		return;
	}
}
