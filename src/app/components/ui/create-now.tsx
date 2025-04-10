"use client";

import { useState } from "react";
import Button from "./button";
import TextInput from "./text-input";
import { signIn } from "next-auth/react";
import { sanitizeLink } from "@/app/lib/utils";

export default function CreateNow() {
  const [link, setLink] = useState("");

  const handleCreateNow = () =>
    signIn("google", {
      redirectTo: `/criar?link=${sanitizeLink(link)}`,
    });

  return (
    <div className="flex items-center gap-2 w-full mt-[10vh]">
      <span className="text-white text-xl">projectinbio.com/</span>
      <TextInput
        placeholder="Seu link"
        value={link}
        onChange={(e) => setLink(sanitizeLink(e.target.value))}
      />

      <Button onClick={handleCreateNow}>Criar agora</Button>
    </div>
  );
}
