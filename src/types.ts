export interface Context {
	id: string;
	content: string;
	user: User;
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
	avatarUrl: string;
}