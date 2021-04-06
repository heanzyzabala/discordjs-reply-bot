import { Event } from '../classes';

import { rootLogger } from '../../shared';
import { PresenceData } from 'discord.js';

const log = rootLogger.child({});
export default class extends Event {
	async execute() {
		this.setPresence();
		log.info({}, 'Bot Up');
	}

	setPresence() {
		const precenseOptions = [
			() => {
				const guildSize = this.client.guilds.cache.size;
				return {
					status: 'online',
					activity: {
						name: `with ${guildSize} servers`,
						type: 'PLAYING',
					},
				} as PresenceData;
			},
			() => {
				const memberSize = this.client.guilds.cache
					.map((g) => g.memberCount)
					.reduce((total, members) => total + members);
				return {
					status: 'online',
					activity: {
						name: `with ${memberSize} users`,
						type: 'PLAYING',
					},
				} as PresenceData;
			},
			() => {
				return {
					status: 'online',
					activity: {
						name: '--help for help',
						type: 'PLAYING',
					},
				} as PresenceData;
			},			
		];
		let index = 0;
		setInterval(async () => {
			index = index + 1 === precenseOptions.length ? 0 : index + 1;
			await this.client.user!.setPresence(precenseOptions[index]());
		}, 1000 * 60 * 2);
	}
}
