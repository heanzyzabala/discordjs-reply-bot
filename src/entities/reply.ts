import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';

@Entity({ name: 'replies' })
@Unique(['key', 'value', 'guildId'])
export class Reply extends BaseEntity {
	constructor(key: string, value: string, matchers: string[], guildId: number, id?: string) {
		super();
		if (id) this.id = id;
		this.key = key;
		this.value = value;
		this.matchers = matchers;
		this.guildId = guildId;
	}

	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	key: string;

	@Column()
	value: string;

	@Column('text', { array: true })
	matchers: string[];

	@Column()
	guildId: number;
}
