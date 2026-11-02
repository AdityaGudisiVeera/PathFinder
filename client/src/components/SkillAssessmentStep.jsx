import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, ChevronRight, AlertCircle, RefreshCw, Sparkles, Trophy } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

export default function SkillAssessmentStep({ goal, level, onAssessmentComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [completedEval, setCompletedEval] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [goal, level]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/assessment/${encodeURIComponent(goal)}/${level}`);
      if (!res.ok) throw new Error("Failed to load diagnostic assessment");
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to assessment engine. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitAssessment = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/assessment/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, level, answers }),
      });
      const evalData = await res.json();
      setCompletedEval(evalData);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Error submitting assessment evaluation.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  if (loading) {
    return (
      <div className="glass-panel text-center p-12 max-w-lg mx-auto my-12 rounded-2xl">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-bold text-white">Loading Skill Assessment...</h3>
        <p className="text-xs text-slate-400 mt-2">Preparing questions for target goal: {goal}</p>
      </div>
    );
  }

  if (completedEval) {
    return (
      <div className="step-container max-w-lg mx-auto py-10 animate-fade-in text-center">
        <div className="glass-panel p-8 rounded-2xl shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
            <Trophy size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white font-heading">Assessment Complete</h2>
            <div className="text-4xl font-extrabold text-emerald-400 my-3">
              {completedEval.quizScore}% Score
            </div>
            <p className="text-xs text-slate-400">
              Analyzing your current skills against {goal} standards...
            </p>
          </div>
          <button
            onClick={() => onAssessmentComplete(completedEval)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm"
          >
            <span>Proceed to Skill Analysis</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container max-w-3xl mx-auto py-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> Stage 5: Diagnostic Assessment
        </div>
        <h2 className="text-2xl font-black text-white font-heading">
          Skill Assessment ({goal})
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Question {currentIdx + 1} of {questions.length || 1}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchQuestions} className="px-3 py-1 bg-rose-500/20 rounded-lg font-bold">
            Retry
          </button>
        </div>
      )}

      {questions.length > 0 && currentQ && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Progress: Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-cyan-400">{currentQ.dimension || "General"}</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Box */}
          <div className="py-2">
            <h3 className="text-lg font-bold text-white leading-snug">{currentQ.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-indigo-950/80 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 disabled:opacity-40"
            >
              Previous
            </button>

            {!isLastQuestion ? (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmitAssessment}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-1"
              >
                <span>{submitting ? "Evaluating..." : "Complete Assessment"}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
