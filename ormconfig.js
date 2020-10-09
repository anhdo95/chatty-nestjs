require('dotenv').config()

console.log('process.env.MODE', process.env.MODE)

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['./src/database/entities/*.entity{.ts,.js}'],
  
  migrationsTableName: 'migration',
  migrations: ['./src/database/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },

  ssl: process.env.MODE !== 'DEV',
}
