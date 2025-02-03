"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ContactModal } from "./contact-modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navItems = [
  {
    name: "Tech Stack",
    href: "#tech-stack",
  },
  {
    name: "Solutions",
    href: "#solutions",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
];

export function Nav() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-black/50 backdrop-blur-lg border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="D3V.LABs"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
                <span className="text-xl font-bold ml-2 bg-gradient-to-r from-white/10 to-[#eac01a] bg-clip-text text-transparent">
                  D3V.LABs
                </span>
              </Link>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <div className="space-y-1.5">
                      <div className="w-6 h-0.5 bg-gray-400"></div>
                      <div className="w-6 h-0.5 bg-gray-400"></div>
                      <div className="w-6 h-0.5 bg-gray-400"></div>
                    </div>
                  )}
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ))}
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-[#eac01a] hover:bg-[#eac01a]/90 text-black font-medium
                            px-4 py-2 text-sm rounded-lg transition-all duration-300
                            hover:shadow-[0_0_20px_rgba(234,192,26,0.3)]"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden py-4"
                >
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          scrollToSection(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    ))}
                    <Button
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#eac01a] hover:bg-[#eac01a]/90 text-black font-medium
                                px-4 py-2 text-sm rounded-lg transition-all duration-300
                                hover:shadow-[0_0_20px_rgba(234,192,26,0.3)]"
                    >
                      Contact Us
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </header>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
