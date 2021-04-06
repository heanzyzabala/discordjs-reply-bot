import { Message } from 'discord.js';

import { Command } from '../classes';
import PageableEmbed from '../lib/pageableEmbed';

import { Context } from '../../types';
import { Reply } from '../../entities';

export default class extends Command {
	name: string = 'list';
	aliases: string[] = ['l'];
	usage: string = '';
	options: string[] = [];
	async execute({ user, guild }: Context, _body: string, message: Message): Promise<any> {
		const replies = await Reply.find({ guildId: guild.id });
		replies.sort((a, b) => a.id - b.id);
		const pages = this.generatePages(replies);
		return await new PageableEmbed<string>(message)
			.setAuthor(user.username, user.avatarUrl)
			.setTitle('Replies: \u200b')
			.setColor('#4caf50')
			.setPages(pages)
			.setOnEmpty((embed) => {
				embed.setDescription('There are none added yet.');
			})
			.setOnFirstPage((pages, embed) => {
				embed.setDescription(pages[0]);
			})
			.setOnNext((pages, nextPage, embed) => {
				embed.setDescription(pages[nextPage]);
			})
			.setOnPrevious((pages, previousPage, embed) => {
				embed.setDescription(pages[previousPage]);
			})
			.setAllowedUsers([user.userId])
			.build();
	}

	private generatePages(replies: Reply[]): string[] {
		const pages = [];
		let page = '';
		for (let i = 0; i < replies.length; i++) {
			const { key, value, matcher, formatter } = replies[i];
			const emoji = this.toEmoji(i);
			let entry = '';
			entry += emoji + '\n';
			entry += '```' + '\n';
			entry += 'KEY: ' + key + '\n\n';
			entry += 'VALUE: ' + value + '\n\n';
			entry += 'MATCHER: ' + matcher + '\n\n';
			entry += 'FORMATTER: ' + formatter + '\n';
			entry += '```\n';
			page += entry;
			if (page.length + entry.length > 2000 || (i + 1) % 4 == 0 || i === replies.length - 1) {
				pages.push(page);
				page = '';
			}
		}
		return pages;
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
