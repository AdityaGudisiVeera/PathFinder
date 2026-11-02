import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, ChevronRight, Award } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

export default function TopicQuizModal({ topic, onClose, onQuizPassed }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Fallback sample topic quiz questions
  const sampleQuestions = topic?.topicQuiz || [
    {
      question: `What is the primary function of ${topic?.topic || "this topic"} in software development?`,
      options: [
        "To structure algorithms and data efficiently",
        "To style web components",
        "To compile binary files",
        "To inspect hardware memory"
      ],
      correctIndex: 0,
      explanation: "Structuring algorithms efficiently is key to high-performance applications."
    },
    {
      question: "Which approach ensures optimal model evaluation and prevents overfitting?",
      options: [
        "Cross-validation & train-test split",
        "Increasing training epochs endlessly",
        "Ignoring validation loss metrics",
        "Deleting outlier samples blindly"
      ],
      correctIndex: 0,
      explanation: "Cross-validation provides an unbiased estimate of model performance."
    },
    {
      question: "What is the computational complexity of binary search on a sorted array?",
      options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
      correctIndex: 0,
      explanation: "Binary search repeatedly divides the search space in half, resulting in O(log n)."
    }
  ];

  const currentQ = sampleQuestions[currentIdx];
  const isLast = currentIdx === sampleQuestions.length - 1;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/quiz/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicTitle: topic?.topic || "Focus Topic", answers }),
      });
      const data = await res.json();
      onQuizPassed(topic?.topic || "Focus Topic", data);
    } catch (err) {
      console.error(err);
      // Fallback evaluation calculate score locally
      let correct = 0;
      sampleQuestions.forEach((q, idx) => {
        if (answers[idx] === q.correctIndex) correct++;
      });
      const score = Math.round((correct / sampleQuestions.length) * 100);
      onQuizPassed(topic?.topic || "Focus Topic", {
        score,
        passed: score >= 70,
        results: sampleQuestions.map((q, idx) => ({
          question: q.question,
          isCorrect: answers[idx] === q.correctIndex,
          explanation: q.explanation
        }))
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-2xl shadow-2xl relative border border-slate-700 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
              Topic Assessment
            </span>
            <h3 className="text-xl font-black text-white font-heading mt-1">{topic?.topic || "Quiz"}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-full">
            <X size={18} />
          </button>
        </div>

        {/* Question Counter & Progress */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
            <span>Question {currentIdx + 1} of {sampleQuestions.length}</span>
            <span className="text-emerald-400">{Math.round(((currentIdx + 1) / sampleQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / sampleQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="py-2">
          <h4 className="text-base font-bold text-white leading-snug">{currentQ.question}</h4>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers[currentIdx] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setAnswers({ ...answers, [currentIdx]: idx })}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-indigo-950 border-indigo-500 text-white font-bold ring-1 ring-indigo-500"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{opt}</span>
                {isSelected && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 disabled:opacity-40"
          >
            Previous
          </button>

          {!isLast ? (
            <button
              onClick={() => setCurrentIdx((prev) => Math.min(sampleQuestions.length - 1, prev + 1))}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-1"
            >
              <span>{submitting ? "Evaluating..." : "Submit Quiz"}</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
