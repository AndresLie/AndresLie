"use client";
// Client component by necessity: @iconify/react uses hooks, so it cannot render
// inside a Server Component. Both the home-page card and the server-rendered
// project detail page share this row.
import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

// Technologies without an entry here render as a text pill instead. That is
// deliberate for names with no reliable brand icon (IoTDB, StarRocks, Redis,
// KEDA, Pydantic).
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

export default function TechStackRow({
  techStack,
  iconSize = 40,
  className,
}: {
  techStack: string[];
  iconSize?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {techStack.map((tech) =>
        TECH_ICON_MAP[tech] ? (
          <Icon
            key={tech}
            icon={TECH_ICON_MAP[tech]}
            width={iconSize}
            height={iconSize}
            aria-label={tech}
          />
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
  );
}
