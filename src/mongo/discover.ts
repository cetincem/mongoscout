import { Db } from 'mongodb';

export interface FieldSummary {
  name: string;
  types: Set<string>;
}

export interface CollectionSummary {
  name: string;
  count: number;
  sampleFields: FieldSummary[];
}

/**
 * Discovers collections and samples documents.
 * @param db Connected MongoDB database
 */
export async function discoverCollections(db: Db): Promise<CollectionSummary[]> {
  const collections = await db.listCollections().toArray();

  const summaries: CollectionSummary[] = [];

  for (const collection of collections) {
    const name = collection.name;
    const col = db.collection(name);

    const count = await col.countDocuments();
    const sample = await col.find().limit(100).toArray();

    const fieldMap = new Map<string, Set<string>>();

    for (const doc of sample) {
      for (const key in doc) {
        const value = doc[key];
        const type = typeof value;
        if (!fieldMap.has(key)) {
          fieldMap.set(key, new Set());
        }
        fieldMap.get(key)?.add(type);
      }
    }

    const sampleFields: FieldSummary[] = Array.from(fieldMap.entries()).map(
      ([name, types]) => ({
        name,
        types
      })
    );

    summaries.push({ name, count, sampleFields });
  }

  return summaries;
}
