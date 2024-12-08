"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { name: "Web Development", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "Cloud Solutions", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/D3VLABTechnologies",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/d3vlabs",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/d3vlabs",
    icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="D3V.LAB Logo"
                width={100}
                height={100}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-white/10 to-[#eac01a] bg-clip-text text-transparent">
                D3V.LABs
              </span>
            </Link>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="overflow-hidden whitespace-nowrap inline-block text-gray-400 text-sm mx-auto"
          >
            Powered by{" "}
            <span className="font-semibold bg-gradient-to-r from-white/10 to-[#eac01a] text-transparent bg-clip-text">
              D3V.LABs
            </span>
            <span className="ml-1">© {new Date().getFullYear()}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
