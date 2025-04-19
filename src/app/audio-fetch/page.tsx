"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FileUpload } from "@/components/ui/file-upload";
import WaveformPlayer from '@/components/ui/waveform-player';
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('react-typewriter-effect'), { ssr: false });

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

const AudioFetchPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [currentAudioSource, setCurrentAudioSource] = useState<string | File | null>(null);
  const [activeTab, setActiveTab] = useState<string>('transcription');

  const analysisTabs: Tab[] = [
    { id: 'transcription', label: 'Transcription', content: <p className="text-neutral-100">Transcription results will appear here.</p> },
    { id: 'diarization', label: 'Speech Diarization', content: <p className="text-neutral-100">Speech diarization results will appear here.</p> },
    { id: 'deepfake', label: 'Deepfake', content: <p className="text-neutral-100">Deepfake detection results will appear here.</p> },
    { id: 'summarisation', label: 'Text Summarisation', content: <p className="text-neutral-100">Text summarisation results will appear here.</p> },
    { id: 'translation', label: 'Translation', content: <p className="text-neutral-100">Translation results will appear here.</p> },
    { id: 'mindmap', label: 'Mind Map', content: <p className="text-neutral-100">Mind map generation will appear here.</p> },
    { id: 'sentiment', label: 'Sentiment Analysis', content: <p className="text-neutral-100">Sentiment analysis results will appear here.</p> },
    { id: 'entity', label: 'Entity Recognition', content: <p className="text-neutral-100">Entity recognition results will appear here.</p> },
    { id: 'timestamps', label: 'Timestamps', content: <p className="text-neutral-100">Timestamp information will appear here.</p> },
  ];

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log("Uploaded files:", uploadedFiles);
    const firstAudio = uploadedFiles.find(file => file.type.startsWith('audio/'));
    if (firstAudio) {
      setCurrentAudioSource(firstAudio);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const recordedFile = new File([audioBlob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
        console.log("Recorded file:", recordedFile);
        setCurrentAudioSource(recordedFile);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setCurrentAudioSource(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleSelectFile = (file: File) => {
    if (file.type.startsWith('audio/')) {
      setCurrentAudioSource(file);
    } else {
      console.log("Selected file is not audio:", file.name);
      setCurrentAudioSource(null);
    }
  };

  return (
    <>
      <div className="p-6 md:pt-10 md:pb-0 md:px-10 m-4 mb-0">
        <h1 className="text-3xl font-bold">
          <Typewriter
            text="Audio Analysis"
            cursorColor="#FFFFFF"
            textStyle={{ color: '#FFFFFF' }}
            typeSpeed={100}
            startDelay={100}
          />
        </h1>
      </div>

      <div className="flex flex-col flex-grow p-6 md:pt-6 md:px-10 gap-8 m-4 mt-0">
        <div className="flex gap-8">
          <div className="w-1/4 flex flex-col gap-8">
            <div className="h-80 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center justify-center p-4">
              <FileUpload onChange={handleFileUpload} />
            </div>

            {files.length > 0 && (
              <div className="mt-4 flex-grow overflow-y-auto bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h2 className="text-lg font-semibold mb-2">Selected files:</h2>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  {files.map((file, index) => (
                    <li key={index}
                        className={`cursor-pointer truncate ${file.type.startsWith('audio/') ? 'hover:text-blue-400' : 'text-neutral-500 cursor-not-allowed'}`}
                        onClick={() => handleSelectFile(file)}
                        title={file.name}
                    >
                      {file.name} {file.type.startsWith('audio/') ? '(Click to play)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-3/4 flex flex-col gap-8 bg-neutral-800 rounded-lg p-6 border border-neutral-700">
            <div className="p-4 border border-neutral-700 rounded-lg bg-neutral-850">
              <h2 className="text-xl font-semibold mb-4">Record Audio</h2>
              <div className="flex flex-col items-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 1A5 5 0 1 1 8 3a5 5 0 0 1 0 10z"/>
                      <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                    </svg>
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded-md text-white font-medium flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                    </svg>
                    Stop Recording
                  </button>
                )}
              </div>
            </div>

            {currentAudioSource ? (
              <div className="flex-grow p-4 border border-neutral-700 rounded-lg bg-neutral-850 flex flex-col">
                <h2 className="text-xl font-semibold mb-4 flex-shrink-0">Playback</h2>
                <div className="flex-grow min-h-0">
                   <WaveformPlayer audioSource={currentAudioSource} />
                </div>
              </div>
            ) : (
              <div className="flex-grow p-4 border border-neutral-700 rounded-lg bg-neutral-850 flex flex-col items-center justify-center min-h-[150px]">
                <p className="text-neutral-500">Upload or record audio to see player</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow border border-neutral-700 rounded-lg bg-neutral-850 p-4 flex flex-col min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          <div className="flex border-b border-neutral-600 mb-4 overflow-x-auto">
            {analysisTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 transition-colors duration-150 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-grow relative overflow-hidden">
            {analysisTabs.map((tab) => (
              <div
                key={tab.id}
                className={`absolute inset-0 p-6 rounded-lg transition-opacity duration-300 ease-in-out bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 shadow-lg shadow-purple-500/30 ${
                  activeTab === tab.id
                    ? 'opacity-100 z-10 pointer-events-auto'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div className="h-full overflow-y-auto">
                  {tab.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioFetchPage;
