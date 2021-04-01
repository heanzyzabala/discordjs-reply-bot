export interface Context {
	messageId: string;
	content: string;
	user: User;
	guild: Guild;
}
export interface User {
	userId: string;
	username: string;
	avatarUrl: string;
}

export interface Guild {
	id: number;
	discordGuildId: string;
	prefix: string;
	maxReplies: number;
	maxLength: number;
}
