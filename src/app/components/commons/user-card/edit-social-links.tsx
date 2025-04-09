"use client";

import createSocialLinks from "@/app/actions/create-social-links";
import Button from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import TextInput from "@/app/components/ui/text-input";
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function EditSocialLinks() {
  const router = useRouter();
  const { profileId } = useParams<{ profileId: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  const [gitHub, setGitHub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const handleAddSocialLinks = async () => {
    setIsSavingSocialLinks(true);

    await createSocialLinks({
      profileId,
      gitHub,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsOpen(false);
      setIsSavingSocialLinks(false);
      setGitHub("");
      setTwitter("");
      setInstagram("");
      setLinkedin("");
      router.refresh();
    });
  };

  return (
    <>
      <button
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
        onClick={() => setIsOpen(true)}
      >
        <Plus />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">
            Adicionar Redes Sociais
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Github />

              <TextInput
                placeholder="Link GitHub"
                type="text"
                value={gitHub}
                onChange={(e) => setGitHub(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <Linkedin />

              <TextInput
                placeholder="Link LinkedIn"
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <Instagram />

              <TextInput
                placeholder="Link Instagram"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <Twitter />

              <TextInput
                placeholder="Link Twitter"
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className="font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>

            <Button
              disabled={isSavingSocialLinks}
              onClick={handleAddSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
