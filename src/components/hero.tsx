"use client";

import React, { useEffect, useRef } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero = () => {
  useEffect(() => {
    // Load the Spline viewer script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [-200, 200]); // Increased range
  const yRight = useTransform(scrollYProgress, [0, 1], [200, -200]); // Increased range

  return (
    <section ref={targetRef} className="relative flex w-full flex-col items-center overflow-hidden px-4 py-24 border-none h-screen">
      <BackgroundBeamsWithCollision className="absolute inset-0 z-0" />

      <div className="relative z-10 flex w-full flex-col items-center text-center pt-12 h-full">
        <h1
          className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl"
        >
          Sonic-Seeker
        </h1>
        <p
          className="mb-4 max-w-2xl text-lg text-neutral-300"
        >
          Your all in one audio tool
        </p>
        
        {/* Container for Spline and Cards */}
        <div className="w-full flex-1 flex items-center justify-center mx-auto" style={{ height: "calc(100vh - 250px)" }}>
          <div className="flex items-center justify-around w-full max-w-6xl">
            
            {/* Left Card */}
            <motion.div 
              className="w-80 h-60 bg-neutral-900 rounded-lg p-6 border border-neutral-700 shadow-lg shadow-blue-500/30 flex flex-col justify-center"
              style={{ y: yLeft }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Summarize Audio
              </h3>
              <p className="text-neutral-300 text-sm">
                Get key points from long audio files quickly.
              </p>
            </motion.div>

            {/* Spline 3D component */}
            <div className="flex-shrink-0 mx-4" style={{ width: "400px", height: "400px" }}>
              <spline-viewer 
                url="https://prod.spline.design/hHCr2PAXHAlz8vcV/scene.splinecode"
                background="transparent"
                zoom="0"
                enable-zoom="false"
                scroll-behavior="none"
                logo="false"
                style={{ 
                  pointerEvents: "none", 
                  width: "100%", 
                  height: "100%", 
                  margin: "0 auto"
                }}
              ></spline-viewer>
            </div>

            {/* Right Card */}
            <motion.div 
              className="w-80 h-60 bg-neutral-900 rounded-lg p-6 border border-neutral-700 shadow-lg shadow-purple-500/30 flex flex-col justify-center"
              style={{ y: yRight }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Detect Fakes
              </h3>
              <p className="text-neutral-300 text-sm">
                Identify AI-generated or manipulated audio.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
