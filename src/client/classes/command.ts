import Logger from 'bunyan';
import { Message } from 'discord.js';

import ReplyBotClient from '../replyBotClient';

import { Context } from '../../types';
import { rootLogger } from '../../shared';

export default class Command {
	client: ReplyBotClient;
	name: string;
	aliases: string[];
	usage: string;
	options: string[];
	log: Logger;

	// prettier-ignore
	constructor(client: ReplyBotClient, name: string, aliases: string[] = [], usage: string = '', options: string[] = []) {
        this.client = client;
        this.name = name;
        this.aliases = aliases;
        this.usage = usage;
        this.options = options;
		this.log = rootLogger.child({ command: this.name })
    }

	execute(_context: Context, _body: string, _message: Message) {
		throw new Error('Unimplemented function');
	}
}
