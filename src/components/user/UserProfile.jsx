import React from "react";

function generateInitials(name) {
  if (!name) return "CC";
  const words = name.trim().split(" ").filter(Boolean);
  const initials = (words[0]?.charAt(0) || "") + (words[1]?.charAt(0) || "");
  return initials.toUpperCase();
}

function UserProfile({ name = "Claytone Curthberth" }) {
  const initials = generateInitials(name);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 shadow-xl ring-1 ring-white/20">
        <div className="absolute inset-0 rounded-full bg-white/6" aria-hidden />
        <div className="text-white text-4xl font-extrabold select-none" aria-hidden>
          {initials}
        </div>
      </div>
    </div>
  );
}

export { UserProfile, generateInitials };
