"use client";

import { Hero } from "@/components/hero";
import React from "react";
import dynamic from 'next/dynamic';
import {
  FaMicrophoneAlt,
  FaUsers,
  FaUserSecret,
  FaFileAlt,
  FaLanguage,
  FaProjectDiagram,
  FaSmile,
  FaTags,
  FaClock
} from 'react-icons/fa';
import { TracingBeam } from "@/components/ui/tracing-beam";

const Typewriter = dynamic(() => import('react-typewriter-effect'), { ssr: false });

interface FeatureEntry {
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

export default function Home() {
  const featureTimeline: FeatureEntry[] = [
    {
      title: "Transcription",
      icon: <FaMicrophoneAlt className="text-blue-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Accurately convert your audio files into text with our state-of-the-art transcription engine. Supports multiple languages and accents.
        </p>
      ),
    },
    {
      title: "Speech Diarization",
      icon: <FaUsers className="text-purple-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Automatically identify and label different speakers within your audio recordings. Perfect for interviews, meetings, and multi-speaker analysis.
        </p>
      ),
    },
    {
      title: "Deepfake Detection",
      icon: <FaUserSecret className="text-red-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Analyze audio authenticity and detect potential deepfakes or manipulated voice recordings using advanced AI models.
        </p>
      ),
    },
    {
      title: "Text Summarisation",
      icon: <FaFileAlt className="text-green-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Generate concise summaries from lengthy transcriptions, extracting key points and saving you valuable time.
        </p>
      ),
    },
    {
      title: "Translation",
      icon: <FaLanguage className="text-yellow-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Translate your audio transcriptions into various languages, breaking down communication barriers.
        </p>
      ),
    },
    {
      title: "Mind Map Generation",
      icon: <FaProjectDiagram className="text-orange-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Visualize key topics, entities, and relationships from your audio content in an interactive and easy-to-navigate mind map format.
        </p>
      ),
    },
    {
      title: "Sentiment Analysis",
      icon: <FaSmile className="text-pink-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Understand the emotional tone behind the spoken words. Gain insights into customer feedback, meeting dynamics, or call center interactions.
        </p>
      ),
    },
    {
      title: "Entity Recognition",
      icon: <FaTags className="text-teal-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Automatically identify and categorize named entities (like people, organizations, locations) mentioned in your audio.
        </p>
      ),
    },
    {
      title: "Timestamps",
      icon: <FaClock className="text-cyan-400 text-3xl mb-3" />,
      content: (
        <p className="text-sm text-neutral-300">
          Get precise timestamps for words or speaker segments, allowing for easy navigation and reference within the original audio.
        </p>
      ),
    },
  ];

  const groupFeaturesInPairs = (features: FeatureEntry[]): FeatureEntry[][] => {
    const pairs: FeatureEntry[][] = [];
    for (let i = 0; i < features.length; i += 2) {
      pairs.push(features.slice(i, i + 2));
    }
    return pairs;
  };

  const featurePairs = groupFeaturesInPairs(featureTimeline);

  return (
    <>
      <Hero />

      <section id="features" className="min-h-screen bg-neutral-900 pt-20 pb-20">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          <Typewriter
            text="Features"
            cursorColor="#FFFFFF"
            textStyle={{ color: '#FFFFFF', textAlign: 'center' }}
            typeSpeed={100}
            startDelay={100}
          />
        </h2>
        <TracingBeam className="px-6">
          <div className="max-w-4xl mx-auto antialiased pt-4 relative">
            {featurePairs.map((pair, pairIndex) => (
              <div key={`pair-${pairIndex}`} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {pair.map((feature, featureIndex) => (
                  <div
                    key={`feature-card-${pairIndex}-${featureIndex}`}
                    className="bg-neutral-800/70 backdrop-blur-sm p-6 rounded-lg border border-neutral-700 shadow-lg flex flex-col items-center text-center h-full"
                  >
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    {feature.content}
                  </div>
                ))}
                {pair.length === 1 && <div className="hidden md:block"></div>}
              </div>
            ))}
          </div>
        </TracingBeam>
      </section>

      <section id="about" className="min-h-screen p-10 bg-neutral-800 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          <Typewriter
            text="About Us"
            cursorColor="#FFFFFF"
            textStyle={{ color: '#FFFFFF', textAlign: 'center' }}
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
    </>
  );
}
