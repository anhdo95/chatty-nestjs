import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
} from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity()
export class User extends BaseEntity<User> {
  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string

  @Exclude()
  @Column({ type: 'varchar' })
  password: string
}
