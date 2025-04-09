"use client";

import { formatUrl } from "@/app/lib/utils";
/* eslint-disable @next/next/no-img-element */
import { ProjectData } from "@/app/server/get-profile-data";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectData;
  img?: string;
  isOwner: boolean;
}

export default function ProjectCard({
  project: { projectDescription, projectName, projectUrl, totalVisit = 0 },
  img,
}: ProjectCardProps) {
  const handleClick = () => {
    // TODO: Analytics
    console.log("clicked");
  };

  return (
    <Link href={formatUrl(projectUrl)} target="_blank" onClick={handleClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="rounded-md overflow-hidden flex-shrink-0">
          <img src={img} alt={projectName} className="size-full object-cover" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="uppercase text-xs font-bold text-accent-green">
            {totalVisit} Cliques
          </span>

          <div className="flex flex-col ">
            <span className="text-white font-bold">{projectName}</span>

            <span className="text-content-body text-sm">
              {projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
