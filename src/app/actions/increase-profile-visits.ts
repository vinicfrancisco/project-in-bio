"use server";

import { db } from "@/app/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export default async function increaseProfileVisits(profileId: string) {
  try {
    const profileRef = db.collection("profiles").doc(profileId);

    await db.runTransaction(async (transaction) => {
      const profile = await transaction.get(profileRef);

      if (!profile.exists) {
        return false;
      }

      transaction.update(profileRef, {
        totalVisits: FieldValue.increment(1),
      });
    });

    return true;
  } catch {
    return false;
  }
}
