import { Message, MessageEmbed } from 'discord.js';

import { Command } from '../classes';

import { Context } from '../../types';

export default class extends Command {
	name: string = 'donate';
	aliases: string[] = ['d'];
	usage: string = '<prefix>';
	options: string[] = [];
	async execute(context: Context, _body: string, { channel }: Message): Promise<any> {
		const { user } = context;
		const embed = new MessageEmbed()
			.setColor('#4caf50')
			.setAuthor(user.username, user.avatarUrl)
			.setDescription('If you want to support:')
			.addFields([
				{ name: '/', value: 'Join the Official Server and type ".donate" in the donation channel' },
			]);
		return channel.send(embed);
	}
}
