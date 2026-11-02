import React from "react";
import { BarChart3, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, Sparkles } from "lucide-react";

export default function SkillAnalysisStep({ assessmentResults, onProceedToGapFinder }) {
  const skills = assessmentResults?.skillAnalysis || [
    { dimension: "Core Syntax & Foundations", score: 90, status: "Mastered" },
    { dimension: "Data Structures & Alg", score: 72, status: "Moderate" },
    { dimension: "Statistics & Probabilities", score: 55, status: "Needs Focus" },
    { dimension: "Machine Learning Concepts", score: 48, status: "Needs Focus" },
    { dimension: "Deep Learning & Neural Nets", score: 25, status: "Needs Focus" }
  ];

  const strongSkills = skills.filter((s) => s.score >= 75);
  const moderateSkills = skills.filter((s) => s.score >= 50 && s.score < 75);
  const beginnerSkills = skills.filter((s) => s.score < 50);

  const renderSkillRow = (skill) => (
    <div key={skill.dimension} className="space-y-1.5">
      <div className="flex justify-between text-xs font-bold text-slate-200">
        <span>{skill.dimension}</span>
        <span className={skill.score >= 75 ? "text-emerald-400" : skill.score >= 50 ? "text-amber-400" : "text-rose-400"}>
          {skill.score}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            skill.score >= 75
              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
              : skill.score >= 50
              ? "bg-gradient-to-r from-amber-500 to-yellow-400"
              : "bg-gradient-to-r from-rose-500 to-pink-500"
          }`}
          style={{ width: `${Math.max(5, skill.score)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="step-container max-w-3xl mx-auto py-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 6: Visual Skill Analysis
        </div>
        <h2 className="text-3xl font-black text-white font-heading">
          Your Diagnostic Skill Profile
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Based on your diagnostic assessment score of {assessmentResults?.quizScore || 75}%.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-8">
        {/* Strong Skills Section */}
        {strongSkills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              <CheckCircle2 size={16} /> Strong Skills (Mastered)
            </div>
            <div className="space-y-4">
              {strongSkills.map(renderSkillRow)}
            </div>
          </div>
        )}

        {/* Needs Improvement Section */}
        {moderateSkills.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-4 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <AlertTriangle size={16} /> Needs Improvement (Moderate)
            </div>
            <div className="space-y-4">
              {moderateSkills.map(renderSkillRow)}
            </div>
          </div>
        )}

        {/* Beginner Skills Section */}
        {beginnerSkills.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-4 text-rose-400 text-xs font-extrabold uppercase tracking-wider">
              <HelpCircle size={16} /> Beginner Skills (Needs Focus)
            </div>
            <div className="space-y-4">
              {beginnerSkills.map(renderSkillRow)}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-800 text-right">
          <button
            onClick={onProceedToGapFinder}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30 inline-flex items-center justify-center gap-2"
          >
            <span>View My Skill Gap</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
