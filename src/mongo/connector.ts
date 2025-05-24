import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;

/**
 * Connects to MongoDB using the given URI.
 * @param uri MongoDB connection URI
 */
export async function connectToMongo(uri: string): Promise<Db> {
  if (client) {
    return client.db(); // reuse existing connection
  }

  client = new MongoClient(uri);
  await client.connect();

  console.log('✅ Connected to MongoDB');
  return client.db(); // returns default DB from URI
}

/**
 * Closes the MongoDB connection.
 */
export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}
