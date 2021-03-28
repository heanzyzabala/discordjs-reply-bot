import { Message, MessageEmbed } from 'discord.js';

import * as embeds from '../embed';
import { Command } from '../classes';

import { Guild } from '../../entities';
import { Context } from '../../types';

export default class extends Command {
	name: string = 'role';
	aliases: string[] = ['r'];
	usage: string = '<role>';
	options: string[] = [];
	async execute({ user }: Context, body: string, { channel }: Message): Promise<any> {
		const embed = new MessageEmbed()
			.setColor('#f44336')
			.setAuthor(user.username, user.avatarUrl)
			.setTitle('Unavailable')
			.setDescription('Currently working on it :man_construction_worker:')
		return channel.send(embed)
	}
}
