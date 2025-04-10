"use server";

import { db } from "@/app/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

interface IncreaseProjectVisitsProps {
  profileId: string;
  projectId: string;
}

export default async function increaseProjectVisits({
  profileId,
  projectId,
}: IncreaseProjectVisitsProps) {
  try {
    const projectRef = db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(projectId);

    await db.runTransaction(async (transaction) => {
      const project = await transaction.get(projectRef);

      if (!project.exists) {
        return false;
      }

      transaction.update(projectRef, {
        totalVisits: FieldValue.increment(1),
      });
    });

    return true;
  } catch {
    return false;
  }
}
