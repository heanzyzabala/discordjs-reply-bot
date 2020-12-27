import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from 'typeorm';

@Entity({ name: 'replies' })
@Unique(['key', 'value', 'guildId'])
export class Reply extends BaseEntity {
  constructor(
    key: string,
    value: string,
    options: string,
    guildId: number,
    id?: string
  ) {
    super();
    if (id) this.id = id;
    this.key = key;
    this.value = value;
    this.options = options;
    this.guildId = guildId;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  options: string;

  @Column()
  guildId: number;
}
