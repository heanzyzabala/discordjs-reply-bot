import { Message } from 'discord.js';
import { Reply } from '../entities';
import { Context } from '../types';
import { usage, success, constraint } from '../embed';
import { Command } from '../classes';
export default class extends Command {
	name: string = 'add';
	aliases: string[] = ['a'];
	usage: string = '"<key>" "<value>" --includes? --ignoreCase?';
	options: string[] = ['--includes', '--ignoreCase'];
	async execute({ user, guild }: Context, body: string, { channel }: Message): Promise<any> {
		const matches = body.match(/^"([^"]+)" "([^"]+)"\s*(--includes|--ignoreCase)?\s*(--ignoreCase|--includes)?$/)
		if (!matches) {
			return channel.send(usage(user, this.usage));
		}
		const key = matches[1];
		const value = matches[2];
		if (key.length > guild.maxLength || value.length > guild.maxLength) {
			const title = 'Invalid length';
			const description = `Key and Value should be less than or equal to ${guild.maxLength} characters.`;
			return channel.send(constraint(user, title, description));
		}
		const replies = await Reply.find({ guildId: guild.id });
		if (replies.length >= guild.maxReplies) {
			const title = 'Max replies reached';
			const description = `You can only add up to ${guild.maxReplies} replies.`;
			return channel.send(constraint(user, title, description));
		}
		const reply = replies.find((r) => r.key === key && r.guildId === guild.id);
		const matcher = this.getMatcher([matches[3], matches[4]])
		const formatter = this.getFormatter([matches[3], matches[4]])

		if (!reply) {
			await new Reply(key, value, matcher, formatter, guild.id).save();
			return channel.send(success(user, 'You added a reply.'));
		}
		await new Reply(key, value, matcher, formatter, guild.id, reply.id).save();
		return channel.send(success(user, 'You updated a reply.'));
	}

	getMatcher(options: string[]) {
		return options.includes('--includes') ? 'INCLUDES' : 'PRECISE';
	}

	getFormatter(options: string[]) {
		return options.includes('--ignoreCase') ? 'IGNORE_CASE' : 'CASE_SENSITIVE';
	}
}
