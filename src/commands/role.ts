import { Message } from 'discord.js';
import { Context } from '../types';
import { Guild } from '../entities';
import * as embeds from '../messageEmbeds';
import { Command } from 'src/classes';

export default class extends Command {
	name: string = 'role';
	aliases: string[] = ['r'];
	usage: string = '<role>';
	options: string[] = [];
	async execute({ user, guild }: Context, body: string, { channel }: Message): Promise<void> {
		const matches = body.match('^(.*)$');
		if (!matches) {
			channel.send(embeds.usage(user, this.usage));
			return;
		}
		const { guildId, maxReplies, maxLength, prefix, id } = guild;
		await new Guild(guildId, prefix, maxReplies, maxLength, matches[0], id).save();
		channel.send(embeds.success(user, `You set the role to '${matches[0]}'`));
	}
}
