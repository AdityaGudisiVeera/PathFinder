import React, { useState } from "react";
import { User, Mail, Lock, ChevronRight, AlertCircle, CheckCircle2, ShieldCheck, Zap, ArrowRight, UserPlus, LogIn } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

export default function UserRegistrationStep({ onAuthSuccess, onCompleteRegistration, initialView = "login" }) {
  // Default to Login view as requested: "display like login if no account i click sign then it should sign up page"
  const [viewMode, setViewMode] = useState(initialView); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const isLoginView = viewMode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!isLoginView) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 4) {
        setError("Password must be at least 4 characters long.");
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = isLoginView ? "/api/auth/login" : "/api/auth/register";
      const body = isLoginView
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please check your details.");
      }

      if (data.token) {
        localStorage.setItem("pathfinder_auth_token", data.token);
      }

      setSuccessMsg(isLoginView ? "Login successful! Redirecting..." : "Registration successful! Redirecting...");

      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess(data.user, data.token);
        }
        if (onCompleteRegistration) {
          onCompleteRegistration(data.user || formData);
        }
      }, 400);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-container max-w-md mx-auto py-10 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-wider mb-3">
          <Zap size={14} /> {isLoginView ? "Stage 1: User Login" : "Stage 1: Account Registration"}
        </div>
        <h2 className="text-3xl font-black text-white font-heading tracking-tight">
          {isLoginView ? "Sign In to PATHFINDER" : "Create Your Account"}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {isLoginView
            ? "Enter your credentials to continue your guided learning journey."
            : "Sign up to build your personalized AI learning roadmap."}
        </p>
      </div>

      {/* Auth Mode Toggle Tabs */}
      <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => {
            setViewMode("login");
            setError(null);
          }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
            isLoginView
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <LogIn size={15} />
          <span>Login</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setViewMode("signup");
            setError(null);
          }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
            !isLoginView
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <UserPlus size={15} />
          <span>Sign Up</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-2xl relative border border-slate-800 bg-slate-900/80 backdrop-blur-xl">
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {!isLoginView && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <ShieldCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm mt-6"
          >
            <span>{loading ? "Processing..." : isLoginView ? "Sign In & Continue" : "Create Account & Continue"}</span>
            <ChevronRight size={18} />
          </button>
        </form>

        {/* Dynamic Navigation Switcher */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          {isLoginView ? (
            <button
              type="button"
              onClick={() => {
                setViewMode("signup");
                setError(null);
              }}
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-bold inline-flex items-center gap-1"
            >
              <span>Don't have an account? Sign Up here</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setViewMode("login");
                setError(null);
              }}
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-bold inline-flex items-center gap-1"
            >
              <span>Already have an account? Sign In here</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
