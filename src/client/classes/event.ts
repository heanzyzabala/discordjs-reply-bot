import ReplyBotClient from '../replyBotClient';

export default class Event {
	client: ReplyBotClient;
	name: string;

	constructor(client: ReplyBotClient, name: string) {
		this.client = client;
		this.name = name;
	}

	execute(..._args: any[]) {
		throw new Error('Unimplemented function.');
	}
}
