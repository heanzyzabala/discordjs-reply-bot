import dotenv from 'dotenv';
dotenv.config();

import { getConnection } from 'typeorm';
import { rootLogger } from './shared';

import Client from './client/replyBotClient';

const log = rootLogger.child({});
const client = new Client();

// console.log('logging in');
// console.log(process.env.TOKEN);
// const client = new Client();
// client.on('ready', () => console.log('hmm'));
// (async () => await client.login(process.env.TOKEN))();

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
