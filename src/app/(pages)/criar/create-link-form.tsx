"use client";

import { createLink } from "@/app/actions/create-link";
import { verifyLink } from "@/app/actions/verify-link";
import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";
import { sanitizeLink } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CreateLinkForm() {
  const router = useRouter();

  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(sanitizeLink(e.target.value));
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!link.length) {
      return setError("Escolha um link primneiro :)");
    }

    const isLinkTaken = await verifyLink(link);

    if (isLinkTaken) {
      return setError("Desculpe, este link já está em uso :(");
    }

    const isLinkCreated = await createLink(link);

    if (!isLinkCreated) {
      return setError("Erro ao criar o link. Tente novamente");
    }

    router.push(`/${link}`);
  };

  return (
    <>
      <form className="w-full flex items-center gap-2" onSubmit={handleSubmit}>
        <span className="text-white">projectinbio.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />

        <Button className="w-[126px]">Criar</Button>
      </form>

      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}
