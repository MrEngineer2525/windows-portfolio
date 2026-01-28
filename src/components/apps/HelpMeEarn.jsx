// HelpMeEarn removed — kept file as a no-op stub to avoid build errors if referenced elsewhere
import React, { useMemo, useState } from "react";
import { FaArrowRight, FaBolt, FaCalendarAlt, FaExternalLinkAlt, FaMoneyBillWave, FaTasks } from "react-icons/fa";

const IDEA_TAG_COLORS = {
  quick: "bg-emerald-500/10 text-emerald-200 ring-emerald-400/40",
  portfolio: "bg-sky-500/10 text-sky-200 ring-sky-400/40",
  passive: "bg-violet-500/10 text-violet-200 ring-violet-400/40",
  local: "bg-amber-500/10 text-amber-200 ring-amber-400/40",
};

const EARNING_IDEAS = [
  {
    id: 1,
    title: "Build premium landing pages",
    description: "Design and ship single‑page sites for small businesses using your existing React + Tailwind skills.",
    estRate: "$120–$350 / project",
    time: "2–4 days / project",
    tags: ["quick", "portfolio"],
    link: "https://www.upwork.com/nx/landing/jobs/",
  },
  {
    id: 2,
    title: "Turn this Windows 11 UI into a template",
    description: "Refine this very project into a reusable template and sell it on marketplaces (Gumroad, ThemeForest, etc).",
    estRate: "$19–$59 / license",
    time: "1–2 weeks setup",
    tags: ["passive", "portfolio"],
    link: "https://gumroad.com",
  },
  {
    id: 3,
    title: "Local business digital facelift",
    description: "Offer nearby shops a bundle: logo polish, modern website and Google Business setup in one premium package.",
    estRate: "$200–$600 / client",
    time: "1 week / client",
    tags: ["local", "quick"],
    link: "https://www.google.com/search?q=how+to+pitch+web+design+clients",
  },
];

const GOALS_PRESETS = [
  { id: "side-hustle", label: "Side‑hustle", monthlyTarget: 200 },
  { id: "serious", label: "Serious extra income", monthlyTarget: 750 },
  { id: "full-time", label: "Full‑time level", monthlyTarget: 1500 },
];

