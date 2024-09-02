"use client";
import React from "react";
import { FlipWords } from "../components/ui/flip-words";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export function Home() {
    const words = ["Web Developer", "App Developer"];
  return (
    <div className="h-[100vh] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
            Hi, I&apos;m Andreas<br />
      </h2>
    <div>
        <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
            I&apos;m a<FlipWords words={words} className="text-neutral-100 z-99" />   
        </h2>
    </div>

      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
