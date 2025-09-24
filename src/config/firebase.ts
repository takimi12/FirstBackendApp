import admin from "firebase-admin";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Absolutna ścieżka do pliku w src/config
const serviceAccountPath = path.resolve(process.cwd(), "src/config/serviceAccountKey.json");

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
