import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Sponsor() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [lordLoaded, setLordLoaded] = useState(false);
  const [LottiePlayer, setLottiePlayer] = useState(null);

  const sponsorshipTiers = [
    {
      name: "Supporter",
      amount: "$5",
      monthly: "/month",
      
      description: "Perfect for early believers",
      benefits: [
        "Early access to new projects",
        "Direct email support",
        "Your name listed as supporter",
        "Exclusive updates & progress reports"
      ],
      color: "from-blue-400 via-blue-500 to-cyan-500",
      borderColor: "border-blue-500/30"
      ,
      logos: [
        'https://cdn.lordicon.com/tdxypbbn.json',
        'https://cdn.lordicon.com/uqzazqog.json',
        'https://cdn.lordicon.com/slkvcfos.json'
      ],
      // example remote Lottie JSON URLs (replace with your favorites)
      lottie: [
        'https://assets10.lottiefiles.com/packages/lf20_touohxv0.json',
        'https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json',
        'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json'
      ]
    },
    {
      name: "Sponsor",
      amount: "$25",
      monthly: "/month",
      icon: "🚀",
      description: "The best value choice",
      benefits: [
        "All Supporter benefits",
        "Priority feature requests",
        "Direct WhatsApp support",
        "1-on-1 consulting hour monthly"
      ],
      color: "from-purple-400 via-pink-500 to-red-500",
      borderColor: "border-pink-500/50",
      featured: true
      ,
      logos: [
        'https://cdn.lordicon.com/mecwbjzp.json',
        'https://cdn.lordicon.com/tdxypbbn.json',
        'https://cdn.lordicon.com/ivhjslaq.json'
      ],
      lottie: [
        'https://assets7.lottiefiles.com/packages/lf20_mf8g6djy.json',
        'https://assets8.lottiefiles.com/packages/lf20_p8bfn5to.json',
        'https://assets5.lottiefiles.com/packages/lf20_4kx2q32n.json'
      ]
    },
    {
      name: "Partner",
      amount: "$100",
      monthly: "/month",
      icon: "💎",
      description: "Enterprise partnership",
      benefits: [
        "All Sponsor benefits",
        "Unlimited consulting hours",
        "Custom development services",
        "Strategic partnership opportunity"
      ],
      color: "from-yellow-400 via-orange-500 to-red-500",
      borderColor: "border-orange-500/30"
      ,
      logos: [
        'https://cdn.lordicon.com/slkvcfos.json',
        'https://cdn.lordicon.com/mecwbjzp.json',
        'https://cdn.lordicon.com/tdxypbbn.json'
      ],
      lottie: [
        'https://assets10.lottiefiles.com/packages/lf20_x62chJ.json',
        'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json',
        'https://assets9.lottiefiles.com/packages/lf20_touohxv0.json'
      ]
    }
  ];

  // small inline SVG logo generator to ensure visible, reliable placeholders
  const makeLogoDataUrl = (label, color = '#06b6d4') => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='80'><rect width='100%' height='100%' rx='8' fill='${color}' opacity='0.15'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='16' fill='white' opacity='0.95'>${label}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // dynamically load Lordicon script for animated icons
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    // If already registered as a custom element, mark loaded.
    if (window.customElements && window.customElements.get && window.customElements.get('lord-icon')) {
      setLordLoaded(true);
      return;
    }

    // If a script tag for lordicon exists (we added it to index.html), attach load listener.
    const existingScript = Array.from(document.scripts).find((s) => s.src && s.src.includes('lordicon'));
    if (existingScript) {
      if (existingScript.getAttribute('data-lordicon-loaded')) {
        setLordLoaded(true);
        return;
      }
      existingScript.addEventListener('load', () => {
        existingScript.setAttribute('data-lordicon-loaded', '1');
        setLordLoaded(true);
      });
      // if already complete
      if (existingScript.readyState === 'complete' || existingScript.readyState === 'loaded') {
        existingScript.setAttribute('data-lordicon-loaded', '1');
        setLordLoaded(true);
      }
      return;
    }

    // fallback: inject script if none exists (keeps previous behavior)
    const s = document.createElement('script');
    s.src = 'https://cdn.lordicon.com/lordicon.js';
    s.async = true;
    s.setAttribute('data-lordicon', '1');
    s.onload = () => { s.setAttribute('data-lordicon-loaded', '1'); setLordLoaded(true); };
    document.body.appendChild(s);
  }, []);

  // lazy-load react-lottie-player at runtime (optional). If not installed, we fall back to inline SVGs.
  React.useEffect(() => {
    let mounted = true;
    import('react-lottie-player').then((mod) => {
      if (mounted && mod && mod.Player) setLottiePlayer(() => mod.Player);
    }).catch(() => {
      // no-op: player not available, we'll use local SVGs
    });
    return () => { mounted = false; };
  }, []);

  const stats = [
    { number: "1000+", label: "Lines of Code", icon: "💻" },
    { number: "25+", label: "Projects Built", icon: "🎨" },
    { number: "100%", label: "Commitment", icon: "💯" },
    { number: "24/7", label: "Dedication", icon: "⚡" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const floatingAnimation = {
    animate: { y: [0, -20, 0] },
    transition: { duration: 3, repeat: Infinity }
  };

  const pulseAnimation = {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity }
  };

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in sponsoring your work. Let's discuss the details!";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/255711311363?text=${encodedMessage}`, '_blank');
  };

  // Imperative mount helper for lord-icon custom element
  function LordIconMount({ src, size = '36px', loaded }) {
    const mountRef = React.useRef(null);
    React.useEffect(() => {
      const mount = mountRef.current;
      if (!mount) return;
      // clear previous
      mount.innerHTML = '';
      if (loaded && window.customElements && window.customElements.get && window.customElements.get('lord-icon')) {
        const el = document.createElement('lord-icon');
        el.setAttribute('src', src);
        el.setAttribute('trigger', 'loop');
        el.setAttribute('colors', 'primary:#ffffff,secondary:#08a88a');
        el.style.width = size;
        el.style.height = size;
        mount.appendChild(el);
      }
      return () => { if (mount) mount.innerHTML = ''; };
    }, [src, size, loaded]);
    return <div ref={mountRef} className="flex items-center justify-center" style={{ width: size, height: size }} />;
  }

  // Inline animated SVG logo (local, polished variants per tier)
  function InlineLogo({ tierIndex = 0, variant = 0, label = '' }) {
    const id = `logo-${tierIndex}-${variant}`;
    const size = { w: 36, h: 24 };
    const palettes = [
      ['#06b6d4', '#7c3aed'], // cyan -> purple
      ['#10b981', '#06b6d4'], // green -> cyan
      ['#f97316', '#ef4444']  // orange -> red
    ];
    const colors = palettes[tierIndex % palettes.length];

    // Tier-specific artwork
    if (tierIndex === 0) {
      // Supporter: stylized leaf with gentle float
      return (
        <div className="flex items-center justify-center" style={{ width: size.w, height: size.h }} aria-label={label}>
          <svg width={size.w} height={size.h} viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" role="img">
            <defs>
              <linearGradient id={`${id}-g`} x1="0%" x2="100%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[1]} />
              </linearGradient>
            </defs>
            <rect rx="12" width="120" height="80" fill={`url(#${id}-g)`} />
            <g transform="translate(20,12)">
              <path d="M10 40 C30 5, 70 5, 90 40 C70 35, 30 45, 10 40 Z" fill="rgba(255,255,255,0.9)" opacity="0.18" />
              <path d="M15 40 C30 18, 60 18, 85 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round">
                <animate attributeName="stroke-width" values="2;4;2" dur="3s" repeatCount="indefinite" />
              </path>
              <g transform="translate(50,26)">
                <path d="M0 -12 C8 -10, 12 -6, 0 10" fill="white" opacity="0.95" transform="rotate(-18)">
                  <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0;0 -3;0 0" dur="3s" repeatCount="indefinite" />
                </path>
              </g>
            </g>
          </svg>
        </div>
      );
    }

    if (tierIndex === 1) {
      // Sponsor: rocket with flame pulse
      return (
        <div className="flex items-center justify-center" style={{ width: size.w, height: size.h }} aria-label={label}>
          <svg width={size.w} height={size.h} viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" role="img">
            <defs>
              <linearGradient id={`${id}-g`} x1="0%" x2="100%">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[1]} />
              </linearGradient>
            </defs>
            <rect rx="12" width="120" height="80" fill={`url(#${id}-g)`} />
            <g transform="translate(38,12)">
              <g>
                <path d="M12 6 C18 6, 26 14, 22 28 C18 40, 8 48, 2 58 L-2 62 L6 60 C18 56, 34 44, 34 32 C34 20, 28 8, 12 6 Z" fill="white" opacity="0.95" transform="scale(0.6)">
                  <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite" />
                </path>
                <g transform="translate(6,52)">
                  <ellipse rx="6" ry="3" fill="#ffb86b" opacity="0.9">
                    <animate attributeName="rx" values="6;9;6" dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.6s" repeatCount="indefinite" />
                  </ellipse>
                </g>
              </g>
            </g>
          </svg>
        </div>
      );
    }

    // Partner (default): diamond with subtle rotation
    return (
      <div className="flex items-center justify-center" style={{ width: size.w, height: size.h }} aria-label={label}>
        <svg width={size.w} height={size.h} viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" role="img">
          <defs>
            <linearGradient id={`${id}-g`} x1="0%" x2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <rect rx="12" width="120" height="80" fill={`url(#${id}-g)`} />
          <g transform="translate(60,40)">
            <polygon points="0,-20 18,0 0,20 -18,0" fill="white" opacity="0.92">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0;10;0" dur="4s" repeatCount="indefinite" />
            </polygon>
            <circle cx="0" cy="0" r="4" fill={colors[1]} opacity="0.95">
              <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden" style={{ background: '#000000' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(6, 182, 212, 0.2)' }} animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(139, 92, 246, 0.2)' }} animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(236, 72, 153, 0.2)' }} animate={{ x: [0, 30, 0], y: [0, -50, 0] }} transition={{ duration: 12, repeat: Infinity }} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden z-10 relative w-full">
        {/* Hero */}
        <section className="relative px-8 pt-16 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
            <motion.div className="text-7xl mb-6 inline-block" {...pulseAnimation}>🌳</motion.div>
            <h1 className="text-7xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Support My Innovation</span>
            </h1>
            <p className="text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">Empower next-generation software development</p>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-8 py-3 rounded-full text-white font-bold text-base mb-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/50 hover:border-purple-400/50 transition-all">
              ✨ Join 100+ Supporters & Partners
            </motion.div>
          </motion.div>
        </section>

        {/* Stats - Tree Branches */}
        <section className="px-8 py-16">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const colors = [
                "from-emerald-500/20 to-emerald-600/10 border-emerald-400",
                "from-cyan-500/20 to-cyan-600/10 border-cyan-400",
                "from-purple-500/20 to-purple-600/10 border-purple-400",
                "from-pink-500/20 to-pink-600/10 border-pink-400"
              ];
              return (
                <motion.div key={idx} variants={item} className={`rounded-2xl transition-all group p-6 text-center border-2 bg-gradient-to-br ${colors[idx]}`} whileHover={{ y: -8, shadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                  <motion.div className="text-4xl mb-3 group-hover:scale-125 transition-transform" {...floatingAnimation}>{stat.icon}</motion.div>
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-neutral-300 text-sm mt-1 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Tiers - Premium Tree Branches */}
        <section className="px-8 py-20">
          <motion.div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 mb-4">
              Partnership Levels
            </motion.p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-5xl font-black text-white">
              Choose Your Impact Level
            </motion.h2>
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {sponsorshipTiers.map((tier, idx) => {
              const tierColors = [
                { bg: "from-emerald-900/30 to-emerald-900/10", border: "border-emerald-400/60", header: "from-emerald-500/20 to-emerald-600/20 border-emerald-400", icon: "🌱", text: "emerald" },
                { bg: "from-cyan-900/40 to-cyan-900/10", border: "border-cyan-400/60", header: "from-cyan-500/30 to-cyan-600/30 border-cyan-400", icon: "🌿", text: "cyan" },
                { bg: "from-purple-900/30 to-purple-900/10", border: "border-purple-400/60", header: "from-purple-500/20 to-purple-600/20 border-purple-400", icon: "🌳", text: "purple" }
              ];
              const colors = tierColors[idx];

              return (
                <motion.div
                  key={idx}
                  variants={item}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={`relative rounded-3xl transition-all duration-300 group overflow-visible p-4 h-full flex min-h-[420px]`}
                >
                  {/* Decorative gradient border */}
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-white/6 to-transparent opacity-70 blur-sm transform-gpu group-hover:scale-102`} />

                  {/* featured badge removed (logos moved into CTA) */}

                  {/* Multi-layer background */}
                  <div className={`relative z-10 rounded-3xl overflow-hidden border-2 ${colors.border} bg-gradient-to-br ${colors.bg} p-6 backdrop-blur-xl flex flex-col h-full`}>
                    <div className="relative z-20 flex flex-col h-full">
                    {/* Accent shards */}
                    <div className="absolute -right-16 -top-10 w-52 h-52 rounded-full opacity-20 bg-gradient-to-br from-white/5 to-white/2 blur-2xl pointer-events-none" />
                    <div className="absolute -left-20 -bottom-16 w-44 h-44 rounded-full opacity-10 bg-gradient-to-br from-black/10 to-transparent blur-2xl pointer-events-none" />

                    {/* Header row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl flex items-center justify-center text-3xl bg-white/6 border border-white/6">{colors.icon}</div>
                        <div>
                        <style>{` 
                          .logo-anim{position:relative;overflow:hidden;border-radius:0.5rem;box-shadow:0 6px 18px rgba(0,0,0,0.25);transform-origin:center;}
                          .logo-anim::before{content:'';position:absolute;left:-75%;top:0;width:50%;height:100%;background:linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0));transform:skewX(-20deg);animation:shine 2.2s infinite;}
                          @keyframes shine{0%{left:-75%}60%{left:150%}100%{left:150%}}
                          @keyframes logoFloat{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
                          .logo-anim{animation:logoFloat 4s ease-in-out infinite}
                        `}</style>
                          <h3 className="text-2xl font-black text-white">{tier.name}</h3>
                          <p className="text-xs text-neutral-300">{tier.description}</p>
                        </div>
                      </div>

                      {/* featured badge displayed above card (absolute), no inline label here */}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center gap-6 mb-6 flex-wrap md:flex-nowrap">
                      <div>
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">{tier.amount}</div>
                        <div className="text-sm text-neutral-300">{tier.monthly}</div>
                      </div>
                      {/* Become button moved below benefits */}
                    </div>

                    {/* Benefits list */}
                    <div className="grid gap-3 mb-6">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-neutral-200">
                          <div className={`mt-1 text-lg ${tier.text === 'emerald' ? 'text-emerald-300' : tier.text === 'cyan' ? 'text-cyan-300' : 'text-purple-300'}`}>✓</div>
                          <div>{benefit}</div>
                        </div>
                      ))}
                    </div>

                    {/* Become button placed below benefits */}
                    <div className="w-full flex justify-center mt-4">
                      <motion.a
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/255711311363?text=${encodeURIComponent("Hi! I'm interested in sponsoring your work. Let's discuss the details!")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Become ${tier.name} — open WhatsApp`}
                        title={`Become ${tier.name} — contact via WhatsApp`}
                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 text-lg bg-gradient-to-r whitespace-nowrap ${tier.text === 'emerald' ? 'from-emerald-500 to-emerald-600' : tier.text === 'cyan' ? 'from-cyan-500 to-cyan-600' : 'from-purple-500 to-purple-600'}`}
                      >
                        <span>💰</span>
                        <span>Become {tier.name}</span>
                      </motion.a>
                    </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="px-8 py-20 bg-gradient-to-b from-white/5 to-transparent">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-12">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-orange-300 mb-4">
                Direct Benefits
              </motion.p>
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-black text-white">
                🎁 Why Support Us
              </motion.h2>
            </motion.div>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
              {[
                { icon: "⚡", title: "Faster Development", desc: "More resources = faster features", color: "from-blue-500 to-blue-600" },
                { icon: "🎯", title: "Priority Support", desc: "Get issues fixed first", color: "from-cyan-500 to-cyan-600" },
                { icon: "🔐", title: "Private Consulting", desc: "Direct access to discuss", color: "from-purple-500 to-purple-600" },
                { icon: "📈", title: "Growth Partnership", desc: "Scale impact together", color: "from-pink-500 to-pink-600" },
                { icon: "🎨", title: "Custom Solutions", desc: "Tailored development", color: "from-orange-500 to-orange-600" },
                { icon: "🌍", title: "Global Reach", desc: "Expand worldwide", color: "from-emerald-500 to-emerald-600" }
              ].map((benefit, idx) => (
                <motion.div 
                  key={idx} 
                  variants={item} 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  className={`rounded-2xl backdrop-blur-md p-8 border-2 bg-gradient-to-br ${
                    idx === 0 ? 'from-blue-900/30 to-blue-900/10 border-blue-400/50' :
                    idx === 1 ? 'from-cyan-900/30 to-cyan-900/10 border-cyan-400/50' :
                    idx === 2 ? 'from-purple-900/30 to-purple-900/10 border-purple-400/50' :
                    idx === 3 ? 'from-pink-900/30 to-pink-900/10 border-pink-400/50' :
                    idx === 4 ? 'from-orange-900/30 to-orange-900/10 border-orange-400/50' :
                    'from-emerald-900/30 to-emerald-900/10 border-emerald-400/50'
                  }`}
                >
                  <motion.div className="text-5xl mb-4" {...floatingAnimation}>{benefit.icon}</motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-neutral-300">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="rounded-3xl backdrop-blur-xl p-12 text-center bg-gradient-to-br from-cyan-900/40 to-purple-900/20 border-2 border-cyan-400/40 hover:border-purple-400/40 transition-all hover:shadow-2xl hover:shadow-cyan-500/20">
              <motion.h2 
                className="text-4xl font-black text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300" 
                initial={{ opacity: 0, y: -20 }} 
                whileInView={{ opacity: 1, y: 0 }}
              >
                Ready to Make an Impact? 🚀
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ delay: 0.2 }} 
                className="text-neutral-200 mb-10 text-lg"
              >
                Join supporters who believe in building better software and creating positive change across Tanzania and beyond
              </motion.p>
              <motion.button 
                whileHover={{ scale: 1.1, y: -5 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={openWhatsApp} 
                className="inline-flex items-center gap-3 px-10 py-5 text-white font-black rounded-xl text-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                <span>💬 WhatsApp: +255 711 311 363</span>
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <section className="px-8 py-24 text-center bg-gradient-to-b from-transparent to-white/5">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6">🌳</motion.div>
            <h2 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
              Together We Build Something Amazing
            </h2>
            <p className="text-xl text-neutral-300 mb-10">Your support is an investment in innovation, creativity, and the future of software development</p>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={openWhatsApp} 
              className="px-12 py-5 text-white font-black rounded-2xl text-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
            >
              Start Your Journey 🌟
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
