"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect } from "react";
import { CSSProperties } from "react";
import { LineNumberStyle } from "react-syntax-highlighter";

interface Service {
  title: string;
  description: string;
  icon: string;
  link: string;
  code: string;
  position: "left" | "right";
  language: string;
}

function useResponsiveStyles() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return {
    customStyle: {
      margin: 0,
      padding: isSmallScreen ? "0.75rem 1rem" : "1rem",
      background: "transparent",
      fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
    } as CSSProperties,
    lineNumberStyle: {
      minWidth: isSmallScreen ? "2em" : "2.5em",
      paddingRight: "1em",
      color: "#666",
      textAlign: "right" as const,
      fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
    } as LineNumberStyle,
  };
}

export function Services() {
  const { customStyle, lineNumberStyle } = useResponsiveStyles();

  const services: Service[] = [
    {
      title: "Web Development",
      description:
        "Create stunning and responsive websites optimized for performance and scalability.",
      icon: "/icons/next.svg",
      link: "Explore Web Development",
      position: "left",
      code: `const App = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="app">
      <Header />
      <DataGrid data={data} />
    </main>
  )
}`,
      language: "typescript",
    },
    {
      title: "Mobile App Development",
      description:
        "Design user-friendly mobile apps that deliver seamless experiences on both iOS and Android.",
      icon: "/icons/react-native.svg",
      link: "Explore Mobile Apps",
      position: "right",
      code: `export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}`,
      language: "typescript",
    },
    {
      title: "Backend Solutions",
      description:
        "Robust backend systems that ensure your software runs smoothly and securely.",
      icon: "/icons/backend.gif",
      link: "Explore Backend Solutions",
      position: "left",
      code: `@Controller('api')
export class UserController {
  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Post('user')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }
}`,
      language: "typescript",
    },
    {
      title: "Cloud Integration",
      description:
        "Leverage the power of cloud computing for efficiency, scalability, and cost savings.",
      icon: "/icons/aws.svg",
      link: "Explore Cloud Services",
      position: "right",
      code: `resource "aws_ecs_cluster" "main" {
  name = "app-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = "production"
  }
}`,
      language: "hcl",
    },
  ];

  return (
    <section
      id="solutions"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6"
          >
            Build Your Digital Success
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl text-gray-400"
          >
            What do you want to [code, build, debug, deploy,
            <br className="hidden sm:block" />
            collaborate on, analyze, learn] today?
          </motion.h2>
        </div>

        {/* Services with Code */}
        <div className="relative">
          {/* Center line with glow effect - hidden on mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden lg:block" />

          {/* Services */}
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{
                opacity: 0,
                x: service.position === "left" ? -20 : 20,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-start gap-6 sm:gap-12 lg:gap-24 mb-12 sm:mb-16 lg:mb-24 ${
                service.position === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Service Info */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={24}
                      height={24}
                      className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <button className="flex items-center gap-1 sm:gap-2 text-[#4fd1c5] hover:text-[#4fd1c5]/80 transition-colors duration-300 text-sm sm:text-base">
                      {service.link}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="w-full lg:w-1/2">
                <div className="bg-[#1a1b26] rounded-lg overflow-hidden border border-white/10 shadow-xl">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/10 bg-[#1a1b26]">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/90" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/90" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/90" />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      script.{service.language}
                    </div>
                  </div>
                  {/* Code Content */}
                  <div className="max-h-[200px] sm:max-h-[240px] lg:max-h-[280px] overflow-auto custom-scrollbar">
                    <SyntaxHighlighter
                      language={service.language}
                      style={oneDark}
                      customStyle={customStyle}
                      showLineNumbers={true}
                      lineNumberStyle={lineNumberStyle}
                    >
                      {service.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
