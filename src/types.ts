import { Message } from 'discord.js';
export interface Command {
	name: string;
	aliases: string[];
	usage: string;
	options: string[];
	execute(context: Context, body: string, message: Message): Promise<void>;
}
export interface Context {
	id: string;
	content: string;
	user: {
		id: string;
		username: string;
	};
	guild: {
		id: number;
		guildId: string;
		prefix: string;
		maxReplies: number;
		maxLength: number;
		allowedRole: string;
	};
}

export interface User {
	id: string;
	username: string;
}
