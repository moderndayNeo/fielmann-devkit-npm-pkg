import chalk from "chalk";
import { addSubmodule } from "./steps/addSubmodule.js";
import { checkExistingDevkit } from "./steps/checkExistingDevkit.js";
import { checkIdeTerminal } from "./steps/checkIdeTerminal.js";
import { checkProjectRoot } from "./steps/checkProjectRoot.js";
import { checkRepoAccess } from "./steps/checkRepoAccess.js";
import { runSetup } from "./steps/runSetup.js";
import { runUpdate } from "./steps/runUpdate.js";

export async function runWizard() {
  console.log(chalk.bold.blue("\n  Fielmann AI DevKit Setup\n"));

  await checkIdeTerminal();
  await checkProjectRoot();

  const action = await checkExistingDevkit();

  if (action === "exit") {
    console.log(chalk.blue("\nNo changes made. Goodbye!\n"));
    return;
  }

  if (action === "update") {
    await runUpdate();

    console.log(
      chalk.bold.green("\nAll done! The AI DevKit has been updated."),
    );
    console.log(
      chalk.blue(
        "Your Cursor rules, commands, and MCP config are up to date.\n",
      ),
    );
    return;
  }

  await checkRepoAccess();
  await addSubmodule();
  await runSetup();

  console.log(
    chalk.bold.green("\nAll done! The AI DevKit is set up in your project."),
  );
  console.log(
    chalk.blue("Your Cursor rules, commands, and MCP config are ready.\n"),
  );
}
