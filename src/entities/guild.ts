import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from 'typeorm';

@Entity({ name: 'guilds' })
@Unique(['guildId'])
export class Guild extends BaseEntity {
  constructor(
    guildId: string,
    prefix: string,
    maxReplies: number,
    maxChars: number,
    id?: number
  ) {
    super();
    this.guildId = guildId;
    this.prefix = prefix;
    this.maxReplies = maxReplies;
    this.maxChars = maxChars;
    if (id) this.id = id;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;

  @Column({ default: '--' })
  prefix: string;

  @Column({ default: 15 })
  maxReplies: number;

  @Column({ default: 350 })
  maxChars: number;
}
