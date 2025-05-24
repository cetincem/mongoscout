import { connectToMongo, closeConnection } from './mongo/connector';
import * as dotenv from 'dotenv';

dotenv.config(); // for using .env file if needed

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

async function main() {
  try {
    const db = await connectToMongo(MONGO_URI);

    // Optional: print database name
    console.log(`📦 Using database: ${db.databaseName}`);

    // TODO: Next steps go here
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
  } finally {
    await closeConnection();
  }
}

main();
