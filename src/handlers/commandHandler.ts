import { join } from 'path';
import { readdir } from 'fs';
import { Collection } from 'discord.js';
import ReplyBotClient from 'src/replyBotClient';
import { Command } from 'src/classes';

export default class CommandHandler extends Collection<string, Command> {
	client: ReplyBotClient;

	constructor(client: ReplyBotClient) {
		super();
		this.client = client;
		this.init();
	}

	async init() {
		const path = join(__dirname, '..', 'commands');
		readdir(path, (err, files) => {
			if (err) throw err;
			// prettier-ignore
			files.filter((file) => file.endsWith('.js')).forEach((fle) => {
                const Command = ((r) => r.default || r) (require(join(path, fle)));
                const command: Command = new Command(this.client, fle.replace('.js', ''));
                this.set(command.name, command);
			})
		});
	}
}
