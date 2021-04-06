import { Message, MessageEmbed } from 'discord.js';

import { Command } from '../classes';

import { Context } from '../../types';

export default class extends Command {
	name: string = 'donate';
	aliases: string[] = ['d'];
	usage: string = '';
	options: string[] = [];
	async execute(context: Context, _body: string, { channel }: Message): Promise<any> {
		const { user } = context;
		const embed = new MessageEmbed()
			.setColor('#4caf50')
			.setAuthor(user.username, user.avatarUrl)
			.setTitle('Do you find this bot helpful?')
			.setThumbnail('https://user-images.githubusercontent.com/16066404/77041853-a2044100-69e0-11ea-8da6-d64822a2c72a.jpg')
			.setDescription('Help me support my projects here: \nhttps://www.buymeacoffee.com/twainstar')
		return channel.send(embed);
	}
}
