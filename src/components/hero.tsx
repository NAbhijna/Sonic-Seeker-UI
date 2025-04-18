"use client";

import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export const Hero = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-24 border-none h-[40rem]">
      <BackgroundBeamsWithCollision className="absolute inset-0 z-0" />

      <div className="relative z-10 flex w-full flex-col items-center justify-center text-center">
        <h1
          className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl"
        >
          Sonic-Seeker
        </h1>
        <p
          className="mb-8 max-w-2xl text-lg text-neutral-300"
        >
          Your all in one audio tool
        </p>
      </div>
    </section>
  );
};

export default Hero;