const Tag = ({ label, type }) => {
  const colorClasses = IDEA_TAG_COLORS[type] || "bg-neutral-700/60 text-neutral-200 ring-neutral-500/40";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] ring-1 ${colorClasses}`}
    >
      {label}
    </span>
  );
};

const IdeaCard = ({ idea }) => {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-900/80 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:shadow-[0_26px_70px_rgba(16,185,129,0.4)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.24),transparent_60%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.22),transparent_55%)]" />
      </div>

      <header className="relative z-10 mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-neutral-50">
            {idea.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {idea.tags.includes("quick") && <Tag type="quick" label="Quick win" />}
            {idea.tags.includes("portfolio") && <Tag type="portfolio" label="Portfolio worthy" />}
            {idea.tags.includes("passive") && <Tag type="passive" label="Semi‑passive" />}
            {idea.tags.includes("local") && <Tag type="local" label="Local clients" />}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right text-[11px] text-neutral-300/90">
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
            <FaBolt className="h-2.5 w-2.5" />
            <span>Idea</span>
          </div>
          <p className="text-xs text-emerald-200">{idea.estRate}</p>
          <p className="text-[11px] text-neutral-400">{idea.time}</p>
        </div>
      </header>

      <p className="relative z-10 text-[12px] leading-relaxed text-neutral-200/90">
        {idea.description}
      </p>

      <footer className="relative z-10 mt-4 flex items-center justify-between gap-3 text-[11px]">
        <a
          href={idea.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 font-medium text-neutral-100 ring-1 ring-white/15 transition hover:bg-white/10 hover:text-emerald-100 hover:ring-emerald-400/60"
        >
          <span>Open resources</span>
          <FaExternalLinkAlt className="h-3 w-3" />
        </a>
      </footer>
    </article>
  );
};

const HelpMeEarn = () => {
  const [hourlyRate, setHourlyRate] = useState(15);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [weeksPerMonth, setWeeksPerMonth] = useState(4);
  const [selectedPreset, setSelectedPreset] = useState(GOALS_PRESETS[0].id);

  const monthlyIncome = useMemo(
    () => Math.round(hourlyRate * hoursPerWeek * weeksPerMonth),
    [hourlyRate, hoursPerWeek, weeksPerMonth]
  );

  const activeGoal = GOALS_PRESETS.find((g) => g.id === selectedPreset) || GOALS_PRESETS[0];
  const goalProgress = Math.min(100, Math.round((monthlyIncome / activeGoal.monthlyTarget) * 100));

  const handleNumberChange = (setter) => (event) => {
    const value = Number(event.target.value.replace(/[^\d.]/g, ""));
    if (Number.isNaN(value)) {
      setter(0);
    } else {
      setter(Math.max(0, value));
    }
  };

  return (
    <main className="flex h-full w-full flex-col gap-4 bg-gradient-to-br from-neutral-950 via-black to-neutral-950/90 p-4 text-white">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            Help me earn
          </p>
          <h1 className="mt-1 text-lg font-semibold tracking-tight text-neutral-50 sm:text-xl">
            Turn your dev skills into predictable income.
          </h1>
          <p className="mt-1 max-w-xl text-[12px] text-neutral-300/90">
            Set a simple earning goal, see how many hours you need, and explore concrete ideas you can start this week.
          </p>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black/90 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.85)]">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.2),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.22),transparent_60%)]" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-neutral-200 ring-1 ring-white/10 backdrop-blur">
                <FaMoneyBillWave className="h-3.5 w-3.5 text-emerald-300" />
                <span>Monthly earning planner</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <label className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                    Hourly rate (USD)
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={hourlyRate}
                    onChange={handleNumberChange(setHourlyRate)}
                    className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[12px] text-neutral-50 shadow-inner outline-none ring-emerald-400/0 transition focus:border-emerald-400/60 focus:ring-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                    Hours per week
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={hoursPerWeek}
                    onChange={handleNumberChange(setHoursPerWeek)}
                    className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[12px] text-neutral-50 shadow-inner outline-none ring-emerald-400/0 transition focus:border-emerald-400/60 focus:ring-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                    Weeks per month
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={weeksPerMonth}
                    onChange={handleNumberChange(setWeeksPerMonth)}
                    className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[12px] text-neutral-50 shadow-inner outline-none ring-emerald-400/0 transition focus:border-emerald-400/60 focus:ring-2"
                  />
                </label>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                    Target preset
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {GOALS_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedPreset(preset.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium transition ${
                          selectedPreset === preset.id
                            ? "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/70"
                            : "bg-white/5 text-neutral-200 ring-1 ring-white/10 hover:bg-white/10"
                        }`}
                      >
                        <FaCalendarAlt className="h-3 w-3" />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 rounded-xl border border-white/10 bg-black/40 p-3 text-[11px] shadow-inner backdrop-blur">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-neutral-400">
                      Estimated monthly income
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-emerald-300">
                      ${monthlyIncome.toLocaleString()}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Goal:{" "}
                      <span className="font-medium text-neutral-100">
                        ${activeGoal.monthlyTarget.toLocaleString()}
                      </span>{" "}
                      / month
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right text-[11px] text-neutral-300/90">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
                      <FaTasks className="h-3 w-3" />
                      <span>{goalProgress}% to goal</span>
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-neutral-800/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400 shadow-[0_0_18px_rgba(45,212,191,0.6)] transition-all"
                    style={{ width: `${goalProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-neutral-400">
              Concrete earning ideas
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-neutral-300 ring-1 ring-white/10">
              <FaArrowRight className="h-3 w-3 text-emerald-300" />
              <span>Pick 1–2 and commit for 2 weeks.</span>
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-1">
            {EARNING_IDEAS.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelpMeEarn;