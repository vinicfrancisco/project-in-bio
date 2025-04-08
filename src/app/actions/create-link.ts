"use server";

import { db } from "@/app/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";

export async function createLink(link: string) {
  const session = await auth();

  if (!session?.user) return;

  try {
    await db.collection("profiles").doc(link).set({
      userId: session.user.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch {
    return false;
  }
}
