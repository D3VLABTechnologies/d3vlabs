"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="min-h-screen relative flex items-center">
      <div className="max-w-7xl mx-auto px-8 md:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 lg:pl-8 lg:max-w-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Innovate.
              </motion.h1>
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-tight text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Create.
              </motion.h1>
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Transform.
              </motion.h1>
              <motion.p
                as="p"
                className="text-2xl md:text-xl text-gray-400 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                ...Where <span className="text-primary">innovation</span> meets{" "}
                <span className="text-primary">creation</span>
              </motion.p>
              <motion.p
                as="p"
                className="text-sm text-gray-500 mt-4 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Pioneering the next generation of software and hardware
                solutions that redefine what's possible.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right side - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:flex flex-col items-end justify-center -mt-20 relative"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative w-[600px] rounded-xl overflow-visible code-glow border border-blue-500/20"
            >
              {/* Editor Header */}
              <div className="bg-gray-900/50 backdrop-blur-sm p-2 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-gray-400">main.ts</span>
                </div>
              </div>

              {/* Editor Content */}
              <div className="bg-gray-900/30 backdrop-blur-sm p-6 font-mono text-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <CodeLine delay={0.2}>
                    <span className="text-blue-400">import</span>{" "}
                    <span className="text-yellow-300">{"{ D3V }"}</span>{" "}
                    <span className="text-blue-400">from</span>{" "}
                    <span className="text-green-300">'@d3v/core'</span>;
                  </CodeLine>

                  <CodeLine delay={0.4}>
                    <span className="text-purple-400">class</span>{" "}
                    <span className="text-blue-300">InnovationEngine</span>{" "}
                    <span className="text-white">{"{"}</span>
                  </CodeLine>

                  <CodeLine delay={0.6} indent={2}>
                    <span className="text-blue-400">private</span>{" "}
                    <span className="text-yellow-300">engine</span>:{" "}
                    <span className="text-blue-300">D3V.Engine</span>;
                  </CodeLine>

                  <CodeLine delay={0.8} indent={2}>
                    <span className="text-green-400">constructor</span>() {"{"}
                  </CodeLine>

                  <CodeLine delay={1} indent={4}>
                    <span className="text-yellow-300">this</span>.engine = new{" "}
                    <span className="text-blue-300">D3V.Engine</span>();
                  </CodeLine>

                  <CodeLine delay={1.2} indent={2}>
                    {"}"}
                  </CodeLine>

                  <CodeLine delay={1.4} indent={2}>
                    <span className="text-purple-400">async</span>{" "}
                    <span className="text-green-400">transform</span>() {"{"}
                  </CodeLine>

                  <CodeLine delay={1.6} indent={4}>
                    <span className="text-blue-400">await</span>{" "}
                    <span className="text-yellow-300">this</span>.engine.
                  </CodeLine>
                </motion.div>

                {/* Connection line - L-shaped */}
                <div className="absolute bottom-[88px] left-[320px] flex">
                  {/* Vertical line */}
                  <div className="relative">
                    <div className="w-[2px] h-[60px] bg-gradient-to-b from-blue-500/20 to-transparent" />
                  </div>
                  {/* Horizontal line */}
                  <div className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-gradient-to-r from-blue-500/20 to-transparent" />
                </div>

                {/* Autocomplete dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.8 }}
                  className="absolute left-[180px] top-[101%] w-[400px] bg-[#1a1b26]/95 rounded-lg border border-blue-500/20 shadow-2xl backdrop-blur-sm"
                  style={{ zIndex: 1000 }}
                >
                  <div className="py-0.5">
                    {[
                      {
                        icon: "⚡",
                        text: "innovate",
                        desc: "(): Promise<void> - Initiates the innovation process",
                        type: "method",
                      },
                      {
                        icon: "🔄",
                        text: "transform",
                        desc: "(): Promise<Innovation> - Transforms input into innovation",
                        type: "method",
                      },
                      {
                        icon: "✨",
                        text: "initialize",
                        desc: "(): void - Sets up the innovation engine",
                        type: "method",
                      },
                      {
                        icon: "🚀",
                        text: "deploy",
                        desc: "(): Promise<Deployment> - Deploys the innovation",
                        type: "method",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 1.8 + index * 0.05,
                        }}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 cursor-pointer",
                          index === 0 && "bg-white/10"
                        )}
                      >
                        <span className="w-5">{item.icon}</span>
                        <div className="flex flex-col gap-0">
                          <span className="text-white font-medium">
                            {item.text}
                          </span>
                          <span className="text-gray-400 text-xs leading-tight">
                            {item.desc}
                          </span>
                        </div>
                        <span className="ml-auto text-xs text-gray-500">
                          {item.type}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Cursor */}
                <div className="absolute bottom-[88px] left-[320px] w-2 h-5 bg-white/50 animate-cursor" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements - Adjusted positions */}
      <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-primary/5 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[30%] right-[20%] w-32 h-32 bg-blue-500/5 rounded-full animate-float-slow" />
    </section>
  );
}

function CodeLine({
  children,
  delay,
  indent = 0,
}: {
  children: React.ReactNode;
  delay: number;
  indent?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="mb-2"
      style={{ paddingLeft: `${indent * 1}rem` }}
    >
      {children}
    </motion.div>
  );
}

function StatsCard({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      as="div"
      className={cn(
        "px-6 py-4 rounded-xl border border-white/10",
        "transform hover:scale-105 transition-transform duration-200",
        className
      )}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-3xl font-bold text-primary">{number}</h3>
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  );
}
