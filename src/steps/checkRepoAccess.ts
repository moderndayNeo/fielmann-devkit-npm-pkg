import { confirm } from "@inquirer/prompts";
import chalk from "chalk";

const REPO_URL = "https://github.com/fielmann-ag/ai-devkit";

export async function checkRepoAccess() {
  const hasAccess = await confirm({
    message: `Do you have access to the AI DevKit repo? (${REPO_URL})`,
    default: true,
  });

  if (!hasAccess) {
    console.log(
      chalk.yellow(
        "\nYou need access to the AI DevKit repository to continue.",
      ),
    );
    console.log(chalk.yellow("Request access by contacting:"));
    console.log(chalk.cyan("  Adam Zdrzalka — adam.zdrzalka@fielmann.com\n"));
    process.exit(0);
  }
}
