import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import {
  findOnePrompt,
  findManyPrompt,
  countDocsPrompt,
  createNewIndexPrompt,
  deleteIndexPrompt,
  deleteManyDocsPrompt,
  deleteOneDocPrompt,
  getAllDataFromMongoDbPrompt,
  getCollectionSchemaPrompt,
  getIndexesPrompt,
  updateManyDocsPrompt,
  updateOneDocPrompt,
} from "../service/prompts";

const argsSchema = {
  connectionString: z.string(),
  dbName: z.string(),
  collectionName: z.string(),
  query: z.string().optional(),
};

const countDocsArgsSchema = argsSchema;
const createNewIndexArgsSchema = {
  ...argsSchema,
  indexParameters: z.string(),
  unique: z.string().optional(),
  sparse: z.string().optional(),
  name: z.string().optional(),
  expireAfterSeconds: z.string().optional(),
  partialFilterExpression: z.any().optional(),
  collation: z.any().optional(),
};
const deleteIndexArgsSchema = {
  ...argsSchema,
  indexName: z.string(),
};
const deleteManyDocsArgsSchema = argsSchema;
const deleteOneDocArgsSchema = argsSchema;
const getAllDataFromMongoDbArgsSchema = {
  connectionString: z.string(),
  dbName: z.string(),
  collectionName: z.string(),
};
const getCollectionSchemaArgsSchema = getAllDataFromMongoDbArgsSchema;
const getIndexesArgsSchema = getAllDataFromMongoDbArgsSchema;
const updateManyDocsArgsSchema = {
  ...argsSchema,
  updatedValues: z.string().optional(),
};
const updateOneDocArgsSchema = {
  ...argsSchema,
  updatedValues: z.string().optional(),
};

export const serverPrompts = async (server: McpServer) => {
  server.prompt(
    "findOne",
    "Generate a prompt for to find a document in the mongodb server",
    argsSchema,
    findOnePrompt
  );
  server.prompt(
    "findMany",
    "Generate a prompt for to find all documents in the mongodb server",
    argsSchema,
    findManyPrompt
  );
  server.prompt(
    "countDocs",
    "Generate a prompt to count documents in the mongodb server",
    countDocsArgsSchema,
    countDocsPrompt
  );
  server.prompt(
    "createNewIndex",
    "Generate a prompt to create a new index in the mongodb server",
    createNewIndexArgsSchema,
    createNewIndexPrompt
  );
  server.prompt(
    "deleteIndex",
    "Generate a prompt to delete an index in the mongodb server",
    deleteIndexArgsSchema,
    deleteIndexPrompt
  );
  server.prompt(
    "deleteManyDocs",
    "Generate a prompt to delete many documents in the mongodb server",
    deleteManyDocsArgsSchema,
    deleteManyDocsPrompt
  );
  server.prompt(
    "deleteOneDoc",
    "Generate a prompt to delete one document in the mongodb server",
    deleteOneDocArgsSchema,
    deleteOneDocPrompt
  );
  server.prompt(
    "getAllDataFromMongoDb",
    "Generate a prompt to get all data from a collection in the mongodb server",
    getAllDataFromMongoDbArgsSchema,
    getAllDataFromMongoDbPrompt
  );
  server.prompt(
    "getCollectionSchema",
    "Generate a prompt to get the schema of a collection in the mongodb server",
    getCollectionSchemaArgsSchema,
    getCollectionSchemaPrompt
  );
  server.prompt(
    "getIndexes",
    "Generate a prompt to get all indexes from a collection in the mongodb server",
    getIndexesArgsSchema,
    getIndexesPrompt
  );
  server.prompt(
    "updateManyDocs",
    "Generate a prompt to update many documents in the mongodb server",
    updateManyDocsArgsSchema,
    updateManyDocsPrompt
  );
  server.prompt(
    "updateOneDoc",
    "Generate a prompt to update one document in the mongodb server",
    updateOneDocArgsSchema,
    updateOneDocPrompt
  );
};
