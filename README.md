# fielmann-devkit

Interactive CLI to set up the [Fielmann AI DevKit](https://github.com/fielmann-ag/ai-devkit) in your project with a single command.

## Usage

```bash
npx fielmann-devkit
```

The wizard will:

1. Confirm you are in your project's root directory
2. Verify you have access to the AI DevKit repository
3. Add the AI DevKit as a Git submodule (`.ai-devkit/`)
4. Run the setup script to copy Cursor rules, commands, and MCP configuration into your `.cursor/` directory

## Prerequisites

- **Node.js** >= 18
- **Git** installed and available on your PATH
- **GitHub access** to [fielmann-ag/ai-devkit](https://github.com/fielmann-ag/ai-devkit) (request access from adam.zdrzalka@fielmann.com if needed)

## What gets set up

After running the wizard, your project will have:

```
your-project/
├── .ai-devkit/                  # Git submodule (AI DevKit source)
├── .cursor/
│   ├── rules/general-use/       # Cursor rules from AI DevKit
│   ├── rules/project-specific/  # Your own project rules (untouched)
│   ├── commands/general-use/    # Commands from AI DevKit
│   ├── commands/project-specific/ # Your own project commands (untouched)
│   └── mcp.json                 # MCP server configuration (if not already present)
└── [your project files]
```

## Updating the AI DevKit

To pull the latest updates after initial setup:

```bash
cd .ai-devkit
./ai-devkit-update.sh
```

## License

MIT
