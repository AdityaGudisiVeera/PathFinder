import React from "react";
import { Target, ArrowRight, AlertCircle, Sparkles, Layers } from "lucide-react";

export default function SkillGapFinderStep({ goal, skillGaps, onProceedToEngine }) {
  const gaps = skillGaps && skillGaps.length > 0 ? skillGaps : [
    { gapTopic: "Machine Learning Concepts", required: "Advanced", current: "Intermediate", severity: "Medium" },
    { gapTopic: "Deep Learning & Neural Networks", required: "Intermediate", current: "Beginner", severity: "High" },
    { gapTopic: "MLOps & Model Deployment", required: "Intermediate", current: "Beginner", severity: "Very High" },
    { gapTopic: "Data Pipelines & ETL", required: "Advanced", current: "Beginner", severity: "High" }
  ];

  const getSeverityBadge = (sev) => {
    switch (sev?.toLowerCase()) {
      case "very high":
      case "high":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    }
  };

  return (
    <div className="step-container max-w-3xl mx-auto py-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 7: Skill Gap Identification
        </div>
        <h2 className="text-3xl font-black text-white font-heading">
          Target vs Current Skill Gap ({goal})
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Comparison between required target proficiency and your current diagnostic baseline.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        {/* Table / List of Gaps */}
        <div className="space-y-4">
          {gaps.map((g, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-sm font-bold text-white font-heading">{g.gapTopic}</h4>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span>Required: <strong className="text-slate-200">{g.required || "Advanced"}</strong></span>
                  <span>Current: <strong className="text-slate-200">{g.current || "Beginner"}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${getSeverityBadge(g.severity)}`}>
                  Gap: {g.severity || "Medium"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30 text-center">
          <p className="text-sm font-bold text-indigo-300">
            PATHFINDER identified {gaps.length} key skill areas that should be improved to reach your goal.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onProceedToEngine}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30 inline-flex items-center justify-center gap-2"
          >
            <span>Generate My Roadmap</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
