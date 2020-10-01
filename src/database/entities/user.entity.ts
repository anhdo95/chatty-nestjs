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
export class User {

  @ObjectIdColumn()
  @Expose({ name: 'id' })
  @Transform(value => value.toString(), { toPlainOnly: true })
  _id: ObjectID

  @Column()
  name: string

  @Column()
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
