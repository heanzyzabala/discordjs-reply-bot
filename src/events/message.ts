import { Message } from 'discord.js';
import { Guild } from '../entities';
import { Event } from '../classes';

export default class extends Event {
	async execute(message: Message) {
		if (message.author.bot) return;
		if (!message.guild) return;

		let guild = await Guild.findOne({ guildId: message.guild.id });
		if (!guild) {
			guild = await new Guild(message.guild.id, '--', 15, 350, 'ALL').save();
		} else {
			console.log('guild exists, skipping');
		}
	}
}
