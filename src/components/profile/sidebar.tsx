import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image for optimization

interface ProfileSidebarProps {
  avatarUrl: string;
  username: string;
  activePage: 'profile' | 'audio-fetch'; // To highlight the active link
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ avatarUrl, username, activePage }) => {
  return (
    <div className="w-64 bg-neutral-800 p-4 flex flex-col items-center gap-6 rounded-lg h-full"> {/* Fixed width, rounded */}
      <Image // Use Next/Image
        src={avatarUrl}
        alt={`${username}'s avatar`}
        width={128} // Specify width
        height={128} // Specify height
        className="rounded-full border-2 border-blue-500 mt-8"
      />
      <nav className="flex flex-col gap-4 w-full mt-8">
        <Link href="/" className="text-neutral-300 hover:text-white hover:bg-neutral-700 p-2 rounded text-center transition-colors duration-200">
          Main Page
        </Link>
        <Link href="/profile" className={`p-2 rounded text-center transition-colors duration-200 ${activePage === 'profile' ? 'text-white bg-neutral-700 font-semibold' : 'text-neutral-300 hover:text-white hover:bg-neutral-700'}`}>
          Profile
        </Link>
        <Link href="/profile/audio-fetch" className={`p-2 rounded text-center transition-colors duration-200 ${activePage === 'audio-fetch' ? 'text-white bg-neutral-700 font-semibold' : 'text-neutral-300 hover:text-white hover:bg-neutral-700'}`}>
          Audio-fetch
        </Link>
        {/* Add more navigation links here if needed */}
      </nav>
    </div>
  );
};

export default ProfileSidebar;
