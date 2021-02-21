import * as Bunyan from 'bunyan';

export const createLogger = (): Bunyan => {
	const rootLogger = Bunyan.createLogger({
		name: 'discordjs-reply-bot',
		src: true,
		streams: [
			{
				level: 'info',
				path: process.env.LOG_ROOT_DIR + '/discordjs-reply-bot/info.log',
			},
			{
				level: 'error',
				path: process.env.LOG_ROOT_DIR + '/discordjs-reply-bot/error.log',
			},
		]
	})
	if (process.env.NODE_ENV === 'dev') {
		rootLogger.addStream({ level: 'info', stream: process.stdout });
		rootLogger.addStream({ level: 'error', stream: process.stderr });
		rootLogger.debug({}, 'Adding local log stream')
	}
	return rootLogger;
}