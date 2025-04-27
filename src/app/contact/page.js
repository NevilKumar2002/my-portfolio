"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactPage = () => {
  // State to track if sections are visible
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    form: false,
  });

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const formRef = useRef();

  // EmailJS configuration - replace with your actual service ID, template ID, and public key
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS with public key
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, [EMAILJS_PUBLIC_KEY]);

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

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Use our custom hook to check visibility
  const titleVisible = useScrollIntoView("contact-title-section");
  const formVisible = useScrollIntoView("contact-form-section");

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS implementation with correct key
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      // Show success message
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);

      // Show error message
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
      });

      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        className="fixed top-40 right-20 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl -z-10"
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
        <div id="contact-title-section">
          <motion.div
            initial="hidden"
            animate={titleVisible ? "visible" : "hidden"}
            variants={titleVariants}
            className="relative mb-16 text-center"
          >
            <h2 className="text-4xl font-bold inline-block">
              Get In Touch
              <motion.span
                className="absolute -right-8 -top-1"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </motion.span>
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              I am always open to new opportunities, collaborations, or just a
              friendly chat.
            </p>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3"
              initial={{ width: 0 }}
              animate={titleVisible ? { width: "8rem" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form-section">
          <motion.div
            initial="hidden"
            animate={formVisible ? "visible" : "hidden"}
            variants={formVariants}
            className="max-w-3xl mx-auto"
          >
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="border-none shadow-lg overflow-hidden">
                {/* Animated gradient bar */}
                <motion.div
                  className="h-2 bg-gradient-to-r from-blue-500/50 to-purple-500/50"
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
                  <CardTitle>Send Me a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I will get back to you as soon
                    as possible.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  {/* Name Input */}
                  <motion.div custom={0} variants={inputVariants}>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="border-border focus:border-primary transition-colors py-6"
                        {...form.register("name")}
                      />
                      {form.formState.errors.name && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500"
                        >
                          {form.formState.errors.name.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div custom={1} variants={inputVariants}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-border focus:border-primary transition-colors py-6"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500"
                        >
                          {form.formState.errors.email.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Subject Input */}
                  <motion.div custom={2} variants={inputVariants}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject of your message"
                        className="border-border focus:border-primary transition-colors py-6"
                        {...form.register("subject")}
                      />
                      {form.formState.errors.subject && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500"
                        >
                          {form.formState.errors.subject.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Message Input */}
                  <motion.div custom={3} variants={inputVariants}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        className="min-h-40 border-border focus:border-primary transition-colors resize-y py-4 px-4"
                        {...form.register("message")}
                      />
                      {form.formState.errors.message && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-red-500"
                        >
                          {form.formState.errors.message.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </CardContent>

                <CardFooter className="flex justify-between items-center flex-wrap gap-4 py-6">
                  {/* Status message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-500"
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>Message sent successfully!</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-red-500"
                    >
                      <XCircle className="h-5 w-5" />
                      <span>Failed to send message. Please try again.</span>
                    </motion.div>
                  )}

                  {!submitStatus && <div></div>}

                  {/* Submit button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6 px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </form>
          </motion.div>

          {/* Contact alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <span>Or connect with me directly at </span>
              <a
                href="mailto:your.email@example.com"
                className="text-primary font-medium hover:underline flex items-center"
              >
                gurramnevilkumar@gmail.com
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
