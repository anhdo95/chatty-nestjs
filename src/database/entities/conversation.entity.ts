import { Expose, Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum ConversationType {
  Direct = 'DIRECT',
  Channel = 'CHANNEL'
}

@Entity()
export class Conversation {
  @ObjectIdColumn()
  @Expose({ name: 'id' })
  @Transform(String, { toPlainOnly: true })
  _id: ObjectID

  @Column()
  name: string

  @Column({ type: 'enum', enum: ConversationType, default: ConversationType.Direct })
  type: ConversationType

  @Column('simple-array')
  userIds: string[]

  @Column()
  ownerId: string

  @Column({ nullable: true })
  coverPhoto: string

  @Column({ nullable: true })
  lastMessageId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<Conversation>) {
    Object.assign(this, partial)
  }
}
