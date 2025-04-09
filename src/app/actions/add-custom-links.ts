"use server";

import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import { Link } from "@/app/server/get-profile-data";

interface AddCustomLinksProps {
  profileId: string;
  link1: Link;
  link2: Link;
  link3: Link;
}

export default async function addCustomLinks({
  profileId,
  link1,
  link2,
  link3,
}: AddCustomLinksProps) {
  try {
    const session = await auth();

    if (!session?.user) return false;

    if (!profileId) return false;

    await db.collection("profiles").doc(profileId).update({
      link1,
      link2,
      link3,
    });
  } catch {
    return false;
  }
}
