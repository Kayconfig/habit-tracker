import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    globalSetup: ['./tests/setup/globalSetup.ts'],
    // automatically clean up after each test to ensure isolation
    clearMocks: true,
    restoreMocks: true,
    // ensure tests run sequentially to avoid database conflicts
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
