import { CollectorFilter, Message, MessageEmbed } from 'discord.js';

export default class PageableEmbed<T> extends MessageEmbed {
	private pages: T[];
	private users: string[];

	private currentPage: number;
	private message: Message;

	private onFirstPage: any;
	private onNext: any;
	private onPrevious: any;
	private onEmpty: any;

	constructor(message: Message) {
		super();
		this.pages = [];
		this.users = [];
		this.currentPage = 0;
		this.message = message;
	}

	async build() {
		if (this.pages.length === 0) {
			if (this.onEmpty) {
				const res = this.onEmpty(this);
				if (res) {
					return await this.message.channel.send(res);
				}
				return await this.message.channel.send(this);
			}
		}
		if (this.onFirstPage) {
			this.onFirstPage(this.pages, this);
		} else {
			this.setDescription(this.pages[0]);
		}
		this.updateFooter(this.currentPage + 1, this.pages.length)
		this.message = await this.message.channel.send(this);

		const nextFilter: CollectorFilter = (reaction, u) =>
			'➡️' === reaction.emoji.name && this.users.includes(u.id);
		const prevFilter: CollectorFilter = (reaction, u) =>
			'⬅️' === reaction.emoji.name && this.users.includes(u.id);
		const nextCollector = this.message.createReactionCollector(nextFilter);
		const prevCollector = this.message.createReactionCollector(prevFilter);
		nextCollector.on('collect', async (_reaction) => {
			if (this.currentPage + 1 === this.pages.length) return;
			this.currentPage = Math.min(this.currentPage + 1, this.pages.length);
			this.message.reactions.removeAll();
			await this.message.react('⬅️');
			this.message.react('➡️');

			this.updateFooter(this.currentPage + 1, this.pages.length)
			if (this.onNext) {
				const res = this.onNext(this.pages, this.currentPage, this);
				if (res) {
					return await this.message.edit(res);
				}
				return await this.message.edit(this);
			}
			return await this.message.edit(this.pages[this.currentPage]);
		});
		prevCollector.on('collect', async (_reaction) => {
			if (this.currentPage - 1 === -1) return;
			this.currentPage = Math.max(this.currentPage - 1, 0);
			this.message.reactions.removeAll();
			await this.message.react('⬅️');
			this.message.react('➡️');

			this.updateFooter(this.currentPage + 1, this.pages.length)
			if (this.onPrevious) {
				const res = this.onPrevious(this.pages, this.currentPage, this);
				if (res) {
					return await this.message.edit(res);
				}
				return await this.message.edit(this);
			}
			return await this.message.edit(this.pages[this.currentPage]);
		});
		await this.message.react('⬅️');
		this.message.react('➡️');
		return this;
	}

	updateFooter(current: number, total: number) {
		this.setFooter(
			`Pages: ${current}/${total}` +
			'\n\nNotice:' +
			'\nYou have to untoggle and toggle the buttons to navigate the pages.' +
			'\nPlease re-add the bot to your server to update the permissions to fix it:' +
			'\n\nhttps://discord.com/oauth2/authorize?client_id=693108033601011762&scope=bot&permissions=67529792'
		);		
	}

	setPages(pages: T[]) {
		this.pages = pages;
		return this;
	}

	setAllowedUsers(users: string[]) {
		this.users = users;
		return this;
	}

	setOnFirstPage(fn: (pages: T[], embed: PageableEmbed<T>) => void) {
		this.onFirstPage = fn;
		return this;
	}

	setOnNext(fn: (pages: T[], nextPage: number, embed: PageableEmbed<T>) => void) {
		this.onNext = fn;
		return this;
	}

	setOnPrevious(fn: (pages: T[], nextPage: number, embed: PageableEmbed<T>) => void) {
		this.onPrevious = fn;
		return this;
	}

	setOnEmpty(fn: (embed: PageableEmbed<T>) => void | PageableEmbed<T> | MessageEmbed) {
		this.onEmpty = fn;
		return this;
	}
}
