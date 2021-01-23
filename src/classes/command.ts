import { Message } from 'discord.js';
import { Context } from 'src/types';
import ReplyBotClient from '../replyBotClient';

export default class Command {
	client: ReplyBotClient;
	name: string;
	aliases: string[];
	usage: string;
	options: string[];

	// prettier-ignore
	constructor(client: ReplyBotClient, name: string, aliases: string[] = [], usage: string = '', options: string[] = []) {
        this.client = client;
        this.name = name;
        this.aliases = aliases;
        this.usage = usage;
        this.options = options;
    }

	execute(_context: Context, _body: string, _message: Message) {
		throw new Error('Unimplemented function');
	}
}
