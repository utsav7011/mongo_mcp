

const deleteIndexPrompt = async (args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
  indexName: string;
}): Promise<any> => {
  const { connectionString, dbName, collectionName, indexName } = args;
  console.log(JSON.stringify(args));

  const promptMessage =
    `Delete index "${indexName}" in the MongoDB with cluster: ${connectionString} in database "${dbName}", collection "${collectionName}".`;

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

export default deleteIndexPrompt;
