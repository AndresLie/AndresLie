import React from "react";
import { Icon } from "@iconify/react";

interface BulletProjectCardProps {
  id: string;
  title: string;
  techStack: string[];
  bullets: string[];
}

const TECH_ICON_MAP: Record<string, string> = {
  Go: "logos:go",
  Kubernetes: "logos:kubernetes",
  Kafka: "logos:kafka",
  Python: "logos:python",
  Docker: "skill-icons:docker",
  Flutter: "logos:flutter",
  Flask: "devicon:flask-wordmark",
  Firebase: "logos:firebase",
  "Azure Logic Apps": "devicon:azure",
  PostGreSQL: "logos:postgresql",
};

export default function BulletProjectCard({
  id,
  title,
  techStack,
  bullets,
}: BulletProjectCardProps) {
  return (
    <div
      id={id}
      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all duration-300 ease-in-out rounded-lg p-8 flex flex-col gap-5"
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      <ul className="list-disc pl-5 text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="text-lg text-neutral-800 dark:text-neutral-200 font-normal flex items-center gap-x-4">
        <span>Technology:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {techStack.map((tech) =>
            TECH_ICON_MAP[tech] ? (
              <Icon key={tech} icon={TECH_ICON_MAP[tech]} width="40" height="40" />
            ) : (
              <span
                key={tech}
                className="rounded-full bg-slate-800 text-white text-sm px-3 py-1"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
