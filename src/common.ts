import * as Bunyan from 'bunyan';

const rootLogger = (): Bunyan => {
	const logger = Bunyan.createLogger({
		name: 'discord-reply-bot',
		streams: [
			{
				level: 'info',
				path: '/var/log/discordjs-reply-bot/info.log',
			},
			{
				level: 'error',
				path: '/var/log/discordjs-reply-bot/error.log',
			},
		],
	});

	if (process.env.NODE_ENV === 'dev') {
		logger.addStream({ level: 'info', stream: process.stdout });
		logger.addStream({ level: 'error', stream: process.stderr });
		logger.info('Adding dev log stream');
	}
	return logger;
};
export { rootLogger };
