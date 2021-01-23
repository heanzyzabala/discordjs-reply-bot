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
		maxLength: number;
		allowedRole: string;
	};
}

export interface User {
	id: string;
	username: string;
}
