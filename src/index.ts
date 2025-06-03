import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { logger } from "./config";
import serverTools from "./tools";
import { serverPrompts } from "./prompts/serverPrompts";

const server = new McpServer({
  name: "mongoMcp",
  version: "1.0.0",
  description: "A MongoDB MCP server",
  capabilities: {
    resources: {},
    prompts: {},
    tools: {},
  },
});

serverTools(server);
serverPrompts(server);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  logger.error(`Mcp Server initializaton failed: ${error}`);
  process.exit(1);
});
