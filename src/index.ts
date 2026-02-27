import chalk from "chalk";
import { checkIdeTerminal } from "./steps/checkIdeTerminal.js";
import { checkProjectRoot } from "./steps/checkProjectRoot.js";
import { checkRepoAccess } from "./steps/checkRepoAccess.js";
import { addSubmodule } from "./steps/addSubmodule.js";
import { runSetup } from "./steps/runSetup.js";

export async function runWizard() {
  console.log(
    chalk.bold.blue("\n  Fielmann AI DevKit Setup\n")
  );

  await checkIdeTerminal();
  await checkProjectRoot();
  await checkRepoAccess();
  await addSubmodule();
  await runSetup();

  console.log(
    chalk.bold.green(
      "\nAll done! The AI DevKit is set up in your project."
    )
  );
  console.log(chalk.blue("Your Cursor rules, commands, and MCP config are ready.\n"));
}
