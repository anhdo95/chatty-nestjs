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
export class Message {
  @ObjectIdColumn()
  @Expose({ name: 'id' })
  @Transform(String, { toPlainOnly: true })
  _id: ObjectID

  @Column({ unique: true })
  conversationId: string

  @Column()
  userId: string

  @Column()
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial)
  }
}
