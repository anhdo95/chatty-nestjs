import * as bcrypt from 'bcrypt'

export class PasswordUtil {
  static hash(value: string): string {
    const saltRounds = 10
    return bcrypt.hashSync(value, saltRounds)
  }

  static compare(plainPassword: string, hash: string): boolean {
    return bcrypt.compareSync(plainPassword, hash)
  }
}
