import { getMongoClient, logger } from "../config";
import { MongoClient } from "mongodb";

export async function findOneDoc(args: {
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

    logger.info("FindOneDocs: connecting to database: ");
    logger.info(`FindOneDocs: connectionString: ${connectionString}`);
    logger.info(`FindOneDocs: databaseName: ${dbName}`);
    logger.info(`FindOneDocs: collectionName: ${collectionName}`);
    logger.info(`FindOneDocs: query: ${JSON.stringify(query)}`);

    client = await (await getMongoClient(connectionString)).connect();
    const db = client.db(dbName);
    if (!db) throw new Error("No Such Db exists");
    const collection = db.collection(collectionName);
    if (!collection) throw new Error("No Such Collection exists");
    let resultDoc;
    if (Object.keys(query).length !== 0) {
      resultDoc = await collection.findOne(query);
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
