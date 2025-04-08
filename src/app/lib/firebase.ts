import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import "server-only";

// Decode Private Key
const decodedKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64!,
  "base64"
).toString("utf-8");

// Configure Firebase Certificate
export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
});

// Initialize Firebase App Only Once
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// Export Firebase Services
export const db = getFirestore();
export const storage = getStorage();
