import React from "react";
import { X, Clock, Award, BookOpen, Layers, CheckCircle, ExternalLink } from "lucide-react";

export default function TopicModal({ topic, onClose, isCompleted, onToggleComplete }) {
  if (!topic) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-badges">
            <span className="badge badge-cyan">{topic.category}</span>
            <span className="badge badge-indigo">{topic.level}</span>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{topic.topic}</h2>

          <div className="modal-meta-grid">
            <div className="modal-meta-card">
              <Clock size={18} className="text-indigo-400" />
              <div>
                <span className="meta-label">Est. Time</span>
                <span className="meta-val">{topic.estimatedHours || 5} Hours</span>
              </div>
            </div>

            <div className="modal-meta-card">
              <Award size={18} className="text-emerald-400" />
              <div>
                <span className="meta-label">Difficulty</span>
                <span className="meta-val">{topic.level}</span>
              </div>
            </div>

            <div className="modal-meta-card">
              <BookOpen size={18} className="text-amber-400" />
              <div>
                <span className="meta-label">Category</span>
                <span className="meta-val">{topic.category}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="section-subtitle">Overview & Description</h4>
            <p className="section-text">{topic.description}</p>
          </div>

          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <div className="modal-section">
              <h4 className="section-subtitle">Recommended Prerequisites</h4>
              <div className="prereq-list">
                {topic.prerequisites.map((p, idx) => (
                  <div key={idx} className="prereq-pill">
                    <Layers size={14} className="text-indigo-400" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {((topic.documentation && topic.documentation.length > 0) || (topic.resources && topic.resources.length > 0)) && (
            <div className="modal-section space-y-3">
              <h4 className="section-subtitle">Official Documentation & Resources Links</h4>
              <div className="space-y-2">
                {topic.documentation && topic.documentation.map((doc, idx) => (
                  <a
                    key={`doc-${idx}`}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 hover:border-purple-400 flex items-center justify-between text-xs transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-purple-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white group-hover:text-purple-300 transition-colors">{doc.title}</div>
                        <div className="text-[10px] text-slate-400">{doc.provider} • {doc.duration || "Documentation"}</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-purple-400 shrink-0" />
                  </a>
                ))}

                {topic.resources && topic.resources.map((res, idx) => (
                  <a
                    key={`res-${idx}`}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 flex items-center justify-between text-xs transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink size={15} className="text-cyan-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">{res.title}</div>
                        <div className="text-[10px] text-slate-400">{res.provider || res.type} • {res.duration || "Resource"}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                      {res.type || "Link"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {topic.tags && topic.tags.length > 0 && (
            <div className="modal-section">
              <h4 className="section-subtitle">Core Skills & Concepts</h4>
              <div className="tags-list">
                {topic.tags.map((t, idx) => (
                  <span key={idx} className="tag-chip">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            onClick={() => {
              onToggleComplete(topic.topic);
            }}
            className={`btn-primary ${isCompleted ? "btn-completed" : ""}`}
          >
            <CheckCircle size={18} />
            <span>{isCompleted ? "Completed ✓" : "Mark as Completed"}</span>
          </button>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
