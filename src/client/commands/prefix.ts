import { Message, MessageEmbed } from 'discord.js';

import * as embeds from '../embed';
import { Command } from '../classes';

import { Guild } from '../../entities';
import { Context } from '../../types';

export default class extends Command {
	name: string = 'prefix';
	aliases: string[] = ['p'];
	usage: string = 'Prefix should only contain [a-zA-Z0-9!@#$&()-`.+,/\"] (Up to 4 characters)';
	options: string[] = [];
	async execute({ user }: Context, body: string, { channel }: Message): Promise<any> {
		const embed = new MessageEmbed()
			.setColor('#f44336')
			.setAuthor(user.username, user.avatarUrl)
			.setTitle('Unavailable')
			.setDescription('Currently working on it :man_construction_worker:')
		return channel.send(embed)
		// const { user, guild } = context;
		// const matches = body.match(/^([a-zA-Z0-9!@#$&()\-`.+,/\"]){1,4}$/);
		// if (!matches) {
		// 	this.log.info({ ...context, reason: 'Invalid format' }, 'Invalid Usage');
		// 	return channel.send(embeds.usage(user, this.usage));
		// }
		// this.log.info({ ...context }, 'Setting Prefix');
		// const { discordGuildId, maxReplies, maxLength, id } = guild;
		// await new Guild(discordGuildId, matches[0], maxReplies, maxLength, id).save();
		// return channel.send(embeds.success(user, `You set the prefix to '${matches[0]}'`));
	}
}
