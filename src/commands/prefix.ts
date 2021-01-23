import { Message } from 'discord.js';
import { Context } from '../types';
import { Guild } from '../entities';
import * as embeds from '../messageEmbeds';
import { Command } from 'src/classes';

export default class extends Command {
	name: string = 'prefix';
	aliases: string[] = ['p'];
	usage: string = '<prefix>';
	options: string[] = [];
	async execute({ user, guild }: Context, body: string, { channel }: Message): Promise<void> {
		const matches = body.match('^(.*)$');
		if (!matches) {
			channel.send(embeds.usage(user, this.usage));
			return;
		}
		const { guildId, maxReplies, maxLength, allowedRole, id } = guild;
		await new Guild(guildId, matches[0], maxReplies, maxLength, allowedRole, id).save();
		channel.send(embeds.success(user, `You set the prefix to '${matches[0]}'`));
	}
}
