import { Message } from 'discord.js';
import { Context } from '../types';
import { Guild } from '../entities';
import * as embeds from '../embed';
import { Command } from '../classes';

export default class extends Command {
	name: string = 'prefix';
	aliases: string[] = ['p'];
	usage: string = '<prefix>';
	options: string[] = [];
	async execute(context: Context, body: string, { channel }: Message): Promise<any> {
		const { user, guild } = context;
		const matches = body.match('^(.*)$');
		if (!matches) {
			this.log.info({ ...context }, 'Invalid Usage');
			return channel.send(embeds.usage(user, this.usage));
		}
		this.log.info({ ...context }, 'Setting Prefix');
		const { guildId, maxReplies, maxLength, allowedRole, id } = guild;
		await new Guild(guildId, matches[0], maxReplies, maxLength, allowedRole, id).save();
		channel.send(embeds.success(user, `You set the prefix to '${matches[0]}'`));
	}
}
