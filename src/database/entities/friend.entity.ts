import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'

import { BaseEntity } from './base.entity'
import { User } from './user.entity'

export enum Status {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW',
}

@Entity()
export class Friend extends BaseEntity<Friend> {
  @Column()
  fromUserId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User

  @Column()
  toUserId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'toUserId' })
  toUser: string

  @Column({ type: 'enum', enum: Status, default: Status.Follow })
  status: Status
}
