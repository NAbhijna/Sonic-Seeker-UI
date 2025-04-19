"use client";
import React, { useState, useRef } from 'react';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/navbar";
import { usePathname } from 'next/navigation';
import { useScroll, useMotionValueEvent } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const navItems = [
    { name: "Features", link: "/#features" },
    { name: "About Us", link: "/#about" },
  ];
  const isHomePage = pathname === '/';

  return (
    <div ref={ref} className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <Navbar className="sticky top-0 w-full z-50 bg-transparent" visible={visible}>
        <NavBody visible={visible} className="bg-neutral-950 bg-opacity-80 backdrop-blur-sm">
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={() => setIsOpen(false)} />
          {isHomePage ? (
             <NavbarButton href="/login" className="ml-auto">
               Login
             </NavbarButton>
          ) : (
             <NavbarButton
               href="/profile"
               className="ml-auto"
               variant="secondary"
             >
               Profile
             </NavbarButton>
          )}
        </NavBody>

        <MobileNav visible={visible}>
          <MobileNavHeader className="bg-neutral-950 border-b border-neutral-800">
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)} className="bg-neutral-950">
            {navItems.map((item) => (
              <a key={item.link} href={item.link} onClick={() => setIsOpen(false)} className="block py-2 text-white">
                {item.name}
              </a>
            ))}
            {isHomePage ? (
              <NavbarButton href="/login" variant="primary" className="w-full mt-4">
                Login
              </NavbarButton>
            ) : (
              <NavbarButton href="/profile" variant="secondary" className="w-full mt-4">
                Profile
              </NavbarButton>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
