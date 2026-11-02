const sampleAssessments = {
  "ML": {
    "Beginner": [
      {
        id: "ml_b1",
        question: "Which Python library is primarily used for vector operations and multi-dimensional array manipulation in ML?",
        options: ["Flask", "NumPy", "BeautifulSoup", "Requests"],
        correctIndex: 1,
        explanation: "NumPy provides high-performance multidimensional array objects and tools for handling vector mathematical operations.",
        dimension: "Core Math & Code"
      },
      {
        id: "ml_b2",
        question: "In Linear Regression, what does the Mean Squared Error (MSE) cost function measure?",
        options: [
          "The accuracy percentage of discrete category labels",
          "The average of squared differences between predicted continuous values and actual targets",
          "The time taken to train the neural network model",
          "The ratio of true positives to false positives"
        ],
        correctIndex: 1,
        explanation: "MSE measures the variance/average squared distance between predicted continuous values and real values.",
        dimension: "Supervised Learning"
      },
      {
        id: "ml_b3",
        question: "What issue occurs when a machine learning model performs exceptionally well on training data but poorly on unseen test data?",
        options: ["Underfitting", "Overfitting", "Convergence", "Normalizing"],
        correctIndex: 1,
        explanation: "Overfitting happens when a model learns noise and specific details of the training set rather than generalizing.",
        dimension: "Model Evaluation"
      }
    ],
    "Intermediate": [
      {
        id: "ml_i1",
        question: "How does Random Forest reduce model variance compared to a single Decision Tree?",
        options: [
          "By using deeper trees without pruning",
          "By ensembling multiple trees trained on bootstrap samples with random feature subsets (Bagging)",
          "By converting decision trees into linear regression equations",
          "By increasing the learning rate hyperparameter"
        ],
        correctIndex: 1,
        explanation: "Random Forests use Bagging (Bootstrap Aggregating) + random feature sub-sampling to average out individual tree variance.",
        dimension: "Ensemble Methods"
      }
    ]
  },
  "Web Development": {
    "Beginner": [
      {
        id: "web_b1",
        question: "What is the primary role of Semantic HTML tags like <header>, <main>, and <article>?",
        options: [
          "They automatically style text with dark background themes",
          "They describe the meaning of content to browsers, search engines, and screen readers",
          "They execute server-side JavaScript scripts",
          "They compile HTML code into binary web bundles"
        ],
        correctIndex: 1,
        explanation: "Semantic HTML provides accessibility and structural context to assistive technologies and search engines.",
        dimension: "HTML/CSS Foundations"
      },
      {
        id: "web_b2",
        question: "In JavaScript, which modern feature allows handling asynchronous HTTP requests cleanly with synchronous-like syntax?",
        options: ["Callbacks", "async/await", "setInterval()", "eval()"],
        correctIndex: 1,
        explanation: "async/await syntax built on Promises allows clean asynchronous control flow.",
        dimension: "Async JavaScript"
      },
      {
        id: "web_b3",
        question: "In React, how do props differ from state?",
        options: [
          "Props are mutable within the component; state is read-only passed from parents",
          "Props are passed into a component from outside; state is managed internally by the component",
          "Props are only used in backend Node.js code",
          "State cannot be updated using hooks"
        ],
        correctIndex: 1,
        explanation: "Props are read-only inputs passed from parent components, while state is internal mutable data.",
        dimension: "React Ecosystem"
      }
    ]
  },
  "GATE": {
    "Beginner": [
      {
        id: "gate_b1",
        question: "Which Data Structure uses LIFO (Last In First Out) ordering for operation execution?",
        options: ["Queue", "Stack", "Binary Search Tree", "Min-Heap"],
        correctIndex: 1,
        explanation: "A Stack is a LIFO linear data structure where element insertion and removal occur at the same end.",
        dimension: "Data Structures & Alg"
      },
      {
        id: "gate_b2",
        question: "In Operating Systems, what condition is NOT required for a deadlock to occur?",
        options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Preemptive Scheduling"],
        correctIndex: 3,
        explanation: "The Coffman conditions required for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        dimension: "Operating Systems"
      },
      {
        id: "gate_b3",
        question: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctIndex: 1,
        explanation: "In a balanced BST, tree height is log(n), making search operations take O(log n) time.",
        dimension: "Algorithms & Complexity"
      }
    ],
    "Intermediate": [
      {
        id: "gate_i1",
        question: "Which language class is recognized by a Deterministic Pushdown Automaton (DPDA)?",
        options: ["Regular Languages", "Deterministic Context-Free Languages", "Context-Sensitive Languages", "Recursively Enumerable"],
        correctIndex: 1,
        explanation: "DPDAs recognize Deterministic Context-Free Languages (DCFLs).",
        dimension: "Theory of Computation"
      }
    ]
  },
  "Data Science": {
    "Beginner": [
      {
        id: "ds_b1",
        question: "In Pandas, which method is used to aggregate data based on grouping keys (similar to SQL GROUP BY)?",
        options: ["df.pivot()", "df.groupby()", "df.merge()", "df.sort_values()"],
        correctIndex: 1,
        explanation: "df.groupby() splits data into groups for computation and aggregation.",
        dimension: "Data Manipulation"
      }
    ]
  },
  "Cybersecurity": {
    "Beginner": [
      {
        id: "cs_b1",
        question: "Which OSI layer is responsible for end-to-end transport control, segmentation, and port mapping (e.g., TCP, UDP)?",
        options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"],
        correctIndex: 2,
        explanation: "Layer 4 (Transport Layer) handles segmentation, port numbers, TCP connections, and UDP packets.",
        dimension: "Networking"
      }
    ]
  }
};

module.exports = sampleAssessments;
