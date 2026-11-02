import React from "react";
import { Check, Lock, CircleDot, Circle } from "lucide-react";

export const STEPPER_ITEMS = [
  { id: "GOAL", label: "Goal", stageNum: 4 },
  { id: "ASSESSMENT", label: "Assessment", stageNum: 5 },
  { id: "ANALYSIS", label: "Analysis", stageNum: 6 },
  { id: "SKILL_GAP", label: "Skill Gap", stageNum: 7 },
  { id: "ROADMAP", label: "Roadmap", stageNum: 9 },
  { id: "LEARNING", label: "Learning", stageNum: 10 },
  { id: "PRACTICE", label: "Practice", stageNum: 12 },
  { id: "QUIZ", label: "Quiz", stageNum: 13 },
  { id: "PROGRESS", label: "Progress", stageNum: 15 }
];

export default function ProgressStepper({ activeStageNumber, onSelectStage }) {
  // Helper to determine status of a stepper item
  const getStepStatus = (itemStageNum) => {
    if (activeStageNumber > itemStageNum) return "completed";
    if (activeStageNumber === itemStageNum || (activeStageNumber === itemStageNum - 1 && itemStageNum === 9)) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-3 px-4 overflow-x-auto shadow-inner">
      <div className="max-w-6xl mx-auto flex items-center justify-between min-w-[720px] gap-2">
        {STEPPER_ITEMS.map((item, idx) => {
          const status = getStepStatus(item.stageNum);
          const isCompleted = status === "completed";
          const isCurrent = status === "current";
          const isUpcoming = status === "upcoming";

          return (
            <React.Fragment key={item.id}>
              {/* Connector line */}
              {idx > 0 && (
                <div
                  className={`flex-1 h-[2px] transition-all duration-300 ${
                    isCompleted ? "bg-emerald-500" : isCurrent ? "bg-cyan-500/50" : "bg-slate-800"
                  }`}
                />
              )}

              {/* Step item */}
              <button
                type="button"
                onClick={() => {
                  if (isCompleted && onSelectStage) {
                    onSelectStage(item.stageNum);
                  }
                }}
                disabled={isUpcoming}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  isCompleted
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer"
                    : isCurrent
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)] animate-pulse"
                    : "bg-slate-950/60 text-slate-500 border border-slate-800 opacity-60 cursor-not-allowed"
                }`}
                title={isUpcoming ? "Locked stage. Complete previous steps to unlock." : `Jump to ${item.label}`}
              >
                {isCompleted && <Check size={13} className="text-emerald-400 stroke-[3]" />}
                {isCurrent && <CircleDot size={13} className="text-cyan-400 animate-spin" />}
                {isUpcoming && <Lock size={12} className="text-slate-500" />}
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
