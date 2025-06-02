import {z} from "zod";

export default z.object({
  connectionString: z.string(),
  dbName: z.string(),
  collectionName: z.string(),
  query: z.record(z.any()),
  updatedValues: z.record(z.any()),
});