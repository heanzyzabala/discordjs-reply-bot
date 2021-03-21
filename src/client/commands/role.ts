import { Message } from 'discord.js';

import * as embeds from '../embed';
import { Command } from '../classes';

import { Guild } from '../../entities';
import { Context } from '../../types';

export default class extends Command {
	name: string = 'role';
	aliases: string[] = ['r'];
	usage: string = '<role>';
	options: string[] = [];
	async execute(context: Context, body: string, { channel }: Message): Promise<any> {
		const { user, guild } = context;
		const matches = body.match('^(.*)$');
		if (!matches) {
			this.log.info({ ...context }, 'Invalid Usage');
			return channel.send(embeds.usage(user, this.usage));
		}
		this.log.info({ ...context }, 'Setting Role');
		// const { guildId, maxReplies, maxLength, prefix, id } = guild;
		// await new Guild(guildId, prefix, maxReplies, maxLength, matches[0], id).save();
		// return channel.send(embeds.success(user, `You set the role to '${matches[0]}'`));
	}
}
