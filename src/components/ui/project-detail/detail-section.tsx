import React from "react";

/** Gives every section on a project detail page identical heading + spacing rhythm. */
export default function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}
