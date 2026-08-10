"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function Education() {
  const data = [
    {
      title: "Sep. 2025",
      content: (
        <div>
          <h1 className="text-neutral-800 dark:text-neutral-200 mb-1 text-4xl font-bold">
            Master of Science in Computer Science 
          </h1>
          <h2 className="text-neutral-700 dark:text-neutral-300 mb-2 text-2xl md:text-3xl font-semibold">
            國立成功大學 (National Cheng Kung University)
          </h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal">
            Tainan, Taiwan
          </p>
        </div>
      ),
    },
    {
      title: "Sep. 2021",
      content: (
        <div>
          <h1 className="text-neutral-800 dark:text-neutral-200 mb-1 text-4xl font-bold">
            Bachelor of Science in Computer Science
          </h1>
          <h2 className="text-neutral-700 dark:text-neutral-300 mb-2 text-2xl md:text-3xl font-semibold">
            國立成功大學 (National Cheng Kung University)
          </h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal">
            Tainan, Taiwan
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center w-full mb-12">
      <h1 className="text-3xl ">My Education</h1>
      <Timeline data={data} />
    </div>
  );
}
