import express from 'express';
import InfiniteCraftProxy from 'ic-proxy';
import { Pool } from 'pg';
import pairEndpoint from './endpoints/pair.js';
import checkEndpoint from './endpoints/check.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async () => {
  const api = await InfiniteCraftProxy.create();

  pairEndpoint(app, api, pool);
  checkEndpoint(app, api, pool);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await api.close();
    await pool.end();
    process.exit();
  });
})();