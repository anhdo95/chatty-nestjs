import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  constructor(partial: Partial<T>) {
    Object.assign(this, partial)
  }
}
