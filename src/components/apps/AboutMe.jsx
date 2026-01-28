import React from "react";
import { 
  FaGithub, FaExternalLinkAlt, FaChevronLeft, FaGraduationCap, 
  FaBriefcase, FaAward, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCogs 
} from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import { skills, githubRepos } from "../../data/data";
import Sponsor from "./Sponsor";
import Projects from "./Projects";

// Set up PDF worker - use unpkg CDN which is more reliable
pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

// --- SAIDIZI: PROJECT CARD ---
const ProjectCard = ({ title, description, tech = [], link = "#" }) => (
  <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 will-change-transform hover:border-[#17D9F9]/30 hover:bg-white/10 transition-colors duration-200">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-[#17D9F9] text-lg">{title}</h3>
      <FaExternalLinkAlt className="text-neutral-500 group-hover:text-[#17D9F9]" size={14} />
    </div>
    <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{description}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <span key={i} className="text-[10px] uppercase font-bold text-neutral-500 bg-black/30 px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const AboutMe = ({ page, handleDivClick, expandedDiv }) => {
  const [resumeUrl, setResumeUrl] = React.useState("/docs/resume.pdf");
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
    setError("Failed to load PDF. Please try opening it in a new tab.");
  };

  const handleResumeClick = async () => {
    setIsLoading(true);
    // Simulate loading delay for attractive effect
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Open resume in new tab
    window.open(resumeUrl, '_blank');
    setIsLoading(false);
  };

  // Style kwa ajili ya scrollbar
  const scrollStyle = {
    scrollbarWidth: "thin",
    scrollbarColor: "#0127BC #0a0a0a",
  };

  const renderPageContent = () => {
    switch (page) {
      case "About Me":
        return (
          <section className="relative h-full min-h-0 overflow-y-auto rounded-[2.5rem] border border-white/10 bg-neutral-950 p-6 lg:p-10 shadow-2xl custom-scrollbar" style={scrollStyle}>
            <div className="relative z-10 flex flex-col lg:flex-row gap-12">
              {/* Profile Image & Quick Contacts */}
              <div className="lg:sticky lg:top-0 h-fit w-full lg:w-80 shrink-0">
                <div className="relative overflow-hidden rounded-3xl border-2 border-gradient-to-br from-cyan-400 to-blue-400 bg-neutral-900 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 pointer-events-none" />
                  <img src="https://res.cloudinary.com/dwpfd5nak/image/upload/v1768254122/Leora_Tech_Solutions_v1_h9vmee.png" className="w-full object-cover aspect-square lg:aspect-[4/5] relative z-10" alt="Claytone" />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-6 z-20">
                    <h2 className="text-2xl font-black text-white">Claytone C. Mhina</h2>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#17D9F9] to-[#0127BC] text-xs font-bold tracking-widest uppercase mt-1">💻 Computer Scientist</p>
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <div className="group relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 hover:border-emerald-400/50 transition-all p-4 hover:shadow-lg hover:shadow-emerald-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                        <FaEnvelope className="text-emerald-400" size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Email</p>
                        <p className="text-emerald-200/80 text-sm truncate group-hover:text-emerald-200 transition-colors">claytonecurth@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-blue-900/30 to-blue-900/10 hover:border-blue-400/50 transition-all p-4 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                        <FaPhone className="text-blue-400" size={14} />
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Phone</p>
                        <p className="text-blue-200/80 text-sm group-hover:text-blue-200 transition-colors">+255 711 311 363</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-purple-900/30 to-purple-900/10 hover:border-purple-400/50 transition-all p-4 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
                        <FaMapMarkerAlt className="text-purple-400" size={14} />
                      </div>
                      <div>
                        <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Location</p>
                        <p className="text-purple-200/80 text-sm group-hover:text-purple-200 transition-colors">Dar es Salaam / Moshi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Detailed Content */}
              <div className="flex-1 space-y-10">
                <div className="space-y-4">
                    <h1 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                      Innovation Driven 
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#17D9F9] via-cyan-400 to-blue-400 mt-2">Software Solutions.</span>
                    </h1>
                    <p className="text-neutral-300 leading-relaxed text-lg font-medium">
                      Detail-oriented Computer Science graduate with a solid technical background in software development, networking, database systems, and multimedia. Driven by innovation, continuous learning, and the application of modern technologies to solve challenging problems.
                    </p>
                </div>

                {/* Grid Info - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <div className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-pink-900/30 to-pink-900/10 hover:border-pink-400/50 transition-all p-6 hover:shadow-2xl hover:shadow-pink-500/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                      <div className="relative z-10">
                        <h4 className="text-sm font-bold text-pink-300 uppercase tracking-widest flex items-center gap-2 mb-4">
                          <div className="h-2 w-2 rounded-full bg-pink-400" />
                          Personal Details
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-pink-400/60 font-bold min-w-20">DOB:</span>
                              <span className="text-pink-100/80">20th August 2001</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-pink-400/60 font-bold min-w-20">Born:</span>
                              <span className="text-pink-100/80">Tanga, Tanzania</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-pink-400/60 font-bold min-w-20">Languages:</span>
                              <span className="text-pink-100/80">English & Swahili (Fluent)</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-pink-400/60 font-bold min-w-20">Nation:</span>
                              <span className="text-pink-100/80">Tanzanian</span>
                            </li>
                        </ul>
                      </div>
                    </div>

                    {/* Core Capabilities */}
                    <div className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-orange-900/30 to-orange-900/10 hover:border-orange-400/50 transition-all p-6 hover:shadow-2xl hover:shadow-orange-500/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                      <div className="relative z-10">
                        <h4 className="text-sm font-bold text-orange-300 uppercase tracking-widest flex items-center gap-2 mb-4">
                          <div className="h-2 w-2 rounded-full bg-orange-400" />
                          Core Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {["Software Dev", "Database Mgmt", "Networking", "UI/UX Design", "Troubleshooting", "Data Integrity"].map(cap => (
                                <span key={cap} className="px-3 py-1.5 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-400/40 rounded-full text-xs text-orange-200 font-bold uppercase hover:border-orange-300/70 transition-all hover:bg-orange-500/30 cursor-pointer">{cap}</span>
                            ))}
                        </div>
                      </div>
                    </div>
                </div>

                {/* General Achievements Section */}
                <div className="space-y-5">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/40 flex items-center justify-center">
                       <FaAward className="text-yellow-400" size={18} />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Career Milestones</h3>
                       <p className="text-yellow-300/50 text-xs">Key achievements & accomplishments</p>
                     </div>
                   </div>
                   <div className="space-y-3">
                      {[
                        { icon: "🔧", text: "Developed local offline CDN for learning resources reducing data costs.", color: "from-emerald-500 to-emerald-600" },
                        { icon: "📱", text: "Deployed biometric student attendance systems for high accuracy.", color: "from-blue-500 to-blue-600" },
                        { icon: "⚡", text: "Optimized IT infrastructure at TRA and EnterSoft for zero downtime.", color: "from-purple-500 to-purple-600" },
                        { icon: "🎓", text: "Participated in Odoo Business & ERP Seminar (Johari Rotana).", color: "from-pink-500 to-pink-600" }
                      ].map((ach, i) => (
                        <div key={i} className={`group relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-white/5 to-white/0 hover:border-white/20 transition-all p-4 hover:shadow-lg hover:shadow-white/10 cursor-pointer`}>
                          <div className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity`} />
                          <div className="relative flex gap-3">
                             <span className="text-2xl shrink-0">{ach.icon}</span>
                             <p className="text-neutral-300 group-hover:text-neutral-200 transition-colors text-sm leading-relaxed">{ach.text}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "Education":
        return (
          <section className="h-full min-h-0 overflow-y-auto rounded-[2.5rem] border border-white/10 bg-neutral-950 p-8 shadow-2xl custom-scrollbar" style={scrollStyle}>
            <header className="mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#17D9F9] to-[#0127BC] italic">Academic Journey</p>
              <h2 className="text-2xl font-black text-white mt-2">Educational Growth Tree</h2>
              <p className="text-neutral-400 text-xs mt-2">Building knowledge from roots to branches</p>
            </header>

            {/* Tree Visualization */}
            <div className="relative">
              {/* Tree SVG Background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 800 1200" preserveAspectRatio="none">
                {/* Trunk */}
                <rect x="380" y="600" width="40" height="200" fill="#8B4513" opacity="0.3" rx="20" />
                {/* Branch lines */}
                <line x1="400" y1="600" x2="250" y2="400" stroke="#0127BC" strokeWidth="2" opacity="0.2" />
                <line x1="400" y1="600" x2="550" y2="400" stroke="#17D9F9" strokeWidth="2" opacity="0.2" />
                <line x1="250" y1="400" x2="150" y2="250" stroke="#9D4EDD" strokeWidth="2" opacity="0.2" />
                <line x1="250" y1="400" x2="350" y2="250" stroke="#3A86FF" strokeWidth="2" opacity="0.2" />
                <line x1="550" y1="400" x2="650" y2="250" stroke="#FB5607" strokeWidth="2" opacity="0.2" />
                <line x1="550" y1="400" x2="450" y2="250" stroke="#FFBE0B" strokeWidth="2" opacity="0.2" />
              </svg>

              {/* Content Grid */}
              <div className="relative z-10 grid md:grid-cols-2 gap-6">
                {/* Primary Education - Green Branch */}
                <div className="group relative">
                  <div className="overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 p-6 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                          <FaGraduationCap className="text-emerald-400" size={18} />
                        </div>
                        <div>
                          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Primary Education</p>
                          <p className="text-emerald-300/60 text-xs">2007 - 2014</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Kitumbi Primary School</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">Foundation years establishing core academics and fundamental knowledge base.</p>
                      <div className="mt-4 pt-4 border-t border-emerald-400/20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-emerald-300/70 text-xs font-mono">7 years • Primary Level</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ordinary Level - Blue Branch */}
                <div className="group relative">
                  <div className="overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-6 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                          <FaGraduationCap className="text-blue-400" size={18} />
                        </div>
                        <div>
                          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Ordinary Level</p>
                          <p className="text-blue-300/60 text-xs">2015 - 2018</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Kikunde Secondary School</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">Secondary education with focus on science, mathematics, and technical subjects.</p>
                      <div className="mt-4 pt-4 border-t border-blue-400/20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-blue-300/70 text-xs font-mono">4 years • Ordinary Level (O-Level)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Level - Purple Branch */}
                <div className="group relative">
                  <div className="overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-6 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                          <FaGraduationCap className="text-purple-400" size={18} />
                        </div>
                        <div>
                          <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Advanced Level</p>
                          <p className="text-purple-300/60 text-xs">2019 - 2021</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Songa Secondary School</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">Advanced specialization in science disciplines with enhanced practical training.</p>
                      <div className="mt-4 pt-4 border-t border-purple-400/20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <span className="text-purple-300/70 text-xs font-mono">2 years • Advanced Level (A-Level, HGE)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bachelor Degree - Cyan Branch (Featured) */}
                <div className="group relative">
                  <div className="overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 p-6 hover:border-cyan-400/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 ring-1 ring-cyan-400/20 hover:ring-cyan-400/50">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl group-hover:blur-2xl transition-all" />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500/40 to-cyan-600/30 border border-cyan-400/60 flex items-center justify-center ring-2 ring-cyan-400/30">
                          <FaGraduationCap className="text-cyan-300 animate-pulse" size={20} />
                        </div>
                        <div>
                          <p className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Bachelor of Science</p>
                          <p className="text-cyan-200/70 text-xs">2021 - 2024</p>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Mwenge Catholic University</h3>
                      <p className="text-cyan-100/80 text-sm leading-relaxed font-medium">Bachelor of Science in Computer Science - Professional degree in software development, networking, databases, and IT systems.</p>
                      <div className="mt-5 pt-5 border-t border-cyan-400/30 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300" />
                          <span className="text-cyan-200/80 text-xs font-mono font-bold">4 years • Bachelor Degree (B.Sc)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300" />
                          <span className="text-cyan-200/70 text-xs">Complete specialization in Computer Science</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Summary */}
              <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-gradient-to-r from-white/5 via-transparent to-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-1 rounded-full bg-[#17D9F9]" />
                  <h4 className="text-sm font-bold text-[#17D9F9] uppercase tracking-widest">Educational Timeline</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-300">
                  <div>
                    <span className="font-bold text-white">Total Education Duration:</span> 17+ Years (2007-2024)
                  </div>
                  <div>
                    <span className="font-bold text-white">Latest Qualification:</span> B.Sc Computer Science
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "Skills":
        return (
          <section className="h-full min-h-0 overflow-y-auto rounded-[2.5rem] border border-white/10 bg-neutral-950 p-8 shadow-2xl custom-scrollbar" style={scrollStyle}>
            <header className="mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#17D9F9] to-[#0127BC] italic">Professional Expertise</p>
              <h2 className="text-2xl font-black text-white mt-2">Skills & Competencies</h2>
              <p className="text-neutral-400 text-xs mt-2">Diverse skill branches cultivated through experience</p>
            </header>

            {/* TECHNICAL SKILLS - BLUE BRANCH */}
            <div className="mb-16">
              <div className="relative mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-950/40 to-transparent border border-blue-400/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
                      <FaCogs className="text-blue-400" size={22} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-100">Technical Skills</h3>
                      <p className="text-blue-300/60 text-xs mt-1">Core programming & development technologies</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { name: "React", icon: "⚛️", color: "from-blue-500 to-blue-600" },
                  { name: "Next.js", icon: "🚀", color: "from-blue-500 to-blue-600" },
                  { name: "JavaScript", icon: "✨", color: "from-yellow-500 to-blue-500" },
                  { name: "TypeScript", icon: "📘", color: "from-blue-400 to-blue-600" },
                  { name: "Node.js", icon: "🟢", color: "from-green-500 to-blue-600" },
                  { name: "Python", icon: "🐍", color: "from-blue-500 to-cyan-500" },
                  { name: "HTML/CSS", icon: "🎨", color: "from-orange-500 to-blue-500" },
                  { name: "Tailwind CSS", icon: "💨", color: "from-cyan-400 to-blue-600" },
                  { name: "MongoDB", icon: "📊", color: "from-green-500 to-blue-600" },
                  { name: "PostgreSQL", icon: "🗄️", color: "from-blue-600 to-blue-700" },
                  { name: "Git", icon: "📦", color: "from-orange-600 to-blue-600" },
                  { name: "REST APIs", icon: "🔌", color: "from-purple-500 to-blue-600" }
                ].map((skill, i) => (
                  <div key={i} className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur" />
                    <div className={`relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-4 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 group cursor-pointer`}>
                      <div className="text-3xl mb-2">{skill.icon}</div>
                      <p className="font-bold text-white text-sm group-hover:text-blue-200 transition-colors">{skill.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SOFT SKILLS - PURPLE BRANCH */}
            <div className="mb-16">
              <div className="relative mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-purple-950/40 to-transparent border border-purple-400/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center">
                      <FaAward className="text-purple-400" size={22} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-purple-100">Professional Skills</h3>
                      <p className="text-purple-300/60 text-xs mt-1">Interpersonal & leadership competencies</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { name: "Communication", icon: "💬", color: "from-purple-500 to-purple-600" },
                  { name: "Problem Solving", icon: "🧩", color: "from-purple-500 to-pink-500" },
                  { name: "Team Collaboration", icon: "👥", color: "from-purple-500 to-purple-600" },
                  { name: "Time Management", icon: "⏱️", color: "from-purple-500 to-indigo-600" },
                  { name: "Project Management", icon: "📋", color: "from-indigo-500 to-purple-600" },
                  { name: "Critical Thinking", icon: "🧠", color: "from-purple-500 to-blue-600" },
                  { name: "Leadership", icon: "👑", color: "from-yellow-500 to-purple-600" },
                  { name: "Adaptability", icon: "🔄", color: "from-purple-500 to-cyan-500" }
                ].map((skill, i) => (
                  <div key={i} className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur" />
                    <div className={`relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-4 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 group cursor-pointer`}>
                      <div className="text-3xl mb-2">{skill.icon}</div>
                      <p className="font-bold text-white text-sm group-hover:text-purple-200 transition-colors">{skill.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESIGN SKILLS - CYAN/ORANGE BRANCH */}
            <div>
              <div className="relative mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-orange-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-cyan-950/40 via-neutral-950/20 to-orange-950/40 border border-cyan-400/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-cyan-400/50 flex items-center justify-center">
                      <span className="text-xl">🎨</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-orange-100">Design & Creative</h3>
                      <p className="text-cyan-300/60 text-xs mt-1">Creative & visual design expertise</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { name: "UI/UX Design", icon: "🎯", color: "from-cyan-500 to-orange-500" },
                  { name: "Graphic Design", icon: "🖌️", color: "from-orange-500 to-red-500" },
                  { name: "Wireframing", icon: "📐", color: "from-cyan-500 to-blue-500" },
                  { name: "Prototyping", icon: "🔧", color: "from-orange-500 to-yellow-500" },
                  { name: "Design Systems", icon: "📦", color: "from-cyan-500 to-purple-500" },
                  { name: "Branding", icon: "✨", color: "from-orange-500 to-pink-500" },
                  { name: "Photoshop", icon: "📸", color: "from-cyan-400 to-blue-600" },
                  { name: "Illustrator", icon: "🎭", color: "from-orange-500 to-yellow-500" },
                  { name: "Premiere Pro", icon: "🎬", color: "from-purple-500 to-pink-500" },
                  { name: "Figma", icon: "⚙️", color: "from-cyan-500 to-cyan-600" },
                  { name: "Canva", icon: "🎪", color: "from-orange-500 to-red-500" },
                  { name: "Video Editing", icon: "📹", color: "from-red-500 to-orange-500" }
                ].map((skill, i) => (
                  <div key={i} className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur" />
                    <div className={`relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-cyan-900/20 to-orange-900/20 p-4 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 group cursor-pointer`}>
                      <div className="text-3xl mb-2">{skill.icon}</div>
                      <p className="font-bold text-white text-sm group-hover:text-cyan-200 transition-colors">{skill.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Summary */}
            <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-gradient-to-r from-white/5 via-transparent to-white/5">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                    <span className="text-lg">💻</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-300">Technical:</span>
                    <p className="text-neutral-400 text-xs">12+ technologies mastered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <span className="font-bold text-purple-300">Professional:</span>
                    <p className="text-neutral-400 text-xs">8 key soft skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center">
                    <span className="text-lg">🎨</span>
                  </div>
                  <div>
                    <span className="font-bold text-orange-300">Creative:</span>
                    <p className="text-neutral-400 text-xs">12 design tools</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "Experience": // HII NI SEHEMU MPYA KULINGANA NA CV
        return (
          <section className="h-full min-h-0 overflow-y-auto rounded-[2.5rem] border border-white/10 bg-neutral-950 p-8 shadow-2xl custom-scrollbar" style={scrollStyle}>
            <header className="mb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#17D9F9]">Employment History</p>
              <h2 className="text-2xl font-bold text-white mt-2">Professional Experience</h2>
            </header>
            <div className="space-y-8">
               {[
                 { 
                   date: "Sep 2024 - Nov 2025", 
                   role: "Software Developer", 
                   company: "EnterSoft Systems Ltd",
                   tasks: ["Developed custom software for business requirements", "Collaborated on web application designs", "Provided ICT consultancy & system optimization"]
                 },
                 { 
                   date: "Apr 2024 - Jun 2024", 
                   role: "Computer Technician", 
                   company: "ACTT, Moshi",
                   tasks: ["Designing product images & reel videos", "Diagnosing hardware/software issues", "Remote & in-person technical support"]
                 },
                 { 
                   date: "Aug 2023 - Oct 2023", 
                   role: "Field Practical Training", 
                   company: "TRA, Moshi",
                   tasks: ["Troubleshooting network issues & outages", "Installing/Configuring new network devices", "Patching network software"]
                 }
               ].map((exp, idx) => (
                 <div key={idx} className="p-6 rounded-3xl border border-white/5 bg-white/5 hover:border-[#0127BC]/20 transition-all">
                    <div className="flex justify-between flex-wrap gap-2">
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <span className="text-xs font-mono text-[#17D9F9] bg-[#0127BC]/10 px-3 py-1 rounded-full">{exp.date}</span>
                    </div>
                    <p className="text-[#17D9F9] font-medium text-sm mt-1 mb-4 flex items-center gap-2"><FaBriefcase size={12}/> {exp.company}</p>
                    <ul className="space-y-2">
                       {exp.tasks.map((task, i) => (
                         <li key={i} className="text-sm text-neutral-400 flex gap-2">
                           <span className="text-[#17D9F9]">•</span> {task}
                         </li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
          </section>
        );

      case "My Stuffs":
        return (
          <section className="h-full flex flex-col rounded-[2.5rem] border border-white/10 bg-neutral-950 p-8 shadow-2xl overflow-hidden">
            <h2 className="text-3xl font-bold text-white mb-8">Projects Accomplished</h2>
            <div className="overflow-y-auto flex-1 min-h-0 custom-scrollbar" style={scrollStyle}>
              <div className="grid gap-6 sm:grid-cols-2 pr-4 pb-4">
               <ProjectCard 
                  title="Biometric Attendance System" 
                  description="Ensures real-time monitoring and eliminates proxy attendance using fingerprint technology." 
                  tech={["Hardware Integration", "C++", "Database"]} 
               />
               <ProjectCard 
                  title="Local Offline CDN" 
                  description="A dedicated media server and Cudy router configuration for high-speed offline resource streaming." 
                  tech={["Networking", "DHCP", "Media Server"]} 
               />
               <ProjectCard 
                  title="E-Commerce Platform" 
                  description="Online electronic shopping system with secure payment and global audience reach." 
                  tech={["React", "Node.js", "Payment Gateway"]} 
               />
               <ProjectCard 
                  title="IT Infrastructure Optimization" 
                  description="Proactive maintenance and remote support solutions improving system reliability, reducing downtime, and enhancing operational efficiency." 
                  tech={["System Administration", "Network Management", "Technical Support"]} 
               />
              </div>
            </div>
          </section>
        );

      case "Resume":
        return (
          <section className="h-full flex flex-col rounded-[2.5rem] border border-white/10 bg-neutral-950 p-8 shadow-2xl overflow-hidden">
            <header className="mb-6">
              <h2 className="text-3xl font-bold text-white">My Resume</h2>
              <p className="text-neutral-400 text-sm mt-2">Computer Science Graduate | Software Developer | Problem Solver</p>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-neutral-50 overflow-auto min-h-0 custom-scrollbar">
              {isLoading && (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0127BC] to-[#17D9F9] rounded-full animate-spin" />
                  </div>
                  <p className="text-neutral-600 font-semibold">Loading Resume...</p>
                </div>
              )}
              {error && (
                <div className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="text-5xl">📄</div>
                  <p className="text-neutral-600 font-semibold text-center">{error}</p>
                  <a
                    href="/docs/resume.pdf"
                    download
                    className="mt-4 px-6 py-2 bg-[#0127BC] hover:bg-[#17D9F9] text-white rounded-lg font-semibold transition-all"
                  >
                    Download PDF
                  </a>
                </div>
              )}
              {!error && (
                <Document 
                  file={resumeUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={<div className="text-neutral-600 font-semibold">Loading PDF...</div>}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Page 
                    pageNumber={pageNumber} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={Math.min(window.innerWidth - 100, 800)}
                  />
                </Document>
              )}
            </div>
            {numPages && (
              <div className="mt-6 flex items-center justify-between text-white">
                <button 
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber === 1}
                  className="px-4 py-2 bg-[#0127BC] hover:bg-[#17D9F9] disabled:opacity-50 rounded-lg font-semibold transition-all"
                >
                  ← Previous
                </button>
                <span className="text-sm font-mono text-neutral-400">
                  Page {pageNumber} of {numPages}
                </span>
                <button 
                  onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                  disabled={pageNumber === numPages}
                  className="px-4 py-2 bg-[#0127BC] hover:bg-[#17D9F9] disabled:opacity-50 rounded-lg font-semibold transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </section>
        );

      default:
        return <div className="text-white p-10 font-mono italic">// 404: Not Found</div>;

      case "Projects":
        return <Projects />;

      case "Sponsor":
        return <Sponsor />;
    }
  };

  return (
    <main className="h-full w-full min-h-0 bg-black p-4 lg:p-6 text-neutral-200">
      <div className="h-full w-full min-h-0 max-w-[1400px] mx-auto transition-all duration-700 animate-in fade-in">
        {renderPageContent()}
      </div>
    </main>
  );
};

export default AboutMe;