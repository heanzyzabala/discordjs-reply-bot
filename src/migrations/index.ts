import { createConnections, getConnection, In } from 'typeorm';
import { Spiel } from './spiel';
import { Guild, Reply } from '../entities';

createConnections([
	{
		name: 'mongo',
		type: 'mongodb',
		host: 'localhost',
		port: 27017,
		database: 'discord_reply_bot',
		username: '',
		password: '',
		entities: [Spiel],
		synchronize: true,
		logging: false,
	},
	{
		name: 'postgres',
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		database: 'discordjs-reply-bot-db',
		username: 'postgres',
		password: 'thepasswordofdoom',
		entities: [Reply, Guild],
		synchronize: true,
		logging: false,
	},
])
	.then((v) => start())
	.catch((err) => console.error(err));

export const start = async () => {
	console.log('Migrating...');

	const mongo = getConnection('mongo');
	const postgres = getConnection('postgres');
	const spiels = await mongo.getMongoRepository(Spiel).find();

	const results = new Map<string, number>();
	const guildRepo = postgres.getRepository(Guild);
	const replyRepo = postgres.getRepository(Reply);
	for (let { guildId, mappings } of spiels) {
		const guild = await guildRepo.findOne({ guildId });
		if (!guild) {
			const newGuild = new Guild(guildId, '--', 15, 350);
			const savedGuild = await guildRepo.save(newGuild);
			results.set(guildId, 0);

			for (let { key, value, criteria } of mappings) {
				const { match, format } = criteria;
				const matchToSave = match === 'exact' ? 'PRECISE' : 'INCLUDES';
				const formatToSave = format === 'ignoreCase' ? 'IGNORE_CASE' : 'CASE_SENSITIVE';
				let replies = results.get(guildId) || 0;
				results.set(guildId, replies++);
				const newReply = await new Reply(key, value, matchToSave, formatToSave, savedGuild.id);
				await replyRepo.save(newReply);
			}
		}
	}
	console.log(`Saved ${results.keys.length}/${spiels.length} guilds`);
	const total = Array.from(results.values()).reduce((prev, cur) => cur + prev);
	console.log(`Total replies saved: ${total}`);
	process.exit(0);
};
