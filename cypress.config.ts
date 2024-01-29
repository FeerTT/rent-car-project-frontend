import { defineConfig } from "cypress";
const baseUrl = process.env.REACT_APP_URL_BASE || "http://localhost:3000";
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: baseUrl,
  },
});
