import React from "react";
import { Zap, LogOut, User, Compass, Server } from "lucide-react";

export default function HeaderStepper({
  activeStep,
  stepTitle,
  serverStatus,
  userGoal,
  completedCount,
  totalCount,
  currentUser,
  onOpenAuthModal,
  onLogout
}) {
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="header-bar bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="text-cyan-400 fill-cyan-400/20" size={20} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white font-heading">
                PATHFINDER
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest hidden sm:inline-block">
                AI JOURNEY
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden md:block">
              Personalized Learning Coach
            </p>
          </div>
        </div>

        {/* Current Goal, Progress & Step Pill */}
        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-1.5 rounded-full border border-slate-800 shadow-inner text-xs">
          {userGoal && (
            <div className="hidden sm:flex items-center gap-1.5 border-r border-slate-800 pr-3">
              <span className="text-slate-400 font-medium">Goal:</span>
              <span className="text-slate-100 font-bold">{userGoal}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
            <span className="text-slate-400 font-medium">Progress:</span>
            <span className="text-emerald-400 font-extrabold">{progressPercentage}%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Compass size={14} className="text-cyan-400 animate-spin" />
            <span className="text-slate-400 font-medium hidden lg:inline">Current Step:</span>
            <span className="text-cyan-300 font-bold truncate max-w-[160px] sm:max-w-[200px]">
              {stepTitle || "Welcome"}
            </span>
          </div>
        </div>

        {/* Header Actions: User Profile / Logout */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 p-1 pl-3 rounded-full border border-slate-800">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-xs border border-cyan-400/40">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline pr-1">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-full hover:bg-slate-800"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-full transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <User size={14} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
