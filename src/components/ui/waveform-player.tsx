"use client";

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

interface WaveformPlayerProps {
  audioSource: string | File; // URL string or File object
  options?: Partial<WaveSurferOptions>;
  initialPlaybackRate?: number; // Optional initial playback rate
}

// Define the available speed steps
const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  audioSource,
  options,
  initialPlaybackRate = 1, // Default initial rate
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(initialPlaybackRate);
  const [preservePitch, setPreservePitch] = useState(true); // Default to preserving pitch

  // Find the index of the initial playback rate in the speeds array
  const initialSpeedIndex = speeds.indexOf(initialPlaybackRate);
  const [speedIndex, setSpeedIndex] = useState(initialSpeedIndex !== -1 ? initialSpeedIndex : speeds.indexOf(1)); // Default to index of 1x speed if initial not found

  // Effect for initializing and cleaning up WaveSurfer instance
  useEffect(() => {
    if (!waveformRef.current) return;

    // Clear previous instance if audioSource changes
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
      setIsLoading(true); // Reset loading state on source change
      setIsPlaying(false); // Reset playing state
    }

    // Default options
    const defaultOptions: Partial<WaveSurferOptions> = {
      container: waveformRef.current,
      waveColor: 'rgb(200, 200, 200)',
      progressColor: 'rgb(100, 100, 100)',
      cursorColor: 'rgb(255, 255, 255)',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 100,
      responsive: true,
      // Remove audioRate from initial options, set it after 'ready'
      ...options, // Merge with user-provided options
    };

    // Initialize WaveSurfer
    const ws = WaveSurfer.create(defaultOptions);
    wavesurferRef.current = ws;
    setIsLoading(true); // Start loading state

    // Load audio source
    if (audioSource instanceof File) {
      ws.loadBlob(audioSource);
    } else if (typeof audioSource === 'string') {
      ws.load(audioSource);
    }

    // Event listeners
    ws.on('ready', () => {
      setIsLoading(false); // Loading finished
      // Set initial playback rate *after* ready
      ws.setPlaybackRate(playbackRate, preservePitch);
      console.log('WaveSurfer is ready');
    });

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));
    ws.on('error', (err) => {
      console.error('WaveSurfer error:', err);
      setIsLoading(false);
    });

    // Cleanup function
    return () => {
      console.log('Destroying WaveSurfer instance');
      ws.destroy();
    };
    // Only re-run this effect if the audioSource itself changes.
    // Avoid including 'options', 'playbackRate', 'preservePitch' here
    // as they don't require full re-initialization.
  }, [audioSource]);

  // Effect to update playback rate when state changes *after* WaveSurfer is ready
  useEffect(() => {
    if (wavesurferRef.current && !isLoading) {
      wavesurferRef.current.setPlaybackRate(playbackRate, preservePitch);
    }
    // This effect depends on the rate, pitch setting, and loading state
  }, [playbackRate, preservePitch, isLoading]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(event.target.value, 10);
    const newSpeed = speeds[newIndex];
    setSpeedIndex(newIndex);
    setPlaybackRate(newSpeed);
  };

  const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreservePitch(event.target.checked);
  };

  return (
    <div className="w-full">
      <div ref={waveformRef} className="w-full h-[100px] bg-neutral-700 rounded mb-4">
        {isLoading && <div className="flex items-center justify-center h-full text-neutral-400">Loading waveform...</div>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className={`px-4 py-2 rounded text-white font-medium ${isLoading ? 'bg-neutral-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <label htmlFor="speed-slider">Speed:</label>
          <span className="font-medium text-white w-10 text-right">{playbackRate.toFixed(2)}x</span>
          <input
            id="speed-slider"
            type="range"
            min="0"
            max={speeds.length - 1}
            step="1"
            value={speedIndex}
            onChange={handleSpeedChange}
            disabled={isLoading}
            className="w-24 h-2 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            id="preserve-pitch"
            type="checkbox"
            checked={preservePitch}
            onChange={handlePitchChange}
            disabled={isLoading}
            className="w-4 h-4 text-blue-600 bg-neutral-600 border-neutral-500 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <label htmlFor="preserve-pitch">Preserve pitch</label>
        </div>
      </div>
    </div>
  );
};

export default WaveformPlayer;
