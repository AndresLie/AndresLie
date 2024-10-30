import React from "react";
import { Icon } from "@iconify/react";
export default function TextHalf({
  title,
  children,
  description,
  github,
  live,
  demo,
}: {
  children?: React.ReactNode;
  title: string;
  description: string;
  github?: string;
  live?: string;
  demo?: string;
}) {
  return (
    <div className="w-full md:w-[45%] flex flex-col justify-between gap-5 space-x-2 pb-8">
      <h1 className="text-3xl">{title}</h1>
      <div className="flex items-center space-x-1 sm:space-x-0 sm:flex-wrap">
        <span className="text-xl">Made With:</span>
        <div className="flex flex-wrap gap-2 overflow-hidden truncate">
          {children}
        </div>
      </div>
      <div className="text-2xl">{description}</div>
      <div className="gap-4 flex flex-wrap">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-[37%]"
          >
            <button className="w-full relative inline-flex h-12 overflow-hidden rounded-full p-[4px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-1">
                <Icon
                  icon="line-md:link"
                  className="mr-1"
                  width={20}
                  height={20}
                />
                Live
              </span>
            </button>
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-[37%]"
          >
            <button className="px-8 py-2 h-full rounded-full bg-slate-950 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-purple-600 text-sm w-full">
              <span className="inline-flex items-center">
                <Icon
                  icon="mingcute:live-fill"
                  className="mr-1"
                  width={20}
                  height={20}
                />
                Demo
              </span>
            </button>
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-[37%]"
          >
            <button className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              <div className="px-8 py-2 bg-black rounded-full relative group transition duration-200 text-white hover:bg-transparent">
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-1">
                  <Icon
                    icon="skill-icons:github-light"
                    className="mr-1"
                    width={20}
                    height={20}
                  />
                  Github
                </span>
              </div>
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
