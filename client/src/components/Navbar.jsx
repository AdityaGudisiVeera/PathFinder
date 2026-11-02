import React from "react";
import { Compass, Sparkles, Server } from "lucide-react";

export default function Navbar({ serverStatus }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="brand-logo">
          <div className="logo-icon">
            <Compass className="w-6 h-6 text-indigo-400 animate-spin-slow" size={26} />
          </div>
          <div>
            <h1 className="brand-title">
              Path<span className="brand-highlight">Finder</span>
              <span className="badge badge-indigo ml-2">MVP v1.0</span>
            </h1>
            <p className="brand-subtitle">Personalized Learning Roadmap Engine</p>
          </div>
        </div>

        <div className="server-badge-status">
          <Server size={15} />
          <span>Backend: {serverStatus || "Connecting..."}</span>
          <div className={`status-dot ${serverStatus ? "dot-online" : "dot-offline"}`}></div>
        </div>
      </div>
    </header>
  );
}
