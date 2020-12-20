import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'replies' })
export class Reply extends BaseEntity {
  constructor(key: string, value: string, options: string, serverId: string) {
    super();
    this.key = key;
    this.value = value;
    this.options = options;
    this.serverId = serverId;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  value: string;

  @Column()
  options: string;

  @Column({ unique: true })
  serverId: string;
}
