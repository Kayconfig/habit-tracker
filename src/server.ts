import { createServer } from 'http';
import app from './app.ts';
import { getEnv } from './env/index.ts';

function bootStrap() {
  const server = createServer(app);
  const port = getEnv('PORT');
  server.listen(port, () => {
    console.info(`server running on port ${port}`);
  });
}

bootStrap();
