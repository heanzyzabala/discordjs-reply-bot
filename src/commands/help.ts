import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../classes';
import { Context } from '../types';

export default class extends Command {
	name: string = 'help';
	aliases: string[] = ['h'];
	usage: string = '--help';
	options: string[] = [];
	async execute(context: Context, _body: string, { channel }: Message): Promise<void> {
		const { user, guild } = context
		const { prefix } = guild;
		const embed = new MessageEmbed()
			.setColor('#4caf50')
			.setAuthor(user.username)
			.setDescription('Available commands:')
			.addFields([
				{ name: 'add', value: `\`${prefix}add ["key"] ["value"]\`` },
				{ name: 'remove', value: `\`${prefix}remove [index]\`` },
				{ name: 'list', value: `\`${prefix}list\`` },
				{ name: 'prefix', value: `\`${prefix}prefix [key]\`` },
				{ name: 'role', value: `\`${prefix}role [key]\`` },
			])
			.addField(
				'See instructions here:',
				'https://github.com/heanzyzabala/discord-reply-bot',
				false,
			);
		channel.send(embed);
	}
}
