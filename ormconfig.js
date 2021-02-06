module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'thepasswordofdoom',
	database: 'discord-reply-bot-db',
	synchronize: true,
	logging: false,
	entities: ['dist/entities/*.js'],
	migrations: [],
	subscribers: [],
};
