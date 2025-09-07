"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Technology {
  name: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  type: "web" | "mobile";
  images: string[];
  technologies: Technology[];
  liveUrl?: string;
  githubUrl?: string;
  status: "completed" | "in-progress" | "maintenance";
  categories: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "DULCIS POS",
    description:
      "Modern point-of-sale system with inventory management and real-time analytics for small businesses.",
    type: "web",
    images: [
      "/projects/dulcispos/1.png",
      "/projects/dulcispos/2.png",
      "/projects/dulcispos/3.png",
      "/projects/dulcispos/4.png",
    ],
    technologies: [
      { name: "Next.js", icon: "/icons/next.svg" },
      { name: "Node.js", icon: "/icons/node.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    ],
    liveUrl: "https://dulcispos.com",
    githubUrl: "https://github.com/yourusername/dulcispos",
    status: "completed",
    categories: ["POS", "Inventory Management", "Analytics"],
  },
  {
    id: 2,
    title: "Akcess Dental",
    description:
      "Modern dental clinic management system with appointment scheduling and patient records management.",
    type: "web",
    images: [
      "/projects/akcessdental/1.png",
      "/projects/akcessdental/2.png",
      "/projects/akcessdental/3.png",
    ],
    technologies: [
      { name: "Next.js", icon: "/icons/next.svg" },
      { name: "Node.js", icon: "/icons/node.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    ],
    liveUrl: "https://akcessdental.com",
    githubUrl: "https://github.com/yourusername/akcessdental",
    status: "completed",
    categories: ["Dental", "Clinic Management", "Appointment Scheduling"],
  },
  {
    id: 3,
    title: "Arithropics",
    description:
      "Premium beauty and skincare e-commerce platform offering high-quality cosmetics and wellness products.",
    type: "web",
    images: [
      "/projects/aritropics/1.png",
      "/projects/aritropics/2.png",
      "/projects/aritropics/3.png",
      "/projects/aritropics/mobile1.jpg",
      "/projects/aritropics/mobile2.jpg",
      "/projects/aritropics/mobile3.jpg",
    ],
    technologies: [
      { name: "Next.js", icon: "/icons/next.svg" },
      { name: "React", icon: "/icons/react.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
    ],
    liveUrl: "https://arithropics.com",
    githubUrl: "https://github.com/yourusername/arithropics",
    status: "in-progress",
    categories: ["E-commerce", "Beauty", "Skincare"],
  },
  {
    id: 4,
    title: "Haustalks",
    description:
      "Real estate platform.",
    type: "web",
    images: [
      "/projects/haustalks/1.png",
      "/projects/haustalks/2.png",
      "/projects/haustalks/3.png",
      "/projects/haustalks/mobile1.png",
      "/projects/haustalks/mobile2.png",
      "/projects/haustalks/mobile3.png",
    ],
    technologies: [
      { name: "Next.js", icon: "/icons/next.svg" },
      { name: "React Native", icon: "/icons/react-native.svg" },
      { name: "Supabase", icon: "/icons/supabase.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    ],
    liveUrl: "https://haustalks.com",
    githubUrl: "https://github.com/yourusername/haustalks",
    status: "maintenance",
    categories: ["Real Estate", "Property Listing", "Rentals"],
  },
  {
    id: 5,
    title: "JigXT",
    description:
      "Mobile fitness tracking application with personalized workout plans.",
    type: "mobile",
    images: [
      "/projects/jigxt/mobile1.png",
      "/projects/jigxt/mobile2.png",
      "/projects/jigxt/mobile3.png",
    ],
    technologies: [
      { name: "React Native", icon: "/icons/react-native.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
    ],
    liveUrl: "https://jigxt.com",
    githubUrl: "https://github.com/yourusername/jigxt",
    status: "completed",
    categories: ["Fitness", "Mobile", "Workout Plans"],
  },
];

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.type === filter
  );

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="py-20 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Project Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-400"
          >
            Explore our portfolio of innovative solutions and transformative
            projects
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          {["all", "web", "mobile"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as typeof filter)}
              className={cn(
                "px-6 py-2 rounded-full text-sm transition-all duration-300",
                filter === type
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                  : "text-gray-400 hover:text-white border border-white/10 hover:border-white/30"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-xl">
                <div className="absolute inset-0 rounded-xl border border-transparent">
                  <div className="absolute inset-0 rounded-xl animate-border-flow opacity-0 group-hover:opacity-100" />
                </div>
              </div>

              <div
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
                className="relative overflow-hidden rounded-xl cursor-pointer bg-[#0f1015]"
              >
                {/* Project Thumbnail */}
                <div className="aspect-[16/9] relative">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-contain bg-[#0f1015]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-[#1a1b26] rounded-2xl overflow-hidden"
            >
              {/* Dynamic layout based on image type */}
              <div
                className={cn(
                  "relative",
                  selectedProject.type === "mobile"
                    ? "flex flex-col md:flex-row h-[90vh] md:h-[80vh]"
                    : "max-h-[90vh]"
                )}
              >
                {/* Image Section */}
                <div
                  className={cn(
                    "relative",
                    selectedProject.type === "mobile"
                      ? "w-full md:w-2/3 h-[40vh] md:h-full"
                      : "aspect-auto min-h-[300px] md:min-h-[400px]"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute inset-0"
                    >
                      <div
                        className={cn(
                          "cursor-zoom-in transition-transform duration-300",
                          isZoomed && "cursor-zoom-out scale-150"
                        )}
                        onClick={() => setIsZoomed(!isZoomed)}
                      >
                        <Image
                          src={selectedProject.images[currentImageIndex]}
                          alt={selectedProject.title}
                          fill
                          className="object-contain bg-[#0f1015]"
                          sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows - Moved to bottom */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button
                        onClick={prevImage}
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div
                  className={cn(
                    "relative",
                    selectedProject.type === "mobile"
                      ? "w-full md:w-1/3 p-6 overflow-y-auto"
                      : "p-6"
                  )}
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="mt-8 md:mt-0">
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {selectedProject.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          {
                            "bg-green-500/20 text-green-400":
                              selectedProject.status === "completed",
                            "bg-yellow-500/20 text-yellow-400":
                              selectedProject.status === "in-progress",
                            "bg-blue-500/20 text-blue-400":
                              selectedProject.status === "maintenance",
                          }
                        )}
                      >
                        {selectedProject.status.charAt(0).toUpperCase() +
                          selectedProject.status.slice(1)}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <motion.span
                          key={tech.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          {tech.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
