import { connectToMongo, closeConnection } from "./mongo/connector";
import * as dotenv from "dotenv";
import { discoverCollections } from "./mongo/discover";

dotenv.config(); // for using .env file if needed

const MONGO_URI = process.env.MONGO_URI;

async function main() {
  try {
    const db = await connectToMongo(MONGO_URI);

    // Optional: print database name
    console.log(`📦 Using database: ${db.databaseName}`);

    // TODO: Next steps go here
    const summaries = await discoverCollections(db);
    console.log("🧭 Discovered Collections:\n");
    for (const col of summaries) {
      console.log(`📂 ${col.name} (${col.count} docs)`);
      col.sampleFields.forEach((field) =>
        console.log(`   - ${field.name}: [${[...field.types].join(", ")}]`)
      );
    }
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  } finally {
    await closeConnection();
  }
}

main();
