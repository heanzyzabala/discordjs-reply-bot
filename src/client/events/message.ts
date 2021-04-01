import { Message } from 'discord.js';

import Find from '../commands/find';
import { Command, Event } from '../classes';

import { Guild } from '../../entities';
import { rootLogger } from '../../shared';
import { Context } from '../../types';

const log = rootLogger.child({});
export default class extends Event {
	find: Command = new Find(this.client, '');

	execute = async (message: Message) => {
		if (message.author.bot) return;
		if (!message.guild) return;

		let guild = await Guild.findOne({ discordGuildId: message.guild.id });
		let context;
		if (!guild) {
			guild = await new Guild(message.guild.id, '--', 15, 350).save();
			context = this.createContext(message, guild);
			log.info({ ...context }, 'Added Guild');
		}
		if (!context) context = this.createContext(message, guild);

		const { prefix } = guild;
		const { content } = message;
		if (content.startsWith(prefix)) {
			const argvs = content.slice(prefix.length).split(' ');
			const cmdString = argvs.shift();
			const command = this.getCommand(cmdString);
			if (command) {
				log.info({ ...context, command: command.name }, 'Executing Command');
				const body = content.slice(prefix.length + cmdString!.length).trim();
				return await command.execute(context, body, message);
			}
			log.info({ ...context, command: cmdString }, 'Invalid Command');
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
			messageId: message.id,
			content: message.content,
			user: {
				userId: message.author.id,
				username: message.author.tag,
				avatarUrl: message.author.displayAvatarURL(),
			},
			guild: {
				id: guild.id,
				discordGuildId: guild.discordGuildId,
				prefix: guild.prefix,
				maxReplies: guild.maxReplies,
				maxLength: guild.maxLength,
			},
		};
		return context;
	};
}
