"use client";

import { Hero } from "@/components/hero";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../components/ui/navbar";
import React, { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Features", link: "#features" }, 
    { name: "About Us", link: "#about" },
  ];

  return (
    <main className="min-h-screen relative bg-background text-white border-none">  
      <Navbar className="fixed top-0 w-full z-50 bg-transparent">
        <NavBody className="bg-neutral-950 bg-opacity-80 backdrop-blur-sm"> 
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton 
            href="/login" 
            className="ml-auto"
          > 
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

      <section id="features" className="h-screen p-10 bg-neutral-900 pt-20">
        <h2 className="text-3xl font-bold text-center text-white">Features Section</h2>
      </section>
      <section id="about" className="h-screen p-10 bg-neutral-800">
        <h2 className="text-3xl font-bold text-center text-white">About Us Section</h2>
      </section>
    </main>
  );
}
