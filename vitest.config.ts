/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
  },
  define: {
    "process.env.TESTING_API_KEY": process.env.TESTING_API_KEY,
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.DATABASE_URL": process.env.DATABASE_URL,
    'env("DATABASE_URL")': process.env.DATABASE_URL,
  },
});
