import { Client } from 'discord.js';
import { EventHandler, CommandHandler } from './handlers';

export default class extends Client {
	eventHandler = new EventHandler(this);
	commandHandler = new CommandHandler(this);
	constructor() {
		super();
		this.login(process.env.TOKEN);
	}
}
