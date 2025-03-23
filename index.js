// Imports
import express from 'express';
import InfiniteCraftProxy from 'ic-proxy';
import pkg from 'pg';
const { Pool } = pkg;
import pairEndpoint from './endpoints/pair.js';
import checkEndpoint from './endpoints/check.js';
import dotenv from 'dotenv';
dotenv.config();

// Set up express
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Set ip db
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async () => {
  // Create IC api connection
  const api = await InfiniteCraftProxy.create();

  // Set up endpoints
  pairEndpoint(app, api, pool);
  checkEndpoint(app, api, pool);

  // Start server
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // Handle shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await api.close();
    await pool.end();
    process.exit();
  });
})();