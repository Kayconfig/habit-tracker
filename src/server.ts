import { createServer } from 'http';
import app from './app.ts';
import { getEnv } from './env/index.ts';

function bootStrap() {
  const server = createServer(app);
  const port = getEnv('PORT');
  server.listen(port, () => {
    console.info(`server running on port ${port}`);
  });

  process.on('uncaughtException', (e) => {
    console.error(e);
    console.log('safely shutting down server');
    server.close();
  });
  process.on('SIGTERM', () => {
    console.info('safely shutting down server');
    server.close();
  });
}

bootStrap();
