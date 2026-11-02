import React from "react";
import { Clock, CheckSquare, Square, Info, Tag, Layers } from "lucide-react";

export default function TopicCard({
  topic,
  index,
  isCompleted,
  onToggleComplete,
  onOpenDetails
}) {
  return (
    <div className={`glass-panel topic-card ${isCompleted ? "topic-card-completed" : ""}`}>
      <div className="topic-card-header">
        <div className="step-indicator">
          <span className="step-number">Step {index + 1}</span>
          <span className="badge badge-cyan">{topic.category}</span>
          <span className="badge badge-indigo">{topic.level}</span>
        </div>

        <button
          onClick={() => onToggleComplete(topic.topic)}
          className={`complete-toggle-btn ${isCompleted ? "completed" : ""}`}
          title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
        >
          {isCompleted ? (
            <>
              <CheckSquare size={18} className="text-emerald-400" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Square size={18} />
              <span>Mark Done</span>
            </>
          )}
        </button>
      </div>

      <div className="topic-card-body">
        <h3 className="topic-title">{topic.topic}</h3>
        <p className="topic-description">{topic.description}</p>
      </div>

      <div className="topic-card-footer">
        <div className="meta-group">
          <div className="meta-item">
            <Clock size={15} className="text-indigo-400" />
            <span>{topic.estimatedHours || 5} hours est.</span>
          </div>

          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <div className="meta-item">
              <Layers size={15} className="text-amber-400" />
              <span>Prereq: {topic.prerequisites.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="topic-card-actions">
          {topic.tags && topic.tags.length > 0 && (
            <div className="tags-preview">
              {topic.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => onOpenDetails(topic)}
            className="btn-secondary text-xs"
          >
            <Info size={14} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
