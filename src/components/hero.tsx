"use client";

import React, { useRef } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavbarButton } from "@/components/ui/navbar";
import { Vortex } from "@/components/ui/vortex";

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [-400, 200]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-400, 200]);

  return (
    <section ref={targetRef} className="relative flex w-full flex-col items-center overflow-hidden px-4 py-24 border-none h-screen bg-neutral-950">
      <Vortex
        backgroundColor="transparent"
        className="absolute inset-0 z-0 w-full h-full"
      />

      <BackgroundBeamsWithCollision className="absolute inset-0 z-1" />

      <div className="relative z-10 flex w-full flex-col items-center text-center pt-12 h-full">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Sonic-Seeker
          </h1>
          <p className="mb-4 max-w-2xl text-lg text-neutral-300">
            Your all in one audio tool
          </p>
          <NavbarButton href="/audio-fetch" variant="primary" className="mt-6">
            Get Started
          </NavbarButton>
        </motion.div>

        <div className="w-full flex-1 flex items-center justify-center mx-auto" style={{ height: "calc(100vh - 300px)" }}>
          <div className="flex items-center justify-between w-full max-w-6xl px-12">
            <motion.div
              className="w-80 h-60 bg-neutral-900/80 backdrop-blur-sm rounded-lg p-6 border border-neutral-700 shadow-lg shadow-blue-500/30 flex flex-col justify-center"
              style={{ y: yLeft }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Long recordings? No problem.
              </h3>
              <p className="text-neutral-300 text-sm">
                Cut through the noise with instant AI summaries, speaker insights, and topic extraction — get straight to what matters.
              </p>
            </motion.div>

            <motion.div
              className="w-80 h-60 bg-neutral-900/80 backdrop-blur-sm rounded-lg p-6 border border-neutral-700 shadow-lg shadow-purple-500/30 flex flex-col justify-center"
              style={{ y: yRight }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Experience audio like never before.
              </h3>
              <p className="text-neutral-300 text-sm">
                Dive into conversations with interactive timelines, multilingual support, and visual mind maps that bring structure to your sound.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
