import { MongoClient } from "mongodb";
import logger from "./logger";
export const getMongoClient = async (connectionStirng: string) => {
  try{
    let mongoClient: MongoClient | null = new MongoClient(connectionStirng); 
    return mongoClient;
  } catch(err) {
    logger.error("Error Connecting to mongoDb");
    process.exit(1);
  }
}