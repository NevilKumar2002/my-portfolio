"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  BookOpen,
  UserCheck,
  Clock,
  Users,
  RefreshCw,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const About = () => {
  // Create state to track if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    profile: false,
    education: false,
    traits: false,
    achievements: false,
  });

  // Custom hook for scroll detection (replacement for react-intersection-observer)
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

  // Education and traits data
  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Civil Engineering - 9.15 GPA",
      institution: "Annamacharya Institute of Technology and Sciences",
      period: "July 2020 - May 2023",
      location: "Tirupati, India",
      color: "from-blue-500/50 to-cyan-500/50",
      iconColor: "text-blue-500",
    },
    {
      degree: "Diploma",
      field: "Civil Engineering - 90%",
      institution: "GMR Polytechnic",
      period: "June 2017 - April 2020",
      location: "Srisailam, India",
      color: "from-purple-500/50 to-pink-500/50",
      iconColor: "text-purple-500",
    },
  ];

  const traits = [
    {
      name: "Problem Solver",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "bg-gradient-to-br from-blue-500/30 to-cyan-500/30",
    },
    {
      name: "Time Management",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-gradient-to-br from-purple-500/30 to-pink-500/30",
    },
    {
      name: "Team Collaboration",
      icon: <Users className="h-5 w-5" />,
      color: "bg-gradient-to-br from-green-500/30 to-emerald-500/30",
    },
    {
      name: "Adaptability",
      icon: <RefreshCw className="h-5 w-5" />,
      color: "bg-gradient-to-br from-amber-500/30 to-yellow-500/30",
    },
    {
      name: "Continuous Learner",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-gradient-to-br from-pink-500/30 to-rose-500/30",
    },
    {
      name: "Detail-Oriented",
      icon: <UserCheck className="h-5 w-5" />,
      color: "bg-gradient-to-br from-cyan-500/30 to-blue-500/30",
    },
  ];

  // const achievements = [
  //   "Led 5 successful projects as Team Leader during college and published a research journal.",
  //   "Solved 600+ DSA coding questions on various competitive programming platforms.",
  // ];

  // Use our custom hook to check visibility
  const titleVisible = useScrollIntoView("title-section");
  const profileVisible = useScrollIntoView("profile-section");
  const educationVisible = useScrollIntoView("education-section");
  const traitsVisible = useScrollIntoView("traits-section");
  // const achievementsVisible = useScrollIntoView("achievements-section");

  return (
    <section id="about" className="py-16 overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        className="fixed top-40 right-10 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-40 left-10 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl -z-10"
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
              About Me
              <motion.span
                className="absolute -right-8 -top-1"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2"
              initial={{ width: 0 }}
              animate={titleVisible ? { width: "6rem" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Profile section */}
        <div id="profile-section" className="mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              profileVisible
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-70" />

              <CardContent className="pt-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <motion.div
                      className="relative w-64 h-64 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
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
                            src="/Images/profile_pic.jpg"
                            alt="Nevil Kumar Gurram"
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="w-full md:w-2/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        profileVisible
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <p className="mb-4 text-muted-foreground">
                        I am Nevil Kumar Gurram, a passionate Software Developer
                        based in Hyderabad, specializing in building responsive,
                        user-friendly web applications using the MERN stack.
                        With over 6 months of professional experience, I focus
                        on creating efficient, scalable frontend solutions using
                        Next.js, React.js, and modern CSS frameworks.
                      </p>
                      <p className="text-muted-foreground">
                        My journey in tech began with a strong foundation in
                        problem-solving and analytical thinking. I love
                        translating design concepts into pixel-perfect
                        interfaces while ensuring optimal performance and
                        seamless user experiences.
                      </p>

                      <motion.div
                        className="mt-4 flex gap-2 flex-wrap"
                        initial={{ opacity: 0 }}
                        animate={
                          profileVisible ? { opacity: 1 } : { opacity: 0 }
                        }
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        {[
                          "Frontend Development",
                          "React.js",
                          "Next.js",
                          "Tailwind CSS",
                          "REST API",
                        ].map((skill, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-primary border-none">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Education Section */}
        <div className="mb-16" id="education-section">
          <motion.h3
            className="text-2xl font-semibold mb-8 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={
              educationVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            Education
          </motion.h3>

          <motion.div
            initial="hidden"
            animate={educationVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border border-transparent hover:border-primary/20 transition-all duration-300">
                  {/* Animated gradient bar */}
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${edu.color}`}
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
                    <CardTitle className="flex items-center gap-2">
                      <motion.span
                        animate={{
                          color: ["#4f46e5", "#8b5cf6", "#4f46e5"],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        {edu.degree}
                      </motion.span>
                    </CardTitle>
                    <CardDescription className="text-base font-medium">
                      {edu.field}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <motion.div
                      className="text-muted-foreground flex items-center gap-2 mt-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className={`h-4 w-4 ${edu.iconColor}`} />
                      {edu.period}
                    </motion.div>
                    <p className="text-muted-foreground">{edu.location}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Personal Traits Section */}
        <div className="mb-16" id="traits-section">
          <motion.h3
            className="text-2xl font-semibold mb-8 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={
              traitsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.5 }}
          >
            <UserCheck className="h-6 w-6 text-primary" />
            Personal Traits
          </motion.h3>

          <motion.div
            initial="hidden"
            animate={traitsVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {traits.map((trait, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)",
                  transition: { duration: 0.2 },
                }}
                className="rounded-lg"
              >
                <motion.div
                  className="h-full rounded-lg border border-border overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(79, 70, 229, 0)",
                      "0 0 10px rgba(79, 70, 229, 0.2)",
                      "0 0 0px rgba(79, 70, 229, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <CardContent className="flex items-center gap-4 h-full p-4">
                    <motion.div
                      className={`p-3 rounded-full ${trait.color}`}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.2,
                      }}
                    >
                      {trait.icon}
                    </motion.div>
                    <span className="font-medium">{trait.name}</span>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements Section */}
        {/* <div id="achievements-section">
          <motion.h3
            className="text-2xl font-semibold mb-8 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={
              achievementsVisible
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.5 }}
          >
            <Award className="h-6 w-6 text-primary" />
            Achievements
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              achievementsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.7 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">

              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  background: [
                    "linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
                    "linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                    "linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <CardContent className="pt-6 relative z-10">
                <ul className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        achievementsVisible
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        className="mt-1 flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        animate={{
                          color: ["#4f46e5", "#8b5cf6", "#ec4899", "#4f46e5"],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          hover: { duration: 0.2 },
                        }}
                      >
                        {index === 0 ? (
                          <Award className="h-5 w-5" />
                        ) : (
                          <Code className="h-5 w-5" />
                        )}
                      </motion.div>
                      <span className="text-muted-foreground">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};

export default About;
