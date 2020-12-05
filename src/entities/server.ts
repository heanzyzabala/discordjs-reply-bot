import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'servers' })
export class Server {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  serverId: string
}