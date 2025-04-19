"use client";
import React from 'react'; // Removed useState
import Link from 'next/link';
import Image from 'next/image';
import tempImage from './temp/temp.png';
import { FaFileAudio, FaFileVideo } from 'react-icons/fa';

// Define structure for history items
interface HistoryItem {
  id: string;
  name: string;
  type: 'audio' | 'video';
  thumbnailUrl?: string; // Optional: For video thumbnails
  date: string; // Example date
}

const ProfilePage = () => {
  // Placeholder data - replace with actual user data fetching logic
  const username = "ExampleUser";
  const email = "user@example.com";

  // Dummy User History Data (using names from temp folder)
  const userHistory: HistoryItem[] = [
    { id: '1', name: 'audio1.mp3', type: 'audio', date: '2024-07-28' },
    { id: '2', name: 'video1.mp4', type: 'video', thumbnailUrl: '/path/to/video1-thumb.jpg', date: '2024-07-27' },
    { id: '3', name: 'audio2.wav', type: 'audio', date: '2024-07-26' },
    { id: '4', name: 'video2.webm', type: 'video', thumbnailUrl: '/path/to/video2-thumb.jpg', date: '2024-07-25' },
  ];

  return (
    <div className="flex flex-grow p-4 gap-4">
      {/* Left Column (Inline Sidebar) */}
      <div className="w-64 flex-shrink-0 bg-neutral-800 rounded-lg p-4 flex flex-col items-center">
        {/* Avatar */}
        <div className="mb-6 mt-4">
          <Image
            src={tempImage}
            alt="User Avatar"
            width={128}
            height={128}
            className="rounded-full object-cover border-2 border-neutral-600"
          />
        </div>

        {/* Navigation Links */}
        <nav className="w-full flex flex-col gap-2">
          <Link href="/" passHref>
            <span className="block w-full text-left px-4 py-2 rounded hover:bg-neutral-700 cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/profile" passHref>
            <span className="block w-full text-left px-4 py-2 rounded bg-neutral-600 cursor-pointer">
              Profile
            </span>
          </Link>
          <Link href="/audio-fetch" passHref>
            <span className="block w-full text-left px-4 py-2 rounded hover:bg-neutral-700 cursor-pointer">
              Audio Fetch
            </span>
          </Link>
        </nav>
      </div>

      {/* Right Column (Main Content) */}
      <div className="flex-grow p-6 md:p-10 bg-neutral-800 rounded-lg overflow-y-auto">
        {/* User Info Section */}
        <div className="mb-8">
          <p className="text-2xl font-semibold">{username}</p>
          <p className="text-neutral-400">{email}</p>
        </div>

        {/* User History Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-neutral-700 pb-2">User History</h2>
          <ul className="space-y-4">
            {userHistory.length > 0 ? (
              userHistory.map((item) => (
                <li key={item.id} className="flex items-center gap-4 p-3 bg-neutral-700/50 rounded-md hover:bg-neutral-700 transition-colors">
                  {item.type === 'video' ? (
                    // Use Image component for video thumbnail placeholder
                    <div className="w-16 h-10 rounded flex-shrink-0 overflow-hidden">
                      <Image
                        src={tempImage} // Use the imported temp image
                        alt={`${item.name} thumbnail`}
                        width={64} // Corresponds to w-16
                        height={40} // Corresponds to h-10
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    // Keep icon for audio
                    <div className="w-16 h-10 flex items-center justify-center flex-shrink-0">
                      <FaFileAudio className="text-neutral-400 text-3xl" />
                    </div>
                  )}
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm font-medium truncate" title={item.name}>{item.name}</p>
                    <p className="text-xs text-neutral-400">{item.date}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-neutral-500">No history found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
