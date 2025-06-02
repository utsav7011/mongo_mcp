import { getMongoClient, logger } from "../config";
import { MongoClient } from "mongodb";

export async function deleteIndexinMongoDbCollection(args: {
  collectionName: string;
  connectionString: string;
  dbName: string;
  query: string
}): Promise<{
  [x: string]: unknown;
  content: { [x: string]: unknown; type: "text"; text: string }[];
  _meta?: { isError: boolean };
}> {
  let client: MongoClient | null = null;
  try {
    const { connectionString, dbName, collectionName, query } = args;

    logger.info("getIndexes: connecting to database: ");
    logger.info(`getIndexes: connectionString: ${connectionString}`);
    logger.info(`getIndexes: databaseName: ${dbName}`);
    logger.info(`getIndexes: collectionName: ${collectionName}`);

    client = await (await getMongoClient(connectionString)).connect();
    
    const db = client.db(dbName);
    if (!db) throw new Error("No Such Db exists");
    
    const collection = db.collection(collectionName);
    if (!collection) throw new Error("No Such Collection exists");
    
    const resultDoc = await collection.dropIndex(query);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(resultDoc, null, 2),
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
