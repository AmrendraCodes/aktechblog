import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Lightbulb, Sun, Moon, ArrowRight, Calendar, Briefcase, BookOpen, Award, Home, FileText, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const AboutInteractive = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  const journeyRef = useRef<HTMLDivElement>(null);
  const fullText = "Hi, I'm ";

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  // Theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const scrollToJourney = () => {
    journeyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const skills = [
    {
      id: "development",
      icon: Code,
      title: "Development",
      description: "React, TypeScript, Node.js, and modern web technologies",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "design",
      icon: Palette,
      title: "Design",
      description: "UI/UX design, design systems, and accessibility",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: "strategy",
      icon: Lightbulb,
      title: "Strategy",
      description: "Product thinking, user research, and technical architecture",
      color: "from-amber-400 to-amber-600"
    }
  ];

  const timelineItems = [
    {
      year: "2019",
      icon: BookOpen,
      title: "Started in College",
      description: "Built my first website for a local business and discovered my passion for web development."
    },
    {
      year: "2021",
      icon: Briefcase,
      title: "Professional Journey",
      description: "Worked with startups and Fortune 500 companies, building products that users love."
    },
    {
      year: "2023",
      icon: Award,
      title: "Expertise Growth",
      description: "Specialized in full-stack development and became a go-to expert in modern web technologies."
    },
    {
      year: "2024",
      icon: Calendar,
      title: "Started This Blog",
      description: "Launched AK Tech Blog to share knowledge and help developers grow their skills."
    }
  ];

  return (
    <Layout>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5 text-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-800 dark:text-gray-200">
                {typewriterText}
                <span className={`inline-block w-1 h-12 ml-1 bg-blue-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amrendra Kumar
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
            >
              A passionate full-stack developer and tech enthusiast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/blog">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  Explore My Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What I Do - Interactive Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200"
          >
            What I Do
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {skills.map((skill, index) => (
              <div key={skill.id} className="relative flex justify-center">
                {/* Skill Bubble */}
                <motion.div
                  className="relative z-10"
                  onHoverStart={() => setHoveredSkill(skill.id)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl`}
                  >
                    <skill.icon className="h-12 w-12" />
                  </div>
                  <p className="text-center mt-4 font-semibold text-gray-700 dark:text-gray-300">
                    {skill.title}
                  </p>
                </motion.div>

                {/* Hover Card */}
                <AnimatePresence>
                  {hoveredSkill === skill.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-0 z-20 bg-white dark:bg-gray-700 rounded-xl shadow-2xl p-4 w-64 border border-gray-200 dark:border-gray-600"
                      style={{ 
                        left: index === 0 ? '100%' : index === 2 ? 'auto' : '50%',
                        right: index === 2 ? '100%' : 'auto',
                        transform: index === 1 ? 'translateX(-50%)' : 'none',
                        marginLeft: index === 0 ? '20px' : index === 2 ? '20px' : '0'
                      }}
                    >
                      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Journey - Animated Timeline */}
      <section ref={journeyRef} className="py-20 bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200"
          >
            My Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform md:-translate-x-0.5" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  onHoverStart={() => setHoveredTimeline(index)}
                  onHoverEnd={() => setHoveredTimeline(null)}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 transform -translate-x-1/2 z-10 ${
                      hoveredTimeline === index ? 'scale-150' : ''
                    } transition-transform duration-300`}
                    animate={hoveredTimeline === index ? {
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.6, repeat: Infinity }
                    } : {}}
                  />

                  {/* Content Card */}
                  <motion.div
                    className={`ml-20 md:ml-0 md:w-5/12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      hoveredTimeline === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mr-3">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200"
          >
            Explore More
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="h-8 w-8 mx-auto mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Home</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return to homepage</p>
              </motion.div>
            </Link>

            <Link to="/blog" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText className="h-8 w-8 mx-auto mb-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Blog</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Read my articles</p>
              </motion.div>
            </Link>

            <Link to="/contact" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="h-8 w-8 mx-auto mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Contact</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get in touch</p>
              </motion.div>
            </Link>

            <Link to="/privacy-policy" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="h-8 w-8 mx-auto mb-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Privacy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Privacy policy</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutInteractive;
