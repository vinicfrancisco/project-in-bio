"use client";

import Modal from "@/app/components/ui/modal";
import { Plus } from "lucide-react";
import { useState } from "react";

interface NewProjectProps {
  profileId: string;
}

export default function NewProject({ profileId }: NewProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      <button
        onClick={openModal}
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center justify-center gap-2 hover:border border-dashed border-border-secondary"
      >
        <Plus className="size-10" />

        <span className="text-accent-green">Novo projeto</span>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="border p-10">Hello World</div>
      </Modal>
    </>
  );
}
