import React, { useState } from "react";
import { Target, BarChart2, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const PRESET_GOALS = [
  { id: "ML Engineer", label: "ML Engineer", icon: "🧠" },
  { id: "Fullstack Web Developer", label: "Fullstack Web Dev", icon: "🌐" },
  { id: "Data Scientist", label: "Data Scientist", icon: "📊" },
  { id: "Cybersecurity Specialist", label: "Cybersecurity", icon: "🛡️" },
];

const SKILL_LEVELS = [
  { id: "Beginner", label: "Beginner", desc: "Starting from scratch" },
  { id: "Intermediate", label: "Intermediate", desc: "Has foundational knowledge" },
  { id: "Advanced", label: "Advanced", desc: "Looking for complex topics" },
];

export default function GoalForm({ onFetchRecommendations, isLoading }) {
  const [goal, setGoal] = useState("ML Engineer");
  const [level, setLevel] = useState("Beginner");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.trim()) return;
    onFetchRecommendations(goal.trim(), level);
  };

  return (
    <div className="glass-panel form-card animate-fade-in">
      <div className="form-header">
        <div className="form-badge">
          <Zap size={16} className="text-amber-400" />
          <span>Step 1 & 4 MVP Specs</span>
        </div>
        <h2 className="form-title">Define Your Learning Goal</h2>
        <p className="form-subtitle">
          Select your target role and current skill level to receive a tailored sequence of 5–10 recommended topics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form-body">
        {/* Goal Input Section */}
        <div className="form-group">
          <label className="input-label">
            <Target size={18} className="text-indigo-400" />
            <span>Target Goal / Role</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. ML Engineer, Web Developer..."
              className="text-input"
              required
            />
          </div>

          {/* Quick Preset Chips */}
          <div className="preset-container">
            <span className="preset-label">Quick Presets:</span>
            <div className="preset-chips">
              {PRESET_GOALS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setGoal(preset.id)}
                  className={`chip-btn ${goal === preset.id ? "chip-active" : ""}`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Level Selection */}
        <div className="form-group">
          <label className="input-label">
            <BarChart2 size={18} className="text-cyan-400" />
            <span>Current Skill Level</span>
          </label>
          <div className="level-grid">
            {SKILL_LEVELS.map((lvl) => (
              <div
                key={lvl.id}
                onClick={() => setLevel(lvl.id)}
                className={`level-card ${level === lvl.id ? "level-card-selected" : ""}`}
              >
                <div className="level-card-header">
                  <span className="level-name">{lvl.label}</span>
                  {level === lvl.id && <CheckCircle2 size={18} className="text-indigo-400" />}
                </div>
                <span className="level-desc">{lvl.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !goal.trim()}
          className="btn-primary submit-btn w-full"
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              <span>Generating Recommendations...</span>
            </>
          ) : (
            <>
              <span>Get Recommended Topics</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
