import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../classes';
import { Context } from '../types';

export default class extends Command {
	name: string = 'donate';
	aliases: string[] = ['d'];
	usage: string = '<prefix>';
	options: string[] = [];
	async execute(context: Context, _body: string, { channel }: Message): Promise<any> {
		const { user } = context;
		const embed = new MessageEmbed()
			.setAuthor(user.username)
			.setDescription(
				`[Donate here!](https://donatebot.io/checkout/801438637374963772?buyer=${user.id})`,
			);
		return channel.send(embed);
	}
}
