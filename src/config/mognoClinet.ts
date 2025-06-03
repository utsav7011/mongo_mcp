import { MongoClient } from "mongodb";
export const getMongoClient = async (connectionStirng: string) => {
  try{
    let mongoClient: MongoClient | null = new MongoClient(connectionStirng); 
    return mongoClient;
  } catch(err) {
    console.error("Error Connecting to mongoDb");
    process.exit(1);
  }
}