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
  user: User;
  guild: Guild;
}

export interface User {
  id: string;
}

export interface Guild {
  id: string;
}
