import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Conversation } from './conversation.entity'
import { User } from './user.entity'

@Entity()
export class ConversationInfo extends BaseEntity<ConversationInfo> {
  @Column()
  conversationId: number

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation

  @Column()
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User
}
