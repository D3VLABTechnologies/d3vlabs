"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";

interface Connection {
  from: string;
  to: string;
  path: string;
}

export function TechStack() {
  const techIcons = useMemo(
    () => [
      // Top row - Adjusted positions for better mobile/tablet display
      {
        icon: "/icons/python.svg",
        name: "Python",
        x: "30%",
        y: "20%",
        mobileX: "25%",
        mobileY: "15%",
      },
      {
        icon: "/icons/next.svg",
        name: "Next.js",
        x: "50%",
        y: "20%",
        mobileX: "50%",
        mobileY: "15%",
      },
      {
        icon: "/icons/tailwind.svg",
        name: "Tailwind",
        x: "70%",
        y: "20%",
        mobileX: "75%",
        mobileY: "15%",
      },

      // Middle row
      {
        icon: "/icons/aws.svg",
        name: "AWS",
        x: "25%",
        y: "50%",
        mobileX: "25%",
        mobileY: "50%",
      },
      {
        icon: "/icons/react.svg",
        name: "React",
        x: "45%",
        y: "50%",
        mobileX: "50%",
        mobileY: "50%",
      },
      {
        icon: "/icons/docker.svg",
        name: "Docker",
        x: "65%",
        y: "50%",
        mobileX: "75%",
        mobileY: "50%",
      },

      // Bottom row
      {
        icon: "/icons/swift.svg",
        name: "Swift",
        x: "30%",
        y: "80%",
        mobileX: "25%",
        mobileY: "85%",
      },
      {
        icon: "/icons/github.svg",
        name: "GitHub",
        x: "50%",
        y: "80%",
        mobileX: "50%",
        mobileY: "85%",
      },
      {
        icon: "/icons/node.svg",
        name: "Node.js",
        x: "70%",
        y: "80%",
        mobileX: "75%",
        mobileY: "85%",
      },
    ],
    []
  );

  const [paths, setPaths] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const generatePath = useCallback(
    (from: (typeof techIcons)[0], to: (typeof techIcons)[0]) => {
      // Convert percentage strings to numbers for calculations
      const fromX = parseFloat(from.x) / 100;
      const fromY = parseFloat(from.y) / 100;
      const toX = parseFloat(to.x) / 100;
      const toY = parseFloat(to.y) / 100;

      // Calculate control point for the quadratic curve
      const midX = (fromX + toX) / 2 + (Math.random() * 0.2 - 0.1);
      const midY = (fromY + toY) / 2 + (Math.random() * 0.2 - 0.1);

      // Convert back to percentage strings for the SVG path
      return `M${fromX * 100}%,${fromY * 100}% Q${midX * 100}%,${midY * 100}% ${
        toX * 100
      }%,${toY * 100}%`;
    },
    []
  );

  const generateRandomConnection = useCallback(() => {
    const from = techIcons[Math.floor(Math.random() * techIcons.length)];
    let to = techIcons[Math.floor(Math.random() * techIcons.length)];

    while (to === from) {
      to = techIcons[Math.floor(Math.random() * techIcons.length)];
    }

    return generatePath(from, to);
  }, [generatePath, techIcons]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    generateRandomConnection();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [generateRandomConnection]);

  // Initialize paths
  useEffect(() => {
    setPaths(Array.from({ length: 12 }, () => generateRandomConnection()));
  }, [generateRandomConnection]);

  // Update path when animation completes
  const updatePath = (index: number) => {
    setPaths((currentPaths) => {
      const newPaths = [...currentPaths];
      newPaths[index] = generateRandomConnection();
      return newPaths;
    });
  };

  return (
    <section
      id="tech-stack"
      className="py-8 md:py-12 relative overflow-hidden px-4 md:px-16"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        {/* Left side - Content */}
        <div className="w-full lg:w-1/3 pt-4 lg:pt-12 px-0 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-semibold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Innovative and Scalable Solutions
            </h2>
            <p className="text-base md:text-xl lg:text-lg text-gray-400 leading-relaxed mb-6 lg:mb-8">
              Empowering businesses with cutting-edge software development
              services. Whether you need mobile apps, web platforms, or
              comprehensive backend systems, our team creates tailored solutions
              to bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button className="px-4 md:px-6 py-2 md:py-2.5 bg-[#1a1b26] border border-white/10 rounded-lg hover:border-blue-400/50 transition-colors duration-300 text-sm md:text-base">
                Explore Services
              </button>
              <button className="px-4 md:px-6 py-2 md:py-2.5 text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base">
                Learn more
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right side - Tech Icons with dynamic glow connections */}
        <div className="w-full lg:w-2/3 relative h-[400px] md:h-[500px] lg:h-[400px] -mx-4 md:mx-0 md:-mr-20 mt-8 lg:mt-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Vertical lines */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, transparent, transparent 49.9%, rgba(96, 165, 250, 0.3) 49.9%, rgba(96, 165, 250, 0.3) 50.1%, transparent 50.1%),
                  linear-gradient(to bottom, transparent, transparent 49.9%, rgba(96, 165, 250, 0.3) 49.9%, rgba(96, 165, 250, 0.3) 50.1%, transparent 50.1%)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Grid dots */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(96, 165, 250, 0.3) 1px, transparent 1px)",
                backgroundSize: "25px 25px",
              }}
            />

            {/* Glowing areas */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[100px]" />
            </div>
          </div>

          <div className="absolute inset-0 scale-90 md:scale-100 origin-center">
            {/* Moving Glow Lines */}
            {Array.from({ length: 8 }).map((_, index) => {
              // Randomly select start and end icons
              const randomStart = Math.floor(Math.random() * techIcons.length);
              let randomEnd = Math.floor(Math.random() * techIcons.length);

              // Ensure we don't connect to the same icon
              while (randomEnd === randomStart) {
                randomEnd = Math.floor(Math.random() * techIcons.length);
              }

              const from = techIcons[randomStart];
              const to = techIcons[randomEnd];

              const fromX = parseFloat(isMobile ? from.mobileX : from.x);
              const fromY = parseFloat(isMobile ? from.mobileY : from.y);
              const toX = parseFloat(isMobile ? to.mobileX : to.x);
              const toY = parseFloat(isMobile ? to.mobileY : to.y);

              // Calculate the distance and angle
              const distance = Math.sqrt(
                Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
              );
              const angle =
                Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

              return (
                <div
                  key={`glow-line-${index}`}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: `${fromX}% ${fromY}%`,
                  }}
                >
                  <motion.div
                    className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    style={{
                      width: "40px",
                      left: `${fromX}%`,
                      top: `${fromY}%`,
                    }}
                    animate={{
                      x: [0, distance],
                      opacity: [0, 1, 1, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      repeatDelay: Math.random() * 3 + 1,
                      ease: "linear",
                    }}
                  />
                </div>
              );
            })}

            {/* Tech Icons */}
            {techIcons.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                style={{
                  position: "absolute",
                  left: `${isMobile ? tech.mobileX : tech.x}`,
                  top: `${isMobile ? tech.mobileY : tech.y}`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
                className="transform scale-100 md:scale-100"
              >
                <div
                  className="w-16 md:w-20 lg:w-16 h-16 md:h-20 lg:h-16 bg-[#1a1b26]/80 rounded-lg border border-white/10 backdrop-blur-sm 
                            flex items-center justify-center transition-all duration-300
                            hover:border-blue-400/50 hover:scale-110 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]
                            group"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                              transition-all duration-300 text-sm md:text-base lg:text-sm text-gray-400 whitespace-nowrap
                              pointer-events-none select-none"
                  >
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
