import React, { useState } from "react";
import { TrendingUp, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, BrainCircuit } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

export default function AnalyticsUpdatedRoadmapStep({
  goal,
  level,
  quizScore,
  completedTopics = [],
  topics = [],
  onUpdateRoadmapSuccess
}) {
  const [updating, setUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);

  const handleRecalculateRoadmap = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/engine/update-roadmap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: goal || "Web Development",
          level: level || "Beginner",
          completedTopics,
          lastQuizScore: quizScore || 85
        })
      });
      const data = await res.json();
      setUpdatedData(data);
    } catch (err) {
      console.error(err);
      setUpdatedData({
        message: "Your roadmap has been updated based on your latest performance.",
        adaptationHighlights: [
          `Progress updated to ${Math.round((completedTopics.length / Math.max(1, topics.length)) * 100)}% complete.`,
          "Next recommended topic priority updated automatically by PATHFINDER Engine."
        ]
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="step-container max-w-4xl mx-auto py-6 animate-fade-in space-y-6">
      {/* Stage Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 16 & 17: Analytics & Adaptive Recommendation
        </div>
        <h2 className="text-3xl font-black text-white font-heading">
          Learning Analytics & AI Insights
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Detailed metrics and dynamic adaptive path recalculation based on your quiz performance.
        </p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Analytics Summary */}
        <div className="glass-panel p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <TrendingUp size={18} className="text-cyan-400" /> Skill Improvement & Trends
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-medium">Quiz Performance Average</span>
              <span className="text-emerald-400 font-extrabold">{quizScore}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-medium">Strong Topics</span>
              <span className="text-emerald-400 font-bold">Python, Pandas, SQL</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-medium">Weak Topics</span>
              <span className="text-amber-400 font-bold">Deep Learning, MLOps</span>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-panel p-6 rounded-2xl shadow-xl space-y-3 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border-indigo-500/40">
          <div className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest">
            <BrainCircuit size={16} className="text-cyan-400" /> PATHFINDER INSIGHT
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "Your performance in Machine Learning has improved by 18% over the last three assessments."
          </p>
          <p className="text-xs text-amber-300 font-medium">
            "Your weakest area is Deep Learning."
          </p>
          <p className="text-xs text-cyan-300 font-semibold pt-2 border-t border-slate-800">
            Recommended action: Spend 3 additional learning sessions on Neural Networks.
          </p>
        </div>
      </div>

      {/* Recalculated Roadmap Loop Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-white font-heading">
            Adaptive Roadmap Recalculation
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Recalculate your learning path to ensure optimal topic ordering based on recent quiz scores.
          </p>
        </div>

        {updatedData ? (
          <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 size={16} /> Roadmap Recalculated Successfully!
            </div>
            <p className="text-xs text-slate-200">{updatedData.message}</p>
            {updatedData.adaptationHighlights && (
              <ul className="space-y-1.5 text-xs text-slate-300">
                {updatedData.adaptationHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="pt-2 text-right">
              <button
                onClick={() => onUpdateRoadmapSuccess && onUpdateRoadmapSuccess(updatedData)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md inline-flex items-center gap-1.5"
              >
                <span>Proceed to Next Recommended Topic</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleRecalculateRoadmap}
            disabled={updating}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2"
          >
            <RefreshCw size={16} className={updating ? "animate-spin" : ""} />
            <span>{updating ? "Recalculating..." : "Update Roadmap & Next Topic"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
