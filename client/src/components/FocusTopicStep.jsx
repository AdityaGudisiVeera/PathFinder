import React, { useState } from "react";
import { BookOpen, Video, FileText, Code, CheckCircle2, ArrowRight, Clock, Award, Play, ExternalLink, Sparkles } from "lucide-react";

export default function FocusTopicStep({
  topic,
  nextTopic,
  isCompleted,
  onCompleteTopic,
  onStartQuiz,
  onProceedToAnalytics
}) {
  const [activeTab, setActiveTab] = useState("learn"); // 'learn', 'resources', 'practice', 'quiz'

  const currentTopic = topic || {
    topic: "Machine Learning Concepts",
    level: "Intermediate",
    estimatedHours: 6,
    description: "Master supervised and unsupervised learning algorithms, model evaluation, and cross-validation techniques.",
    prerequisites: ["Python", "Pandas", "Statistics"]
  };

  // Combine documentation and resources from the current topic if available
  const docsList = currentTopic.documentation || [];
  const resList = currentTopic.resources || [];
  
  const displayResources = [...docsList, ...resList].length > 0
    ? [...docsList, ...resList].map(r => ({
        title: r.title,
        type: r.type === "documentation" ? "Documentation" : (r.type ? r.type.charAt(0).toUpperCase() + r.type.slice(1) : "Resource"),
        provider: r.provider || "Official Guide",
        estimatedTime: r.duration || "30 mins read",
        url: r.url || "#"
      }))
    : [
        {
          title: "Interactive Topic Learning Guide & Architecture",
          type: "Video",
          provider: "YouTube / Official Tutorial",
          estimatedTime: "45 mins",
          url: "https://developer.mozilla.org"
        },
        {
          title: "Official Documentation & API Reference",
          type: "Documentation",
          provider: "Official Docs",
          estimatedTime: "30 mins read",
          url: "https://developer.mozilla.org"
        }
      ];

  const recommendedProject = currentTopic.project
    ? {
        title: currentTopic.project.title,
        difficulty: currentTopic.project.difficulty || currentTopic.level || "Intermediate",
        reason: currentTopic.project.summary || `Recommended project to practice ${currentTopic.topic} concepts.`,
        skillsPracticed: currentTopic.project.keyDeliverables || currentTopic.tags || [currentTopic.topic]
      }
    : {
        title: `${currentTopic.topic} Hands-On Project`,
        difficulty: currentTopic.level || "Intermediate",
        reason: `Apply your ${currentTopic.topic} learning to a real-world scenario.`,
        skillsPracticed: currentTopic.tags || [currentTopic.topic]
      };

  return (
    <div className="step-container max-w-4xl mx-auto py-6 animate-fade-in">
      {/* Topic Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                Current Focus Topic
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {currentTopic.level || "Intermediate"}
              </span>
            </div>
            <h2 className="text-3xl font-black text-white font-heading">{currentTopic.topic}</h2>
            <p className="text-xs text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {currentTopic.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right text-xs text-slate-400 hidden sm:block">
              <div>Est. Duration</div>
              <div className="text-sm font-bold text-white flex items-center gap-1">
                <Clock size={14} className="text-cyan-400" /> {currentTopic.estimatedHours || 5} Hours
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Steps Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-4 gap-2">
          {[
            { id: "learn", stepNum: "Step 1", label: "Learn", icon: BookOpen },
            { id: "resources", stepNum: "Step 2", label: "Resources", icon: FileText },
            { id: "practice", stepNum: "Step 3", label: "Practice", icon: Code },
            { id: "quiz", stepNum: "Step 4", label: "Quiz", icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  isActive
                    ? "bg-indigo-950/80 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800"
                }`}
              >
                <span className="text-[10px] text-slate-400 font-semibold">{tab.stepNum}</span>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        {/* TAB 1: LEARN (CONCEPTS) */}
        {activeTab === "learn" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white font-heading">Core Learning Objectives</h3>
            <ul className="space-y-3">
              {[
                "Understand fundamental theory and real-world application domains.",
                "Master core API conventions and syntax implementations.",
                "Learn key optimization techniques and performance trade-offs."
              ].map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setActiveTab("resources")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Continue to Resources</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: RESOURCES */}
        {activeTab === "resources" && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-white font-heading">Curated Learning Resources & Documentation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayResources.map((res, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        res.type === "Documentation"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : res.type === "Video"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}>
                        {res.type}
                      </span>
                      <span className="text-[11px] text-slate-400">{res.provider} • {res.estimatedTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug mt-2">{res.title}</h4>
                  </div>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>{res.type === "Documentation" ? "Read Official Documentation" : "Open Learning Resource"}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setActiveTab("practice")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Continue to Practice / Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PRACTICE / PROJECT */}
        {activeTab === "practice" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              <Sparkles size={16} /> Recommended Project
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-heading">{recommendedProject.title}</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {recommendedProject.difficulty}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400">Why PATHFINDER recommends this:</span>
                <p className="text-xs text-indigo-300 mt-0.5">{recommendedProject.reason}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400">Skills practiced:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {recommendedProject.skillsPracticed.map((sk) => (
                    <span key={sk} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab("quiz")}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-1.5"
              >
                <span>Start Project → Proceed to Quiz</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="space-y-6 animate-fade-in text-center py-4">
            <Award size={48} className="text-cyan-400 mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Ready for Topic Quiz?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Test your mastery on {currentTopic.topic} to complete this stage and update your adaptive roadmap.
              </p>
            </div>

            <button
              onClick={() => onStartQuiz && onStartQuiz(currentTopic)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-emerald-600/30 inline-flex items-center gap-2"
            >
              <span>Take Topic Quiz</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
