import { existsSync } from "node:fs";
import { chmod } from "node:fs/promises";
import { join } from "node:path";
import chalk from "chalk";
import { execa } from "execa";

const SUBMODULE_DIR = ".ai-devkit";
const SETUP_SCRIPT = "ai-devkit-setup.sh";

export async function runSetup() {
  const scriptPath = join(SUBMODULE_DIR, SETUP_SCRIPT);

  if (!existsSync(scriptPath)) {
    console.log(chalk.red(`\nSetup script not found at ${scriptPath}.`));
    console.log(
      chalk.yellow(
        "Try updating the submodule: git submodule update --remote .ai-devkit\n",
      ),
    );
    process.exit(1);
  }

  await chmod(scriptPath, 0o755);

  console.log(chalk.blue("\nRunning AI DevKit setup script…\n"));

  try {
    await execa(`./${SETUP_SCRIPT}`, {
      cwd: SUBMODULE_DIR,
      stdout: "inherit",
      stderr: "inherit",
    });
  } catch {
    console.log(
      chalk.red("\nThe setup script failed. You can retry manually with:"),
    );
    console.log(chalk.cyan(`  cd ${SUBMODULE_DIR} && ./${SETUP_SCRIPT}\n`));
    process.exit(1);
  }
}
