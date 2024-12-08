"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";
import { ContactModal } from "./contact-modal";

const glowVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export function CTA() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="relative py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            {/* Border Container */}
            <div className="absolute inset-0">
              {/* Diagonal lines with glow effects */}
              <div className="absolute left-0 top-0 w-[140px] h-[140px] border-l-2 border-t-2 border-white/10">
                <div className="absolute h-[2px] w-[200%] top-[-1px] left-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      x: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                </div>
                <div className="absolute w-[2px] h-[200%] left-[-1px] top-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      y: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                </div>
              </div>
              <div className="absolute right-0 top-0 w-[140px] h-[140px] border-r-2 border-t-2 border-white/10">
                <div className="absolute h-[2px] w-[200%] top-[-1px] left-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      x: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 1,
                    }}
                  />
                </div>
                <div className="absolute w-[2px] h-[200%] left-[-1px] top-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      y: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 1.5,
                    }}
                  />
                </div>
              </div>
              <div className="absolute left-0 bottom-0 w-[140px] h-[140px] border-l-2 border-b-2 border-white/10">
                <div className="absolute h-[2px] w-[200%] top-[-1px] left-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      x: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 2,
                    }}
                  />
                </div>
                <div className="absolute w-[2px] h-[200%] left-[-1px] top-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      y: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 2.5,
                    }}
                  />
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-[140px] h-[140px] border-r-2 border-b-2 border-white/10">
                <div className="absolute h-[2px] w-[200%] top-[-1px] left-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      x: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 3,
                    }}
                  />
                </div>
                <div className="absolute w-[2px] h-[200%] left-[-1px] top-[-50%] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 h-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                    animate={{
                      y: ["0%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 3.5,
                    }}
                  />
                </div>
              </div>

              {/* Connecting glowing lines */}
              <div className="absolute left-[140px] top-0 right-[140px] h-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                  animate={{
                    x: ["0%", "200%"],
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </div>
              <div className="absolute left-[140px] bottom-0 right-[140px] h-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                  animate={{
                    x: ["0%", "200%"],
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    delay: 2,
                  }}
                />
              </div>
              <div className="absolute top-[140px] bottom-[140px] left-0 w-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                  animate={{
                    y: ["0%", "200%"],
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </div>
              <div className="absolute top-[140px] bottom-[140px] right-0 w-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                  animate={{
                    y: ["0%", "200%"],
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    delay: 3,
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative py-16 px-4">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Transform your ideas into reality
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-gray-400 text-base mb-8">
                    Join hundreds of businesses deploying high-performance apps
                    and software solutions effortlessly with D3V.LABs
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    className="bg-[#eac01a] hover:bg-[#eac01a]/90 text-black font-medium
                              px-6 py-2 text-base rounded-lg transition-all duration-300
                              hover:shadow-[0_0_20px_rgba(194,245,86,0.3)]"
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient orbs */}
          <div className="absolute -top-1/2 left-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/2 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
