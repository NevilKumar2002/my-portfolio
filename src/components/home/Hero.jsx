"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  // Create state to track if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    content: false,
    image: false,
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

  // Title animations
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Use our custom hook to check visibility
  const titleVisible = useScrollIntoView("hero-title");
  const contentVisible = useScrollIntoView("hero-content");
  const imageVisible = useScrollIntoView("hero-image");

  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-background to-background/80 lg:ml-10 lg:mr-10">
      {/* Decorative background elements */}
      <motion.div
        className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <div id="hero-title">
              <motion.div
                initial="hidden"
                animate={titleVisible ? "visible" : "hidden"}
                variants={titleVariants}
              >
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                  <span className="text-primary">
                    Available for new opportunities
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mt-2">
                  Hi, I'm <span className="text-primary">Nevil Kumar</span>
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-6 w-6 text-yellow-400" />
                  </motion.span>
                </h1>
                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2"
                  initial={{ width: 0 }}
                  animate={titleVisible ? { width: "6rem" } : { width: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </div>

            <div id="hero-content">
              <motion.div
                initial="hidden"
                animate={contentVisible ? "visible" : "hidden"}
                variants={contentVariants}
              >
                <p className="text-xl text-muted-foreground">
                  Software Developer specializing in modern web applications
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  I build responsive, user-friendly web applications using
                  Next.js, React.js and modern CSS frameworks with a focus on
                  performance optimization and component reusability.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button asChild size="lg">
                      <Link href="/about">
                        About me <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/resume/nevil_kumar_resume.pdf" download>
                        <Download className="mr-2 h-4 w-4" /> Download Resume
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                <div className="flex gap-4 mt-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="https://github.com/NevilKumar2002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="https://www.linkedin.com/in/nevil-kumar-gurram-6898b5267/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <div id="hero-image">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                imageVisible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.7 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      "linear-gradient(0deg, #4f46e5 0%, #8b5cf6 50%, #ec4899 100%)",
                      "linear-gradient(120deg, #8b5cf6 0%, #ec4899 50%, #4f46e5 100%)",
                      "linear-gradient(240deg, #ec4899 0%, #4f46e5 50%, #8b5cf6 100%)",
                      "linear-gradient(360deg, #4f46e5 0%, #8b5cf6 50%, #ec4899 100%)",
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  style={{ padding: "4px" }}
                >
                  <div className="h-full w-full rounded-full overflow-hidden relative bg-background">
                    <Image
                      src="/Images/profile_pic.jpeg"
                      alt="Nevil Kumar Gurram"
                      fill
                      sizes="(max-width: 768px) 300px, 400px"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
