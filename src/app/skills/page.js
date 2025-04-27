"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  Code,
  Sparkles,
  Terminal,
  Database,
  Layout,
  GitBranch,
  Server,
  Globe,
  Coffee,
} from "lucide-react";

const SkillsSection = () => {
  // State to track if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    frontend: false,
    backend: false,
    tools: false,
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Check visibility for each section
  const titleVisible = useScrollIntoView("skills-title-section");
  const frontendVisible = useScrollIntoView("frontend-skills-section");
  const backendVisible = useScrollIntoView("backend-skills-section");
  const toolsVisible = useScrollIntoView("tools-skills-section");

  // Skills data organized by category
  const skillsData = {
    frontend: [
      {
        name: "HTML5",
        icon: <Globe className="h-5 w-5" />,
        level: 90,
        color: "from-orange-400 to-red-500",
        shadowColor: "shadow-orange-500/20",
      },
      {
        name: "CSS3",
        icon: <Layout className="h-5 w-5" />,
        level: 85,
        color: "from-blue-400 to-blue-600",
        shadowColor: "shadow-blue-500/20",
      },
      {
        name: "JavaScript",
        icon: <Code className="h-5 w-5" />,
        level: 80,
        color: "from-yellow-400 to-yellow-500",
        shadowColor: "shadow-yellow-500/20",
      },
      {
        name: "TypeScript",
        icon: <Terminal className="h-5 w-5" />,
        level: 75,
        color: "from-blue-500 to-blue-700",
        shadowColor: "shadow-blue-500/20",
      },
      {
        name: "React.js",
        icon: <Code className="h-5 w-5" />,
        level: 85,
        color: "from-cyan-400 to-cyan-600",
        shadowColor: "shadow-cyan-500/20",
      },
      {
        name: "Next.js",
        icon: <Cpu className="h-5 w-5" />,
        level: 80,
        color: "from-black to-gray-800",
        shadowColor: "shadow-black/20",
      },
      {
        name: "Tailwind CSS",
        icon: <Layout className="h-5 w-5" />,
        level: 90,
        color: "from-cyan-500 to-blue-500",
        shadowColor: "shadow-cyan-500/20",
      },
    ],
    backend: [
      {
        name: "Node.js",
        icon: <Server className="h-5 w-5" />,
        level: 75,
        color: "from-green-500 to-green-600",
        shadowColor: "shadow-green-500/20",
      },
      {
        name: "Express.js",
        icon: <Server className="h-5 w-5" />,
        level: 70,
        color: "from-gray-600 to-gray-700",
        shadowColor: "shadow-gray-500/20",
      },
      {
        name: "MongoDB",
        icon: <Database className="h-5 w-5" />,
        level: 75,
        color: "from-green-600 to-green-700",
        shadowColor: "shadow-green-500/20",
      },
      {
        name: "Core Java",
        icon: <Coffee className="h-5 w-5" />,
        level: 70,
        color: "from-red-600 to-red-700",
        shadowColor: "shadow-red-500/20",
      },
    ],
    tools: [
      {
        name: "Git",
        icon: <GitBranch className="h-5 w-5" />,
        level: 85,
        color: "from-orange-500 to-red-600",
        shadowColor: "shadow-orange-500/20",
      },
      {
        name: "VS Code",
        icon: <Code className="h-5 w-5" />,
        level: 90,
        color: "from-blue-500 to-blue-600",
        shadowColor: "shadow-blue-500/20",
      },
      {
        name: "Responsive Design",
        icon: <Layout className="h-5 w-5" />,
        level: 85,
        color: "from-purple-500 to-purple-600",
        shadowColor: "shadow-purple-500/20",
      },
      {
        name: "RESTful APIs",
        icon: <Server className="h-5 w-5" />,
        level: 80,
        color: "from-indigo-500 to-indigo-600",
        shadowColor: "shadow-indigo-500/20",
      },
    ],
  };

  return (
    <section id="skills" className="py-16 overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        className="fixed top-40 left-10 w-72 h-72 rounded-full bg-blue-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-40 right-20 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-4">
        {/* Title section */}
        <div id="skills-title-section">
          <motion.div
            initial="hidden"
            animate={titleVisible ? "visible" : "hidden"}
            variants={titleVariants}
            className="relative mb-16 text-center"
          >
            <h2 className="text-4xl font-bold inline-block">
              Technical Skills
              <motion.span
                className="absolute -right-8 -top-1"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.span>
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              My toolkit for crafting digital experiences
            </p>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3"
              initial={{ width: 0 }}
              animate={titleVisible ? { width: "8rem" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div id="frontend-skills-section" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                frontendVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Layout className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Frontend</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={frontendVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-4"
            >
              {skillsData.frontend.map((skill, index) => (
                <SkillCard
                  key={index}
                  skill={skill}
                  variants={skillVariants}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          {/* Backend Skills */}
          <div id="backend-skills-section" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                backendVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Server className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Backend</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={backendVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-4"
            >
              {skillsData.backend.map((skill, index) => (
                <SkillCard
                  key={index}
                  skill={skill}
                  variants={skillVariants}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          {/* Tools & Others */}
          <div id="tools-skills-section" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                toolsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Terminal className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Tools & Others</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={toolsVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-4"
            >
              {skillsData.tools.map((skill, index) => (
                <SkillCard
                  key={index}
                  skill={skill}
                  variants={skillVariants}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, variants, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`${skill.shadowColor} shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="border border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-full bg-gradient-to-r ${skill.color} bg-opacity-20`}
              >
                {skill.icon}
              </div>
              <span className="font-medium">{skill.name}</span>
            </div>
            <span className="text-sm font-normal text-muted-foreground">
              {skill.level}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              animate={{
                width: `${skill.level}%`,
                transition: { delay: 0.2 + index * 0.1, duration: 1 },
              }}
            />
          </div>
          {/* Animated dots when hovered */}
          <motion.div className="w-full flex justify-between mt-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 w-1 rounded-full ${
                  i < Math.floor(skill.level / 20)
                    ? `bg-gradient-to-r ${skill.color}`
                    : "bg-muted"
                }`}
                animate={
                  isHovered && i < Math.floor(skill.level / 20)
                    ? {
                        y: [0, -5, 0],
                        transition: {
                          duration: 0.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      }
                    : {}
                }
              />
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillsSection;
