import { Message } from 'discord.js';

export interface Command {
  name: string;
  aliases: string[];
  usage: string;
  options: string[];
  execute(context: Context, body: string, message: Message): Promise<void>;
}
export interface Error {
  id: string;
  message: string;
}

export interface Option {
  name: string;
  key: string;
  required: boolean;
}

export interface Context {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
  };
  guild: {
    id: number;
    guildId: string;
    prefix: string;
    maxReplies: number;
    maxChars: number;
  };
}

export interface User {
  id: string;
  username: string;
}
