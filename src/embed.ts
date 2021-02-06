import { MessageEmbed } from 'discord.js';
import { User } from './types';

export const usage = (user: User, message: string): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#cddc39')
		.setAuthor(user.username, user.avatarUrl)
		.setTitle('Invalid command')
		.addField('Usage:', '```' + message + '```');
};

export const success = (user: User, message: string): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#4caf50')
		.setAuthor(user.username, user.avatarUrl)
		.setDescription(message);
};

export const error = (user: User, title?: string, desc?: string): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#f44336')
		.setAuthor(user.username, user.avatarUrl)
		.setTitle(title ? title : 'Oof. Something went wrong')
		.setDescription(desc ? desc : 'If keep seeing this message, please contact the developer.');
};

export const constraint = (user: User, title: string, desc: string): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#f44336')
		.setAuthor(user.username, user.avatarUrl)
		.setTitle(title)
		.setDescription(desc);
};
