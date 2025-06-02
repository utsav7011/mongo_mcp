import { z, record, number, string, boolean } from "zod";

export default z.object({
  connectionString: string(),
  dbName: string(),
  collectionName: string(),
  indexParameters: z.record(z.any()).default({ _id: 1 }),
  unique: boolean().optional(),
  sparse: boolean().optional(),
  name: string().optional(),
  expireAfterSeconds: number().optional(),
  partialFilterExpression: record(z.any()).default({}).optional(),
  collation: record(z.any()).default({}).optional(),
});
