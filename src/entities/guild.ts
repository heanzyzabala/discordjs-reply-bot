import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'guilds' })
export class Guild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guildId: string;
}
