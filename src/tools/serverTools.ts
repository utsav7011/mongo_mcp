import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getAllDataFromMongoDb,
  getCollectionSchema,
  findOneDoc,
  findManyDoc,
  updateOneDoc,
  updateManyDoc,
  deleteOneDoc,
  deleteManyDocs,
  countDocs,
  createnewIndexIndexInCollection,
  getIndexesInACollection,
} from "../service";
import {
  connectionConfigValidations,
  findOneDocValidations,
  updateDocValidations,
  findManyDocValidation,
  createIndexValidation,
} from "../validations";

export const serverTools = (server: McpServer) => {
  server.tool(
    "get-data-from-mongo-db-collection",
    "Fetch data from a MongoDB collection. Provide collectionName, connectionString, and dbName.",
    connectionConfigValidations.shape,
    getAllDataFromMongoDb
  );

  server.tool(
    "get schema of the mongodb collection",
    "get the descrption of the collection of a mongoDb collection given collectionName, connectionString, and dbName",
    connectionConfigValidations.shape,
    getCollectionSchema
  );

  server.tool(
    "Find one document in mongobd collection",
    "Find a particular document (Just One) from the collection given the connectionString, dbName, collectionName and query",
    findOneDocValidations.shape,
    findOneDoc
  );

  server.tool(
    "Find many document in mongobd collection",
    "Find documents from the collection given the connectionString, dbName, collectionName and query",
    findManyDocValidation.shape,
    findManyDoc
  );

  server.tool(
    "Update one document in mongobd collection",
    "Update the doc in the collection given the connectionString, dbName, collectionName, query and updatedValues",
    updateDocValidations.shape,
    updateOneDoc
  );

  server.tool(
    "Update many document in mongobd collection",
    "Update all the docs in the collection given the connectionString, dbName, collectionName, query and updatedValues",
    updateDocValidations.shape,
    updateManyDoc
  );

  server.tool(
    "Delete one document in mongobd collection",
    "Delete a particular document (Just One) from the collection given the connectionString, dbName, collectionName and query",
    findOneDocValidations.shape,
    deleteOneDoc
  );

  server.tool(
    "Delete many document in mongobd collection",
    "Delete documents from the collection given the connectionString, dbName, collectionName and query",
    findOneDocValidations.shape,
    deleteManyDocs
  );

  server.tool(
    "Count number of documents in mongobd collection",
    "Count documents from the collection  matching a condition, given the connectionString, dbName, collectionName and query",
    findOneDocValidations.shape,
    countDocs
  );

  server.tool(
    "Create a new index in a Collection",
    "Create a new index in a collection givem a connection string, dbName, collectionName and other parameters: indexParameters, unique, sparse, name, expireAfterSeconds, partialFilterExpression, collation",
    createIndexValidation.shape,
    createnewIndexIndexInCollection
  );

  server.tool(
    "Get all indexes in a Collection",
    "Get all indexes in a collection givem a connection string, dbName, collectionName",
    connectionConfigValidations.shape,
    getIndexesInACollection
  );

  // todo:
  // server.tool(
  //   "insert a doc to the mongodb",
  //   "Insert a new doc to the mongodb given the connectionString, dbName, collectionName and a new document",
  //   insertNewDoc.shape,
  //   insertANewDocumentToMongoDb
  // )
};
