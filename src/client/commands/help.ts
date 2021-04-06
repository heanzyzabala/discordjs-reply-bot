import { Message, MessageEmbed } from 'discord.js';

import { Command } from '../classes';

import { Context } from '../../types';

export default class extends Command {
	name: string = 'help';
	aliases: string[] = ['h'];
	usage: string = '';
	options: string[] = [];
	async execute(context: Context, _body: string, { channel }: Message): Promise<void> {
		const { user, guild } = context;
		const { prefix } = guild;
		const embed = new MessageEmbed()
			.setColor('#4caf50')
			.setAuthor(user.username, user.avatarUrl)
			.setTitle('Available commands:')
			.addFields([
				{ name: 'add', value: `\`${prefix}add <"key"> <"value"> --ignoreCase? --includes\`` },
				{ name: 'donate', value: `\`${prefix}donate\`` },
				{ name: 'help', value: `\`${prefix}help\`` },
				{ name: 'list', value: `\`${prefix}list\`` },
				{ name: 'prefix', value: `\`${prefix}prefix <key>\`` },
				{ name: 'remove', value: `\`${prefix}remove <index>\`` },
			])
			.setDescription('You can find comprehensive guide here: https://top.gg/bot/693108033601011762')
		channel.send(embed);
	}
}
