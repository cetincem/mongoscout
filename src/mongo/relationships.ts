import { Db } from 'mongodb';

export interface CollectionRelationship {
  fromCollection: string;
  fromField: string;
  toCollection: string;
  toField: string;
  matchRate: number;
}

export async function detectRelationships(db: Db): Promise<CollectionRelationship[]> {
  const relationships: CollectionRelationship[] = [];
  const collections = await db.listCollections().toArray();

  const samples: Record<string, any[]> = {};

  // Step 1: Sample documents from each collection
  for (const col of collections) {
    const name = col.name;
    const docs = await db.collection(name).find().limit(200).toArray();
    samples[name] = docs;
  }

  // Step 2: Match fields across collections
  for (const [fromCol, docs] of Object.entries(samples)) {
    const sampleDoc = docs[0];
    if (!sampleDoc) continue;

    for (const [fromField, fromValue] of Object.entries(sampleDoc)) {
      if (!fromField.endsWith('_id') && !fromField.endsWith('_code')) continue;

      const valuesToMatch = docs.map(d => d[fromField]).filter(v => v != null);

      for (const [toCol, toDocs] of Object.entries(samples)) {
        for (const toField of ['_id', 'code']) {
          const targetValues = toDocs.map(d => d[toField]).filter(v => v != null);
          if (targetValues.length === 0) continue;

          const matchCount = valuesToMatch.filter(val =>
            targetValues.some(t => t?.toString() === val?.toString())
          ).length;

          const rate = matchCount / valuesToMatch.length;

          if (rate > 0.3) {
            relationships.push({
              fromCollection: fromCol,
              fromField,
              toCollection: toCol,
              toField,
              matchRate: Number(rate.toFixed(2)),
            });
          }
        }
      }
    }
  }

  return relationships;
}
