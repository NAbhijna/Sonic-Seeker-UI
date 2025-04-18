"use client";

import { Hero } from "@/components/hero";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../components/ui/navbar";
import React, { useState } from "react";
import { Timeline, TimelineEntry } from "../components/ui/timeline";
import dynamic from 'next/dynamic'; // Import dynamic

// Dynamically import Typewriter with SSR disabled
const Typewriter = dynamic(() => import('react-typewriter-effect'), { ssr: false });

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "About Us", link: "#about" },
  ];

  const featureTimeline: TimelineEntry[] = [
    {
      title: "Transcription",
      content: (
        <p className="text-sm text-neutral-300">
          Accurately convert your audio files into text with our state-of-the-art transcription engine. Supports multiple languages and accents.
        </p>
      ),
    },
    {
      title: "Speech Diarization",
      content: (
        <p className="text-sm text-neutral-300">
          Automatically identify and label different speakers within your audio recordings. Perfect for interviews, meetings, and multi-speaker analysis.
        </p>
      ),
    },
    {
      title: "Deepfake Detection",
      content: (
        <p className="text-sm text-neutral-300">
          Analyze audio authenticity and detect potential deepfakes or manipulated voice recordings using advanced AI models.
        </p>
      ),
    },
    {
      title: "Text Summarisation",
      content: (
        <p className="text-sm text-neutral-300">
          Generate concise summaries from lengthy transcriptions, extracting key points and saving you valuable time.
        </p>
      ),
    },
    {
      title: "Translation",
      content: (
        <p className="text-sm text-neutral-300">
          Translate your audio transcriptions into various languages, breaking down communication barriers.
        </p>
      ),
    },
    {
      title: "Mind Map Generation",
      content: (
        <p className="text-sm text-neutral-300">
          Visualize key topics, entities, and relationships from your audio content in an interactive and easy-to-navigate mind map format.
        </p>
      ),
    },
    {
      title: "Sentiment Analysis",
      content: (
        <p className="text-sm text-neutral-300">
          Understand the emotional tone behind the spoken words. Gain insights into customer feedback, meeting dynamics, or call center interactions.
        </p>
      ),
    },
    {
      title: "Entity Recognition",
      content: (
        <p className="text-sm text-neutral-300">
          Automatically identify and categorize named entities (like people, organizations, locations) mentioned in your audio.
        </p>
      ),
    },
    {
      title: "Timestamps",
      content: (
        <p className="text-sm text-neutral-300">
          Get precise timestamps for words or speaker segments, allowing for easy navigation and reference within the original audio.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen relative text-white border-none bg-black">
      <Navbar className="fixed top-0 w-full z-50 bg-transparent">
        <NavBody className="bg-neutral-950 bg-opacity-80 backdrop-blur-sm">
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton href="/login" className="ml-auto">
            Login
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader className="bg-neutral-950 border-b border-neutral-800">
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)} className="bg-neutral-950">
            {navItems.map((item) => (
              <a key={item.link} href={item.link} className="block py-2 text-white">
                {item.name}
              </a>
            ))}
            <NavbarButton href="/login" variant="primary" className="w-full mt-4">
              Login
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <Hero />

      <section id="features" className="min-h-screen p-10 md:px-20 lg:px-32 pt-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          <Typewriter
            text="Features"
            cursorColor="#FFFFFF"
            textStyle={{ color: '#FFFFFF', textAlign: 'center' }} // Ensure text is centered
            typeSpeed={100}
            startDelay={100}
          />
        </h2>
        <div>
          <Timeline data={featureTimeline} />
        </div>
      </section>
      <section id="about" className="min-h-screen p-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          <Typewriter
            text="About Us"
            cursorColor="#FFFFFF"
            textStyle={{ color: '#FFFFFF', textAlign: 'center' }} // Ensure text is centered
            typeSpeed={100}
            startDelay={100}
          />
        </h2>
        <div className="max-w-2xl p-8 bg-neutral-900 rounded-lg shadow-[0_0_20px_5px] shadow-blue-500/30">
          <p className="text-lg text-neutral-200 leading-relaxed">
            Welcome to Sonic Seeker, your advanced platform for unlocking insights from audio data. We leverage cutting-edge AI to provide transcription, diarization, sentiment analysis, and more. Our mission is to make audio analysis accessible and powerful for everyone, from researchers to content creators.
          </p>
          <p className="mt-4 text-lg text-neutral-200 leading-relaxed">
            Built with passion and precision, Sonic Seeker aims to be the ultimate tool for understanding the nuances hidden within sound.
          </p>
        </div>
      </section>
    </main>
  );
}
