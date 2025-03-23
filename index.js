import express from 'express';
import InfiniteCraftProxy from 'ic-proxy';
import pairEndpoint from './endpoints/pair.js';
import checkEndpoint from './endpoints/check.js';

const app = express();
const port = 3000;

app.use(express.json());

(async () => {
  const api = await InfiniteCraftProxy.create();

  pairEndpoint(app, api);
  checkEndpoint(app, api);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await api.close();
    process.exit();
  });
})();