import { IndexSpecification, MongoClient } from "mongodb";
import { getMongoClient, logger } from "../config";

export const createnewIndexIndexInCollection = async (args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
  indexParameters: object;
  unique?: boolean;
  sparse?: boolean;
  name?: string;
  expireAfterSeconds?: number;
  partialFilterExpression?: object;
  collation?: object;
}): Promise<{
  [x: string]: unknown;
  content: { [x: string]: unknown; type: "text"; text: string }[];
  _meta?: { isError: boolean };
}> => {
  let client: MongoClient | null = null;
  try {
    const {
      connectionString,
      dbName,
      collectionName,
      indexParameters,
      unique = false,
      sparse = false,
      name,
      expireAfterSeconds,
      partialFilterExpression,
      collation,
    } = args;

    client = await getMongoClient(connectionString);

    const db = client.db(dbName);
    if (!db) throw new Error("No Such Db exists");
    const collection = db.collection(collectionName);

    if (!collection) throw new Error("No Such Collection exists");

    const indexOptions: any = {};

    if (unique === true) indexOptions.unique = true;
    if (sparse === true) indexOptions.sparse = true;
    if (typeof name === "string") indexOptions.name = name;
    if (typeof expireAfterSeconds === "number")
      indexOptions.expireAfterSeconds = expireAfterSeconds;
    if (
      partialFilterExpression &&
      Object.keys(partialFilterExpression).length > 0
    )
      indexOptions.partialFilterExpression = partialFilterExpression;
    if (collation && Object.keys(collation).length > 0)
      indexOptions.collation = collation;

    const result = await collection.createIndex(
      indexParameters as IndexSpecification,
      indexOptions
    );
    logger.info(":::: create new index ::: ", result);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
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
};
