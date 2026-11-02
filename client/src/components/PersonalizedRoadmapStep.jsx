import React from "react";
import { Check, Lock, Play, ArrowDown, Sparkles, BookOpen, Clock, ChevronRight } from "lucide-react";

export default function PersonalizedRoadmapStep({
  roadmapData,
  completedTopics = [],
  onToggleTopic,
  onOpenQuiz,
  onOpenTopicDetails,
  onProceedToQuizStep
}) {
  const topics = roadmapData?.topics || [
    { topic: "Python Foundations", category: "ML", level: "Beginner", estimatedHours: 4 },
    { topic: "NumPy & Data Manipulation", category: "ML", level: "Beginner", estimatedHours: 5 },
    { topic: "Pandas & Exploratory Analysis", category: "ML", level: "Beginner", estimatedHours: 6 },
    { topic: "Statistics & Probability", category: "ML", level: "Intermediate", estimatedHours: 5 },
    { topic: "Machine Learning Algorithms", category: "ML", level: "Intermediate", estimatedHours: 8 },
    { topic: "Deep Learning & PyTorch", category: "ML", level: "Advanced", estimatedHours: 10 },
    { topic: "MLOps & Model Deployment", category: "ML", level: "Advanced", estimatedHours: 6 }
  ];

  // Find first uncompleted index
  const activeFocusIdx = topics.findIndex((t) => !completedTopics.includes(t.topic));
  const currentActiveIdx = activeFocusIdx === -1 ? topics.length - 1 : activeFocusIdx;

  return (
    <div className="step-container max-w-3xl mx-auto py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 9: Personalized Roadmap
        </div>
        <h2 className="text-3xl font-black text-white font-heading">
          Your Sequential Learning Roadmap
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Follow your custom path. Only your current focus module is unlocked for learning.
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative py-4 space-y-4">
        {topics.map((t, idx) => {
          const isCompleted = completedTopics.includes(t.topic);
          const isCurrent = idx === currentActiveIdx && !isCompleted;
          const isLocked = idx > currentActiveIdx;

          return (
            <React.Fragment key={t.topic || idx}>
              {/* Down Arrow Connector */}
              {idx > 0 && (
                <div className="flex justify-center my-1">
                  <ArrowDown
                    size={18}
                    className={
                      idx <= currentActiveIdx ? "text-cyan-400" : "text-slate-800"
                    }
                  />
                </div>
              )}

              {/* Node Card */}
              <div
                className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 relative overflow-hidden ${
                  isCompleted
                    ? "bg-slate-900/60 border-emerald-500/40 opacity-90"
                    : isCurrent
                    ? "bg-gradient-to-r from-indigo-950 to-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400"
                    : "bg-slate-950/80 border-slate-800 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : isCurrent
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 animate-pulse"
                        : "bg-slate-900 text-slate-600 border border-slate-800"
                    }`}
                  >
                    {isCompleted && <Check size={18} className="stroke-[3]" />}
                    {isCurrent && <span className="w-3 h-3 rounded-full bg-cyan-400"></span>}
                    {isLocked && <Lock size={16} className="text-slate-500" />}
                  </div>

                  {/* Topic Title & Details */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white font-heading">{t.topic}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {t.level || "Beginner"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {t.estimatedHours || 5} Hours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {isCurrent && (
                    <button
                      onClick={onProceedToQuizStep}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/30 flex items-center gap-1.5"
                    >
                      <Play size={14} className="fill-slate-950" />
                      <span>Start Learning</span>
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      onClick={() => onOpenTopicDetails && onOpenTopicDetails(t)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Review
                    </button>
                  )}

                  {isLocked && (
                    <span className="text-xs font-bold text-slate-600 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800">
                      Locked 🔒
                    </span>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
