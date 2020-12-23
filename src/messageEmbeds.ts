import { MessageEmbed } from 'discord.js';
import { Reply } from './entities';
import { User } from './types';

export const usage = (user: User, message: string): MessageEmbed => {
  return new MessageEmbed()
    .setColor('#cddc39')
    .setAuthor(user)
    .setTitle('Invalid command')
    .addField('Usage:', '```' + message + '```');
};

export const success = (user: User, message: string): MessageEmbed => {
  return new MessageEmbed()
    .setColor('#4caf50')
    .setAuthor(user)
    .setTitle(message);
};

export const error = (): MessageEmbed => {
  return new MessageEmbed()
    .setColor('#f44336')
    .setTitle('Oof. Something went wrong')
    .setDescription(
      'If keep seeing this message, please contact the developer.'
    );
};

export const list = (user: User, replies: Reply[]): MessageEmbed => {
  const message = new MessageEmbed()
    .setColor('#4caf50')
    .setAuthor(user)
    .setTitle('Replies:');

  if (!replies) {
    message.setDescription('There are none added yet.');
    return message;
  }

  replies.forEach((reply, index) => {
    message.addField(
      `[${index}]`,
      `key: ${reply.key}` +
        `value: ${reply.value}` +
        `options: ${reply.options}`
    );
  });
  return message;
};
