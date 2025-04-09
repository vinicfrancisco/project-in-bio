"use client";

import addCustomLinks from "@/app/actions/add-custom-links";
import Button from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import TextInput from "@/app/components/ui/text-input";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function AddCustomLink() {
  const router = useRouter();
  const { profileId } = useParams<{ profileId: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [isSavingCustomLink, setIsSavingCustomLink] = useState(false);

  const [link1, setLink1] = useState({
    title: "",
    url: "",
  });

  const [link2, setLink2] = useState({
    title: "",
    url: "",
  });

  const [link3, setLink3] = useState({
    title: "",
    url: "",
  });

  const handleAddCustomLink = async () => {
    setIsSavingCustomLink(true);

    await addCustomLinks({
      profileId,
      link1,
      link2,
      link3,
    });

    startTransition(() => {
      setIsOpen(false);
      setIsSavingCustomLink(false);
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
            Adicionar links personalizados
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="title1">Titúlo do Link</label>

                <TextInput
                  id="title1"
                  placeholder="Digite o título"
                  value={link1.title}
                  onChange={(e) =>
                    setLink1({ ...link1, title: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-bold" htmlFor="url1">
                  Link
                </label>

                <TextInput
                  id="url1"
                  placeholder="Inserir URL"
                  value={link1.url}
                  onChange={(e) => setLink1({ ...link1, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="title2">Titúlo do Link</label>

                <TextInput
                  id="title2"
                  placeholder="Digite o título"
                  value={link2.title}
                  onChange={(e) =>
                    setLink2({ ...link2, title: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-bold" htmlFor="url2">
                  Link
                </label>

                <TextInput
                  id="url2"
                  placeholder="Inserir URL"
                  value={link2.url}
                  onChange={(e) => setLink2({ ...link2, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="title3">Titúlo do Link</label>

                <TextInput
                  id="title3"
                  placeholder="Digite o título"
                  value={link3.title}
                  onChange={(e) =>
                    setLink3({ ...link3, title: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-bold" htmlFor="url3">
                  Link
                </label>

                <TextInput
                  id="url3"
                  placeholder="Inserir URL"
                  value={link3.url}
                  onChange={(e) => setLink3({ ...link3, url: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className="font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>

            <Button disabled={isSavingCustomLink} onClick={handleAddCustomLink}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
