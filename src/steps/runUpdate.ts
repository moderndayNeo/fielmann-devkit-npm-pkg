import { existsSync } from "node:fs";
import { chmod } from "node:fs/promises";
import { join } from "node:path";
import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";

const SUBMODULE_DIR = ".ai-devkit";
const UPDATE_SCRIPT = "ai-devkit-update.sh";

export async function runUpdate() {
  const spinner = ora("Pulling latest AI DevKit submodule…").start();

  try {
    await execa("git", ["submodule", "update", "--remote", SUBMODULE_DIR]);
    spinner.succeed("AI DevKit submodule updated to latest.");
  } catch (err: unknown) {
    spinner.fail("Failed to update the AI DevKit submodule.");

    const error = err as { stderr?: string; message?: string };
    console.log(chalk.red(`\n${error.stderr || error.message}\n`));
    process.exit(1);
  }

  const scriptPath = join(SUBMODULE_DIR, UPDATE_SCRIPT);

  if (!existsSync(scriptPath)) {
    console.log(chalk.red(`\nUpdate script not found at ${scriptPath}.`));
    console.log(
      chalk.yellow(
        "The submodule was updated, but the update script is missing.\n",
      ),
    );
    process.exit(1);
  }

  await chmod(scriptPath, 0o755);

  console.log(chalk.blue("\nRunning AI DevKit update script…\n"));

  try {
    await execa(`./${UPDATE_SCRIPT}`, {
      cwd: SUBMODULE_DIR,
      stdout: "inherit",
      stderr: "inherit",
    });
  } catch {
    console.log(
      chalk.red("\nThe update script failed. You can retry manually with:"),
    );
    console.log(chalk.cyan(`  cd ${SUBMODULE_DIR} && ./${UPDATE_SCRIPT}\n`));
    process.exit(1);
  }
}
