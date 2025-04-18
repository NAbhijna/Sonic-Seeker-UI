"use client";
import React, { useState } from 'react'; // Import useState
// Removed ProfileSidebar import
// import ProfileSidebar from '@/components/profile/sidebar';
import Link from 'next/link'; // Import Link for navigation
// Import Navbar components
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/navbar";
import Image from 'next/image'; // Import the Next.js Image component
import tempImage from './temp/temp.png'; // Import the image file directly

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile nav

  // Placeholder data - replace with actual user data fetching logic
  const username = "ExampleUser";
  const email = "user@example.com";
  // Using imported tempImage for avatar

  // Dummy upload history data - using files from temp folder path
  // NOTE: URLs for audio need to be accessible by the browser.
  // If abhijna.wav is also in ./temp, its URL might need adjustment depending on setup.
  // For now, keeping placeholder URL structure but using tempImage for video.
  const uploadHistory = [
    { id: 1, type: 'audio', name: 'abhijna.wav', date: '2023-10-26', url: '/profile/temp/abhijna.wav' }, // Assuming this path works
    { id: 2, type: 'video', name: 'temp.png as video', date: '2023-10-25', url: null }, // Video file example using temp image
    { id: 3, type: 'audio', name: 'AnotherAudio.mp3', date: '2023-10-24', url: null }, // Example audio without direct URL
  ];

  // Define nav items for the main navbar - Ensure this is correctly defined
  const navItems = [
    { name: "Features", link: "/#features" }, // Link back to home page sections
    { name: "About Us", link: "/#about" },
  ];

  return (
    // Main page container - Use flex column layout
    <div className="flex flex-col min-h-screen text-white bg-neutral-900">
      {/* Navbar at the top - Detailed Implementation */}
      <Navbar className="sticky top-0 w-full z-50 bg-transparent">
        <NavBody className="bg-neutral-950 bg-opacity-80 backdrop-blur-sm">
          <NavbarLogo />
          <NavItems items={navItems} />
          {/* Link to profile page from Navbar */}
          <NavbarButton
            href="/profile"
            className="ml-auto"
            variant="secondary" // Use secondary style for profile link
          >
            Profile
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
             {/* Link to profile page in mobile menu */}
            <NavbarButton href="/profile" variant="secondary" className="w-full mt-4">
              Profile
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Container for profile content below the navbar - Make it grow */}
      <div className="flex flex-grow p-4 gap-4"> {/* Added flex-grow */}

        {/* NEW: Left Column (Inline Sidebar) */}
        <div className="w-64 flex-shrink-0 bg-neutral-800 rounded-lg p-4 flex flex-col items-center">
          {/* Avatar */}
          <div className="mb-6 mt-4">
            <Image
              src={tempImage}
              alt="User Avatar"
              width={128} // Increased size for sidebar
              height={128}
              className="rounded-full object-cover border-2 border-neutral-600" // Added border
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
              {/* Indicate active page */}
              <span className="block w-full text-left px-4 py-2 rounded bg-neutral-600 cursor-pointer">
                Profile
              </span>
            </Link>
            {/* Added Audio Fetch Link */}
            <Link href="/audio-fetch" passHref>
              <span className="block w-full text-left px-4 py-2 rounded hover:bg-neutral-700 cursor-pointer">
                Audio Fetch
              </span>
            </Link>
            {/* Add other links here if needed */}
          </nav>
        </div>

        {/* Right Column (Main Content) - Kept existing structure */}
        <div className="flex-grow p-6 md:p-10 bg-neutral-800 rounded-lg"> {/* Added bg and rounded */}
          {/* User Info Section (Top of Right Column) */}
          <div className="mb-8">
            <p className="text-2xl font-semibold">{username}</p>
            <p className="text-neutral-400">{email}</p>
          </div>

          {/* Upload History Section (Below User Info) */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upload History</h2>
            {uploadHistory.length > 0 ? (
              <ul className="space-y-3">
                {uploadHistory.map((file) => (
                  // Use a darker background for list items for contrast
                  <li key={file.id} className="bg-neutral-700 border border-neutral-600 rounded-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Conditional rendering based on file type */}
                    {file.type === 'audio' && file.url ? (
                      // Audio Player
                      <div className="flex-grow w-full sm:w-auto">
                         <p className="font-medium mb-2 sm:hidden">{file.name}</p>
                         <audio controls src={file.url} className="w-full rounded">
                           Your browser does not support the audio element.
                         </audio>
                      </div>
                    ) : file.type === 'video' ? (
                      // Video Thumbnail
                      <div className="flex items-center gap-3 flex-grow w-full sm:w-auto">
                        <Image
                          src={tempImage} // Use the imported image variable for video thumbnail
                          alt={`${file.name} thumbnail`}
                          width={64} // Adjust size as needed
                          height={64}
                          className="w-16 h-16 object-cover rounded flex-shrink-0" // Added styling
                        />
                        <span className="font-medium text-neutral-200">{file.name}</span>
                      </div>
                    ) : (
                      // Fallback for other types or missing URLs
                      <div className="flex items-center gap-3 text-neutral-400 flex-grow">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                           <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
                         </svg>
                        <span className="font-medium text-neutral-200">{file.name} ({file.type})</span>
                      </div>
                    )}
                     {/* File details (name on larger screens, date) */}
                     <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-neutral-400 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Show name here only if it's not already shown with thumbnail/icon */}
                        {file.type !== 'video' && file.type !== 'audio' && <span className="font-medium text-neutral-200 hidden sm:inline">{file.name}</span>}
                        {file.type === 'audio' && <span className="font-medium text-neutral-200 hidden sm:inline">{file.name}</span>}
                        <span>{file.date}</span>
                     </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-500">No uploads yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
