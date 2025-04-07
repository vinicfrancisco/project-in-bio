import ProjectCard from "@/app/components/commons/project-card";
import TotalVisits from "@/app/components/commons/total-visits";
import UserCard from "@/app/components/commons/user-card";
import { Plus } from "lucide-react";

export default async function ProfilePage({}: {
  params: { profileId: string };
}) {
  //   const { profileId } = await params;

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial.</span>

        <button className="text-accent-green font-bold">
          Faça o upgrade agora
        </button>
      </div>

      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>

      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />

        <button className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center justify-center gap-2 hover:border border-dashed border-border-secondary">
          <Plus className="size-10" />
          <span className="text-accent-green">Novo projeto</span>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
