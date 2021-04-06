import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	Unique,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import { Guild } from './guild';

@Entity({ name: 'replies' })
@Unique(['key', 'value', 'guildId'])
export class Reply extends BaseEntity {
	// prettier-ignore
	constructor(key: string, value: string, matcher: string, formatter: string, guildId: number, id?: number) {
		super();
		if (id) this.id = id;
		this.key = key;
		this.value = value;
		this.matcher = matcher;
		this.formatter = formatter;
		this.guildId = guildId;
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	key: string;

	@Column()
	value: string;

	@Column()
	matcher: string;

	@Column()
	formatter: string;

	@ManyToOne(type => Guild, { onDelete: 'RESTRICT' })
	@JoinColumn()
	guild: Guild;

	@Column({ name: 'guild_id' })
	guildId: number;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;
}
