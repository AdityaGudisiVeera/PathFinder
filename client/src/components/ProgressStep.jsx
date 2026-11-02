import React from "react";
import { BarChart2, CheckCircle2, Clock, Flame, Award, ArrowRight, Sparkles, FolderCheck } from "lucide-react";

export default function ProgressStep({
  goal,
  topics = [],
  completedTopics = [],
  quizScore = 80,
  onProceedToAnalytics
}) {
  const totalTopicsCount = topics.length || 10;
  const completedTopicsCount = completedTopics.length || 3;
  const topicsRemainingCount = Math.max(0, totalTopicsCount - completedTopicsCount);
  const overallProgress = Math.round((completedTopicsCount / totalTopicsCount) * 100);

  const statsCards = [
    {
      title: "Overall Progress",
      value: `${overallProgress}%`,
      sub: `${completedTopicsCount} of ${totalTopicsCount} Completed`,
      icon: BarChart2,
      color: "text-cyan-400"
    },
    {
      title: "Topics",
      value: `${completedTopicsCount} / ${totalTopicsCount}`,
      sub: `${topicsRemainingCount} Topics Remaining`,
      icon: CheckCircle2,
      color: "text-emerald-400"
    },
    {
      title: "Average Quiz Score",
      value: `${quizScore}%`,
      sub: "Based on recent topic tests",
      icon: Award,
      color: "text-indigo-400"
    },
    {
      title: "Projects Completed",
      value: `${Math.min(completedTopicsCount, 3)} / 5`,
      sub: "Applied portfolio projects",
      icon: FolderCheck,
      color: "text-amber-400"
    },
    {
      title: "Total Study Time",
      value: `${completedTopicsCount * 4}h`,
      sub: "Active learning hours",
      icon: Clock,
      color: "text-purple-400"
    },
    {
      title: "Current Streak",
      value: "5 Days 🔥",
      sub: "Consistent learning momentum",
      icon: Flame,
      color: "text-rose-400"
    }
  ];

  return (
    <div className="step-container max-w-4xl mx-auto py-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 15: Progress Dashboard
        </div>
        <h2 className="text-3xl font-black text-white font-heading">
          Your Learning Progress Tracker
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Comprehensive overview of your journey towards {goal || "your career goal"}.
        </p>
      </div>

      {/* Grid of Clean Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                <Icon size={18} className={card.color} />
              </div>
              <div className="text-2xl font-black text-white font-heading">{card.value}</div>
              <div className="text-xs text-slate-500">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="text-right">
        <button
          onClick={onProceedToAnalytics}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2"
        >
          <span>View Detailed Analytics</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
