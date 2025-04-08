"use client";

import Button from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import TextArea from "@/app/components/ui/text-area";
import TextInput from "@/app/components/ui/text-input";
import { ArrowUpFromLine, Plus } from "lucide-react";
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
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo projeto</p>

          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="size-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                <button className="size-full">100x100</button>
              </div>

              <button className="text-white flex items-center gap-2">
                <ArrowUpFromLine className="size-4" />

                <span>Adicionar imagem</span>
              </button>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Título do projeto
                </label>

                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>

                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>

                <TextInput
                  id="project-url"
                  type="url"
                  placeholder="Digite a URL do projeto"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white">Voltar</button>

            <Button>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
