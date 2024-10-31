"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";

export default function Experience() {
  const data = [
    {
      title: "2024 June - Present",
      content: (
        <div>
          <h1 className="text-neutral-800 dark:text-neutral-200  mb-8 text-4xl font-bold">
            MI2S Lab Assistant • 國立成功大學 (National Cheng Kung University)
          </h1>
          <div>
            <ul className="list-disc pl-5 text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal mb-4">
              <li>
                Collaborated with a team to design and implement new features
                for{" "}
                <strong>
                  <a
                    href="https://iog.ncku.edu.tw/p/406-1169-264543,r2694.php?Lang=zh-tw"
                    target="_blank"
                    className="underline text-blue-600"
                  >
                    Kasih
                  </a>
                </strong>
                , a mobile app intended to assist foreign caregiver and worker
                in Taiwan.
              </li>
              <li>
                Developed a backend search feature for PDF documents, reducing
                client-side search time by <strong>77%</strong>.
              </li>
              <li>
                Engineered backend service for flashcard assets, enabling
                optional downloads, remote updates, and reducing app size by{" "}
                <strong>76%</strong>.
              </li>
              <li>
                Overhauled multiple UI components, significantly elevating user
                experience and interface.
              </li>
            </ul>
            <div className="text-lg text-neutral-800 dark:text-neutral-200 font-normal flex items-center gap-x-4">
              <span>Technology:</span>
              <div className="flex items-center gap-2 flex-wrap ">
                <Icon icon="logos:flutter" width="40" height="40" />
                <Icon icon="devicon:python" width="40" height="40" />
                <Icon icon="file-icons:flask" width="40" height="40" />
                <Icon icon="skill-icons:docker" width="45" height="45" />
                <Icon icon="logos:gitlab" width="40" height="40" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024 October - Present",
      content: (
        <div>
          <h1 className="text-neutral-800 dark:text-neutral-200  mb-8 text-4xl font-bold">
            Google Developer Group • 國立成功大學 (National Cheng Kung
            University)
          </h1>
          <div>
            <ul className="list-disc pl-5 text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal mb-4">
              <li>
                Collaborated with a team to design Past Exam Platform (考古平台)
                for students in NCKU.
              </li>
              <li>
                Utilized Scrum methodologies to achieve rapid deployment cycles
                and continuous iterative improvements
              </li>
            </ul>

            <div className="text-lg text-neutral-800 dark:text-neutral-200 font-normal flex items-center gap-x-4">
              <span>Technology:</span>
              <div className="flex items-center gap-2 flex-wrap ">
                <Icon icon="devicon:nextjs" width="40" height="40" />
                <Icon icon="skill-icons:typescript" width="40" height="40" />
                <Icon icon="devicon:tailwindcss" width="40" height="40" />
                <Icon icon="skill-icons:github-dark" width="40" height="40" />
                <Icon icon="devicon:jira" width="40" height="40" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="  flex flex-col items-center w-full mb-12">
      <h1 className=" text-3xl ">My Experience</h1>
      <Timeline data={data} />
    </div>
  );
}
