"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

interface CreateSocialLinksProps {
  profileId: string;
  gitHub: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export default async function createSocialLinks({
  profileId,
  gitHub,
  instagram,
  linkedin,
  twitter,
}: CreateSocialLinksProps) {
  try {
    const session = await auth();

    if (!session?.user) return false;

    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        gitHub,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch {
    return false;
  }
}
