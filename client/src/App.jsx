import React, { useState, useEffect } from "react";
import HeaderStepper from "./components/HeaderStepper";
import ProgressStepper from "./components/ProgressStepper";
import UserRegistrationStep from "./components/UserRegistrationStep";
import WelcomeProfileStep from "./components/WelcomeProfileStep";
import SelectGoalStep from "./components/SelectGoalStep";
import SkillAssessmentStep from "./components/SkillAssessmentStep";
import SkillAnalysisStep from "./components/SkillAnalysisStep";
import SkillGapFinderStep from "./components/SkillGapFinderStep";
import PersonalizedEngineStep from "./components/PersonalizedEngineStep";
import PersonalizedRoadmapStep from "./components/PersonalizedRoadmapStep";
import FocusTopicStep from "./components/FocusTopicStep";
import TopicQuizModal from "./components/TopicQuizModal";
import PerformanceAnalysisStep from "./components/PerformanceAnalysisStep";
import ProgressStep from "./components/ProgressStep";
import AnalyticsUpdatedRoadmapStep from "./components/AnalyticsUpdatedRoadmapStep";
import TopicModal from "./components/TopicModal";
import AuthModal from "./components/AuthModal";
import "./App.css";

const API_BASE_URL = "http://localhost:5000";

const STEP_TITLES = {
  1: "Registration",
  2: "Login",
  3: "Welcome / Profile Setup",
  4: "Goal Selection",
  5: "Skill Assessment",
  6: "Skill Analysis",
  7: "Skill Gap Identification",
  8: "Personalized Recommendation",
  9: "Personalized Roadmap",
  10: "Topic Learning",
  11: "Learning Resources",
  12: "Practice / Project",
  13: "Quiz",
  14: "Performance Analysis",
  15: "Progress Tracking",
  16: "Analytics",
  17: "Updated Personalized Roadmap",
  18: "Next Recommended Topic"
};

