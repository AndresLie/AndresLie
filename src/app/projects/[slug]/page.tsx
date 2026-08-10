import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProject,
  isTodo,
  projects,
  stripTodo,
} from "@/data/projects";
import TechStackRow from "@/components/ui/tech-stack-row";
import DetailSection from "@/components/ui/project-detail/detail-section";
import TodoNote from "@/components/ui/project-detail/todo-note";
import SemiconductorConsoleDiagram from "@/components/ui/diagrams/semiconductor-console-diagram";
import SinkCommitPathDiagram from "@/components/ui/diagrams/sink-commit-path-diagram";
import TsradStackDiagram from "@/components/ui/diagrams/tsrad-stack-diagram";
import TsradDiagram from "@/components/ui/diagrams/tsrad-diagram";
import AidealDiagram from "@/components/ui/diagrams/aideal-diagram";
import AidealNotificationDiagram from "@/components/ui/diagrams/aideal-notification-diagram";
import AidealRecommendationDiagram from "@/components/ui/diagrams/aideal-recommendation-diagram";

const DIAGRAMS: Record<string, React.ComponentType[]> = {
  "semiconductor-console": [
    SemiconductorConsoleDiagram,
    SinkCommitPathDiagram,
  ],
  tsrad: [TsradStackDiagram, TsradDiagram],
  aideal: [
    AidealDiagram,
    AidealNotificationDiagram,
    AidealRecommendationDiagram,
  ],
};

// Inline SVG rather than @iconify/react: this page is a Server Component and
// Iconify's <Icon> relies on hooks, so it cannot render here.
function ArrowLeftIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found — Andreas" };
  return {
    title: `${project.title} — Andreas`,
    description: isTodo(project.tagline) ? undefined : project.tagline,
  };
}

/** Renders plain copy, or a loud callout when the string is still a placeholder. */
function Copy({ value, className }: { value: string; className?: string }) {
  if (isTodo(value)) return <TodoNote>{stripTodo(value)}</TodoNote>;
  return <p className={className}>{value}</p>;
}

/** Inline variant for short values inside the hero metadata strip. */
function MetaValue({ value }: { value: string }) {
  if (isTodo(value)) {
    return (
      <span className="text-amber-700 border border-dashed border-amber-500 rounded px-1.5 py-0.5">
        {stripTodo(value)}
      </span>
    );
  }
  return <span className="text-neutral-800 font-medium">{value}</span>;
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      <MetaValue value={value} />
    </div>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const diagrams = DIAGRAMS[project.slug] ?? [];

  return (
    <main className="w-full px-4 md:px-10 pb-20">
      {/* Detail pages deliberately do not reuse the main Navbar: its click
          handlers scroll to home-page section ids that don't exist here. */}
      <div className="sticky top-0 z-20 -mx-4 md:-mx-10 mb-8 border-b border-neutral-200 bg-white/90 backdrop-blur px-4 md:px-10 py-4">
        <Link
          href="/#Projects"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeftIcon />
          Back to portfolio
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {project.title}
          </h1>
          <Copy
            value={project.tagline}
            className="text-lg md:text-2xl text-neutral-600 mb-8"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-y border-neutral-200 py-6">
            <MetaItem label="Role" value={project.role} />
            <MetaItem label="Timeframe" value={project.period} />
            {project.teamSize && (
              <MetaItem label="Team" value={project.teamSize} />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
            <span className="text-sm uppercase tracking-wide text-neutral-500">
              Stack
            </span>
            <TechStackRow techStack={project.techStack} iconSize={34} />
          </div>

          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-8">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                  <div className="relative px-6 py-2 bg-black rounded-full transition duration-200 hover:bg-transparent">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                      <ExternalLinkIcon />
                      {link.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </header>

        <DetailSection title="The problem">
          <Copy
            value={project.context}
            className="text-md md:text-xl text-neutral-800"
          />
        </DetailSection>

        {diagrams.length > 0 && (
          <DetailSection title="Architecture">
            <div className="flex flex-col gap-10">
              {diagrams.map((Diagram, index) => (
                <Diagram key={index} />
              ))}
            </div>
          </DetailSection>
        )}

        <DetailSection title="Key decisions">
          <div className="flex flex-col gap-6">
            {project.decisions.map((entry) => (
              <div
                key={entry.decision}
                className="bg-gray-100 rounded-lg p-6 flex flex-col gap-3"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-900">
                  {entry.decision}
                </h3>
                <Copy
                  value={entry.why}
                  className="text-md md:text-lg text-neutral-800"
                />
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Challenges">
          <div className="flex flex-col gap-6">
            {project.challenges.map((entry) => (
              <div key={entry.challenge} className="flex flex-col gap-3">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-900">
                  {isTodo(entry.challenge)
                    ? stripTodo(entry.challenge)
                    : entry.challenge}
                </h3>
                <Copy
                  value={entry.solution}
                  className="text-md md:text-lg text-neutral-800 border-l-2 border-neutral-300 pl-4"
                />
              </div>
            ))}
          </div>
        </DetailSection>

        <nav className="flex flex-col sm:flex-row justify-between gap-4 border-t border-neutral-200 pt-8">
          {previous && (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex flex-col gap-1 text-left"
            >
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                Previous
              </span>
              <span className="text-lg font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">
                {previous.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-1 sm:text-right sm:ml-auto"
            >
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                Next
              </span>
              <span className="text-lg font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
