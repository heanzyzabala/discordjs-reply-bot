import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	Unique,
	CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'guilds' })
@Unique(['discordGuildId'])
export class Guild extends BaseEntity {
	// prettier-ignore
	constructor(discordGuildId: string, prefix: string, maxReplies: number, maxLength: number, id?: number) {
    super();
    if (id) this.id = id;
    this.discordGuildId = discordGuildId;
    this.prefix = prefix;
    this.maxReplies = maxReplies;
    this.maxLength = maxLength;
  }

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'discord_guild_id'})
	discordGuildId: string;

	@Column()
	prefix: string;

	@Column({ name: 'max_replies' })
	maxReplies: number;

	@Column({ name: 'max_length'})
	maxLength: number;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;
}
