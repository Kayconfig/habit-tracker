import { createServer } from 'http';
import { getEnv, initializeEnv } from '../env.ts';
import app from './app.ts';

function bootStrap() {
  initializeEnv(process.env);
  const server = createServer(app);
  const port = getEnv('PORT');
  server.listen(port, () => {
    console.info(`server running on port ${port}`);
  });
}

bootStrap();
