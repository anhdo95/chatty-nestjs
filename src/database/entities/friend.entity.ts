import { Expose, Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum Status {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

@Entity()
export class Friend {
  @ObjectIdColumn()
  @Expose({ name: 'id' })
  @Transform(String, { toPlainOnly: true })
  _id: ObjectID

  @Column()
  fromUserId: string

  @Column()
  toUserId: string

  @Column({ type: 'enum', enum: Status, default: Status.Follow })
  status: Status

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<Friend>) {
    Object.assign(this, partial)
  }
}
