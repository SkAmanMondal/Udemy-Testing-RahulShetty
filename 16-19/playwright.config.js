// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect : {
    timeout: 5000,
  },
  reporter: 'html',
    use: {

      browserName: 'chromium',
      workers: 3,
      headless: false,
      screenshot: 'on',
      trace: 'on', // Generate Traces zip for all tests
      // trace: 'retain-on-failure', // Generates Traces zip only for fail test

    
  },

});

