"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  quote: string;
  description: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "The POS system your team built for us transformed how we manage orders and inventory. It's fast, reliable, and user-friendly!",
      description: "Revolutionized our operations!",
      author: {
        name: "Nicholas Opoku",
        role: "CEO | DULCIS RESTAURANT",
        avatar: "/avatars/dulcis.jpg",
      },
    },
    {
      quote:
        "The social media app your team developed helped us connect thousands of users seamlessly. The mobile and web interfaces are exceptional!",
      description: "A game-changer for our platform!",
      author: {
        name: "Jason Hutchingson",
        role: "Co-Founder | JIGXT",
        avatar: "/avatars/jigxt.jpeg",
      },
    },
    {
      quote:
        "We now have a robust community platform tailored for real estate developers. The features and design are spot-on!",
      description: "Perfect solution for our niche!",
      author: {
        name: "Nana-Yao Nsoah",
        role: "Co-Founder | HAUSTALKS",
        avatar: "/avatars/haustalks.png",
      },
    },
    {
      quote:
        "The NFT marketplace you built exceeded our expectations. The UI/UX and blockchain integration are top-notch. Your seamless integration of the blockchain was a breeze!",
      description: "Leading the Web3 revolution!",
      author: {
        name: "Daniel Gyamfi",
        role: "CEO | ZKM DAO",
        avatar: "/avatars/zkm.jpeg",
      },
    },
    {
      quote:
        "Your banking app streamlined our operations and enhanced customer experience. The management tools have also improved our workflows significantly.",
      description: "Modernizing rural banking!",
      author: {
        name: "Henry Ofori Asante",
        role: "Anyinam Branch Manager | KWAHU PRASO RURAL BANK",
        avatar: "/avatars/kwahu.jpeg",
      },
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0A0A0A] overflow-hidden -mt-12 sm:-mt-16 md:-mt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />

        {/* Mesh Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Love from our clients
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Join the growing list of businesses and organizations that trust us
            to bring their visions to life
            <br />
            with innovative and scalable software solutions.
          </motion.p>
        </div>

        {/* Testimonials Grid with responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 lg:mb-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 px-0 sm:px-8 md:px-16 lg:px-24">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

      <div
        className="relative bg-[#1a1b26]/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 lg:p-6 border border-white/10
                    shadow-[0_8px_16px_rgba(0,0,0,0.5)]
                    hover:border-blue-500/30 transition-colors duration-300"
      >
        <p className="text-white text-base sm:text-lg mb-3 sm:mb-4">
          {testimonial.description}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
          {testimonial.quote}
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[1px]" />
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/10">
              <Image
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 32px, 40px"
              />
            </div>
          </div>
          <div>
            <p className="text-white text-sm sm:text-base font-medium">
              {testimonial.author.name}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              {testimonial.author.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
