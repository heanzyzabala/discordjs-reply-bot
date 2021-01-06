import discord, { Message } from 'discord.js';

import { error, constraint } from './messageEmbeds';
import { Command, Context } from './types';
import { commands, Find } from './commands';
import { Guild } from './entities';

const client = new discord.Client();
client.on('ready', async () => {
	console.log('up');
});
client.on('error', (err) => {
	console.log(err);
});

client.on('message', async (message: Message) => {
	try {
		if (message.author.bot) return;
		const { content, guild: discordGuild, member } = message;
		if (!discordGuild || !member) {
			return message.channel.send(error());
		}
		let guild = await Guild.findOne({ guildId: discordGuild.id });
		if (!guild) {
			guild = await new Guild(discordGuild.id, '--', 15, 350, 'ALL').save();
		}
		const context: Context = {
			id: message.id,
			content: message.content,
			user: {
				id: message.author.id,
				username: message.author.tag,
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
		const prefix = guild.prefix;
		if (content.slice(0, prefix.length) === prefix) {
			const commandName = content.slice(prefix.length).split(' ', 1)[0];
			const command = get(commandName);
			if (command) {
				const role = context.guild.allowedRole;
				if (role === 'ALL' || member.roles.cache.find((r) => r.name === role)) {
					const body = content.slice(prefix.length + commandName.length).trim();
					return await command.execute(context, body, message);
				} else {
					message.channel.send(
						constraint(
							context.user,
							'Invalid role',
							"You don't have permission to perform this action.",
						),
					);
				}
			}
		} else {
			return await Find.execute(context, context.content, message);
		}
	} catch (err) {
		console.log(err);
		message.channel.send(error());
	}
});
const get = (commandName: string): Command | undefined => {
	return commands.find((c) => c.name === commandName || c.aliases.includes(commandName));
};
client.login(process.env.TOKEN);
