import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import serverTools from "./tools";

const server = new McpServer({
  name: "mongoMcp",
  version: "1.0.0",
  description: "A MongoDB MCP server",
  capabilities: {
    resources: {},
    tools: {},
  },
});

serverTools(server);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error(`Mcp Server initializaton failed: ${error}`);
  process.exit(1);
});
