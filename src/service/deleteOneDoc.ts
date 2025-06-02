import { getMongoClient, logger } from "../config";
import { MongoClient } from "mongodb";

export async function deleteOneDoc(args: {
  collectionName: string;
  connectionString: string;
  dbName: string;
  query: Object;
}): Promise<{
  [x: string]: unknown;
  content: { [x: string]: unknown; type: "text"; text: string }[];
  _meta?: { isError: boolean };
}> {
  let client: MongoClient | null = null;
  try {
    const { connectionString, dbName, collectionName, query } = args;

    logger.info("DeleteOneDoc: connecting to database: ");
    logger.info(`DeleteOneDoc: connectionString: ${connectionString}`);
    logger.info(`DeleteOneDoc: databaseName: ${dbName}`);
    logger.info(`DeleteOneDoc: collectionName: ${collectionName}`);
    logger.info(`DeleteOneDoc: query: ${JSON.stringify(query)}`);

    client = await (await getMongoClient(connectionString)).connect();
    const db = client.db(dbName);
    
    if (!db) throw new Error("No Such Db exists");
    const collection = db.collection(collectionName);
    
    if (!collection) throw new Error("No Such Collection exists");
    
    let resultDoc;
    if (Object.keys(query).length !== 0) {
      resultDoc = await collection.deleteOne(query);
    }

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
