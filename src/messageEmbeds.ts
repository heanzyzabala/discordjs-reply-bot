import { MessageEmbed } from 'discord.js';
import { User } from './types';

export const usage = (user: User, message: string) => {
  return new MessageEmbed()
    .setColor('#cddc39')
    .setAuthor(user)
    .setTitle('Invalid command')
    .addField('Usage:', '```' + message + '```');
};

export const success = (user: User, message: string) => {
  return new MessageEmbed()
    .setColor('#4caf50')
    .setAuthor(user)
    .setTitle(message);
};
