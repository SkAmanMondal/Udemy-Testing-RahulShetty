// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 40 * 1000, // Maxium time a test can run for
  expect : {
    timeout: 5000,
  },
  reporter: 'html',
  use: {

      browserName: 'chromium',
      headless: false,
      screenshot: 'on',
      trace: 'on', // Generate Traces zip for all tests
      // trace: 'retain-on-failure', // Generates Traces zip only for fail test

    
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true, // Accepts the website even its not https/SSL certified
        permissions: ['geolocation'], // Accepts if webiste wants location permission
        trace: 'on',
        // viewport: {width:720, height:720},
      }
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 14 Pro'], // Opens browser in iphone 14 pro dimensions
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'on',
        trace: 'on',
      }
    },
  ]

});

