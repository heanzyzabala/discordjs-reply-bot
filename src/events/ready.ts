import { Event } from '../classes';
import { rootLogger } from '../shared';

const log = rootLogger.child({});
export default class extends Event {
	async execute() {
		const guildSize = this.client.guilds.cache.size;
		const memberSize = this.client.guilds.cache.map(g => g.memberCount).reduce((total, members) => total + members)
		await this.client.user?.setPresence({
			status: 'online',
			activity: {
				name: `with ${memberSize} ${guildSize} servers`,
				type: 'PLAYING',
			},
		});
		log.info({}, 'Bot Up')
	}
}
