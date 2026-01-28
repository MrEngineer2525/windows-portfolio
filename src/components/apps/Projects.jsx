import React, { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaRocket,
  FaChevronRight,
  FaSearch,
  FaStar,
  FaFire,
  FaArrowRight,
  
} from "react-icons/fa";
// removed unused AiOutlineCloudSync
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

// --- PROJECT DATA ---
const projectsData = [
  {
    id: 1,
    title: "Windows 11 Desktop Portfolio",
    description:
      "A stunning recreated Windows 11 interface with fully functional desktop applications, draggable windows, and responsive design. Built with React and Tailwind CSS.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134ef2e541c?w=500&h=300&fit=crop",
    tech: ["React", "Tailwind CSS", "JavaScript", "Framer Motion"],
    role: "Full Stack Developer",
    impact: "Showcases modern web dev with retro Windows aesthetics",
    github: "https://github.com",
    live: "https://windows11-portfolio.vercel.app",
    featured: true,
    rating: 5,
    color: "cyan",
    icon: "💻",
    stats: { downloads: "50K+", users: "15K+", uptime: "99.9%" },
    highlights: ["Draggable Windows", "20+ Apps", "Real-time Clock", "Custom Themes"],
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A fully functional e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard with real-time inventory.",
    image:
      "https://images.unsplash.com/photo-1563062407-75d05e0f1be2?w=500&h=300&fit=crop",
    tech: ["Node.js", "MongoDB", "React", "Stripe API", "Redis"],
    role: "Full Stack Developer",
    impact: "Generated $500K+ in annual revenue with 99.5% uptime",
    github: "https://github.com",
    live: "https://ecommerce-platform.demo",
    featured: true,
    rating: 5,
    color: "emerald",
    icon: "🛒",
    stats: { sales: "$500K+", users: "50K+", conversion: "8.5%" },
    highlights: ["Payment Gateway", "Admin Dashboard", "Analytics", "Mobile Responsive"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: 3,
    title: "AI Task Management System",
    description:
      "An intelligent task management application powered by AI with smart prioritization, deadline prediction, and automated workflow suggestions.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    tech: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    role: "AI/ML Engineer",
    impact: "Increased user productivity by 40% with ML algorithms",
    github: "https://github.com",
    live: "https://ai-taskmanager.app",
    featured: true,
    rating: 5,
    color: "violet",
    icon: "🤖",
    stats: { accuracy: "94%", tasks: "2M+", teams: "5K+" },
    highlights: ["ML Predictions", "Real-time Sync", "Smart Suggestions", "Team Collaboration"],
    gradient: "from-violet-500 via-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Real-Time Collaboration Tool",
    description:
      "A real-time document collaboration platform with live editing, version control, comments, and multi-user presence with WebSocket integration.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    tech: ["WebSocket", "React", "Node.js", "Firebase", "Operational Transform"],
    role: "Full Stack Developer",
    impact: "Supports 1000+ concurrent users with <100ms latency",
    github: "https://github.com",
    live: "https://collab-tool.dev",
    featured: false,
    rating: 4.9,
    color: "pink",
    icon: "👥",
    stats: { concurrent: "1000+", latency: "<100ms", documents: "500K+" },
    highlights: ["Live Editing", "Version History", "Comments", "Presence Indicators"],
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    id: 5,
    title: "Mobile Weather App",
    description:
      "A cross-platform mobile weather application with beautiful animations, hourly forecasts, and weather alerts built with React Native.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop",
    tech: ["React Native", "OpenWeather API", "Redux", "Geolocation"],
    role: "Mobile Developer",
    impact: "200K+ downloads with 4.8 star rating across app stores",
    github: "https://github.com",
    live: "https://apps.apple.com",
    featured: false,
    rating: 4.8,
    color: "orange",
    icon: "🌤️",
    stats: { downloads: "200K+", rating: "4.8★", countries: "120+" },
    highlights: ["Push Notifications", "Offline Mode", "Beautiful Animations", "Location Services"],
    gradient: "from-orange-500 via-yellow-500 to-amber-500",
  },
  {
    id: 6,
    title: "Data Analytics Dashboard",
    description:
      "An enterprise-grade analytics dashboard with interactive visualizations, real-time data processing, and custom report generation.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    tech: ["D3.js", "Vue.js", "WebGL", "Apache Kafka", "BigQuery"],
    role: "Data Visualization Engineer",
    impact: "Reduced reporting time by 80% for enterprise clients",
    github: "https://github.com",
    live: "https://analytics-dashboard.io",
    featured: false,
    rating: 4.9,
    color: "blue",
    icon: "📊",
    stats: { dataPoints: "100M+", clients: "200+", queries: "10M/day" },
    highlights: ["Real-time Charts", "Custom Reports", "Data Export", "ML Predictions"],
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
  },
];

// --- ANIMATED PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, isExpanded, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const colorMap = {
    cyan: "from-cyan-500 to-blue-500",
    emerald: "from-emerald-500 to-teal-500",
    violet: "from-violet-500 to-purple-500",
    pink: "from-pink-500 to-rose-500",
    orange: "from-orange-500 to-amber-500",
    blue: "from-blue-500 to-indigo-500",
  };

  // Map individual tech names to distinct badge colors
  const getTechColor = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes("react")) return { bg: "bg-cyan-600/40", border: "border-cyan-400", text: "text-cyan-200" };
    if (t.includes("tailwind")) return { bg: "bg-sky-600/40", border: "border-sky-400", text: "text-sky-200" };
    if (t.includes("javascript")) return { bg: "bg-yellow-600/30", border: "border-yellow-400", text: "text-yellow-200" };
    if (t.includes("node")) return { bg: "bg-emerald-600/30", border: "border-emerald-400", text: "text-emerald-200" };
    if (t.includes("python")) return { bg: "bg-violet-600/40", border: "border-violet-400", text: "text-violet-200" };
    if (t.includes("mongodb") || t.includes("redis")) return { bg: "bg-emerald-700/30", border: "border-emerald-400", text: "text-emerald-200" };
    if (t.includes("tensorflow") || t.includes("ml")) return { bg: "bg-orange-600/35", border: "border-orange-400", text: "text-orange-200" };
    if (t.includes("d3") || t.includes("webgl")) return { bg: "bg-amber-600/35", border: "border-amber-400", text: "text-amber-200" };
    if (t.includes("react native")) return { bg: "bg-indigo-600/35", border: "border-indigo-400", text: "text-indigo-200" };
    // default
    return { bg: "bg-neutral-700/30", border: "border-white/10", text: "text-neutral-200" };
  };

  // Respect user's reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generate a simple SVG placeholder data URL when images fail
  const createPlaceholder = (title) => {
    const txt = title.replace(/&/g, '&amp;');
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
        <defs>
          <linearGradient id='g' x1='0' x2='1'>
            <stop offset='0' stop-color='#0ea5a4'/>
            <stop offset='1' stop-color='#7c3aed'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#g)' />
        <text x='50%' y='48%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='rgba(255,255,255,0.95)'>${txt}</text>
        <text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='22' fill='rgba(255,255,255,0.75)'>Project preview</text>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative h-full cursor-pointer perspective"
      style={{ perspective: "1000px", transitionTimingFunction: prefersReducedMotion ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {/* 3D Background Light Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 197, 94, 0.2), transparent 80%)`,
            transition: "all 100ms",
          }}
        />
      )}

      {/* Main Card */}
       <div className="relative h-full rounded-3xl overflow-hidden border-2 border-white/10 hover:border-white/40 bg-gradient-to-br from-neutral-800 to-neutral-900 backdrop-blur-xl transition-transform duration-350 ease-out transform-gpu will-change-transform group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-2xl"
         style={{ transitionTimingFunction: prefersReducedMotion ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
        
        {/* Animated Gradient Border */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />

        {/* Top Accent Bar */}
        <div className={`h-2 bg-gradient-to-r ${colorMap[project.color]} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Image Container with Overlay */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.image || `https://source.unsplash.com/1200x800/?${encodeURIComponent(project.tech[0] || 'code')}`}
            alt={project.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = createPlaceholder(project.title);
            }}
            className="w-full h-full object-cover transition-transform duration-300 transform-gpu filter group-hover:scale-105 group-hover:brightness-110"
            style={{ willChange: 'transform' }}
          />
          
          {/* Multi-layer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-neutral-900" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

          {/* Floating Icon */}
          <div className="absolute top-4 left-4 text-4xl opacity-90 transition-transform duration-200 transform-gpu group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg">
            {project.icon}
          </div>

          {/* Featured Badge with Animation */}
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 backdrop-blur-xl px-3 py-1.5 rounded-full border border-amber-400 animate-pulse">
              <FaFire size={14} className="text-yellow-300 animate-bounce" />
              <span className="text-xs font-black text-white">FEATURED</span>
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-neutral-800/95 backdrop-blur-xl px-3 py-1.5 rounded-full border border-yellow-500">
            <FaStar size={12} className="text-yellow-400" />
            <span className="text-sm font-black text-white">{project.rating}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative p-5 flex flex-col gap-3">
          {/* Title with Animation */}
          <div className="mb-3">
            <h3 className="font-black text-xl lg:text-2xl text-white group-hover:text-cyan-200 transition-colors duration-300 ease-in-out" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              {project.title}
            </h3>
          </div>

          {/* Description - visible by default */}
          <p className="text-sm text-neutral-300 leading-relaxed mb-2 transition-colors duration-300 ease-in-out" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
            {project.description}
          </p>

          {/* Role & Impact with Icons */}
          <div className="space-y-2 mb-4 text-xs">
            <div className="flex items-start gap-2">
              <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${colorMap[project.color]} mt-1 flex-shrink-0`} />
              <span className="text-neutral-200 font-semibold">{project.role}</span>
            </div>
            <div className="flex items-start gap-2">
              <FaRocket size={11} className="text-emerald-400 mt-1.5 flex-shrink-0" />
              <span className="text-emerald-300 font-semibold">{project.impact}</span>
            </div>
          </div>

          {/* Highlights Tags - visible */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <span
                key={idx}
                className={`text-[10px] uppercase font-black text-white px-2.5 py-1 rounded-lg transition-all duration-200 opacity-95 transform-gpu group-hover:-translate-y-1`}
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))', transitionDelay: `${idx * 20}ms` }}
              >
                ✨ {highlight}
              </span>
            ))}
          </div>

          {/* Tech Stack with individual colors */}
          <div className="mb-3 space-y-2">
            <div className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 6).map((tech, idx) => {
                const c = getTechColor(tech);
                return (
                  <span
                    key={idx}
                    className={`text-[10px] uppercase font-bold ${c.text} ${c.bg} border-2 ${c.border} px-2.5 py-1 rounded-md hover:scale-110 transition-transform duration-300 ease-in-out transform-gpu cursor-default`}
                    style={{ transitionDelay: `${idx * 10}ms` }}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Stats Row - visible */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-white/6 border border-white/10 transition-opacity duration-300 ease-in-out">
            {Object.entries(project.stats).map(([key, value], idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs font-black text-white">{value}</div>
                <div className="text-[9px] text-neutral-300 uppercase font-semibold">{key}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
              <a
                href="#"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                className="flex-1 flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 border-2 border-white/30 hover:border-white/60 px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 hover:shadow-lg group/btn"
              >
                <FaGithub size={14} className="group-hover/btn:rotate-12 transition-transform duration-100" />
                <span>Code</span>
              </a>
            <a
              href="#"
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
              className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${colorMap[project.color]} hover:brightness-110 px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 hover:shadow-lg group/btn`}
            >
              <FaExternalLinkAlt size={14} className="group-hover/btn:translate-x-1 transition-transform duration-100" />
              <span>Live</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ENHANCED PROJECTS FILTER COMPONENT ---
const ProjectsFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "All Projects", value: "all", icon: FaCode, gradient: "from-cyan-500 to-blue-500" },
    { label: "Featured", value: "featured", icon: FaFire, gradient: "from-amber-500 to-orange-500" },
    { label: "Full Stack", value: "fullstack", icon: FaRocket, gradient: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="flex gap-3 flex-wrap mb-10">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`group flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border-2 relative overflow-hidden ${
              isActive
                ? `bg-gradient-to-r ${filter.gradient} text-white shadow-2xl shadow-cyan-500/40 border-white/30 scale-105`
                : "bg-neutral-900/50 text-neutral-300 border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-800/70"
            }`}
          >
            <Icon size={16} className={isActive ? "animate-bounce" : "group-hover:rotate-12 transition-transform"} />
            <span>{filter.label}</span>
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
};

// --- MAIN PROJECTS COMPONENT ---
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Chart data computations ---
  const techCounts = {};
  projectsData.forEach((p) => {
    (p.tech || []).forEach((t) => {
      techCounts[t] = (techCounts[t] || 0) + 1;
    });
  });
  const pieData = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));
  const chartColors = ["#06b6d4", "#7c3aed", "#f97316", "#10b981", "#ef4444", "#3b82f6"];

  const featuredCount = projectsData.filter((p) => p.featured).length;
  const barData = [
    { name: "Featured", value: featuredCount },
    { name: "Other", value: projectsData.length - featuredCount },
  ];

  const avgRating = projectsData.reduce((s, p) => s + (p.rating || 0), 0) / projectsData.length;
  const radialData = [{ name: "Average", value: Math.round((avgRating / 5) * 100) }];

  // Filter projects
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "featured" && project.featured) ||
      (activeFilter === "fullstack" &&
        project.tech.includes("React") &&
        project.tech.includes("Node.js"));
    return matchesSearch && matchesFilter;
  });

  const scrollStyle = {
    scrollbarWidth: "thin",
    scrollbarColor: "#d1d5db transparent",
  };

  return (
    <section
      className="relative h-full min-h-0 overflow-y-auto rounded-[2.5rem] border-2 border-white/20 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-6 lg:p-10 custom-scrollbar transition-all duration-300"
      style={scrollStyle}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <div className="mb-10 lg:mb-14">
          <div className="flex items-start gap-6 mb-6">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-2xl transform-gpu group-hover:scale-105 transition-transform duration-500">
              <FaCode className="text-white" size={30} />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                Studio-Quality Projects
              </h1>

              <div className="mt-3 flex flex-col md:flex-row md:items-center md:gap-6 gap-3">
                <p className="text-lg text-neutral-200 max-w-2xl">
                  Design-forward, code-driven, production-ready — built to impress hiring managers and collaborators.
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-2 bg-neutral-800/60 border border-white/10 px-3 py-2 rounded-2xl">
                    <FaCode className="text-cyan-300" />
                    <div className="text-sm font-bold text-white">{projectsData.length} Projects</div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-neutral-800/60 border border-white/10 px-3 py-2 rounded-2xl">
                    <FaFire className="text-amber-300" />
                    <div className="text-sm font-bold text-white">{projectsData.filter(p => p.featured).length} Featured</div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-neutral-800/60 border border-white/10 px-3 py-2 rounded-2xl">
                    <FaStar className="text-yellow-400" />
                    <div className="text-sm font-bold text-white">{(projectsData.reduce((s,p)=>s+(p.rating||0),0)/projectsData.length).toFixed(1)}★ Avg</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <a href="#projects" className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-5 py-3 rounded-2xl font-bold text-white shadow-lg transition-transform duration-300 ease-in-out transform-gpu hover:-translate-y-1">
                  View Case Studies
                  <FaChevronRight />
                </a>
                <a href="mailto:claytonecurth@gmail.com" className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 rounded-2xl text-sm font-bold text-neutral-200 hover:bg-neutral-800/60 transition-colors duration-300">
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar with Advanced Styling */}
        <div className="mb-8 relative">
          <div className="relative flex items-center max-w-3xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <FaSearch size={16} />
            </div>
            <input
              type="text"
              placeholder="Search projects (name, tech, description)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/10 focus:border-cyan-400/70 pl-12 pr-4 py-3 text-white placeholder-neutral-500 outline-none transition-colors duration-300 text-sm"
            />
            <button
              onClick={() => setSearchTerm("")}
              className="ml-3 text-sm text-neutral-300 hover:text-white transition-colors duration-200"
              aria-label="clear search"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <ProjectsFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Projects Grid with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <div
                  key={project.id}
                  className="overflow-visible min-h-[420px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[540px] xl:min-h-[560px]"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 80}ms both`,
                  }}
                >
                <ProjectCard
                  project={project}
                  isExpanded={selectedProject?.id === project.id}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject?.id === project.id ? null : project
                    )
                  }
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-neutral-300 text-2xl font-bold mb-3">
                No projects found
              </div>
              <p className="text-neutral-500 text-base">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Advanced Stats Section with Charts */}
        <div className="mt-20 pt-16 border-t-2 border-white/10">
          <h2 className="text-2xl font-black text-white mb-8">📊 Project Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start">
            {/* Top Tech Pie */}
            <div className="p-8 rounded-2xl bg-neutral-800 border border-white/8 shadow-sm">
              <div className="text-sm text-neutral-300 font-bold mb-4">Top Technologies</div>
              <div style={{ width: '100%', height: 360 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={6}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0b1220', borderRadius: 8, color: '#fff' }} itemStyle={{ color: '#fff' }} />
                    <Legend verticalAlign="bottom" wrapperStyle={{ color: '#9CA3AF', marginTop: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Featured vs Other Bar */}
            <div className="p-8 rounded-2xl bg-neutral-800 border border-white/8 shadow-sm">
              <div className="text-sm text-neutral-300 font-bold mb-4">Featured vs Others</div>
              <div style={{ width: '100%', height: 360 }}>
                <ResponsiveContainer>
                  <BarChart data={barData} margin={{ left: 10, right: 10 }}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" x2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.9} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                    <YAxis tick={{ fill: '#9CA3AF' }} />
                    <Tooltip contentStyle={{ background: '#0b1220', borderRadius: 8 }} />
                    <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={36} fill="url(#barGrad)" animationDuration={800} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Average Rating Radial */}
            <div className="p-6 rounded-2xl bg-neutral-800 border border-white/10 flex flex-col items-center justify-center">
              <div className="text-sm text-neutral-300 font-bold mb-3">Average Rating</div>
              <div style={{ width: '100%', height: 260, position: 'relative' }}>
                <ResponsiveContainer>
                  <RadialBarChart innerRadius="60%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
                    <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={12} fill={chartColors[1]} animationDuration={900} />
                    <Tooltip wrapperStyle={{ background: '#071126', borderRadius: 8 }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
                  <div className="text-white font-black text-2xl">{avgRating.toFixed(1)}★</div>
                  <div className="text-neutral-400 text-sm">Average</div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="p-6 rounded-2xl bg-neutral-800 border border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-300">Total Projects</div>
                  <div className="text-lg font-black text-white">{projectsData.length}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-300">Featured</div>
                  <div className="text-lg font-black text-white">{featuredCount}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-300">Top Tech</div>
                  <div className="text-lg font-black text-white">{pieData[0]?.name || '—'}</div>
                </div>
                <div className="mt-2 text-neutral-400 text-sm">Multi-color charts above show breakdowns — hover for details.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-neutral-900/70 to-neutral-800/60 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/6 rounded-full blur-2xl transform-gpu group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-violet-500/6 rounded-full blur-2xl transform-gpu group-hover:translate-x-4 transition-transform duration-700" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 mb-2">
                Ready to collaborate?
              </h3>
              <p className="text-neutral-200 text-base font-semibold">
                See more projects, contributions, and case studies on my GitHub — let's build something modern together.
              </p>
            </div>
            <a
              href="#"
              className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-4 rounded-2xl font-bold text-white transition-transform duration-300 ease-in-out hover:scale-105 whitespace-nowrap shadow-lg"
            >
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"> 
                <FaGithub size={16} />
              </span>
              <span>View All on GitHub</span>
              <FaArrowRight className="ml-2 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2" size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-12 flex justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              style={{
                animation: `pulse 2s ease-in-out ${i * 200}ms infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
