import {z} from "zod";

export default z.object({
  connectionString: z.string(),
  dbName: z.string(),
  collectionName: z.string(),
  query: z.record(z.any()).default({}),
  projections: z.record(z.any()).default({}),
  sort: z.record(z.any()).default({}),
  limit: z.number().default(10),
  skip: z.number().default(0)
});