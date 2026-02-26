import { confirm } from "@inquirer/prompts";
import chalk from "chalk";

export async function checkProjectRoot() {
  const isRoot = await confirm({
    message: "Are you in your project's root directory?",
    default: true,
  });

  if (!isRoot) {
    console.log(
      chalk.yellow(
        "\nPlease navigate to your project's root directory and rerun:"
      )
    );
    console.log(chalk.cyan("  npx fielmann-devkit\n"));
    process.exit(0);
  }
}
