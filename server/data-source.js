
import { DataSource } from "typeorm"
import User from './entities/User.js'
import Paper from './entities/Paper.js'
import Document from './entities/Document.js'
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const localConfig = {
  type: 'better-sqlite3',
  database: 'db.sqlite',
  synchronize: true,
  logging: false
}

const productionConfig = {
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  logging: false,
  migrations: [__dirname + "/migrations/*{.js,.ts}"]
}

export const dataSource = new DataSource({
  ...(process.env.NODE_ENV === 'production' ? productionConfig : localConfig),
  entities: [User, Paper, Document],
})

export const getRepo = (schema) => dataSource.getRepository(schema)
export const userRepo = getRepo(User)
export const paperRepo = getRepo(Paper)
export const docRepo = getRepo(Document)

