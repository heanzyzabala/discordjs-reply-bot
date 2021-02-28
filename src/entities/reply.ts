import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	Unique,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'replies' })
@Unique(['key', 'value', 'guildId'])
export class Reply extends BaseEntity {
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

	@Column()
	guildId: number;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
