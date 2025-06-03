import logger from "../../utils/logger";

const createNewIndexPrompt = async (args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
  indexParameters: string;
  unique?: string;
  sparse?: string;
  name?: string;
  expireAfterSeconds?: string;
  partialFilterExpression?: string;
  collation?: string;
}): Promise<any> => {
  const { connectionString, dbName, collectionName, indexParameters } = args;
  logger.info(JSON.stringify(args));

  const promptMessage =
    `Create a new index in the MongoDB with cluster: ${connectionString} in database "${dbName}", collection "${collectionName}".` +
    (indexParameters
      ? ` Use the following index parameters: ${indexParameters}.`
      : " No specific index parameters provided.");

  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: promptMessage,
        },
      },
    ],
  };
};

export default createNewIndexPrompt;