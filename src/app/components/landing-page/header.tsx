import Image from "next/image";
import Button from "../ui/button";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10 ">
      <div className="flex items-center gap-4">
        <Image
          height={32}
          width={27}
          src="/logo.svg"
          alt="Project In Bio Logo"
        />
        <h3 className="text-white text-2xl font-bold">Project In Bio</h3>
      </div>

      <div className="flex items-center gap-4">
        <Button>Minha Página</Button>
        <Button>Sair</Button>
      </div>
    </div>
  );
}
