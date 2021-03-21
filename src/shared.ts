import * as Bunyan from 'bunyan';
import { createConnection } from 'typeorm';
import { Reply, Guild } from './entities';

const createLogger = (): Bunyan => {
	const rootLogger = Bunyan.createLogger({
		name: 'discordjs-reply-bot',
		src: true,
		streams: [
			{
				level: 'info',
				path: `${process.env.LOG_ROOT_DIR}/${process.env.PROJECT_NAME}/info.log`,
			},
			{
				level: 'error',
				path: `${process.env.LOG_ROOT_DIR}/${process.env.PROJECT_NAME}/error.log`,
			},
		],
	});
	if (process.env.NODE_ENV === 'dev') {
		rootLogger.addStream({ level: 'info', stream: process.stdout });
		rootLogger.addStream({ level: 'error', stream: process.stderr });
		rootLogger.debug({}, 'Adding local log stream');
	}
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
