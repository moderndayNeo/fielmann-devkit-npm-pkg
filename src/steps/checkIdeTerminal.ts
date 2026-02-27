import { confirm } from "@inquirer/prompts";
import chalk from "chalk";

export async function checkIdeTerminal() {
  console.log(
    chalk.yellow(
      "Note: Please run this command from the integrated terminal inside your IDE",
    ),
  );
  console.log(
    chalk.yellow(
      "(Cursor or VS Code). Git may prompt you to sign in to GitHub via an IDE popup.\n",
    ),
  );

  const isIdeTerminal = await confirm({
    message: "Are you running this in your IDE's integrated terminal?",
    default: true,
  });

  if (!isIdeTerminal) {
    console.log(
      chalk.yellow(
        "\nPlease open your IDE's integrated terminal (Ctrl+` / Cmd+`) and rerun:",
      ),
    );
    console.log(chalk.cyan("  npx fielmann-devkit\n"));
    process.exit(0);
  }
}
