import { auth } from "@/app/lib/auth";
import { getProfileId } from "@/app/server/get-profile-data";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessions = await auth();

  if (!sessions?.user) redirect("/");

  const profileId = await getProfileId(sessions.user.id);

  if (profileId) redirect(`/${profileId}`);

  return children;
}
