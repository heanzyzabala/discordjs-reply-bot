import { Message, MessageEmbed } from 'discord.js';

import { Command } from '../classes';

import { Context } from '../../types';

export default class extends Command {
	name: string = 'channel';
	aliases: string[] = ['c'];
	usage: string = '<channel>';
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
