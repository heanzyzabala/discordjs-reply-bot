import { Event } from '../classes';
import { rootLogger } from '../common';

const log = rootLogger().child({});
export default class extends Event {
	async execute() {
		const guildSize = this.client.guilds.cache.size;
		await this.client.user?.setPresence({
			status: 'online',
			activity: {
				name: `with ${guildSize} servers`,
				type: 'PLAYING',
			},
		});
		log.info({}, 'Bot Up')
	}
}
