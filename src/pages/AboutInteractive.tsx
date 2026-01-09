import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Palette,
  Lightbulb,
  ArrowRight,
  Calendar,
  Briefcase,
  BookOpen,
  Award,
  Home,
  FileText,
  Mail,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const AboutInteractive = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const journeyRef = useRef<HTMLDivElement>(null);
  const fullText = "Hi, I'm ";

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

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const skills = [
    {
      id: "development",
      icon: Code,
      title: "Development",
      description: "React, TypeScript, Node.js, and modern web technologies",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "design",
      icon: Palette,
      title: "Design",
      description: "UI/UX design, design systems, and accessibility",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "strategy",
      icon: Lightbulb,
      title: "Strategy",
      description: "Product thinking, user research, and technical architecture",
      color: "from-amber-400 to-amber-600",
    },
  ];

  const timelineItems = [
    {
      year: "2019",
      icon: BookOpen,
      title: "Started in College",
      description:
        "Built my first website for a local business and discovered my passion for web development.",
    },
    {
      year: "2021",
      icon: Briefcase,
      title: "Professional Journey",
      description:
        "Worked with startups and Fortune 500 companies, building products that users love.",
    },
    {
      year: "2023",
      icon: Award,
      title: "Expertise Growth",
      description:
        "Specialized in full-stack development and became a go-to expert in modern web technologies.",
    },
    {
      year: "2024",
      icon: Calendar,
      title: "Started This Blog",
      description:
        "Launched AK Tech Blog to share knowledge and help developers grow their skills.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-800">
                {typewriterText}
                <span
                  className={`inline-block w-1 h-12 ml-1 bg-blue-500 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amrendra Kumar
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              A passionate full-stack developer and tech enthusiast.
            </p>

            <Link to="/blog">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg">
                Explore My Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            What I Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div key={skill.id} className="text-center">
                <div
                  className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-white`}
                >
                  <skill.icon className="h-12 w-12" />
                </div>
                <h3 className="mt-4 font-semibold">{skill.title}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={journeyRef} className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            My Journey
          </h2>

          <div className="space-y-10">
            {timelineItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <item.icon className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-bold">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
     <section className="py-16 px-4">
  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
    <Link to="/" className="p-6 bg-white rounded-xl shadow text-center">
      <Home className="mx-auto mb-3" />
      Home
    </Link>

    <Link to="/blog" className="p-6 bg-white rounded-xl shadow text-center">
      <FileText className="mx-auto mb-3" />
      Blog
    </Link>

    <Link to="/contact" className="p-6 bg-white rounded-xl shadow text-center">
      <Mail className="mx-auto mb-3" />
      Contact
    </Link>

    <Link
      to="/privacy-policy"
      className="p-6 bg-white rounded-xl shadow text-center"
    >
      <Users className="mx-auto mb-3" />
      Privacy
    </Link>
  </div>
</section>
