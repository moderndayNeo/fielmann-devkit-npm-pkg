#!/usr/bin/env node

import { runWizard } from "../src/index.js";

try {
  await runWizard();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`\n${message}`);
  process.exit(1);
}
