import { Entity, Column, BaseEntity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'spiels' })
export class Spiel extends BaseEntity {
	@ObjectIdColumn()
	id: number;

	@Column({ name: 'guild_id' })
	guildId: string;

	@Column()
	mappings: Mapping[];
}
export interface Mapping {
	key: string;
	value: string;
	criteria: {
		match: string;
		format: string;
	};
}
