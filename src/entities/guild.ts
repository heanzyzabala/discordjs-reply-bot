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
    maxLength: number,
    id?: number
  ) {
    super();
    this.guildId = guildId;
    this.prefix = prefix;
    this.maxReplies = maxReplies;
    this.maxLength = maxLength;
    if (id) this.id = id;
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
}
