import { MessageEmbed } from 'discord.js';
import { User } from './types';

export const usage = ({ username }: User, message: string): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#cddc39')
		.setAuthor(username)
		.setTitle('Invalid command')
		.addField('Usage:', '```' + message + '```');
};

export const success = ({ username }: User, message: string): MessageEmbed => {
	return new MessageEmbed().setColor('#4caf50').setAuthor(username).setTitle(message);
};

export const error = (): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#f44336')
		.setTitle('Oof. Something went wrong')
		.setDescription('If keep seeing this message, please contact the developer.');
};

export const constraint = (username: string, title: string, message: string): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#f44336')
		.setAuthor(username)
		.setTitle(title)
		.setDescription(message);
};
