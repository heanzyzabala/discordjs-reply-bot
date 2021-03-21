import { Message, MessageEmbed } from 'discord.js';

import { Command } from '../classes';

import { Context } from '../../types';

export default class extends Command {
	name: string = 'help';
	aliases: string[] = ['h'];
	usage: string = '--help';
	options: string[] = [];
	async execute(context: Context, _body: string, { channel }: Message): Promise<void> {
		const { user, guild } = context;
		const { prefix } = guild;
		const embed = new MessageEmbed()
			.setColor('#4caf50')
			.setAuthor(user.username, user.avatarUrl)
			.setDescription('Available commands:')
			.addFields([
				{ name: 'add', value: `\`${prefix}add ["key"] ["value"]\`` },
				{ name: 'donate', value: `\`${prefix}donate\`` },
				{ name: 'help', value: `\`${prefix}help\`` },
				{ name: 'list', value: `\`${prefix}list\`` },
				{ name: 'prefix', value: `\`${prefix}prefix [key]\`` },
				{ name: 'remove', value: `\`${prefix}remove [index]\`` },
			]);
		channel.send(embed);
	}
}
