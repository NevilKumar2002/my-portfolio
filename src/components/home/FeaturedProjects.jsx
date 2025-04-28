"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "IVL (Imperial Vaults) – CRM Project",
    description:
      "Comprehensive CRM system for secure storage of valuable items in bank-style lockers. Engineered modules for Bookings, Payments, Inventory Management with responsive design.",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "REST API"],
    link: "#", // Replace with your actual link
  },
  {
    title: "Real Time Chat Application",
    description:
      "Full-stack real-time chat application using the MERN stack with Socket.io for instant messaging. Features secure authentication and responsive UI across devices.",
    technologies: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Node.js",
      "WebSockets",
    ],
    link: "https://chat-app-mern-nevil-kumar.vercel.app/login",
  },
  {
    title: "Crypto Tracker Website",
    description:
      "Cryptocurrency tracking application with real-time data for 100+ cryptocurrencies. Includes interactive comparison features and historical price trend visualization.",
    technologies: ["React.js", "Material UI", "Chart JS", "REST API"],
    link: "https://nevilkumar-crypto-tracker-project.vercel.app/",
  },
];

export default function Projects() {
  // Create state to track if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    projects: false,
  });

  // Custom hook for scroll detection
  const useScrollIntoView = (id, threshold = 0.1) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        },
        { threshold }
      );

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, [id, threshold]);

    return visibleSections[id];
  };

  // Card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Use our custom hook to check visibility
  const projectsVisible = useScrollIntoView("projects-section");

  return (
    <section id="projects-section" className="py-2 lg:mx-10 mx-4">
      {/* Decorative background elements */}
      <motion.div
        className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-purple-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      <div className="flex flex-col gap-8">
        <div className="container px-2 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-2">
            Projects
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </motion.span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
            initial={{ width: 0 }}
            animate={projectsVisible ? { width: "6rem" } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        <motion.div
          className="container px-2 md:px-6"
          variants={containerVariants}
          initial="hidden"
          animate={projectsVisible ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                  {/* Animated gradient bar */}
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${
                      index % 2 === 0
                        ? "from-blue-500/50 to-cyan-500/50"
                        : "from-purple-500/50 to-pink-500/50"
                    }`}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  />

                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge variant="secondary" className="text-xs sm:text-sm">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    {project.link && project.link !== "#" && (
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button asChild size="sm">
                          <Link href={project.link}>
                            <ExternalLink className="mr-2 h-4 w-4" /> Demo
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}