
import { DataSource } from "typeorm"
import User from './entities/User.js'
import Paper from './entities/Paper.js'
import Document from './entities/Document.js'

const localConfig = {
  type: 'better-sqlite3',
  database: 'db.sqlite',
  synchronize: true,
  logging: false
}

// will use reaL DB from neon.com (This is just a placeholder and it is not used in any way, for now)
const productionConfig = {
  type: 'pg',
  host: 'localhost',
  port: 5432,
  username: 'devman',
  password: 'password',
  database: 'polation'
}

export const dataSource = new DataSource({
  ...(process.env.NODE_ENV === 'production' ? productionConfig : localConfig),
  entities: [User, Paper, Document],
})

export const getRepo = (schema) => dataSource.getRepository(schema)
export const userRepo = getRepo(User)
export const paperRepo = getRepo(Paper)
export const docRepo = getRepo(Document)

