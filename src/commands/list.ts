import { CollectorFilter, Message, MessageEmbed } from 'discord.js';
import { Command, Context } from 'src/types';
import { Reply } from '../entities';

class List implements Command {
	name: string = 'list';
	aliases: string[] = ['l'];
	usage: string = '--list';
	options: string[] = [];
	async execute({ user, guild }: Context, _body: string, { channel }: Message): Promise<void> {
		const replies = await Reply.find({ guildId: guild.id });
		if (!replies.length) {
			const embed = new MessageEmbed()
				.setColor('#4caf50')
				.setAuthor(user.username)
				.setDescription('There are none added yet.');
			channel.send(embed);
			return;
		}
		const pages: any[] = [];
		let page = '';
		for (let i = 0; i < replies.length; i++) {
			const { key, value } = replies[i];
			const emoji = this.toEmoji(i);
			let entry = '';
			entry += emoji + '\n';
			entry += '```' + '\n';
			entry += 'KEY: \n' + key + '\n\n';
			entry += 'VALUE: \n' + value + '\n';
			entry += '```\n';
			page += entry;
			if (page.length + entry.length > 2000 || (i + 1) % 4 == 0 || i === replies.length - 1) {
				pages.push(page);
				page = '';
			}
		}

		let currentPage = 0;
		const afterMessage = await channel.send(this.getEmbed(pages, currentPage));
		const nextFilter: CollectorFilter = (reaction, u) =>
			'➡️' === reaction.emoji.name && u.id === user.id;
		const prevFilter: CollectorFilter = (reaction, u) =>
			'⬅️' === reaction.emoji.name && u.id === user.id;
		const nextCollector = afterMessage.createReactionCollector(nextFilter);
		const prevCollector = afterMessage.createReactionCollector(prevFilter);
		nextCollector.on('collect', async (_reaction) => {
			if (currentPage + 1 === pages.length) return;
			currentPage = Math.min(currentPage + 1, pages.length);
			afterMessage.reactions.removeAll();
			await afterMessage.react('⬅️');
			await afterMessage.react('➡️');
			afterMessage.edit(this.getEmbed(pages, currentPage));
		});
		prevCollector.on('collect', async (_reaction) => {
			if (currentPage - 1 === -1) return;
			currentPage = Math.max(currentPage - 1, 0);
			afterMessage.reactions.removeAll();
			await afterMessage.react('⬅️');
			await afterMessage.react('➡️');
			afterMessage.edit(this.getEmbed(pages, currentPage));
		});
		await afterMessage.react('⬅️');
		await afterMessage.react('➡️');
	}

	private getEmbed(pages: string[], page: number): MessageEmbed {
		return new MessageEmbed()
			.setColor('#4caf50')
			.setDescription(pages[page])
			.setFooter(`Pages: ${page + 1}/${pages.length} Length: ${pages[page].length}`);
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
