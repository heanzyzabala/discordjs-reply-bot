import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'guilds' })
export class Guild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;

  @Column({ default: '--' })
  prefix: string;

  @Column({ default: 15 })
  maxReplies: number;

  @Column({ default: 300 })
  maxChars: number;
}
