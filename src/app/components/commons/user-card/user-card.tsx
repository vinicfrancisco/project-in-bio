import Button from "@/app/components/ui/button";
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import Image from "next/image";
import EditSocialLinks from "./edit-social-links";
import Link from "next/link";
import { ProfileData } from "@/app/server/get-profile-data";

interface UserCardProps {
  profileData?: ProfileData;
}

export default function UserCard({ profileData }: UserCardProps) {
  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-border-secondary border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <Image
          src="/me.jpg"
          alt="Vini Dev"
          width={348}
          height={348}
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            Vini Dev
          </h3>
        </div>

        <p className="opacity-40">
          &quot;Eu faço produtos para a Internet&quot;
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>

        <div className="flex gap-3">
          {!!profileData?.socialMedias.gitHub && (
            <Link
              href={profileData.socialMedias.gitHub}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Github />
            </Link>
          )}

          {!!profileData?.socialMedias.instagram && (
            <Link
              href={profileData?.socialMedias.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Instagram />
            </Link>
          )}

          {!!profileData?.socialMedias.linkedin && (
            <Link
              href={profileData?.socialMedias.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Linkedin />
            </Link>
          )}

          {!!profileData?.socialMedias.twitter && (
            <Link
              href={profileData?.socialMedias.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
            >
              <Twitter />
            </Link>
          )}

          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          <Button className="w-full">Template SaaS - Compre Agora</Button>

          <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
