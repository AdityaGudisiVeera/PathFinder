import React, { useState } from "react";
import { X, Mail, Lock, User, Briefcase, Eye, EyeOff, LogIn, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    background: "Computer Science Student",
    hoursPerWeek: 5,
    preferredStyle: "Hands-on Projects"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = mode === "login" ? `${API_BASE_URL}/api/auth/login` : `${API_BASE_URL}/api/auth/register`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      if (data.token) {
        localStorage.setItem("pathfinder_auth_token", data.token);
      }

      if (onAuthSuccess) {
        onAuthSuccess(data.user, data.token);
      }

      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content glass-panel p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-all"
        >
          <X size={20} />
        </button>

        {/* Auth Mode Toggle Tabs */}
        <div className="auth-tabs flex border-b border-slate-700/60 mb-6">
          <button
            type="button"
            onClick={() => { setMode("login"); setError(null); }}
            className={`flex-1 py-3 font-bold text-sm text-center border-b-2 transition-all ${
              mode === "login"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <LogIn size={16} className="inline mr-2" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode("register"); setError(null); }}
            className={`flex-1 py-3 font-bold text-sm text-center border-b-2 transition-all ${
              mode === "register"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserPlus size={16} className="inline mr-2" /> Create Account
          </button>
        </div>

        <div className="auth-header text-center mb-6">
          <h3 className="text-xl font-bold text-slate-100">
            {mode === "login" ? "Welcome Back to PATHFINDER" : "Join PATHFINDER Learning"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === "login"
              ? "Sign in to access your saved roadmaps, badges & progress."
              : "Create your authenticated account to persist roadmap state across devices."}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-1">
                <User size={14} className="text-cyan-400" /> Full Name
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-1">
              <Mail size={14} className="text-cyan-400" /> Email Address
            </label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-1">
              <Lock size={14} className="text-cyan-400" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="input-field pr-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-1">
                <Briefcase size={14} className="text-cyan-400" /> Current Background
              </label>
              <select
                className="select-field"
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              >
                <option value="Computer Science Student">Computer Science Student</option>
                <option value="Self-Taught Developer">Self-Taught Developer</option>
                <option value="Career Switcher">Career Switcher</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary btn-emerald w-full justify-center mt-6"
          >
            <span>{loading ? "Authenticating..." : mode === "login" ? "Sign In" : "Create Account"}</span>
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 underline"
          >
            Continue in Guest Mode
          </button>
        </div>
      </div>
    </div>
  );
}
