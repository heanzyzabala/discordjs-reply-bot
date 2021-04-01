import * as Bunyan from 'bunyan';
import { createConnection } from 'typeorm';
import { Reply, Guild } from './entities';

const createLogger = (): Bunyan => {
	console.log('creating logger')
	const rootLogger = Bunyan.createLogger({
		name: 'discordjs-reply-bot',
		src: true,
		streams: [
			{
				level: 'info',
				stream: process.stdout
			},
			{
				level: 'error',
				stream: process.stderr
			},
		],
	});
	return rootLogger;
};

export const rootLogger = createLogger();

createConnection({
	name: 'default',
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '5432'),
	database: process.env.DB_NAME || 'discordjs-reply-bot-db',
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || '',
	entities: [Reply, Guild],
	synchronize: true,
	logging: false,
});
