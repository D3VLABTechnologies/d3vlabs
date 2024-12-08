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
      // Top row
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
      const fromX = parseFloat(from.x) / 100;
      const fromY = parseFloat(from.y) / 100;
      const toX = parseFloat(to.x) / 100;
      const toY = parseFloat(to.y) / 100;

      const midX = (fromX + toX) / 2 + (Math.random() * 0.2 - 0.1);
      const midY = (fromY + toY) / 2 + (Math.random() * 0.2 - 0.1);

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
  }, [techIcons, generatePath]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const initialPaths = Array.from({ length: 12 }, () =>
      generateRandomConnection()
    );
    setPaths(initialPaths);
  }, [generateRandomConnection]);

  const updatePath = useCallback(
    (index: number) => {
      setPaths((currentPaths) => {
        const newPaths = [...currentPaths];
        newPaths[index] = generateRandomConnection();
        return newPaths;
      });
    },
    [generateRandomConnection]
  );

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
          {/* SVG container with responsive scaling */}
          <div className="absolute inset-0 scale-90 md:scale-100 origin-center">
            {/* Glowing Connections SVG */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(234, 192, 26, 0)" />
                  <stop offset="50%" stopColor="rgba(234, 192, 26, 1)" />
                  <stop offset="100%" stopColor="rgba(234, 192, 26, 0)" />
                </linearGradient>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="4" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.917647
                            0 0 0 0 0.752941
                            0 0 0 0 0.101961
                            0 0 0 0.6 0"
                  />
                </filter>
              </defs>

              {paths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  stroke="url(#glow)"
                  strokeWidth="6"
                  fill="none"
                  filter="url(#blur)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: index * 0.3,
                    repeatDelay: 0.5,
                  }}
                  onAnimationComplete={() => updatePath(index)}
                />
              ))}
            </svg>

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
