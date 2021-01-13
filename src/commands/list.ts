import { Message, MessageEmbed } from 'discord.js';
import { Command, Context } from 'src/types';
import { Reply } from '../entities';

class List implements Command {
	name: string = 'list';
	aliases: string[] = ['l'];
	usage: string = '--list';
	options: string[] = [];
	async execute({ user, guild }: Context, _body: string, { channel }: Message): Promise<void> {
		const replies: Reply[] = await Reply.find({ guildId: guild.id });
		const embed = new MessageEmbed()
			.setColor('#4caf50')
			.setAuthor(user.username)
			.setDescription('Replies:');

		if (!replies.length) {
			embed.setDescription('There are none added yet.');
			channel.send(embed);
			return;
		}

		replies.forEach(({ key, value }, index) => {
			const emoji = this.toEmoji(index);
			embed.addField(emoji + '```' + key + '```', '```' + value + '```');
		});
		channel.send(embed);
	}

	private toEmoji(n: number): string {
		const numEmojis = [
			':zero:',
			':one:',
			':two:',
			':three:',
			':four:',
			':five:',
			':six:',
			':seven:',
			':eight:',
			':nine:',
		];
		if (n === 0) return numEmojis[0];
		let emoji = '';
		const q = Math.floor(n / 10);
		if (q >= 1) emoji += numEmojis[q];
		return (emoji += numEmojis[n % 10]);
	}
}
export default new List();
