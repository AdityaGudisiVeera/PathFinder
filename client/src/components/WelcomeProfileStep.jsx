import React, { useState } from "react";
import { Sparkles, ArrowRight, Clock, Target, Compass, BookOpen, Check } from "lucide-react";

export default function WelcomeProfileStep({ userProfile, onCompleteProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile?.name || "Alex",
    background: userProfile?.background || "Computer Science Student",
    hoursPerWeek: userProfile?.learningPreferences?.hoursPerWeek || 5,
    preferredStyle: userProfile?.learningPreferences?.preferredStyle || "Hands-on Projects"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompleteProfile(formData);
  };

  return (
    <div className="step-container max-w-2xl mx-auto py-8 animate-fade-in">
      {/* Onboarding Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Welcome to PATHFINDER
        </div>
        <h2 className="text-3xl font-black text-white font-heading tracking-tight">
          Welcome to PATHFINDER
        </h2>
        <p className="text-base text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
          Let's understand your goals and current skills and create a learning path designed for you.
        </p>
      </div>

      {/* Card Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Setup Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <Compass size={14} className="text-cyan-400" /> Current Experience
              </label>
              <select
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              >
                <option value="Computer Science Student">CS Student / Graduate</option>
                <option value="Self-Taught Developer">Self-Taught Developer</option>
                <option value="Career Switcher">Career Switcher (Non-Tech)</option>
                <option value="Working Professional">Working Software Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-cyan-400" /> Study Time / Week
              </label>
              <select
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                value={formData.hoursPerWeek}
                onChange={(e) => setFormData({ ...formData, hoursPerWeek: parseInt(e.target.value) })}
              >
                <option value={3}>3 Hours / Week (Casual)</option>
                <option value={5}>5 Hours / Week (Balanced)</option>
                <option value={10}>10 Hours / Week (Intense)</option>
                <option value={20}>20+ Hours / Week (Full-time)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-cyan-400" /> Preferred Learning Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Hands-on Projects", "Video Tutorials", "Documentation", "Quizzes"].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredStyle: style })}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
                    formData.preferredStyle === style
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  {formData.preferredStyle === style && <Check size={12} className="text-cyan-400" />}
                  <span>{style}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-base py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30 inline-flex items-center justify-center gap-2"
            >
              <span>Start My Journey</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
