// prisma.config.ts (at the project root)

import { defineConfig, env } from "prisma/config";
import "dotenv/config"; // Important: This loads your .env file for the CLI

export default defineConfig({
  // Tells the CLI where your schema file is
  schema: "prisma/schema.prisma",

  // REQUIRED: This section tells the CLI where to find the connection URL for migrations
  datasource: {
    url: env("DIRECT_URL"),
  },

  // Optional: Define where migrations are stored
  migrations: {
    path: "prisma/migrations",
  },
});