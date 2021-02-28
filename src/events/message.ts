import { Message } from 'discord.js';

import { Guild } from '../entities';
import { Command, Event } from '../classes';
import { rootLogger } from '../shared';
import { Context } from '../types';
import Find from '../commands/find';

const log = rootLogger.child({})
export default class extends Event {
	find: Command = new Find(this.client, '');

	execute = async (message: Message) => {
		if (message.author.bot) return;
		if (!message.guild) return;

		let guild = await Guild.findOne({ guildId: message.guild.id });
		let context;
		if (!guild) {
			guild = await new Guild(message.guild.id, '--', 15, 350, 'ALL').save();
			context = this.createContext(message, guild);
			log.info({ ...context }, 'Added Guild');
		}
		if (!context) context = this.createContext(message, guild);

		const { prefix } = guild;
		const { content } = message;
		if (content.startsWith(prefix)) {
			const argvs = content.slice(prefix.length).split(' ');
			const command = this.getCommand(argvs.shift());
			if (command) {
				log.info({ ...context, command: command.name }, 'Executing Command');
				const body = content.slice(prefix.length + command.name.length).trim();
				return await command.execute(context, body, message);
			}
			log.info({ ...context }, 'Invalid Command');
			return;
		}
		await this.find.execute(context, content, message);
	};

	getCommand = (command: string | undefined) => {
		const commands = this.client.commandHandler;
		if (!command) return;
		return commands.get(command) || commands.array().find((cmd) => cmd.aliases.includes(command));
	};

	createContext = (message: Message, guild: Guild) => {
		const context: Context = {
			id: message.id,
			content: message.content,
			user: {
				id: message.author.id,
				username: message.author.tag,
				avatarUrl: message.author.displayAvatarURL(),
			},
			guild: {
				id: guild.id,
				guildId: guild.guildId,
				prefix: guild.prefix,
				maxReplies: guild.maxReplies,
				maxLength: guild.maxLength,
				allowedRole: guild.allowedRole,
			},
		};
		return context;
	};
}
