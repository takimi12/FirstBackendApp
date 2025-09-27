import admin from "firebase-admin";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Absolutna ścieżka do pliku serviceAccountKey.json
const serviceAccountPath = path.resolve(process.cwd(), "src/config/serviceAccountKey.json");

// Sprawdzenie, czy plik istnieje
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found at ${serviceAccountPath}`);
}

// Wczytanie klucza
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Sprawdzenie zmiennej środowiskowej bucket
if (!process.env.FIREBASE_STORAGE_BUCKET) {
  throw new Error("FIREBASE_STORAGE_BUCKET is not defined in .env");
}

// Inicjalizacja Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Log bucketu do debugowania
const bucket = admin.storage().bucket();
console.log("Firebase Storage bucket detected:", bucket.name);

export default admin;
