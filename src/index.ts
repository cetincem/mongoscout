import { connectToMongo, closeConnection } from "./mongo/connector";
import * as dotenv from "dotenv";
import { discoverCollections } from "./mongo/discover";
import { analyzeCollectionFields } from "./mongo/analyzer";
import { detectRelationships } from "./mongo/relationships";

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

    for (const col of summaries) {
      const analysis = await analyzeCollectionFields(db, col.name);
      console.log(`\n📊 Field Value Analysis: ${col.name}`);
      for (const stat of analysis.fieldStats) {
        console.log(`- ${stat.field}:`);
        stat.topValues.forEach((v) =>
          console.log(`   • ${v.value}: ${v.count}`)
        );
      }
    }

    const rels = await detectRelationships(db);
    console.log("\n🔗 Detected Relationships:");
    rels.forEach((rel) => {
      console.log(
        `- ${rel.fromCollection}.${rel.fromField} ↔ ${rel.toCollection}.${
          rel.toField
        } (${rel.matchRate * 100}%)`
      );
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  } finally {
    await closeConnection();
  }
}

main();
