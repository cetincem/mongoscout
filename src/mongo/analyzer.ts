import { Db } from 'mongodb';

export interface FieldValueStats {
  field: string;
  topValues: { value: any; count: number }[];
  totalCount: number;
}

export interface CollectionAnalysis {
  collection: string;
  fieldStats: FieldValueStats[];
}

/**
 * Analyzes value distributions for a given collection.
 * Only analyzes top-level fields and flattens objects later if needed.
 */
export async function analyzeCollectionFields(db: Db, collectionName: string): Promise<CollectionAnalysis> {
  const col = db.collection(collectionName);
  const sample = await col.find().limit(1000).toArray(); // more samples = better stats

  const fieldCounts = new Map<string, Map<any, number>>();
  let total = 0;

  for (const doc of sample) {
    total++;
    for (const [key, value] of Object.entries(doc)) {
      if (value === null || typeof value === 'object') continue; // skip nested for now
      const valueMap = fieldCounts.get(key) || new Map();
      valueMap.set(value, (valueMap.get(value) || 0) + 1);
      fieldCounts.set(key, valueMap);
    }
  }

  const fieldStats: FieldValueStats[] = [];

  for (const [field, valueMap] of fieldCounts.entries()) {
    const topValues = Array.from(valueMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([value, count]) => ({ value, count }));

    fieldStats.push({
      field,
      topValues,
      totalCount: total
    });
  }

  return { collection: collectionName, fieldStats };
}
