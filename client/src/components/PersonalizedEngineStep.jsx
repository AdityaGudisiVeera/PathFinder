import React, { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight, Cpu, Sparkles, Loader2 } from "lucide-react";

export default function PersonalizedEngineStep({
  goal,
  level,
  quizScore,
  prerequisites,
  completedTopics,
  learningPreferences,
  onGenerateRoadmap
}) {
  const [stepStates, setStepStates] = useState({
    goal: false,
    level: false,
    assessment: false,
    gaps: false,
    preferences: false,
    time: false
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStepStates((prev) => ({ ...prev, goal: true })), 400),
      setTimeout(() => setStepStates((prev) => ({ ...prev, level: true })), 800),
      setTimeout(() => setStepStates((prev) => ({ ...prev, assessment: true })), 1200),
      setTimeout(() => setStepStates((prev) => ({ ...prev, gaps: true })), 1600),
      setTimeout(() => setStepStates((prev) => ({ ...prev, preferences: true })), 2000),
      setTimeout(() => setStepStates((prev) => ({ ...prev, time: true })), 2400),
      setTimeout(() => setIsReady(true), 2800)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const items = [
    { key: "goal", label: "Goal" },
    { key: "level", label: "Skill level" },
    { key: "assessment", label: "Assessment performance" },
    { key: "gaps", label: "Skill gaps" },
    { key: "preferences", label: "Learning preferences" },
    { key: "time", label: "Available study time" }
  ];

  return (
    <div className="step-container max-w-lg mx-auto py-10 animate-fade-in text-center">
      <div className="glass-panel p-8 rounded-2xl shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px] mx-auto shadow-lg shadow-indigo-500/30">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Cpu size={32} className="text-cyan-400 animate-pulse" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-white font-heading">
            {isReady ? "Your personalized roadmap is ready." : "Generating Your Adaptive Path..."}
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            PATHFINDER AI engine is synthesizing diagnostic metrics for {goal}.
          </p>
        </div>

        {/* Checkmark List */}
        <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 text-left space-y-3">
          <p className="text-xs font-bold text-slate-400 mb-2">Analyzing your:</p>
          {items.map((item) => {
            const checked = stepStates[item.key];
            return (
              <div key={item.key} className="flex items-center gap-2.5 text-xs font-semibold">
                {checked ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                ) : (
                  <Loader2 size={16} className="text-slate-600 animate-spin shrink-0" />
                )}
                <span className={checked ? "text-slate-200" : "text-slate-500"}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* View Roadmap Button */}
        {isReady && (
          <button
            onClick={onGenerateRoadmap}
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/30 inline-flex items-center justify-center gap-2 animate-bounce"
          >
            <span>View My Roadmap</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
