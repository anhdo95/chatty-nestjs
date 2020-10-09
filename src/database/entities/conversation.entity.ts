import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm'

import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Message } from './message.entity'

export enum ConversationType {
  Direct = 'DIRECT',
  Channel = 'CHANNEL',
}

@Entity()
export class Conversation extends BaseEntity<Conversation> {
  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'enum', enum: ConversationType, default: ConversationType.Direct })
  type: ConversationType

  @Column()
  ownerId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User

  @Column({ nullable: true })
  coverPhoto: string

  @Column({ nullable: true })
  lastMessageId?: number

  @OneToOne(() => Message)
  @JoinColumn({ name: 'lastMessageId' })
  lastMessage?: Message

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[]

  @ManyToMany(() => User, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'conversation_user' })
  users: User[]
}
