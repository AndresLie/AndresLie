import React from "react";
import Link from "next/link";
import TechStackRow from "@/components/ui/tech-stack-row";

interface BulletProjectCardProps {
  /** Anchor id targeted by the navbar's Projects dropdown — keep in sync. */
  id: string;
  title: string;
  techStack: string[];
  bullets: string[];
  /** Detail page this card links to. */
  href: string;
}

export default function BulletProjectCard({
  id,
  title,
  techStack,
  bullets,
  href,
}: BulletProjectCardProps) {
  return (
    <Link
      id={id}
      href={href}
      className="group block w-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-all duration-300 ease-in-out rounded-lg p-8"
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{title}</h1>
        <ul className="list-disc pl-5 text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-lg text-neutral-800 dark:text-neutral-200 font-normal flex items-center gap-x-4">
            <span>Technology:</span>
            <TechStackRow techStack={techStack} />
          </div>
          <span className="text-md font-semibold text-blue-700 dark:text-blue-400 inline-flex items-center gap-1">
            View details
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
