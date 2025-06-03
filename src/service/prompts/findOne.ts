

const findOnePrompt = async (args: {
  connectionString: string;
  dbName: string;
  collectionName: string;
  query?: string | undefined;
}): Promise<any> => {
  const { connectionString, dbName, collectionName, query } = args;
  console.log(JSON.stringify(args));

  const promptMessage =
    `Find a document in the MongoDB with cluser: ${connectionString} in database "${dbName}", collection "${collectionName}".` +
    (query
      ? ` Use the following query: ${query}.`
      : " No specific query provided.");

  let queryObject: Record<string, unknown> = {};
  if (query) {
    try {
      queryObject = JSON.parse(query);
    } catch {
      queryObject = {};
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

export default findOnePrompt;
