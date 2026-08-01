#!/usr/bin/env node
/*
  Safe migration script for normalizing gallery image categories.
  Usage:
    node migrateGalleryCategories.js         # dry-run (shows summary, no writes)
    node migrateGalleryCategories.js --apply # applies changes to the DB

  Requires MONGO_URI env var (e.g. mongodb://user:pass@host:port/db) or defaults to mongodb://localhost:27017/cgs
*/

const mongoose = require("mongoose");
const path = require("path");
const GalleryImage = require(path.join(__dirname, "..", "src", "models", "GalleryImage"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cgs";
const apply = process.argv.includes("--apply");

function normalize(s) {
  if (!s) return "gallery";
  return s.toString().trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// map common variants to canonical categories
const canonical = {
  project: "projects",
  projects: "projects",
  service: "services",
  services: "services",
  marketing: "marketing",
  gallery: "gallery",
  hero: "hero",
  construction: "construction",
  design: "design",
  "smart-home": "smart-home",
  "smart home": "smart-home",
  smarthome: "smart-home"
};

(async () => {
  console.log("Connecting to", MONGO_URI);
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const imgs = await GalleryImage.find({}).lean();
    console.log(`Found ${imgs.length} gallery image(s)`);

    const changes = [];

    for (const img of imgs) {
      const orig = img.category || "";
      const n = normalize(orig);
      const want = canonical[n] || n;
      if (want !== (orig || "gallery").toString().trim().toLowerCase()) {
        changes.push({ _id: img._id, from: orig, to: want });
      }
    }

    if (!changes.length) {
      console.log("No category changes detected — nothing to do.");
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log(`Detected ${changes.length} document(s) that would be updated:`);
    changes.slice(0, 20).forEach(c => console.log(`  id=${c._id}  ${c.from} -> ${c.to}`));
    if (changes.length > 20) console.log(`  ...and ${changes.length - 20} more`);

    if (!apply) {
      console.log("\nDry run; no changes applied. Re-run with --apply to perform updates.");
      await mongoose.disconnect();
      process.exit(0);
    }

    console.log("Applying changes...");
    const bulk = GalleryImage.collection.initializeUnorderedBulkOp();
    for (const c of changes) {
      bulk.find({ _id: c._id }).updateOne({ $set: { category: c.to } });
    }

    const res = await bulk.execute();
    console.log("Bulk update result:", res.toJSON ? res.toJSON() : res);
    console.log("Done.");
  } catch (err) {
    console.error(err);
    process.exit(2);
  } finally {
    await mongoose.disconnect();
  }
})();
