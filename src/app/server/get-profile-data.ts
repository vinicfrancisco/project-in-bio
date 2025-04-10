import "server-only";
import { db } from "../lib/firebase";

export interface Link {
  title: string;
  url: string;
}

export interface ProfileData {
  userId: string;
  name?: string;
  description?: string;
  imagePath?: string;
  totalVisits: number;
  socialMedias: {
    gitHub: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  link1?: Link;
  link2?: Link;
  link3?: Link;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectData {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  imagePath: string;
  createdAt: number;
  totalVisits?: number;
}

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();

  return snapshot.data() as ProfileData;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ProjectData);
}

export async function getProfileId(userId?: string) {
  if (!userId) return;

  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", userId)
    .get();

  return snapshot.docs[0]?.id;
}
