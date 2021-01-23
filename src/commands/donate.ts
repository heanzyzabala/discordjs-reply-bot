import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'src/classes';
import { Context } from '../types';

export default class extends Command {
	name: string = 'donate';
	aliases: string[] = ['d'];
	usage: string = '<prefix>';
	options: string[] = [];
	async execute({ user, guild }: Context, body: string, { channel }: Message): Promise<void> {
		const embed = new MessageEmbed()
			.setAuthor(user.username)
			.setDescription(
				`[Donate here!](https://donatebot.io/checkout/801438637374963772?buyer=${user.id})`,
			);
		channel.send(embed);
	}
}
