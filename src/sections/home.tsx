"use client";
import React from "react";
import { FlipWords } from "../components/ui/flip-words";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Icon } from "@iconify/react";
import { LinkPreview } from "@/components/ui/link-preview";

export function Home() {
  const words = [" Web Developer", "n App Developer"];
  return (
    <div className="h-[100vh] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        Hi, I&apos;m Andreas
        <br />
      </h2>
      <div className="">
        <h2 className="relative flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center ">
          I&apos;m a
          <FlipWords words={words} className="text-neutral-100 z-99" />
        </h2>
      </div>
      <h2 className="relative flex-col md:flex-row z-10 text-xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-stone-200 flex items-center ">
        Currently a Senior Year student in NCKU
        <br />
      </h2>
      <div className="flex gap-4 md:gap-16 z-10  absolute bottom-[20vh] ">
        <LinkPreview
          url="https://github.com/AndresLie?tab=repositories"
          className="font-bold z-30"
        >
          <a
            href="https://github.com/AndresLie?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 text-white border-2 border-transparent px-4 py-3 rounded-full hover:scale-110 hover:border-white transition-all duration-300 ease-in-out text-center flex items-center justify-center gap-2 w-44 h-10 text-xl"
          >
            GitHub
            <Icon icon="skill-icons:github-light" width={25} height={25} />
          </a>
        </LinkPreview>
        <LinkPreview
          url="https://www.linkedin.com/in/andreaslie7/"
          className="font-bold z-30"
        >
          <a
            href="https://www.linkedin.com/in/andreaslie7/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-950 text-white border-2 border-transparent px-4 py-3 rounded-full hover:scale-110 hover:border-white transition-all duration-300 ease-in-out text-center flex items-center justify-center gap-2 w-44 h-10 text-xl"
          >
            LinkedIn
            <Icon icon="skill-icons:linkedin" width={25} height={25} />
          </a>
        </LinkPreview>
      </div>

      <ShootingStars className="z-0" />
      <StarsBackground className="z-0" />
    </div>
  );
}
