import { TypeOrmModuleOptions } from '@nestjs/typeorm'

require('dotenv').config()

interface JwtOptions {
  secret: string
  expiresIn: string
}

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value as string
  }

  ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true))
    return this
  }

  get isProduction() {
    const mode = this.getValue('MODE', false)
    return mode !== 'DEV'
  }

  get port() {
    return this.getValue('PORT')
  }

  get domain(): string {
    return this.getValue('DOMAIN')
  }

  get basePath(): string {
    return this.getValue('BASE_PATH')
  }

  get jwt(): JwtOptions {
    return {
      secret: this.getValue('JWT_SECRET'),
      expiresIn: this.getValue('JWT_EXPIRES_IN'),
    }
  }
  
  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: Number(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [__dirname + '/../../database/entities/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/../../database/migrations/*.{ts,js}'],
      cli: {
        migrationsDir: __dirname + '/../../database/migrations',
      },

      ssl: this.isProduction,
    }
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
])

export { configService }
