import { getMongoClient, logger } from "../config";
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import {
  ServerRequest,
  ServerNotification,
} from "@modelcontextprotocol/sdk/types";
import { MongoClient } from "mongodb";

export async function findManyDoc(
  args: {
    collectionName: string;
    connectionString: string;
    dbName: string;
    query: object;
    projections: object;
    sort: object;
    limit: number;
    skip: number;
  },
  extra: RequestHandlerExtra<ServerRequest, ServerNotification>
): Promise<{
  [x: string]: unknown;
  content: { [x: string]: unknown; type: "text"; text: string }[];
  _meta?: { isError: boolean };
}> {
  let client: MongoClient | null = null;
  try {
    const { connectionString, dbName, collectionName, query, projections, sort, limit, skip } = args;
    logger.info("Find ManyDocs: connecting to database: ");
    logger.info(`Find ManyDocs: connectionString: ${connectionString}`);
    logger.info(`Find ManyDocs: databaseName: ${dbName}`);
    logger.info(`Find ManyDocs: collectionName: ${collectionName}`);
    logger.info(`Find ManyDocs: query: ${JSON.stringify(query)}`);
    logger.info(`Find ManyDocs: projections: ${JSON.stringify(projections)}`);
    logger.info(`Find ManyDocs: sort: ${JSON.stringify(sort)}`);
    logger.info(`Find ManyDocs: limit: ${limit}`);
    logger.info(`Find ManyDocs: skip: ${skip}`);

    client = await (await getMongoClient(connectionString)).connect();

    const db = client.db(dbName);
    if (!db) throw new Error("No Such Db exists");

    const collection = db.collection(collectionName);
    if (!collection) throw new Error("No Such Collection exists");

    let resultDoc;
    if (Object.keys(query).length !== 0) {
      resultDoc = await collection.find(query, {projection: projections}).sort(sort as any || {}).limit(limit || 10).skip(skip || 0).toArray();
    }
    logger.info(` Data: :::::: ${JSON.stringify(resultDoc)}`);
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
