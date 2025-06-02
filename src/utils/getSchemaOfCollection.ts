export function getSchema(obj: any, indent = "") {
  const schema: Record<string, any> = {};
  for (let key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      schema[key] = getSchema(value, indent + "\t");
    } else {
      schema[key] = typeof value;
    }
  }
  return schema;
}
