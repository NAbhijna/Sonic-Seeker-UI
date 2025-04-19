"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", link: "/#features" },
    { name: "About", link: "/#about" },
    { name: "Analyse", link: "/audio-fetch" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      {/* Navbar */}
      <Navbar visible={visible}>
        <NavBody visible={visible}>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton href="/audio-fetch" variant="gradient">
            Try Now
          </NavbarButton>
        </NavBody>
        <MobileNav visible={visible}>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <NavItems items={navItems} onItemClick={() => setIsOpen(false)} className="!relative !flex !flex-col !items-start !space-x-0 !space-y-4" />
            <NavbarButton href="/audio-fetch" variant="gradient" className="w-full mt-4">
              Try Now
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Optional Footer */}
      {/* <footer className="p-4 text-center text-neutral-500">Footer Content</footer> */}
    </div>
  );
};

export default MainLayout;
