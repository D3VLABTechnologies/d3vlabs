"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const backgroundImages = [
  "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=1920&q=80",
  "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=1920&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1920&q=80",
  "https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=1920&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
  "https://images.unsplash.com/photo-1538582709238-0a503bd5ae04?w=1920&q=80",
  "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=1920&q=80",
  "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=1920&q=80",
  "https://images.unsplash.com/photo-1507090960745-b32f65d3113a?w=1920&q=80",
  "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=1920&q=80",
  "https://images.unsplash.com/photo-1557409518-691ebcd96038?w=1920&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
  "https://images.unsplash.com/photo-1549893072-4bc678117f45?w=1920&q=80",
  "https://images.unsplash.com/photo-1504883303951-581cbf120aa4?w=1920&q=80",
  "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1920&q=80",
  "https://images.unsplash.com/photo-1478039414627-50a2aee2e122?w=1920&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
  "signature.jpg",
];

export function Location() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 1000);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 50]);

  // Google Maps link for Adenta Ritz Junction
  const mapUrl =
    "https://maps.google.com/?q=Adenta+Ritz+Junction,+Accra,+Ghana";

  return (
    <section
      ref={sectionRef}
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-cover bg-center min-h-[35vh] sm:min-h-[40vh] bg-fixed overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
        transition: "background-image 4s ease-in-out",
        opacity: isTransitioning ? 0.8 : 1,
      }}
    >
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-overlay" />

      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.2),rgba(0,0,0,0))] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.2),rgba(0,0,0,0))] animate-pulse delay-1000" />
      </div>

      {/* Floating particles effect - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* Left side - City Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full md:w-auto text-center md:text-left"
          >
            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute -top-2 left-0 h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent hidden md:block"
              />
              <h1 className="text-[2.5rem] xs:text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] font-bold text-white leading-none tracking-tight">
                Adenta
              </h1>
              <div className="flex items-center gap-3 mt-2 justify-center md:justify-start">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent hidden md:block"
                />
                <h2 className="text-lg xs:text-xl sm:text-2xl text-white/80 font-light tracking-wider">
                  Ritz Junction
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Middle - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex-shrink-0 w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 
                       -mx-4 md:mx-0 md:ml-8 lg:ml-12 group order-first md:order-none mt-4 md:mt-0"
          >
            <Link
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full transform transition-transform duration-300 hover:scale-110"
            >
              <Image
                src="/map.svg"
                alt="Location Map"
                width={192}
                height={192}
                className="relative w-full h-full p-3 sm:p-4 opacity-80 group-hover:opacity-100 transition-all duration-300"
              />
            </Link>
          </motion.div>

          {/* Right side - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex-1 w-full md:w-auto text-center md:text-right"
          >
            <div className="flex flex-col items-center md:items-end gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <span className="text-sm sm:text-base font-light tracking-wider">
                  GD-564-5765
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full"
                    fill="currentColor"
                  >
                    <path d="M12 0C7.453 0 3.623 3.853 3.623 8.429c0 6.502 7.18 14.931 7.48 15.283a1.176 1.176 0 0 0 1.794 0c.3-.352 7.48-8.781 7.48-15.283C20.377 3.853 16.547 0 12 0zm0 11.143c-1.964 0-3.555-1.592-3.555-3.557S10.036 4.03 12 4.03s3.555 1.591 3.555 3.556S13.964 11.143 12 11.143z" />
                  </svg>
                </motion.div>
              </div>

              <div className="relative space-y-2 sm:space-y-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="absolute -top-2 right-0 h-[1px] bg-gradient-to-l from-blue-500/50 to-transparent hidden md:block"
                />
                <span className="text-base sm:text-lg text-white/90 font-medium block tracking-wide">
                  ADENTA-RITZ JUNCTION
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  className="h-[1px] w-24 sm:w-32 mx-auto md:ml-auto md:mr-0 bg-gradient-to-l from-white/20 to-transparent"
                />
                <div className="flex items-center gap-2 text-white/70 justify-center md:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                      <path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
                    </svg>
                  </motion.div>
                  <span className="text-sm sm:text-base font-light tracking-wider">
                    Accra, Ghana
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
