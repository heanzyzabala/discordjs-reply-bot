import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'replies' })
export class Reply {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  key: string

  @Column()
  value: string

  @Column()
  options: string

  @Column()
  serverId: string
}