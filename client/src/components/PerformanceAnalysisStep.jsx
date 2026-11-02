import React from "react";
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

export default function PerformanceAnalysisStep({
  quizResult,
  topicTitle,
  onProceedToNextTopic,
  onProceedToRevision
}) {
  const score = quizResult?.score !== undefined ? quizResult.score : 80;
  const passed = score >= 70;
  const results = quizResult?.results || [];

  const correctCount = results.filter((r) => r.isCorrect).length || Math.round((score / 100) * 5);
  const totalCount = results.length || 5;
  const incorrectCount = totalCount - correctCount;

  return (
    <div className="step-container max-w-2xl mx-auto py-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 14: Performance Analysis
        </div>
        <h2 className="text-3xl font-black text-white font-heading">
          Topic Quiz Performance
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Performance evaluation for module: <strong className="text-white">{topicTitle}</strong>
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        {/* Score Card Banner */}
        <div className={`p-6 rounded-2xl border text-center space-y-2 ${
          passed
            ? "bg-emerald-950/40 border-emerald-500/40"
            : "bg-amber-950/40 border-amber-500/40"
        }`}>
          <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-cyan-400">
            <Trophy size={28} />
          </div>
          <div className="text-4xl font-extrabold text-white font-heading">{score}%</div>
          <p className="text-xs font-bold text-slate-300">
            {passed ? "Excellent Performance!" : "Needs Review & Additional Practice"}
          </p>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Score</div>
            <div className="text-lg font-bold text-cyan-400">{score}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Correct</div>
            <div className="text-lg font-bold text-emerald-400">{correctCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Incorrect</div>
            <div className="text-lg font-bold text-rose-400">{incorrectCount}</div>
          </div>
        </div>

        {/* AI Recommendation Box */}
        <div className="p-5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 space-y-2">
          <div className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-cyan-400" /> PATHFINDER AI Recommendation
          </div>
          <p className="text-sm font-semibold text-white">
            {passed
              ? `Excellent performance (${score}%). You have mastered ${topicTitle} and are ready for the next topic.`
              : `You scored ${score}%. PATHFINDER recommends reviewing ${topicTitle} concepts and trying practice exercises before continuing.`}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          {passed ? (
            <button
              onClick={onProceedToNextTopic}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-emerald-600/30 inline-flex items-center gap-2"
            >
              <span>Continue →</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={onProceedToRevision}
              className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-amber-600/30 inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Review Topic</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
