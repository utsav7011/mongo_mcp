import { MongoClient } from "mongodb";
import { getMongoClient, logger } from "../config";

export async function updateManyDoc(args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
  query: object;
  updatedValues: object;
}): Promise<{
  [x: string]: unknown;
  content: { [x: string]: unknown; type: "text"; text: string }[];
  _meta?: { isError: boolean };
}> {
  let client: MongoClient | null = null;
  try {
    const { connectionString, dbName, collectionName, query, updatedValues } =
      args;

    logger.info(`UpdateManydoc:::: connectionString: ${connectionString}`);
    logger.info(`UpdateManydoc:::: dbName: ${dbName}`);
    logger.info(`UpdateManydoc:::: collectionName: ${collectionName}`);
    logger.info(`UpdateManydoc:::: query: ${JSON.stringify(query)}`);
    logger.info(
      `Update one doc:::: updatedValues: ${JSON.stringify(updatedValues)}`
    );

    client = await (await getMongoClient(connectionString)).connect();

    const db = client.db(dbName);
    if (!db) throw new Error("No Such Db exists");

    const collection = db.collection(collectionName);
    if (!collection) throw new Error("No Such Collection exists");

    const resultDoc = await collection.updateMany(query, {
      $set: updatedValues,
    });

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
