import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'

import { BaseEntity } from './base.entity'
import { User } from './user.entity'
import { Conversation } from './conversation.entity'

@Entity()
export class Message extends BaseEntity<Message> {
  @Column()
  conversationId: number

  @ManyToOne(() => Conversation, conversation => conversation.messages)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation

  @Column({ type: 'int4', nullable: true })
  userId?: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column()
  content: string
}
