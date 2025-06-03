

const updateManyDocsPrompt = async (args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
  query?: string | undefined;
  updatedValues?: string | undefined;
}): Promise<any> => {
  const { connectionString, dbName, collectionName, query, updatedValues } = args;
  console.log(JSON.stringify(args));

  const promptMessage =
    `Update many documents in the MongoDB with cluster: ${connectionString} in database "${dbName}", collection "${collectionName}".` +
    (query ? ` Use the following query: ${query}.` : " No specific query provided.") +
    (updatedValues ? ` Set the following values: ${updatedValues}.` : " No update values provided.");

  let queryObject: Record<string, unknown> = {};
  let updateObject: Record<string, unknown> = {};
  if (query) {
    try {
      queryObject = JSON.parse(query);
    } catch {
      queryObject = {};
    }
  }
  if (updatedValues) {
    try {
      updateObject = JSON.parse(updatedValues);
    } catch {
      updateObject = {};
    }
  }

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

export default updateManyDocsPrompt;
