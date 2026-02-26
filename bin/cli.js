#!/usr/bin/env node

import { runWizard } from "../src/index.js";

try {
  await runWizard();
} catch (error) {
  console.error(`\n${error.message || error}`);
  process.exit(1);
}
