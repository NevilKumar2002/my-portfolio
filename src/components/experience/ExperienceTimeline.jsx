// components/experience/ExperienceTimeline.jsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    company: "BeamX Techlabs Pvt.Ltd",
    period: "October 2024 - Present",
    description: [
      "Developed and maintained responsive web applications using Next.js and React.js, improving page load times by 30% through code optimization.",
      "Implemented 10+ modern UI components with Tailwind CSS, adhering to design specifications and ensuring cross-browser compatibility.",
      "Collaborated with cross-functional teams in an agile environment to translate business requirements into functional features.",
      "Successfully integrated RESTful APIs with frontend components, implementing efficient data fetching and state management patterns.",
    ],
    skills: ["Next.js", "React.js", "Tailwind CSS", "REST API", "Agile"],
  },
  {
    title: "React.js Developer Intern",
    company: "GeekBull Consulting",
    period: "July 2024 - September 2024",
    description: [
      "Developed 5+ reusable UI components using React.js, JavaScript, and CSS frameworks for production applications.",
      "Implemented React hooks, context API, and component lifecycle methods to manage application state efficiently.",
      "Created responsive layouts using CSS Grid, Flexbox, and Media Queries for optimal viewing across multiple devices.",
      "Participated in code reviews, daily stand-ups, and sprint planning in an agile development environment.",
    ],
    skills: ["React.js", "JavaScript", "CSS", "Responsive Design", "Agile"],
  },
];

export default function ExperienceTimeline() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {experiences.map((experience, index) => (
        <motion.div key={index} variants={item}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <CardTitle>{experience.title}</CardTitle>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {experience.period}
                </CardDescription>
              </div>
              <CardDescription className="text-base font-medium">
                {experience.company}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {experience.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
