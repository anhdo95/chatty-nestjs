import { Expose, Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ConversationInfo {
  @ObjectIdColumn()
  @Expose({ name: 'id' })
  @Transform(String, { toPlainOnly: true })
  _id: ObjectID

  @Column()
  conversationId: string

  @Column()
  userId: string

  @CreateDateColumn()
  joinedTime: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<ConversationInfo>) {
    Object.assign(this, partial)
  }
}
