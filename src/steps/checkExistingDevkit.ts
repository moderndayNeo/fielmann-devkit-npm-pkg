import { existsSync } from "node:fs";
import { confirm } from "@inquirer/prompts";
import chalk from "chalk";

export type WizardAction = "update" | "setup" | "exit";

const SUBMODULE_DIR = ".ai-devkit";

export async function checkExistingDevkit(): Promise<WizardAction> {
  if (!existsSync(SUBMODULE_DIR)) {
    return "setup";
  }

  console.log(chalk.blue(`\nDetected existing ${SUBMODULE_DIR}/ directory.\n`));

  const shouldUpdate = await confirm({
    message: "AI DevKit is already installed. Would you like to update it?",
    default: true,
  });

  return shouldUpdate ? "update" : "exit";
}
