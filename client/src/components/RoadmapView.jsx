import React from "react";
import { CheckCircle2, Circle, Clock, ArrowDown } from "lucide-react";

export default function RoadmapView({
  topics,
  completedTopics,
  onToggleComplete,
  onOpenDetails
}) {
  return (
    <div className="roadmap-container">
      <div className="timeline-line"></div>
      {topics.map((topic, index) => {
        const isDone = completedTopics.includes(topic.topic);
        return (
          <div key={index} className="timeline-item animate-fade-in" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className={`timeline-node ${isDone ? "node-done" : ""}`}>
              {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>

            <div className="timeline-content glass-panel">
              <div className="timeline-header">
                <span className="timeline-step">Step {index + 1}</span>
                <span className="badge badge-indigo">{topic.level}</span>
                <span className="timeline-time">
                  <Clock size={13} /> {topic.estimatedHours || 5}h
                </span>
              </div>

              <h4 className="timeline-title">{topic.topic}</h4>
              <p className="timeline-desc">{topic.description}</p>

              <div className="timeline-footer">
                <div className="timeline-tags">
                  {topic.tags && topic.tags.map((t, i) => (
                    <span key={i} className="tag-chip">#{t}</span>
                  ))}
                </div>

                <div className="timeline-btns">
                  <button
                    onClick={() => onToggleComplete(topic.topic)}
                    className={`btn-secondary text-xs ${isDone ? "completed-btn" : ""}`}
                  >
                    {isDone ? "Completed ✓" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => onOpenDetails(topic)}
                    className="btn-secondary text-xs"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
