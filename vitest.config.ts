// Vitest runner configuration for Checkpoint contract & domain suites
import { defineConfig as configureTestSuite } from 'vitest/config';

export default configureTestSuite({
  test: {
    environment: 'node',
    include: [
      'tests/contract/**/*.test.ts',
      'tests/domain/**/*.test.ts'
    ],
    globals: false
  }
});
