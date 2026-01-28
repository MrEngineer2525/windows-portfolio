import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../user/UserProfile";
import { MdWifi, MdAccessibilityNew, MdPowerSettingsNew } from "react-icons/md";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const defaultName = "Claytone Curthberth";

  function handleSignIn() {
    setLoading(true);
    // save display name and simulate quick auth
    localStorage.setItem("name", defaultName);
    setTimeout(() => {
      setLoading(false);
      navigate(`/${encodeURIComponent(defaultName)}`);
    }, 700);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center z-10 px-6">
      <div className="w-full max-w-sm backdrop-blur-md bg-white/6 rounded-3xl p-8 text-center border border-white/8 shadow-2xl">
        <div className="mx-auto w-36 h-36 mb-4">
          <UserProfile name={defaultName} />
        </div>
        <h2 className="text-2xl font-extrabold text-white">{defaultName}</h2>
        <p className="text-sm text-neutral-300 mt-1 mb-6">Local account</p>

        <button
          onClick={handleSignIn}
          className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition-transform active:scale-95"
        >
          {loading ? (
            <span className="inline-block animate-spin rounded-full border-2 border-white/40 h-5 w-5" />
          ) : (
            <span>Sign in</span>
          )}
        </button>

        <div className="mt-6 text-xs text-neutral-400">Click the account to sign in — no password required</div>
      </div>

      <div className="absolute flex gap-4 sm:gap-6 md:gap-9 text-white bottom-3 sm:bottom-4 md:bottom-5 right-6 sm:right-9 md:right-12 select-none">
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdWifi />
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdAccessibilityNew />
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdPowerSettingsNew />
        </span>
      </div>
    </div>
  );
}

export default Login;
