import BulletProjectCard from "@/components/ui/projectsCard/bullet-project-card";
import { projects } from "@/data/projects";
import React from "react";

export default function Projects() {
  return (
    <div className="w-full px-4 md:px-10">
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-12 gap-8">
        <h1 className="mb-10 text-3xl ">My Projects</h1>
        {projects.map((project) => (
          <BulletProjectCard
            key={project.slug}
            id={project.anchorId}
            href={`/projects/${project.slug}`}
            title={project.title}
            techStack={project.techStack}
            bullets={project.cardBullets}
          />
        ))}
      </div>
    </div>
  );
}
