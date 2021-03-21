import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	Unique,
	CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'guilds' })
@Unique(['guildId'])
export class Guild extends BaseEntity {
	// prettier-ignore
	constructor(guildId: string, prefix: string, maxReplies: number, maxLength: number, id?: number) {
    super();
    if (id) this.id = id;
    this.guildId = guildId;
    this.prefix = prefix;
    this.maxReplies = maxReplies;
    this.maxLength = maxLength;
  }

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	guildId: string;

	@Column()
	prefix: string;

	@Column()
	maxReplies: number;

	@Column()
	maxLength: number;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@CreateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
