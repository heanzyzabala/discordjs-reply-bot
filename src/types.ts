export interface Command {
  name: string;
  aliases: string[];
  usage: string;
  options: string[];
  execute(context: Context): ExecuteCommandResponse;
}

export interface ExecuteCommandResponse {
  response: Response;
  error?: Error;
}

export interface Response {
  message?: string;
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
  body: string;
  user: User;
  server: Server;
}

export interface User {
  id: string;
}

export interface Server {
  id: string;
}
