"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCheckCircle,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSearch,
  FiTwitter,
} from "react-icons/fi";
import { FaGitlab, FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineArrowUp } from "react-icons/hi";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  blogPosts,
  caseStudies,
  navLinks,
  personalInfo,
  projects,
  stats,
  testimonials,
} from "@/lib/data";

const filters = ["All", "Enterprise", "SaaS", "Featured"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.3, ease: "easeOut" },
  }),
};

function useTypewriter(text: string, speed = 60) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, index));
      index += 1;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return display;
}

function useCountUp(target: number, enabled: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, enabled]);

  return value;
}

function useKonami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let index = 0;

    const handler = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === sequence[index]) {
        index += 1;
        if (index === sequence.length) {
          setActive(true);
          index = 0;
          setTimeout(() => setActive(false), 4000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return active;
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg)");

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Card
        hover
        className="h-full overflow-hidden bg-white/80 dark:bg-gray-900/70 backdrop-blur-md"
      >
        <div
          className="relative rounded-xl overflow-hidden mb-6 h-44 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent"
          style={{ transform }}
          onMouseMove={handleMove}
          onMouseLeave={() =>
            setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg)")
          }
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_60%)]" />
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary">{project.year}</Badge>
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge>Featured</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          {project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((metric) => (
                <Badge key={metric} variant="success">
                  {metric}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl ? (
              <Link href={project.liveUrl} target="_blank" rel="noreferrer" >
                <Button variant="secondary" type="button" className="cursor-pointer" size="sm" icon={<FiExternalLink />}>
                  Live Demo
                </Button>
              </Link>
            ) : (
              <Badge variant="outline">Enterprise</Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const numericValue = Number(value.replace(/[^0-9]/g, "")) || 0;
  const count = useCountUp(numericValue, inView);
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md px-6 py-5 text-center"
    >
      <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {count}
        {suffix}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    return navLinks.filter((link) =>
      link.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSelect = (href: string) => {
    const section = document.querySelector(href);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
              <FiSearch className="text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections..."
                className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {items.length === 0 && (
                <div className="px-4 py-6 text-sm text-gray-500">No results</div>
              )}
              {items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<typeof caseStudies[0] | null>(null);
  const { copy, copied } = useCopyToClipboard();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 120]);
  const glowY = useTransform(scrollY, [0, 400], [0, -80]);
  const konamiActive = useKonami();

  const sortedProjects = useMemo(() => {
    const filtered =
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category.includes(activeFilter));
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [activeFilter]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isCommand = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isCommand) {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleCopyEmail = async () => {
    await copy(personalInfo.email);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: "https://victorokoroji.dev",
    sameAs: [
      personalInfo.linkedIn,
      personalInfo.github,
      personalInfo.gitlab,
      personalInfo.twitter,
    ],
  };

  return (
    <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 rounded-md"
      >
        Skip to content
      </a>
      <Header />

      <main className="pt-16 md:pt-20">
        <Section id="home" className="relative overflow-hidden bg-grid">
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 via-blue-500/10 to-transparent"
          />
          <motion.div
            style={{ y: glowY }}
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/30 blur-[120px]"
          />
          <div className={cn("relative", "cursor-spotlight")}
            onMouseMove={(event) => {
              const target = event.currentTarget as HTMLDivElement;
              const rect = target.getBoundingClientRect();
              target.style.setProperty("--x", `${event.clientX - rect.left}px`);
              target.style.setProperty("--y", `${event.clientY - rect.top}px`);
            }}
          >
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gradient"
                >
                  {personalInfo.name}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
                >
                  {personalInfo.subtitle}
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl"
                >
                  {personalInfo.tagline}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                >
                  <Button
                  type="button"
                  className="cursor-pointer"
                    onClick={() =>
                      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Projects
                  </Button>
                  <Link href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
                    <Button variant="secondary" type="button"
                  className="cursor-pointer" icon={<FiDownload />}>
                      Download Resume
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex flex-wrap items-center gap-4"
                >
                  <button
                    className="group relative flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    onClick={handleCopyEmail}
                    aria-label="Copy email"
                  >
                    <FiMail />
                    {personalInfo.email}
                    <span className="absolute -top-8 left-0 scale-0 rounded bg-gray-900 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>
                  <Link href={personalInfo.linkedIn} target="_blank" rel="noreferrer" className="group">
                    <span className="sr-only">LinkedIn</span>
                    <FiLinkedin className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-500" />
                  </Link>
                  <Link href={personalInfo.github} target="_blank" rel="noreferrer" className="group">
                    <span className="sr-only">GitHub</span>
                    <FiGithub className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-500" />
                  </Link>
                  <Link href={personalInfo.gitlab} target="_blank" rel="noreferrer" className="group">
                    <span className="sr-only">GitLab</span>
                    <FaGitlab className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-500" />
                  </Link>
                  <Link href={personalInfo.twitter} target="_blank" rel="noreferrer" className="group">
                    <span className="sr-only">Twitter</span>
                    <FiTwitter className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-500" />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                className="relative"
              >
                <div className="relative h-80 w-full rounded-3xl border border-white/20 bg-gradient-to-br from-purple-600/20 via-blue-500/10 to-transparent p-6 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="relative w-64 h-64">
                      <Image
                        src="/profile-picture.jpg"
                        alt="Victor Okoroji - Frontend Engineer"
                        fill
                        className="object-cover rounded-2xl shadow-2xl object-[center_20%]"
                        priority
                      />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/50 ring-offset-4 ring-offset-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="py-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full justify-center items-center ">
              {stats.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </Section>

        <Section id="projects">
          <SectionHeading subtitle="Showcasing impactful work across enterprise, SaaS, and product teams.">
            Featured Projects
          </SectionHeading>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                  activeFilter === filter
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-purple-400"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <Section id="case-studies" className="bg-gray-100/60 dark:bg-gray-950/60">
          <SectionHeading subtitle="Deep dives into the challenges, solutions, and impact behind the work.">
            Case Studies
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCaseStudy(study)}
                className="group cursor-pointer"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-purple-500/50">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{study.company}</p>
                      </div>
                      <Badge variant="secondary">{study.year}</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {study.overview}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <FaRegCalendarAlt className="flex-shrink-0" />
                        <span>{study.duration}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {study.techStack.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {study.techStack.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{study.techStack.length - 4}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-purple-600/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-semibold group-hover:bg-purple-600 group-hover:text-white transition-all">
                          <span>View Full Case Study</span>
                          <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="testimonials" className="bg-gray-100/60 dark:bg-gray-950/60">
          <SectionHeading subtitle="Testimonials from leaders and collaborators.">
            What Others Say
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.id} hover>
                <p className="text-gray-600 dark:text-gray-300">“{item.quote}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="about">
          <SectionHeading subtitle="Crafting performant, accessible, and scalable frontend systems.">
            About Me
          </SectionHeading>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              <p>
                Frontend Engineer with 4+ years building production applications for enterprise and SaaS clients.
                I specialize in React, Next.js, and TypeScript to create fast, scalable web experiences. My work has
                impacted 11,000+ users across education, fintech, and HR platforms. I'm passionate about performance
                optimization, clean architecture, and mentoring junior developers.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "React & Next.js",
                  "TypeScript",
                  "React Native",
                  "Node.js & APIs",
                  "TailwindCSS",
                  "State Management (Redux, Zustand)",
                  "Testing (Jest, Cypress)",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm hover:border-purple-500 transition-colors"
                  >
                    <FiCheckCircle className="text-purple-500" />
                    {skill}
                  </div>
                ))}
              </div>
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Education:</span> Full Stack Web Development -
                  Microverse (USA)
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Education:</span> B.Eng. Chemical Engineering -
                  University of Ilorin
                </div>
              </div>
              <Link href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" icon={<FiDownload />} type="button" className="mt-4 cursor-pointer">
                  Download Resume
                </Button>
              </Link>
            </div>
        </Section>

        <Section id="contact">
          <SectionHeading subtitle="Let's discuss your next product launch or enterprise build.">
            Let's Work Together
          </SectionHeading>
          <ContactSection />
        </Section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold">Victor Okoroji</h3>
            <p className="text-sm text-gray-400 mt-2">
              Building scalable, high-performance web applications for enterprise and SaaS clients.
            </p>
            <div className="flex gap-3 mt-4">
              <Link href={personalInfo.github} target="_blank" rel="noreferrer">
                <FiGithub className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href={personalInfo.linkedIn} target="_blank" rel="noreferrer">
                <FiLinkedin className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href={personalInfo.twitter} target="_blank" rel="noreferrer">
                <FiTwitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FiMail /> {personalInfo.email}
              </div>
              <div className="flex items-center gap-2">
                <FiPhone /> {personalInfo.phone}
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin /> {personalInfo.location}
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                icon={<HiOutlineArrowUp />}
              >
                Back to Top
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
          © 2026 Victor Ebube Okoroji. All rights reserved. Built with Next.js, TypeScript & TailwindCSS.
        </div>
      </footer>

      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCaseStudy(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-white dark:bg-gray-900 p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedCaseStudy.title}
                  </h2>
                  <Badge variant="secondary">{selectedCaseStudy.year}</Badge>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">{selectedCaseStudy.company}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt />
                    <span>{selectedCaseStudy.duration}</span>
                  </div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {selectedCaseStudy.role}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Overview</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedCaseStudy.overview}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.techStack.map((tech: string) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">The Challenge</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedCaseStudy.challenge.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Solution & Approach</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedCaseStudy.solution.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Results & Impact</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedCaseStudy.results.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Freelance",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const characterCount = formData.message.length;

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to send message");
      return response.json();
    },
    onSuccess: () => {
      setFormData({ name: "", email: "", subject: "Freelance", message: "" });
      setErrors({});
      setTimeout(() => mutation.reset(), 3000);
    },
    onError: () => {
      setTimeout(() => mutation.reset(), 3000);
    },
  });

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    if (!formData.message.trim()) nextErrors.message = "Message is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    mutation.mutate(formData);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-sm"
              placeholder="Your name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-sm"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <select
              value={formData.subject}
              onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-sm"
            >
              <option>Freelance</option>
              <option>Full-time</option>
              <option>Collaboration</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              value={formData.message}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-sm min-h-[140px]"
              placeholder="Tell me about your project"
            />
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className={errors.message ? "text-red-500" : "text-gray-500"}>{errors.message ? errors.message : " "}</span>
              <span className="text-gray-500">{characterCount}/500</span>
            </div>
          </div>
          <Button type="submit" className="cursor-pointer" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Send Message"}
          </Button>
          <AnimatePresence>
            {mutation.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-xl bg-green-100 text-green-700 px-4 py-2 text-sm"
              >
                Message sent successfully.
              </motion.div>
            )}
            {mutation.isError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm"
              >
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Card>
      <div className="space-y-4">
        <Card>
          <div className="flex items-center gap-3">
            <FiMail className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-semibold">{personalInfo.email}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <FiPhone className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
              <p className="font-semibold">{personalInfo.phone}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
              <p className="font-semibold">{personalInfo.location}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <span className="text-lg">🟢</span>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
              <p className="font-semibold">Available for Projects</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Usually responds within 24 hours.</p>
        </Card>
      </div>
    </div>
  );
}
