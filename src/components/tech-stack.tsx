"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface Connection {
  from: string;
  to: string;
  path: string;
}

export function TechStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const positionsRef = useRef<{ [key: string]: { x: number; y: number } }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [visibleIcons, setVisibleIcons] = useState<string[]>([]);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] =
    useState(false);
  const connectionOrderRef = useRef<string[]>([]);
  const animationStartTimeRef = useRef(Date.now());
  const lastPulseTimeRef = useRef(Date.now());
  const activePulsesRef = useRef<
    {
      fromIcon: string;
      toIcon: string;
      progress: number;
      colors: { start: string; end: string };
    }[]
  >([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [animationPhase, setAnimationPhase] = useState<"initial" | "random">(
    "initial"
  );

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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Add this effect to handle visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.2 } // Start when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Modify the icon appearance effect
  useEffect(() => {
    if (!isSectionVisible) return;

    const shuffledOrder = techIcons
      .map((icon) => icon.name)
      .sort(() => Math.random() - 0.5);
    connectionOrderRef.current = shuffledOrder;

    // Start the sequential animation with slower timing
    shuffledOrder.forEach((iconName, index) => {
      setTimeout(() => {
        setVisibleIcons((prev) => [...prev, iconName]);

        // Add pulse for the connection to next icon
        if (index < shuffledOrder.length - 1) {
          const nextIconName = shuffledOrder[index + 1];
          activePulsesRef.current.push({
            fromIcon: iconName,
            toIcon: nextIconName,
            progress: 0,
            colors: glowColors[index % glowColors.length],
          });
        }

        // After last icon appears, switch to random mode
        if (index === shuffledOrder.length - 1) {
          setTimeout(() => {
            setAnimationPhase("random");
            setIsInitialAnimationComplete(true);
          }, 2000); // Increased delay before random mode
        }
      }, index * 800); // Increased delay between icons
    });
  }, [isSectionVisible]);

  // Add this array at the top of the component
  const glowColors = [
    { start: "#FF0080", end: "#7928CA" }, // Pink to Purple
    { start: "#7928CA", end: "#FF0080" }, // Purple to Pink
    { start: "#00DFD8", end: "#007CF0" }, // Cyan to Blue
    { start: "#007CF0", end: "#00DFD8" }, // Blue to Cyan
    { start: "#FF4D4D", end: "#F9CB28" }, // Red to Yellow
    { start: "#F9CB28", end: "#FF4D4D" }, // Yellow to Red
  ];

  // Add this helper function at the component level (before useEffect)
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Modify the canvas effect to depend on section visibility
  useEffect(() => {
    if (!isSectionVisible) return; // Don't start if section is not visible

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const updateIconPositions = () => {
      const icons = container.querySelectorAll(".tech-icon");
      const newPositions: { [key: string]: { x: number; y: number } } = {};

      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        newPositions[icon.getAttribute("data-name") || ""] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      positionsRef.current = newPositions;
    };

    const handleResize = () => {
      updateCanvasSize();
      updateIconPositions();
      // Force redraw when window size changes
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track animation progress
      const currentTime = Date.now();
      const timeSinceStart = currentTime - animationStartTimeRef.current;
      const fullConnectionDuration = 2000; // 2 seconds for full connection animation

      // Before the connection drawing loop, add pulse management
      const pulseInterval = 1000; // New pulse every second

      // Pulse management based on animation phase
      if (animationPhase === "random") {
        // Create new random pulse if enough time has passed
        if (currentTime - lastPulseTimeRef.current > pulseInterval) {
          const possibleConnections = Object.entries(positionsRef.current)
            .filter(([name1]) => visibleIcons.includes(name1))
            .flatMap(([name1]) =>
              Object.entries(positionsRef.current)
                .filter(
                  ([name2]) => visibleIcons.includes(name2) && name1 !== name2
                )
                .map(([name2]) => ({ fromIcon: name1, toIcon: name2 }))
            );

          if (possibleConnections.length > 0) {
            const randomConnection =
              possibleConnections[
                Math.floor(Math.random() * possibleConnections.length)
              ];
            const colorIndex = Math.floor(Math.random() * glowColors.length);

            activePulsesRef.current.push({
              ...randomConnection,
              progress: 0,
              colors: glowColors[colorIndex],
            });

            lastPulseTimeRef.current = currentTime;
          }
        }
      }

      // Update and draw existing pulses
      activePulsesRef.current = activePulsesRef.current.filter((pulse) => {
        const fromPos = positionsRef.current[pulse.fromIcon];
        const toPos = positionsRef.current[pulse.toIcon];

        if (!fromPos || !toPos) return false;

        // Slower animation speed
        const speedMultiplier = animationPhase === "initial" ? 0.6 : 0.4;
        pulse.progress += 0.01 * speedMultiplier; // Reduced base speed

        if (pulse.progress >= 1) return false;

        // Draw pulse with enhanced glow for initial phase
        const pulseX = fromPos.x + (toPos.x - fromPos.x) * pulse.progress;
        const pulseY = fromPos.y + (toPos.y - fromPos.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(
          pulseX,
          pulseY,
          animationPhase === "initial" ? 5 : 4,
          0,
          Math.PI * 2
        );

        const gradientSize = animationPhase === "initial" ? 40 : 30;
        const pulseGradient = ctx.createRadialGradient(
          pulseX,
          pulseY,
          0,
          pulseX,
          pulseY,
          gradientSize
        );

        const glowIntensity = animationPhase === "initial" ? 0.7 : 0.5;
        pulseGradient.addColorStop(
          0,
          hexToRgba(pulse.colors.start, glowIntensity)
        );
        pulseGradient.addColorStop(1, hexToRgba(pulse.colors.end, 0));

        ctx.fillStyle = pulseGradient;
        ctx.shadowColor = pulse.colors.start;
        ctx.shadowBlur = animationPhase === "initial" ? 20 : 15;
        ctx.fill();

        ctx.shadowBlur = 0;

        return pulse.progress < 1;
      });

      // Only draw connections for visible icons
      Object.entries(positionsRef.current).forEach(([name1, pos1], index1) => {
        if (!visibleIcons.includes(name1)) return;

        // Don't draw connections on mobile/tablet
        if (window.innerWidth < 1024) return; // 1024px is the lg breakpoint in Tailwind

        Object.entries(positionsRef.current).forEach(
          ([name2, pos2], index2) => {
            if (!visibleIcons.includes(name2) || name1 === name2) return;

            // Check if this connection should be drawn based on animation progress
            const icon1Index = connectionOrderRef.current.indexOf(name1);
            const icon2Index = connectionOrderRef.current.indexOf(name2);

            let shouldDraw = false;
            let connectionProgress = 1;

            if (!isInitialAnimationComplete) {
              // During initial animation, only connect consecutive icons
              shouldDraw = Math.abs(icon1Index - icon2Index) <= 1;
            } else {
              // After initial animation, gradually show all connections
              const progressRatio = Math.min(
                1,
                timeSinceStart / fullConnectionDuration
              );

              // Calculate distance between icons in the order
              const orderDistance = Math.abs(icon1Index - icon2Index);
              const maxDistance = connectionOrderRef.current.length;
              const normalizedDistance = orderDistance / maxDistance;

              // Draw connection if we've progressed far enough
              shouldDraw = normalizedDistance <= progressRatio;
              connectionProgress = shouldDraw
                ? Math.min(1, (progressRatio - normalizedDistance) * 2)
                : 0;
            }

            if (shouldDraw) {
              const dx = pos2.x - pos1.x;
              const dy = pos2.y - pos1.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 300) {
                const opacity =
                  Math.max(0.1, 1 - distance / 300) * connectionProgress;

                // Select color pair based on indices
                const colorIndex = (index1 + index2) % glowColors.length;
                const colors = glowColors[colorIndex];

                // Create gradient for the connection line
                const gradient = ctx.createLinearGradient(
                  pos1.x,
                  pos1.y,
                  pos2.x * connectionProgress +
                    pos1.x * (1 - connectionProgress),
                  pos2.y * connectionProgress +
                    pos1.y * (1 - connectionProgress)
                );

                gradient.addColorStop(
                  0,
                  hexToRgba(colors.start, opacity * 0.5)
                );
                gradient.addColorStop(1, hexToRgba(colors.end, opacity * 0.5));

                // Enhanced glow effect
                ctx.shadowColor = colors.start;
                ctx.shadowBlur = 15;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                // Draw connection line with gradient
                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.moveTo(pos1.x, pos1.y);
                ctx.lineTo(
                  pos2.x * connectionProgress +
                    pos1.x * (1 - connectionProgress),
                  pos2.y * connectionProgress +
                    pos1.y * (1 - connectionProgress)
                );
                ctx.stroke();

                // Reset shadow effect
                ctx.shadowBlur = 0;
              }
            }
          }
        );
      });

      animationFrameRef.current = requestAnimationFrame(drawConnections);
    };

    // Reset animation start time when initial animation completes
    if (isInitialAnimationComplete) {
      animationStartTimeRef.current = Date.now();
    }

    // Initial setup
    updateCanvasSize();
    updateIconPositions();
    drawConnections();

    // Event listeners
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    visibleIcons,
    isInitialAnimationComplete,
    isSectionVisible,
    animationPhase,
  ]); // Add isSectionVisible to dependencies

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="py-8 md:py-12 relative overflow-hidden px-4 md:px-16"
    >
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-20 relative"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.8 }}
        />

        {/* Left side - Content */}
        <div className="w-full lg:w-1/3 pt-4 lg:pt-12 px-0 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }} // Small delay after section becomes visible
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
            {techIcons.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  visibleIcons.includes(tech.name)
                    ? { opacity: 1, scale: 1 }
                    : {}
                }
                viewport={{ once: true }}
                transition={{
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
                  data-name={tech.name}
                  className="tech-icon w-16 md:w-20 lg:w-16 h-16 md:h-20 lg:h-16 bg-[#1a1b26]/80 rounded-lg border border-white/10 backdrop-blur-sm 
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