export default function App() {
  const [serverStatus, setServerStatus] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // User Profile & Preferences
  const [userProfile, setUserProfile] = useState({
    name: "Alex",
    email: "alex@pathfinder.io",
    background: "Computer Science Student",
    learningPreferences: {
      hoursPerWeek: 5,
      preferredStyle: "Hands-on Projects",
      velocity: "Balanced"
    }
  });

  const [activeQuery, setActiveQuery] = useState({
    goal: "Full Stack Developer",
    level: "Beginner"
  });

  const [assessmentResults, setAssessmentResults] = useState({
    quizScore: 75,
    totalQuestions: 5,
    skillAnalysis: [
      { dimension: "Core Syntax & Foundations", score: 90, status: "Mastered" },
      { dimension: "Data Structures & Alg", score: 72, status: "Moderate" },
      { dimension: "Statistics & ML Concepts", score: 55, status: "Needs Focus" }
    ],
    skillGaps: [
      { gapTopic: "Machine Learning Concepts", required: "Advanced", current: "Intermediate", severity: "Medium" },
      { gapTopic: "Deep Learning & PyTorch", required: "Intermediate", current: "Beginner", severity: "High" }
    ]
  });

  const [roadmapData, setRoadmapData] = useState({
    topics: [],
    resources: [],
    projects: []
  });

  const [completedTopics, setCompletedTopics] = useState([]);
  const [currentQuizResult, setCurrentQuizResult] = useState(null);
  const [quizModalTopic, setQuizModalTopic] = useState(null);
  const [selectedTopicDetails, setSelectedTopicDetails] = useState(null);

  // Restore step and user session on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => setServerStatus(data.database || "Online"))
      .catch(() => setServerStatus("Connecting..."));

    // Check saved step
    const savedStep = localStorage.getItem("pathfinder_active_step");
    if (savedStep) {
      setActiveStep(parseInt(savedStep, 10));
    }

    const savedToken = localStorage.getItem("pathfinder_auth_token");
    if (savedToken) {
      fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setCurrentUser(data.user);
            setUserProfile((prev) => ({
              ...prev,
              name: data.user.name || prev.name,
              email: data.user.email || prev.email,
              background: data.user.background || prev.background
            }));
            if (data.user.activeGoal) {
              setActiveQuery((prev) => ({ ...prev, goal: data.user.activeGoal, level: data.user.activeLevel || "Beginner" }));
            }
            if (data.user.completedTopics) {
              setCompletedTopics(data.user.completedTopics);
            }
            if (data.user.currentStage) {
              const stageStepMap = {
                "WELCOME": 3,
                "GOAL": 4,
                "ASSESSMENT": 5,
                "ANALYSIS": 6,
                "SKILL_GAP": 7,
                "ENGINE": 8,
                "ROADMAP": 9,
                "TOPIC": 10,
                "PROGRESS": 15
              };
              const mappedStep = stageStepMap[data.user.currentStage];
              if (mappedStep) {
                setActiveStep(mappedStep);
              }
            }
          }
        })
        .catch((err) => console.warn("Auto login check warning:", err));
    }

    fetchEngineRoadmap(activeQuery.goal, activeQuery.level, 75, [], completedTopics, userProfile.learningPreferences);
  }, []);

  // Sync active step to localStorage and backend
  const navigateToStep = (nextStep, stageName) => {
    setActiveStep(nextStep);
    localStorage.setItem("pathfinder_active_step", nextStep.toString());

    const token = localStorage.getItem("pathfinder_auth_token");
    if (token) {
      fetch(`${API_BASE_URL}/api/user/sync-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          activeGoal: activeQuery.goal,
          activeLevel: activeQuery.level,
          completedTopics,
          currentStage: stageName || `STEP_${nextStep}`
        })
      }).catch((err) => console.warn("Stage sync warning:", err));
    }
  };

  const fetchEngineRoadmap = async (goal, level, quizScore, prerequisites, completed, preferences) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/engine/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: goal || activeQuery.goal,
          level: level || activeQuery.level,
          quizScore: quizScore !== undefined ? quizScore : assessmentResults.quizScore,
          prerequisites: prerequisites || assessmentResults.skillGaps?.map((g) => g.gapTopic),
          completedTopics: completed || completedTopics,
          learningPreferences: preferences || userProfile.learningPreferences
        })
      });

      if (res.ok) {
        const data = await res.json();
        setRoadmapData(data.personalizedRoadmap || { topics: [], resources: [], projects: [] });
      }
    } catch (err) {
      console.error("Engine fetch error:", err);
    }
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setUserProfile((prev) => ({
      ...prev,
      name: user.name || prev.name,
      email: user.email || prev.email
    }));
    if (user.activeGoal) {
      setActiveQuery({ goal: user.activeGoal, level: user.activeLevel || "Beginner" });
    }
    if (user.completedTopics) {
      setCompletedTopics(user.completedTopics);
    }
    // Advance to Welcome stage upon login/register
    navigateToStep(3, "WELCOME");
  };

  const handleLogout = () => {
    localStorage.removeItem("pathfinder_auth_token");
    localStorage.removeItem("pathfinder_active_step");
    setCurrentUser(null);
    setActiveStep(1);
  };

  const toggleTopicCompletion = (topicTitle) => {
    setCompletedTopics((prev) => {
      const next = prev.includes(topicTitle)
        ? prev.filter((t) => t !== topicTitle)
        : [...prev, topicTitle];

      fetchEngineRoadmap(
        activeQuery.goal,
        activeQuery.level,
        assessmentResults.quizScore,
        [],
        next,
        userProfile.learningPreferences
      );
      return next;
    });
  };

  const handleQuizPassed = (topicTitle, resultData) => {
    setCurrentQuizResult(resultData || { score: 80 });
    if (!completedTopics.includes(topicTitle)) {
      toggleTopicCompletion(topicTitle);
    }
    setQuizModalTopic(null);
    navigateToStep(14, "PERFORMANCE");
  };

  const currentFocusTopic = roadmapData.topics?.find((t) => !completedTopics.includes(t.topic)) || roadmapData.topics?.[0];
  const nextFocusTopic = roadmapData.topics?.find((t) => !completedTopics.includes(t.topic) && t.topic !== currentFocusTopic?.topic);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-main flex flex-col">
      {/* Minimal Header */}
      <HeaderStepper
        activeStep={activeStep}
        stepTitle={STEP_TITLES[activeStep]}
        serverStatus={serverStatus}
        userGoal={activeQuery.goal}
        completedCount={completedTopics.length}
        totalCount={roadmapData.topics?.length || 0}
        currentUser={currentUser}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {/* Visual Step Progression Indicator */}
      <ProgressStepper
        activeStageNumber={activeStep}
        onSelectStage={(targetStage) => navigateToStep(targetStage)}
      />

      {/* Main Guided Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto py-8 px-4">
        {/* Stage 1: Login / Authentication */}
        {activeStep === 1 && (
          <UserRegistrationStep
            initialView="login"
            onAuthSuccess={handleAuthSuccess}
            onCompleteRegistration={() => navigateToStep(3, "WELCOME")}
          />
        )}

        {/* Stage 2: Login */}
        {activeStep === 2 && (
          <UserRegistrationStep
            initialView="login"
            onAuthSuccess={handleAuthSuccess}
            onCompleteRegistration={() => navigateToStep(3, "WELCOME")}
          />
        )}

        {/* Stage 3: Welcome / Profile Setup */}
        {activeStep === 3 && (
          <WelcomeProfileStep
            userProfile={userProfile}
            onCompleteProfile={(profileData) => {
              setUserProfile((prev) => ({ ...prev, ...profileData }));
              navigateToStep(4, "GOAL");
            }}
          />
        )}

        {/* Stage 4: Goal Selection */}
        {activeStep === 4 && (
          <SelectGoalStep
            currentGoal={activeQuery.goal}
            currentLevel={activeQuery.level}
            onSelectGoal={(goal, level) => {
              setActiveQuery({ goal, level });
              navigateToStep(5, "ASSESSMENT");
            }}
          />
        )}

        {/* Stage 5: Skill Assessment */}
        {activeStep === 5 && (
          <SkillAssessmentStep
            goal={activeQuery.goal}
            level={activeQuery.level}
            onAssessmentComplete={(evalData) => {
              if (evalData) {
                setAssessmentResults((prev) => ({
                  ...prev,
                  quizScore: evalData.quizScore !== undefined ? evalData.quizScore : prev.quizScore,
                  skillAnalysis: evalData.skillAnalysis || prev.skillAnalysis,
                  skillGaps: evalData.skillGaps || prev.skillGaps
                }));
              }
              navigateToStep(6, "ANALYSIS");
            }}
          />
        )}

        {/* Stage 6: Skill Analysis */}
        {activeStep === 6 && (
          <SkillAnalysisStep
            assessmentResults={assessmentResults}
            onProceedToGapFinder={() => navigateToStep(7, "SKILL_GAP")}
          />
        )}

        {/* Stage 7: Skill Gap Identification */}
        {activeStep === 7 && (
          <SkillGapFinderStep
            goal={activeQuery.goal}
            skillGaps={assessmentResults.skillGaps}
            onProceedToEngine={() => navigateToStep(8, "ENGINE")}
          />
        )}

        {/* Stage 8: Personalized Recommendation */}
        {activeStep === 8 && (
          <PersonalizedEngineStep
            goal={activeQuery.goal}
            level={activeQuery.level}
            quizScore={assessmentResults.quizScore}
            prerequisites={assessmentResults.skillGaps?.map((g) => g.gapTopic)}
            completedTopics={completedTopics}
            learningPreferences={userProfile.learningPreferences}
            onGenerateRoadmap={() => {
              fetchEngineRoadmap(
                activeQuery.goal,
                activeQuery.level,
                assessmentResults.quizScore,
                assessmentResults.skillGaps?.map((g) => g.gapTopic),
                completedTopics,
                userProfile.learningPreferences
              );
              navigateToStep(9, "ROADMAP");
            }}
          />
        )}

        {/* Stage 9: Personalized Roadmap */}
        {activeStep === 9 && (
          <PersonalizedRoadmapStep
            roadmapData={roadmapData}
            completedTopics={completedTopics}
            onToggleTopic={toggleTopicCompletion}
            onOpenQuiz={(topic) => setQuizModalTopic(topic)}
            onOpenTopicDetails={(topic) => setSelectedTopicDetails(topic)}
            onProceedToQuizStep={() => navigateToStep(10, "TOPIC")}
          />
        )}

        {/* Stages 10, 11, 12: Topic Learning, Resources, Practice/Project */}
        {(activeStep >= 10 && activeStep <= 12) && (
          <FocusTopicStep
            topic={currentFocusTopic}
            nextTopic={nextFocusTopic}
            isCompleted={currentFocusTopic ? completedTopics.includes(currentFocusTopic.topic) : false}
            onCompleteTopic={() => currentFocusTopic && toggleTopicCompletion(currentFocusTopic.topic)}
            onStartQuiz={(t) => setQuizModalTopic(t)}
            onProceedToAnalytics={() => navigateToStep(15, "PROGRESS")}
          />
        )}

        {/* Stage 13: Quiz (via TopicQuizModal or FocusTopicStep) */}
        {activeStep === 13 && (
          <FocusTopicStep
            topic={currentFocusTopic}
            nextTopic={nextFocusTopic}
            isCompleted={currentFocusTopic ? completedTopics.includes(currentFocusTopic.topic) : false}
            onCompleteTopic={() => currentFocusTopic && toggleTopicCompletion(currentFocusTopic.topic)}
            onStartQuiz={(t) => setQuizModalTopic(t)}
            onProceedToAnalytics={() => navigateToStep(15, "PROGRESS")}
          />
        )}

        {/* Stage 14: Performance Analysis */}
        {activeStep === 14 && (
          <PerformanceAnalysisStep
            quizResult={currentQuizResult}
            topicTitle={currentFocusTopic?.topic || "Focus Topic"}
            onProceedToNextTopic={() => navigateToStep(15, "PROGRESS")}
            onProceedToRevision={() => navigateToStep(10, "TOPIC")}
          />
        )}

        {/* Stage 15: Progress Tracking */}
        {activeStep === 15 && (
          <ProgressStep
            goal={activeQuery.goal}
            topics={roadmapData.topics}
            completedTopics={completedTopics}
            quizScore={assessmentResults.quizScore}
            onProceedToAnalytics={() => navigateToStep(16, "ANALYTICS")}
          />
        )}

        {/* Stages 16, 17, 18: Analytics, Updated Roadmap & Next Topic */}
        {(activeStep >= 16) && (
          <AnalyticsUpdatedRoadmapStep
            goal={activeQuery.goal}
            level={activeQuery.level}
            quizScore={assessmentResults.quizScore}
            completedTopics={completedTopics}
            topics={roadmapData.topics}
            onUpdateRoadmapSuccess={(updateData) => {
              if (updateData.updatedRoadmap?.topics) {
                setRoadmapData((prev) => ({ ...prev, topics: updateData.updatedRoadmap.topics }));
              }
              navigateToStep(10, "TOPIC");
            }}
          />
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Topic Quiz Modal */}
      {quizModalTopic && (
        <TopicQuizModal
          topic={quizModalTopic}
          onClose={() => setQuizModalTopic(null)}
          onQuizPassed={(topicTitle, resData) => handleQuizPassed(topicTitle, resData)}
        />
      )}

      {/* Topic Details Modal */}
      {selectedTopicDetails && (
        <TopicModal
          topic={selectedTopicDetails}
          onClose={() => setSelectedTopicDetails(null)}
          isCompleted={completedTopics.includes(selectedTopicDetails.topic)}
          onToggleComplete={toggleTopicCompletion}
        />
      )}
    </div>
  );
}
