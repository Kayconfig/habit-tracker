import { createServer } from 'http';
import { getEnv } from '../env.ts';
import app from './app.ts';

function bootStrap() {
  const server = createServer(app);
  const port = getEnv('PORT');
  server.listen(port, () => {
    console.info(`server running on port ${port}`);
  });
}

bootStrap();
