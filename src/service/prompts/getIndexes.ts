import logger from "../../utils/logger";

const getIndexesPrompt = async (args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
}): Promise<any> => {
  const { connectionString, dbName, collectionName } = args;
  logger.info(JSON.stringify(args));

  const promptMessage =
    `Get all indexes from the MongoDB with cluster: ${connectionString} in database "${dbName}", collection "${collectionName}".`;

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

export default getIndexesPrompt;
