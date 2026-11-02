import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Brain, Globe, BarChart2, GraduationCap, Code2, Sparkles, PlusCircle } from "lucide-react";

export default function SelectGoalStep({ currentGoal, currentLevel, onSelectGoal }) {
  const [selectedGoal, setSelectedGoal] = useState(currentGoal || "");
  const [customGoalText, setCustomGoalText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(currentLevel || "Beginner");

  const GOALS = [
    {
      id: "Data Scientist",
      title: "Data Scientist",
      icon: BarChart2,
      emoji: "📊",
      description: "Extract actionable insights using SQL, Pandas, statistical modeling, data visualization, and predictive analytics."
    },
    {
      id: "ML Engineer",
      title: "ML Engineer",
      icon: Brain,
      emoji: "🧠",
      description: "Master algorithms, PyTorch deep learning, neural networks, computer vision, NLP, and MLOps deployment."
    },
    {
      id: "Full Stack Developer",
      title: "Full Stack Developer",
      icon: Globe,
      emoji: "🌐",
      description: "Build end-to-end web applications using React, Node.js, Express, databases, REST APIs, and modern CSS."
    },
    {
      id: "Software Developer",
      title: "Software Developer",
      icon: Code2,
      emoji: "💻",
      description: "Master Data Structures, Algorithms, System Design, Object-Oriented Programming, and Software Architecture."
    },
    {
      id: "GATE Preparation",
      title: "GATE Preparation",
      icon: GraduationCap,
      emoji: "🎓",
      description: "Prepare for GATE CS/IT: Operating Systems, DBMS, Theory of Computation, Compiler Design, and Logic."
    },
    {
      id: "Custom Goal",
      title: "Custom Goal",
      icon: PlusCircle,
      emoji: "✨",
      description: "Define your custom learning target and technology stack tailored to your specialized career path."
    }
  ];

  const handleProceed = () => {
    const finalGoal = selectedGoal === "Custom Goal" ? (customGoalText.trim() || "Custom Software Goal") : selectedGoal;
    if (finalGoal) {
      onSelectGoal(finalGoal, selectedLevel);
    }
  };

  const isContinueDisabled = !selectedGoal || (selectedGoal === "Custom Goal" && !customGoalText.trim());

  return (
    <div className="step-container max-w-5xl mx-auto py-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Stage 4: Goal Selection
        </div>
        <h2 className="text-3xl font-black text-white font-heading tracking-tight">
          Select Your Learning Goal
        </h2>
        <p className="text-sm text-slate-300 mt-2">
          Choose a goal card below to customize your diagnostic assessment and learning roadmap.
        </p>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GOALS.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoal === goal.id;

          return (
            <div
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? "bg-indigo-950/60 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500"
                  : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                    {goal.emoji}
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 size={14} /> Selected
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white font-heading mb-1.5">{goal.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{goal.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Goal Input if selected */}
      {selectedGoal === "Custom Goal" && (
        <div className="mt-6 glass-panel p-4 rounded-xl border border-indigo-500/30">
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Enter Custom Target Career / Skill:
          </label>
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none"
            placeholder="e.g. Mobile App Developer (Flutter)"
            value={customGoalText}
            onChange={(e) => setCustomGoalText(e.target.value)}
          />
        </div>
      )}

      {/* Target Level Options */}
      <div className="mt-8 glass-panel p-6 rounded-2xl">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Select Your Starting Level
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "Beginner", label: "Beginner", desc: "Starting from fundamental basics" },
            { id: "Intermediate", label: "Intermediate", desc: "Have prior domain experience" },
            { id: "Advanced", label: "Advanced", desc: "Focusing on complex optimization" }
          ].map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              onClick={() => setSelectedLevel(lvl.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedLevel === lvl.id
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold"
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800"
              }`}
            >
              <div className="text-sm font-bold text-white">{lvl.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{lvl.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 text-right">
        <button
          onClick={handleProceed}
          disabled={isContinueDisabled}
          className={`px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all inline-flex items-center gap-2 ${
            isContinueDisabled
              ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-60"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
          }`}
        >
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
