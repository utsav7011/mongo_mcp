import { MongoClient } from "mongodb";
import { logger } from "../config";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import {
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types";

export async function getAllDataFromMongoDb(
  args: { collectionName: string; connectionString: string; dbName: string },
  extra: RequestHandlerExtra<ServerRequest, ServerNotification>
): Promise<{
  [x: string]: unknown;
  content: { [x: string]: unknown; type: "text"; text: string }[];
  _meta?: { isError: boolean };
}> {
  let client: MongoClient | null = null;
  const { connectionString, collectionName, dbName } = args;
  try {
    logger.info("connecting to database: ");
    logger.info(`connectionString: ${connectionString}`);
    logger.info(`databaseName: ${dbName}`);
    logger.info(`collectionName: ${collectionName}`);

    client = new MongoClient(connectionString);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await collection.find({}).toArray();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2), // Pretty print JSON
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      _meta: { isError: true },
    };
  } finally {
    if (client) await client.close();
  }
}
