import { existsSync } from "node:fs";
import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";

const REPO_URL = "https://github.com/fielmann-ag/ai-devkit.git";
const SUBMODULE_DIR = ".ai-devkit";

export async function addSubmodule() {
  if (existsSync(SUBMODULE_DIR)) {
    console.log(
      chalk.blue(
        `\n${SUBMODULE_DIR}/ already exists — skipping submodule add.`,
      ),
    );
    return;
  }

  const spinner = ora("Adding AI DevKit as a Git submodule…").start();

  try {
    await execa("git", ["submodule", "add", REPO_URL, SUBMODULE_DIR]);
    spinner.succeed("AI DevKit submodule added successfully.");
  } catch (err: unknown) {
    spinner.fail("Failed to add the AI DevKit submodule.");

    const error = err as { stderr?: string; message?: string };

    if (error.stderr?.includes("not a git repository")) {
      console.log(
        chalk.red(
          "\nThis directory is not a Git repository. Initialize one first with:",
        ),
      );
      console.log(chalk.cyan("  git init\n"));
    } else if (
      error.stderr?.includes("Authentication failed") ||
      error.stderr?.includes("could not read Username")
    ) {
      console.log(
        chalk.red(
          "\nAuthentication failed. Make sure you have access to the repo and that",
        ),
      );
      console.log(
        chalk.red(
          "your Git credentials (SSH key or personal access token) are configured.\n",
        ),
      );
    } else {
      console.log(chalk.red(`\n${error.stderr || error.message}\n`));
    }

    process.exit(1);
  }
}
