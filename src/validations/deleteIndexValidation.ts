import {z} from "zod";

export default z.object({
  connectionString: z.string(),
  dbName: z.string(),
  collectionName: z.string(),
  query: z.string(),
});