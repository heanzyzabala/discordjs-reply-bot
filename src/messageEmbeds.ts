import { MessageEmbed } from 'discord.js';
import { Reply } from './entities';
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

export const list = ({ username }: User, replies: Reply[]): MessageEmbed => {
	const message = new MessageEmbed().setColor('#4caf50').setAuthor(username).setTitle('Replies:');

	if (!replies.length) {
		message.setDescription('There are none added yet.');
		return message;
	}

	replies.forEach(({ key, value }, index) => {
		message.addField(
			'# ' + index,
			`\`\`\`
key:    ${key}
value:  ${value}
\`\`\``,
		);
	});
	return message;
};

export const help = ({ username }: User): MessageEmbed => {
	return new MessageEmbed()
		.setColor('#4caf50')
		.setAuthor(username)
		.setTitle('Available commands:')
		.addFields([
			{ name: 'Add', value: '```--help add```' },
			{ name: 'List', value: '```--help list```' },
			{ name: 'Prefix', value: '```--help prefix```' },
			{ name: 'Role', value: '```--help role```' },
			{ name: 'Help', value: '```--help```' },
		]);
};
