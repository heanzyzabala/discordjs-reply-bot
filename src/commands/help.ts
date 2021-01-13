import { Message, MessageEmbed } from 'discord.js';
import { Command, Context } from '../types';

class Help implements Command {
	name: string = 'help';
	aliases: string[] = ['h'];
	usage: string = '--help';
	options: string[] = [];
	async execute({ user, guild }: Context, _body: string, { channel }: Message): Promise<void> {
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
				{ name: 'stats', value: `\`${prefix}stats\`` },
			])
			.addField(
				'See instructions here:',
				'https://github.com/heanzyzabala/discord-reply-bot',
				false,
			);
		channel.send(embed);
	}
}
export default new Help();
