import React from "react";

/**
 * Renders placeholder copy from src/data/projects.ts as a deliberately loud
 * callout. It should be impossible to skim past one of these by accident —
 * that is the point. Replace the source string to make it disappear.
 */
export default function TodoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2 border-dashed border-amber-500 bg-amber-50 rounded-md p-4 text-amber-900">
      <span className="block text-xs font-bold uppercase tracking-wide mb-1">
        To write
      </span>
      <span className="text-base md:text-lg">{children}</span>
    </div>
  );
}
