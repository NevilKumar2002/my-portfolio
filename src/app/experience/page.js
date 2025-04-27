"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Award,
  Star,
  Code,
  Zap,
  Sparkles,
} from "lucide-react";

const ExperiencePage = () => {
  // Create state to track if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    timeline: false,
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

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
  const titleVisible = useScrollIntoView("title-section");
  const timelineVisible = useScrollIntoView("timeline-section");

  // Experience data with highlights and icons for each skill
  const experiences = [
    {
      title: "Software Developer",
      company: "BeamX Techlabs Pvt.Ltd",
      period: "October 2024 - Present",
      color: "from-blue-500/50 to-cyan-500/50",
      iconColor: "text-blue-500",
      description: [
        "Developed and maintained responsive web applications using Next.js and React.js, improving page load times by 30% through code optimization.",
        "Implemented 10+ modern UI components with Tailwind CSS, adhering to design specifications and ensuring cross-browser compatibility.",
        "Collaborated with cross-functional teams in an agile environment to translate business requirements into functional features.",
        "Successfully integrated RESTful APIs with frontend components, implementing efficient data fetching and state management patterns.",
      ],
      highlights: [
        { text: "30% faster", icon: <Zap className="h-4 w-4" /> },
        { text: "10+ UI components", icon: <Code className="h-4 w-4" /> },
      ],
      skills: [
        { name: "Next.js", color: "bg-black text-white" },
        { name: "React.js", color: "bg-blue-500/20 text-blue-600" },
        { name: "Tailwind CSS", color: "bg-cyan-500/20 text-cyan-600" },
        { name: "REST API", color: "bg-green-500/20 text-green-600" },
        { name: "Agile", color: "bg-purple-500/20 text-purple-600" },
      ],
    },
    {
      title: "React.js Developer Intern",
      company: "GeekBull Consulting",
      period: "July 2024 - September 2024",
      color: "from-purple-500/50 to-pink-500/50",
      iconColor: "text-purple-500",
      description: [
        "Developed 5+ reusable UI components using React.js, JavaScript, and CSS frameworks for production applications.",
        "Implemented React hooks, context API, and component lifecycle methods to manage application state efficiently.",
        "Created responsive layouts using CSS Grid, Flexbox, and Media Queries for optimal viewing across multiple devices.",
        "Participated in code reviews, daily stand-ups, and sprint planning in an agile development environment.",
      ],
      highlights: [
        { text: "5+ components", icon: <Star className="h-4 w-4" /> },
        { text: "Responsive design", icon: <Award className="h-4 w-4" /> },
      ],
      skills: [
        { name: "React.js", color: "bg-blue-500/20 text-blue-600" },
        { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-600" },
        { name: "CSS", color: "bg-indigo-500/20 text-indigo-600" },
        { name: "Responsive Design", color: "bg-rose-500/20 text-rose-600" },
        { name: "Agile", color: "bg-purple-500/20 text-purple-600" },
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        className="fixed top-60 left-20 w-80 h-80 rounded-full bg-purple-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4">
        {/* Title section */}
        <div id="title-section">
          <motion.div
            initial="hidden"
            animate={titleVisible ? "visible" : "hidden"}
            variants={titleVariants}
            className="relative mb-16 text-center"
          >
            <h2 className="text-4xl font-bold inline-block">
              Professional Experience
              <motion.span
                className="absolute -right-8 -top-1"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.span>
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              My journey as a software developer
            </p>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3"
              initial={{ width: 0 }}
              animate={titleVisible ? { width: "8rem" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Timeline section */}
        <div id="timeline-section" className="relative">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block"
            initial={{ height: 0 }}
            animate={
              timelineVisible
                ? { height: "100%", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="h-full w-full bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={timelineVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col md:items-center md:flex-row md:even:flex-row-reverse"
              >
                {/* Timeline dot for desktop */}
                <motion.div
                  className="absolute left-1/2 hidden md:flex -translate-x-1/2 items-center justify-center"
                  style={{ top: `calc(${index * 100}% + 2rem)` }}
                  whileHover={{ scale: 1.2 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    timelineVisible
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ delay: 0.7 + index * 0.2, duration: 0.4 }}
                >
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border-2 border-primary shadow-lg shadow-primary/20">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="w-full md:w-5/12 md:pr-8 md:even:pr-0 md:even:pl-8">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden border border-transparent hover:border-primary/20 transition-all duration-300 shadow-lg">
                      {/* Animated gradient bar */}
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${exp.color}`}
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
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <CardTitle className="flex items-center gap-2">
                            <motion.span
                              animate={{
                                color: [
                                  "#4f46e5",
                                  "#8b5cf6",
                                  "#ec4899",
                                  "#4f46e5",
                                ],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                              }}
                            >
                              {exp.title}
                            </motion.span>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </CardDescription>
                        </div>
                        <CardDescription className="text-base font-medium">
                          {exp.company}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Key highlights */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.5, duration: 0.5 },
                          }}
                          className="flex flex-wrap gap-3 mb-3"
                        >
                          {exp.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 rounded-full flex items-center gap-1 text-sm text-primary"
                            >
                              {highlight.icon}
                              <span>{highlight.text}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Description with animated bullet points */}
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {exp.description.map((point, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                timelineVisible
                                  ? {
                                      opacity: 1,
                                      x: 0,
                                      transition: {
                                        delay: 0.3 + idx * 0.1,
                                        duration: 0.5,
                                      },
                                    }
                                  : { opacity: 0, x: -10 }
                              }
                              className="flex items-start gap-2"
                            >
                              <motion.div
                                animate={{ rotate: [0, 0, 45, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatDelay: 5,
                                }}
                                className="mt-1 flex-shrink-0 text-primary"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </motion.div>
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Skills with custom badges */}
                        <motion.div
                          className="flex flex-wrap gap-2 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            timelineVisible
                              ? {
                                  opacity: 1,
                                  y: 0,
                                  transition: { delay: 0.6, duration: 0.5 },
                                }
                              : { opacity: 0, y: 10 }
                          }
                        >
                          {exp.skills.map((skill, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.1, y: -3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge
                                className={`${skill.color} font-medium cursor-default`}
                              >
                                {skill.name}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Empty space for the opposite side in the timeline */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperiencePage;
