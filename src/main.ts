import { readdir } from 'fs';
import { Client, Collection } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

import './db';
import './discord';

import { Command } from './types';

export class Main extends Client {
	commands: Collection<string, Command>;
	constructor() {
		super();
		this.commands = new Collection();
		console.log('Loading commainds.');
		readdir(__dirname + '/commands/', (err, dirs) => {
			if (err) throw err;
			// prettier-ignore
			dirs.filter((dir) => dir.endsWith('add.js')).forEach(async (d) => {
                const path = __dirname + '/commands/' + d
                const command: Command = await import(path)
                this.commands.set(command.name, command);
            });
		});
		console.log('Loading events.');
		readdir(__dirname + '/events/', (err, dirs) => {
			if (err) throw err;
			// prettier-ignore
			dirs.filter((dir) => dir.endsWith('.js')).forEach(async (d) => {
				const path = __dirname + '/events/' + d
				const event = await import(path)
				this.on(event.name, async (...args) => await event.execute(...args))
            });
		});
		this.on('err', (err) => console.log(err));
		this.login(process.env.TOKEN);
	}
}

export default new Main();
