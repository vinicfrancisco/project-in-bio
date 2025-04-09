"use server";

import { auth } from "@/app/lib/auth";
import { db, storage } from "@/app/lib/firebase";
import { randomUUID } from "crypto";
import { Timestamp } from "firebase-admin/firestore";

export default async function saveProfile(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user) return false;

    const profileId = formData.get("profileId") as string;
    const file = formData.get("profilePic") as File;
    const yourName = formData.get("yourName") as string;
    const yourDescription = formData.get("yourDescription") as string;

    let imagePath = null;
    const hasFile = file && file.size > 0;

    if (hasFile) {
      const currentProfile = await db
        .collection("profiles")
        .doc(profileId)
        .get();

      const currentImagePath = currentProfile.data()?.imagePath;

      if (currentImagePath) {
        const currentStorageRef = storage.bucket().file(currentImagePath);

        if (await currentStorageRef.exists()) {
          await currentStorageRef.delete();
        }
      }

      const storageRef = storage
        .bucket()
        .file(`profile-images/${profileId}/${randomUUID()}`);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await storageRef.save(buffer);

      imagePath = storageRef.name;
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        imagePath,
        name: yourName,
        description: yourDescription,
        ...(hasFile && { imagePath }),
        updatedAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch {
    return false;
  }
}
