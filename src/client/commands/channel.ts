import { Message } from 'discord.js';

import * as embeds from '../embed';
import { Command } from '../classes';

import { Context } from '../../types';
import { Guild } from '../../entities';

export default class extends Command {
	name: string = 'channel';
	aliases: string[] = ['c'];
	usage: string = '<channel>';
	options: string[] = [];
	async execute(context: Context, body: string, { channel }: Message): Promise<any> {}
}
