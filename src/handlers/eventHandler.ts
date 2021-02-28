import { join } from 'path';
import { readdir } from 'fs';
import { Collection } from 'discord.js';
import { Event } from '../classes';
import ReplyBotClient from '../replyBotClient';

export default class EventHandler extends Collection<string, Event> {
	client: ReplyBotClient;

	constructor(client: ReplyBotClient) {
		super();
		this.client = client;
		this.init();
	}

	async init() {
		const path = join(__dirname, '..', 'events');
		readdir(path, (err, files) => {
			if (err) throw err;
			// prettier-ignore
			files.filter((file) => file.endsWith('.js')).forEach((fle) => {
                const Event = ((r) => r.default || r)(require(join(path, fle)));
                const event: Event = new Event(this.client, fle.replace('.js', ''));
                this.set(event.name, event);
			    this.client.on(event.name, (...args: any[]) => event.execute(...args));
			})
		});
	}
}
