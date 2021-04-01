import dotenv from 'dotenv';
dotenv.config();

import { rootLogger } from './shared';
import { getConnection } from 'typeorm';
import Client from './client/replyBotClient';

const log = rootLogger.child({});
const client = new Client();

process.on('SIGTERM', () => {
	log.info({}, 'Stopped by SIGTERM');
	// client.destroy();
	getConnection().close();
	process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
	log.error(reason, promise, `Unhandled Rejection`);
});

process.on('uncaughtException', (err) => {
	log.error(err, `Uncaught Exception: ${err.stack}`);
});
