/* eslint-disable @next/next/no-img-element */
"use client";

import saveProfile from "@/app/actions/save-profile";
import Button from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import TextArea from "@/app/components/ui/text-area";
import TextInput from "@/app/components/ui/text-input";
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from "@/app/lib/utils";
import { ProfileData } from "@/app/server/get-profile-data";
import { ArrowUpFromLine, UserPen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";

interface EditUserCardProps {
  profileData?: ProfileData;
}

export default function EditUserCard({ profileData }: EditUserCardProps) {
  const router = useRouter();
  const { profileId } = useParams<{ profileId: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData?.name || "");
  const [yourDescription, setYourDescription] = useState(
    profileData?.description || ""
  );

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);

    const imagesInput = document.getElementById(
      "profile-pic-input"
    ) as HTMLInputElement;

    const formData = new FormData();

    formData.append("profileId", profileId);
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescription);

    if (!!imagesInput.files?.length) {
      const compressedFile = await compressFiles(Array.from(imagesInput.files));

      formData.append("profilePic", compressedFile?.[0]);
    }

    await saveProfile(formData);

    startTransition(() => {
      setIsSavingProfile(false);
      setIsOpen(false);

      router.refresh();
    });
  };

  return (
    <>
      <button className="" onClick={() => setIsOpen(true)}>
        <UserPen />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">Editar Perfil</p>

          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile Picture"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="size-full"
                    onClick={() => triggerImageInput("profile-pic-input")}
                  >
                    100x100
                  </button>
                )}

                <input
                  id="profile-pic-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setProfilePic(handleImageInput(e))}
                />
              </div>

              <button
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput("profile-pic-input")}
              >
                <ArrowUpFromLine className="size-4" />

                <span>Adicionar foto</span>
              </button>
            </div>

            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="text-white font-bold">
                  Seu nome
                </label>

                <TextInput
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="your-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>

                <TextArea
                  id="your-description"
                  className="h-36"
                  placeholder="Fale um pouco sobre você"
                  value={yourDescription}
                  onChange={(e) => setYourDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className="text-white font-bold"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>

            <Button disabled={isSavingProfile} onClick={handleSaveProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
