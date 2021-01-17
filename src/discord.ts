import { readdir } from 'fs';
import Discord, { PresenceData, Message, MessageReaction } from 'discord.js';

import { Command, Context } from './types';
import { Guild } from './entities';
import { constraint } from './messageEmbeds';
import Find from './commands/find';

const client = new Discord.Client();
const commands = new Discord.Collection<string, Command>();

client.on('ready', async () => {
	console.log('Loading commands ...');
	readdir(__dirname + '/commands/', (err, dirs) => {
		if (err) throw err;
		// prettier-ignore
		dirs.filter((dir) => dir.endsWith('.js')).forEach(async (d) => {
			const path = __dirname + '/commands/' + d
			const command = await import(path);
            commands.set(command.default.name, command.default);
        });
	});
	console.log('up');
	client.user?.setPresence({
		status: 'online',
		activity: {
			name: `with ${client.guilds.cache.size} servers`,
			type: 'PLAYING'
		}
	});
});

client.on('error', (err) => {
	console.log(err);
});

client.on('message', async (message: Message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	let guild = await Guild.findOne({ guildId: message.guild.id });
	if (!guild) {
		guild = await new Guild(message.guild.id, '--', 15, 350, 'ALL').save();
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
	const { prefix, allowedRole } = guild;
	const { content } = message;
	if (content.startsWith(prefix)) {
		const command = content.slice(prefix.length).split(' ')[0];
		const cmd = getCommand(command);
		if (cmd) {
			// prettier-ignore
			if (allowedRole === 'ALL' || message.member?.roles.cache.find((role) => role.name === allowedRole)) {
				const body = content.slice(prefix.length + command.length).trim();
                return await cmd.execute(context, body, message);
            }
			// prettier-ignore
			message.channel.send(constraint(context.user.username, 'Invalid role', "You're not allowed to perform this action"));
		}
		return;
	}
	await Find.execute(context, content, message);
});

client.on('messageReactionAdd', (reaction: MessageReaction) => {
	console.log(reaction);
});

const getCommand = (command: string | undefined): Command | undefined => {
	if (!command) return;
	return commands.get(command) || commands.array().find((cmd) => cmd.aliases.includes(command));
};

client.login(process.env.TOKEN);
