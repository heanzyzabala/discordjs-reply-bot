import { Client } from 'discord.js';
import { getConnection } from 'typeorm';
import { EventHandler, CommandHandler } from './handlers';
import { rootLogger } from './shared';

const log = rootLogger.child({})
export default class extends Client {
	eventHandler = new EventHandler(this);
	commandHandler = new CommandHandler(this);
	constructor() {
		super();
		this.login(process.env.TOKEN);

		process.on('SIGTERM', () => {
			log.info({}, 'Stopped by SIGTERM');
			this.destroy();
			getConnection().close();
		});

		process.on('unhandledRejection', (reason, promise) => {
			log.error({ err: reason, promise }, 'Unhandled Rejection');
		});

		process.on('uncaughtException', (err) => {
			log.error({ err }, 'Uncaught Exception');
		})
	}
}
