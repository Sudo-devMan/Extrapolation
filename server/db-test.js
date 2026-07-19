import 'dotenv/config'
import { Client } from "pg"

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()import 'dotenv/config'
import { Client } from "pg"

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => {
    console.log("✅ Connected!");
    return client.end();
  })
  .catch(console.error);
  .then(() => {
    console.log("✅ Connected!");
    return client.end();
  })
  .catch(console.error);