const sampleTopics = [
  // ==========================================
  // --- 1. GATE PREPARATION (CS & IT) ---
  // ==========================================
  {
    topic: "Digital Logic & Boolean Algebra",
    level: "Beginner",
    category: "GATE",
    description: "Karnaugh Maps, logic gates, canonical SOP/POS forms, multiplexers, decoders, and sequential flip-flops.",
    estimatedHours: 8,
    prerequisites: ["High School Math"],
    tags: ["GATE CS", "Digital Logic", "K-Maps", "Boolean Algebra"],
    order: 1,
    documentation: [
      { title: "GeeksforGeeks Digital Logic GATE Official Notes", type: "documentation", url: "https://www.geeksforgeeks.org/digital-logic-gate-notes/", provider: "GeeksforGeeks GATE", duration: "1.5h read" },
      { title: "NPTEL Digital Circuits & Logic Design Course Docs", type: "documentation", url: "https://nptel.ac.in/courses/106105185", provider: "IIT Kharagpur / NPTEL", duration: "2h read" }
    ],
    resources: [
      { title: "Neso Academy Digital Electronics Full Course", type: "video", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3Ed3fVuxhAZO-C806rm", provider: "Neso Academy", duration: "3h video" },
      { title: "NPTEL Digital Logic & Computer Organization", type: "video", url: "https://nptel.ac.in/courses/106105185", provider: "IIT Kharagpur / NPTEL", duration: "2.5h video" },
      { title: "Logisim Digital Circuit Simulator Playground", type: "practice", url: "http://www.cburch.com/logisim/", provider: "Logisim Open Source", duration: "1h practice" }
    ],
    project: {
      title: "Logisim 4-Bit ALU Circuit Simulation",
      difficulty: "Beginner",
      summary: "Design and test a 4-bit Arithmetic Logic Unit (ALU) executing ADD, SUB, AND, OR, and XOR operations.",
      keyDeliverables: [
        "Implement 4x1 Multiplexer control logic",
        "Design 4-Bit Ripple Carry Adder circuit",
        "Verify overflow and zero status flags"
      ],
      starterTip: "Use 2's complement representation for seamless subtraction logic."
    },
    topicQuiz: [
      {
        question: "How many minterms are present in a 4-variable K-Map?",
        options: ["8", "16", "32", "64"],
        correctIndex: 1,
        explanation: "A 4-variable K-Map contains 2^4 = 16 cells / minterms."
      }
    ]
  },
  {
    topic: "Data Structures: Stacks, Queues & Trees",
    level: "Beginner",
    category: "GATE",
    description: "Infix to Postfix conversion, queue implementation, Binary Trees, AVL height balancing, and B-Trees for GATE.",
    estimatedHours: 10,
    prerequisites: ["Digital Logic & Boolean Algebra"],
    tags: ["Data Structures", "AVL Trees", "Stacks", "Queues"],
    order: 2,
    documentation: [
      { title: "GeeksforGeeks Data Structures GATE Guide", type: "documentation", url: "https://www.geeksforgeeks.org/data-structures/", provider: "GeeksforGeeks", duration: "2h read" },
      { title: "C++ STL Containers Official Reference", type: "documentation", url: "https://en.cppreference.com/w/cpp/container", provider: "cppreference.com", duration: "1h read" }
    ],
    resources: [
      { title: "Gate Smashers Data Structures Playlist", type: "video", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaannt3Tub275Y-c-Ff9H", provider: "Gate Smashers", duration: "3.5h video" },
      { title: "VisuAlgo Interactive Data Structure Visualizer", type: "practice", url: "https://visualgo.net/en", provider: "VisuAlgo", duration: "1h practice" },
      { title: "Ravindrababu Ravula GATE CS Data Structures", type: "video", url: "https://www.youtube.com/results?search_query=ravindrababu+ravula+data+structures", provider: "RBR GATE CS", duration: "2h video" }
    ],
    project: {
      title: "Expression Tree Parser & Evaluator",
      difficulty: "Beginner",
      summary: "Write a C/C++ program to construct an Expression Tree from postfix mathematical strings and evaluate arithmetic results.",
      keyDeliverables: [
        "Parse postfix expression using Stack ADT",
        "Construct binary expression tree nodes",
        "Perform Inorder, Preorder, and Postorder traversals"
      ],
      starterTip: "Operands form leaf nodes, while operators form internal root nodes."
    },
    topicQuiz: [
      {
        question: "What is the worst-case time complexity of searching in an AVL Tree with N nodes?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIndex: 1,
        explanation: "AVL trees strictly maintain height h <= 1.44 log2(N), guaranteeing O(log N) search."
      }
    ]
  },
  {
    topic: "Algorithms: Greedy, Dynamic Programming & Graph Theory",
    level: "Intermediate",
    category: "GATE",
    description: "Master Asymptotic notations (Big O, Omega, Theta), Dijkstra's algorithm, Kruskal's MST, 0/1 Knapsack, and Floyd-Warshall.",
    estimatedHours: 12,
    prerequisites: ["Data Structures: Stacks, Queues & Trees"],
    tags: ["Algorithms", "Dynamic Programming", "Graphs", "NP-Hard"],
    order: 3,
    documentation: [
      { title: "CLRS Introduction to Algorithms MIT Course Notes", type: "documentation", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", provider: "MIT OpenCourseWare", duration: "3h read" },
      { title: "E-Maxx CP Algorithms Reference Manual", type: "documentation", url: "https://cp-algorithms.com/", provider: "CP-Algorithms", duration: "2h read" }
    ],
    resources: [
      { title: "Abdul Bari Algorithms Masterclass Series", type: "video", url: "https://www.youtube.com/playlist?list=PLDN4rrl4ha5q0E82P13b0k8wHhS3KxQ2S", provider: "Abdul Bari", duration: "4h video" },
      { title: "GeeksforGeeks GATE Algorithms Quick Revision Notes", type: "doc", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/", provider: "GeeksforGeeks", duration: "2h read" }
    ],
    project: {
      title: "Shortest Path & MST Solver Package",
      difficulty: "Intermediate",
      summary: "Implement Dijkstra's Single Source Shortest Path and Kruskal's Minimum Spanning Tree using Min-Heaps and Disjoint Set Union (DSU).",
      keyDeliverables: [
        "Implement Union-Find DSU with path compression",
        "Run Dijkstra with priority queue",
        "Analyze time complexity vs Bellman-Ford"
      ],
      starterTip: "Path compression in DSU brings amortized operations to near O(1) alpha(N)."
    },
    topicQuiz: [
      {
        question: "What is the time complexity of Kruskal's algorithm using Min-Heap and Disjoint Set Union?",
        options: ["O(E log V)", "O(V^3)", "O(V + E)", "O(E^2)"],
        correctIndex: 0,
        explanation: "Sorting edges takes O(E log E) = O(E log V), and DSU operations take nearly O(E)."
      }
    ]
  },
  {
    topic: "Operating Systems: Process Management & Memory Paging",
    level: "Intermediate",
    category: "GATE",
    description: "CPU Scheduling (Round Robin, SRTF), Semaphores, Banker's Deadlock Avoidance, Page Replacement (LRU, FIFO), and Virtual Memory.",
    estimatedHours: 10,
    prerequisites: ["Data Structures: Stacks, Queues & Trees"],
    tags: ["Operating Systems", "Semaphores", "Paging", "Deadlocks"],
    order: 4,
    documentation: [
      { title: "OSTEP Operating Systems: Three Easy Pieces Book", type: "documentation", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", provider: "UW-Madison / OSTEP", duration: "3h read" },
      { title: "Silberschatz OS Concepts GATE Chapter Notes", type: "documentation", url: "https://os-book.com", provider: "Wiley OS Concepts", duration: "2.5h read" }
    ],
    resources: [
      { title: "Gate Smashers Operating Systems Complete Series", type: "video", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrEwLI36GXV7-2n", provider: "Gate Smashers", duration: "4h video" },
      { title: "GeeksforGeeks Operating System Notes for GATE CS", type: "doc", url: "https://www.geeksforgeeks.org/operating-systems/", provider: "GeeksforGeeks", duration: "2h read" }
    ],
    project: {
      title: "Banker's Algorithm & Page Replacement Simulator",
      difficulty: "Intermediate",
      summary: "Simulate OS process allocation using Banker's Safety Algorithm and compare LRU vs FIFO page fault counts.",
      keyDeliverables: [
        "Compute Need Matrix = Max - Allocation",
        "Verify Safe Sequence existence",
        "Simulate LRU cache eviction algorithm"
      ],
      starterTip: "Check that Work >= Need for each process iteration in Banker's Safety algorithm."
    },
    topicQuiz: [
      {
        question: "Belady's Anomaly (where increasing page frames increases page faults) occurs in which page replacement algorithm?",
        options: ["LRU", "Optimal", "FIFO", "MRU"],
        correctIndex: 2,
        explanation: "FIFO (First In First Out) exhibits Belady's Anomaly."
      }
    ]
  },
  {
    topic: "Database Management Systems (DBMS) & SQL",
    level: "Intermediate",
    category: "GATE",
    description: "ER Modeling, Relational Algebra, SQL Queries, Normalization (1NF to BCNF), and Transaction Concurrency Control (ACID & Strict 2PL).",
    estimatedHours: 10,
    prerequisites: ["Data Structures: Stacks, Queues & Trees"],
    tags: ["DBMS", "SQL", "Relational Algebra", "Normalization", "ACID"],
    order: 5,
    documentation: [
      { title: "PostgreSQL SQL Language Official Documentation", type: "documentation", url: "https://www.postgresql.org/docs/current/sql.html", provider: "PostgreSQL Global Development Group", duration: "2h read" },
      { title: "GeeksforGeeks DBMS Notes for GATE CS", type: "documentation", url: "https://www.geeksforgeeks.org/dbms/", provider: "GeeksforGeeks", duration: "2h read" }
    ],
    resources: [
      { title: "NPTEL Database Management System by IIT Madras", type: "video", url: "https://nptel.ac.in/courses/106106093", provider: "IIT Madras / NPTEL", duration: "3h video" },
      { title: "Gate Smashers DBMS Complete Playlist", type: "video", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y", provider: "Gate Smashers", duration: "3h video" },
      { title: "Mode Analytics Interactive SQL Tutorial", type: "practice", url: "https://mode.com/sql-tutorial/", provider: "Mode Analytics", duration: "1.5h practice" }
    ],
    project: {
      title: "Relational Schema Normalizer & SQL Engine",
      difficulty: "Intermediate",
      summary: "Write SQL scripts to model a university database, check functional dependencies for BCNF compliance, and write complex JOIN queries.",
      keyDeliverables: [
        "Normalize 1NF table into 3NF and BCNF",
        "Write complex SQL query with GROUP BY and HAVING clauses",
        "Implement ACID compliant transaction with locking"
      ],
      starterTip: "A table is in BCNF if for every functional dependency X -> Y, X is a super key."
    },
    topicQuiz: [
      {
        question: "Which normal form requires that every non-trivial functional dependency X -> Y must have X as a super key?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctIndex: 3,
        explanation: "Boyce-Codd Normal Form (BCNF) strictly requires X to be a super key for every non-trivial dependency X -> Y."
      }
    ]
  },

  // ==========================================
  // --- 2. MACHINE LEARNING & AI (ML) ---
  // ==========================================
  {
    topic: "Python & Scientific Stack Basics (NumPy & Pandas)",
    level: "Beginner",
    category: "ML",
    description: "Master vector operations, array manipulation, data clean-up, and DataFrame aggregation required for ML workflows.",
    estimatedHours: 8,
    prerequisites: ["Basic Programming Concepts"],
    tags: ["Python", "NumPy", "Pandas", "Data Prep"],
    order: 1,
    documentation: [
      { title: "NumPy Official Documentation & API Reference", type: "documentation", url: "https://numpy.org/doc/stable/", provider: "NumPy.org", duration: "2h read" },
      { title: "Pandas Official User Guide & Getting Started", type: "documentation", url: "https://pandas.pydata.org/docs/user_guide/index.html", provider: "Pandas Development Team", duration: "2h read" }
    ],
    resources: [
      { title: "Python Data Science Handbook (NumPy & Pandas)", type: "doc", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", provider: "O'Reilly / Jake VanderPlas", duration: "2.5h read" },
      { title: "freeCodeCamp Data Analysis with Python Full Course", type: "video", url: "https://www.youtube.com/watch?v=vmEHCJofslg", provider: "freeCodeCamp", duration: "4h video" },
      { title: "Kaggle Pandas Interactive Micro-Course", type: "practice", url: "https://www.kaggle.com/learn/pandas", provider: "Kaggle Learn", duration: "1.5h practice" }
    ],
    project: {
      title: "Exploratory Data Cleaning & Stats Pipeline",
      difficulty: "Beginner",
      summary: "Build an automated Python script that ingests noisy CSV sales data, imputes missing values, normalizes distributions, and outputs summary statistics.",
      keyDeliverables: ["Load raw CSV using Pandas", "Impute missing values with median", "Export clean dataset"],
      starterTip: "Use vector operations instead of slow python loops."
    },
    topicQuiz: [
      {
        question: "Which function computes array element-wise mean along specific axes in NumPy?",
        options: ["np.mean()", "np.avg_calc()", "np.sum_divide()", "np.median()"],
        correctIndex: 0,
        explanation: "np.mean(a, axis=0) computes arithmetic mean along the specified axis."
      }
    ]
  },
  {
    topic: "Supervised Learning & Scikit-Learn",
    level: "Intermediate",
    category: "ML",
    description: "Linear Regression, Logistic Regression, Decision Trees, Random Forests, Gradient Boosting, and Scikit-Learn API.",
    estimatedHours: 10,
    prerequisites: ["Python & Scientific Stack Basics (NumPy & Pandas)"],
    tags: ["Machine Learning", "Scikit-Learn", "Regression", "Classification"],
    order: 2,
    documentation: [
      { title: "Scikit-Learn Official User Guide", type: "documentation", url: "https://scikit-learn.org/stable/user_guide.html", provider: "Scikit-Learn Developers", duration: "3h read" },
      { title: "Scikit-Learn Supervised Learning API Reference", type: "documentation", url: "https://scikit-learn.org/stable/modules/classes.html#module-sklearn.linear_model", provider: "Scikit-Learn Developers", duration: "1.5h read" }
    ],
    resources: [
      { title: "Andrew Ng Machine Learning Specialization", type: "video", url: "https://www.coursera.org/learn/machine-learning", provider: "DeepLearning.AI / Stanford", duration: "5h video" },
      { title: "Google Machine Learning Crash Course", type: "tutorial", url: "https://developers.google.com/machine-learning/crash-course", provider: "Google Developers", duration: "3h read" },
      { title: "StatQuest ML Supervised Learning Playlist", type: "video", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLroHQfF_q178I1VGP", provider: "StatQuest with Josh Starmer", duration: "2h video" }
    ],
    project: {
      title: "Customer Churn Classifier with Random Forest",
      difficulty: "Intermediate",
      summary: "Train and evaluate Logistic Regression and Random Forest models on customer retention data using Scikit-Learn.",
      keyDeliverables: [
        "Preprocess categorical data using OneHotEncoder",
        "Train RandomForestClassifier with hyperparameter tuning",
        "Plot Confusion Matrix and ROC-AUC curve"
      ],
      starterTip: "Scale numeric features using StandardScaler prior to training regularized models."
    },
    topicQuiz: [
      {
        question: "Which metric is best suited for evaluating a classifier on highly imbalanced data?",
        options: ["Accuracy", "F1-Score / ROC-AUC", "Mean Squared Error", "R-Squared"],
        correctIndex: 1,
        explanation: "F1-Score and ROC-AUC measure precision/recall trade-offs without being skewed by majority negative class counts."
      }
    ]
  },
  {
    topic: "Deep Learning Fundamentals & PyTorch Framework",
    level: "Advanced",
    category: "ML",
    description: "Neural Networks, Backpropagation, Activation Functions (ReLU, Softmax), Convolutional Nets (CNNs), and PyTorch Tensors.",
    estimatedHours: 12,
    prerequisites: ["Supervised Learning & Scikit-Learn"],
    tags: ["Deep Learning", "PyTorch", "Neural Networks", "CNNs"],
    order: 3,
    documentation: [
      { title: "PyTorch Official Documentation & API Reference", type: "documentation", url: "https://pytorch.org/docs/stable/index.html", provider: "PyTorch / Meta AI", duration: "3h read" },
      { title: "PyTorch Deep Learning Tutorials Guide", type: "documentation", url: "https://pytorch.org/tutorials/", provider: "PyTorch Team", duration: "2.5h read" }
    ],
    resources: [
      { title: "Fast.ai Practical Deep Learning for Coders", type: "video", url: "https://course.fast.ai/", provider: "fast.ai", duration: "4h video" },
      { title: "3Blue1Brown Neural Networks Animated Series", type: "video", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", provider: "3Blue1Brown", duration: "1.5h video" },
      { title: "DeepLearning.AI Deep Learning Specialization", type: "tutorial", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/", provider: "DeepLearning.AI", duration: "4h read" }
    ],
    project: {
      title: "PyTorch Image Classifier on Fashion-MNIST",
      difficulty: "Advanced",
      summary: "Construct a Convolutional Neural Network (CNN) in PyTorch to classify clothing items with custom DataLoader and training loop.",
      keyDeliverables: [
        "Define nn.Module architecture with Conv2d & MaxPool2d",
        "Implement training loop with CrossEntropyLoss and Adam optimizer",
        "Achieve >88% validation accuracy"
      ],
      starterTip: "Call optimizer.zero_grad() at the beginning of each iteration to avoid accumulating gradients."
    },
    topicQuiz: [
      {
        question: "What function prevents vanishing gradients in deep neural networks compared to Sigmoid?",
        options: ["ReLU", "Linear", "Step", "Cos"],
        correctIndex: 0,
        explanation: "ReLU (Rectified Linear Unit) has constant gradient 1 for positive inputs, mitigating vanishing gradient issues."
      }
    ]
  },

  // ==========================================
  // --- 3. FULLSTACK WEB DEVELOPMENT ---
  // ==========================================
  {
    topic: "HTML5 & Semantic Document Structure",
    level: "Beginner",
    category: "Web Development",
    description: "Master modern document architecture, accessibility (a11y), forms, SEO meta tags, and structured data.",
    estimatedHours: 4,
    prerequisites: ["Basic Computer Literacy"],
    tags: ["HTML5", "Accessibility", "SEO"],
    order: 1,
    documentation: [
      { title: "MDN Web Docs - HTML5 Official Documentation", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", provider: "Mozilla MDN", duration: "1.5h read" },
      { title: "W3C Web Content Accessibility Guidelines (WCAG)", type: "documentation", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", provider: "W3C WAI", duration: "1h read" }
    ],
    resources: [
      { title: "Google web.dev Learn HTML Course", type: "tutorial", url: "https://web.dev/learn/html/", provider: "Google web.dev", duration: "2h read" },
      { title: "freeCodeCamp Responsive Web Design Certification", type: "practice", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", provider: "freeCodeCamp", duration: "3h practice" }
    ],
    project: {
      title: "Accessible Developer Portfolio Landing Page",
      difficulty: "Beginner",
      summary: "Construct a semantic, accessible portfolio page featuring WCAG compliant headers and rich Open Graph SEO meta tags.",
      keyDeliverables: ["Use semantic HTML5 tags", "Include ARIA attributes for accessibility", "Add OpenGraph meta tags"],
      starterTip: "Use screen reader testing tools like Chrome Lighthouse audit."
    },
    topicQuiz: [
      {
        question: "Which HTML5 element should wrap the main unique content of a webpage?",
        options: ["<section>", "<main>", "<div>", "<article>"],
        correctIndex: 1,
        explanation: "<main> represents the dominant content unique to the body of the document."
      }
    ]
  },
  {
    topic: "Modern CSS Grid & Flexbox Layouts",
    level: "Beginner",
    category: "Web Development",
    description: "Build responsive, fluid visual layouts using CSS Flexbox, Grid, custom properties (CSS variables), and media queries.",
    estimatedHours: 6,
    prerequisites: ["HTML5 & Semantic Document Structure"],
    tags: ["CSS3", "Flexbox", "Responsive Design"],
    order: 2,
    documentation: [
      { title: "MDN Web Docs - CSS Layout & Modules Reference", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", provider: "Mozilla MDN", duration: "2h read" },
      { title: "CSS-Tricks Complete Guide to Flexbox & Grid", type: "documentation", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", provider: "CSS-Tricks", duration: "1h read" }
    ],
    resources: [
      { title: "Flexbox Froggy Interactive CSS Game", type: "practice", url: "https://flexboxfroggy.com/", provider: "Codepip", duration: "45 mins practice" },
      { title: "CSS Grid Garden Interactive Learning Game", type: "practice", url: "https://cssgridgarden.com/", provider: "Codepip", duration: "45 mins practice" },
      { title: "Kevin Powell Responsive Design Masterclass", type: "video", url: "https://www.youtube.com/user/KevinPowell", provider: "Kevin Powell", duration: "2.5h video" }
    ],
    project: {
      title: "Responsive E-Commerce Product Catalog Grid",
      difficulty: "Beginner",
      summary: "Create a fully responsive product catalog grid with CSS Grid auto-fit minmax columns and smooth hover state micro-animations.",
      keyDeliverables: ["Use repeat(auto-fit, minmax(280px, 1fr))", "Flexbox navigation bar with CSS variables"],
      starterTip: "CSS Grid is ideal for 2D card grid layouts; Flexbox is ideal for header/nav items."
    },
    topicQuiz: [
      {
        question: "What CSS Grid property allows columns to automatically wrap responsively without media queries?",
        options: ["grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))", "flex-wrap: wrap", "column-count: 3", "grid-auto-flow: dense"],
        correctIndex: 0,
        explanation: "repeat(auto-fit, minmax(250px, 1fr)) dynamically adjusts column counts based on viewport size."
      }
    ]
  },
  {
    topic: "Modern JavaScript (ES6+), Async/Await & DOM",
    level: "Intermediate",
    category: "Web Development",
    description: "Arrow functions, destructuring, promises, async/await, fetch API, modules, closures, and DOM manipulation.",
    estimatedHours: 8,
    prerequisites: ["Modern CSS Grid & Flexbox Layouts"],
    tags: ["JavaScript", "ES6", "Promises", "Async Await", "DOM"],
    order: 3,
    documentation: [
      { title: "MDN Web Docs - JavaScript Guide & Reference", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", provider: "Mozilla MDN", duration: "3h read" },
      { title: "The Modern JavaScript Tutorial Documentation", type: "documentation", url: "https://javascript.info/", provider: "javascript.info", duration: "2.5h read" }
    ],
    resources: [
      { title: "JavaScript Crash Course for Beginners", type: "video", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", provider: "Traversy Media", duration: "2h video" },
      { title: "Wes Bos ES6 for Everyone Guide", type: "tutorial", url: "https://es6.io/", provider: "Wes Bos", duration: "1.5h read" },
      { title: "JavaScript30 30 Day Vanilla JS Challenge", type: "practice", url: "https://javascript30.com/", provider: "Wes Bos", duration: "3h practice" }
    ],
    project: {
      title: "Async Weather & News Dashboard Application",
      difficulty: "Intermediate",
      summary: "Fetch live data from public REST APIs using async/await, handle errors gracefully, and render dynamic DOM updates.",
      keyDeliverables: [
        "Fetch data using native fetch API",
        "Implement dynamic DOM rendering and loading spinners",
        "Store user preferences in localStorage"
      ],
      starterTip: "Wrap async await calls inside try...catch blocks for resilient network error handling."
    },
    topicQuiz: [
      {
        question: "Which keyword is required inside a function to use the await keyword?",
        options: ["async", "defer", "promise", "export"],
        correctIndex: 0,
        explanation: "The await keyword is only permitted inside functions declared with the async modifier."
      }
    ]
  },
  {
    topic: "React.js: Components, Hooks & State Management",
    level: "Intermediate",
    category: "Web Development",
    description: "Component lifecycle, JSX syntax, useState, useEffect, useContext, custom hooks, and React Router navigation.",
    estimatedHours: 10,
    prerequisites: ["Modern JavaScript (ES6+), Async/Await & DOM"],
    tags: ["React", "JSX", "Hooks", "useState", "useEffect"],
    order: 4,
    documentation: [
      { title: "React Official Documentation (react.dev)", type: "documentation", url: "https://react.dev/", provider: "Meta React Team", duration: "3h read" },
      { title: "React API Reference (Hooks & Components)", type: "documentation", url: "https://react.dev/reference/react", provider: "Meta React Team", duration: "2h read" }
    ],
    resources: [
      { title: "Full Stack Open - University of Helsinki React Course", type: "tutorial", url: "https://fullstackopen.com/en/", provider: "University of Helsinki", duration: "4h read" },
      { title: "freeCodeCamp React Course Beginner to Advanced", type: "video", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", provider: "freeCodeCamp", duration: "3.5h video" }
    ],
    project: {
      title: "Interactive Task Kanban Board App in React",
      difficulty: "Intermediate",
      summary: "Build a drag-and-drop Kanban task management web application with multi-column state and persistent storage.",
      keyDeliverables: [
        "Create modular Functional Components with props",
        "Manage state with useState and custom custom hooks",
        "Persist state changes to browser storage via useEffect"
      ],
      starterTip: "Never mutate state directly in React; always return fresh object or array copies."
    },
    topicQuiz: [
      {
        question: "Which hook should be used to execute side effects like data fetching after component rendering?",
        options: ["useState", "useEffect", "useMemo", "useRef"],
        correctIndex: 1,
        explanation: "useEffect handles side effects such as data fetching, subscriptions, and DOM updates."
      }
    ]
  },

  // ==========================================
  // --- 4. DATA SCIENCE & ANALYTICS EXPERT ---
  // ==========================================
  {
    topic: "Data Wrangling & Analysis with Pandas & NumPy",
    level: "Beginner",
    category: "Data Science",
    description: "Data loading, cleaning missing values, merge/join operations, groupby aggregations, and feature transformations.",
    estimatedHours: 8,
    prerequisites: ["Basic Python Syntax"],
    tags: ["Data Science", "Pandas", "NumPy", "Data Wrangling"],
    order: 1,
    documentation: [
      { title: "Pandas Official User Guide & API Documentation", type: "documentation", url: "https://pandas.pydata.org/docs/user_guide/index.html", provider: "Pandas Dev Team", duration: "2.5h read" },
      { title: "NumPy User Guide & Vector Operations Reference", type: "documentation", url: "https://numpy.org/doc/stable/user/", provider: "NumPy.org", duration: "2h read" }
    ],
    resources: [
      { title: "Kaggle Learn - Pandas Micro-Course", type: "practice", url: "https://www.kaggle.com/learn/pandas", provider: "Kaggle", duration: "1.5h practice" },
      { title: "DataCamp Pandas Cheat Sheet for Data Science", type: "doc", url: "https://www.datacamp.com/cheat-sheet/pandas-cheat-sheet-for-data-science-in-python", provider: "DataCamp", duration: "1h read" }
    ],
    project: {
      title: "Financial Transaction Data Cleaning Pipeline",
      difficulty: "Beginner",
      summary: "Clean raw banking transactions data, calculate rolling averages, group spending by category, and detect anomalies.",
      keyDeliverables: [
        "Handle null values with fillna and dropna",
        "Perform groupby aggregations on monthly spending",
        "Export processed output to CSV"
      ],
      starterTip: "Use groupby with agg() to execute multiple aggregate functions simultaneously."
    },
    topicQuiz: [
      {
        question: "In Pandas, which method is used to aggregate data based on grouping keys (similar to SQL GROUP BY)?",
        options: ["df.pivot()", "df.groupby()", "df.merge()", "df.sort_values()"],
        correctIndex: 1,
        explanation: "df.groupby() splits data into groups for computation and aggregation."
      }
    ]
  },
  {
    topic: "Exploratory Data Analysis (EDA) & Visualization",
    level: "Intermediate",
    category: "Data Science",
    description: "Visualizing distributions, correlations, heatmaps, boxplots, and scatter plots using Matplotlib and Seaborn.",
    estimatedHours: 8,
    prerequisites: ["Data Wrangling & Analysis with Pandas & NumPy"],
    tags: ["EDA", "Matplotlib", "Seaborn", "Data Visualization"],
    order: 2,
    documentation: [
      { title: "Matplotlib Official Documentation & Plot Types", type: "documentation", url: "https://matplotlib.org/stable/contents.html", provider: "Matplotlib Development Team", duration: "2h read" },
      { title: "Seaborn Statistical Data Visualization Reference", type: "documentation", url: "https://seaborn.pydata.org/", provider: "Seaborn Project", duration: "2h read" }
    ],
    resources: [
      { title: "Kaggle Data Visualization Interactive Course", type: "practice", url: "https://www.kaggle.com/learn/data-visualization", provider: "Kaggle", duration: "2h practice" },
      { title: "The Python Graph Gallery Chart Examples", type: "doc", url: "https://python-graph-gallery.com/", provider: "Python Graph Gallery", duration: "1h read" }
    ],
    project: {
      title: "Real Estate Housing EDA & Correlation Report",
      difficulty: "Intermediate",
      summary: "Conduct an end-to-end EDA on real estate prices, plotting feature distributions and correlation heatmaps.",
      keyDeliverables: [
        "Generate correlation matrix heatmap using sns.heatmap",
        "Plot house price distributions with boxplots",
        "Identify outlier records"
      ],
      starterTip: "Use log transformation on skewed target variables like house prices for better visual clarity."
    },
    topicQuiz: [
      {
        question: "Which Seaborn function displays a correlation matrix as a color-coded grid?",
        options: ["sns.heatmap()", "sns.barplot()", "sns.pairplot()", "sns.lineplot()"],
        correctIndex: 0,
        explanation: "sns.heatmap() renders 2D matrix data into a color-encoded visualization matrix."
      }
    ]
  },
  {
    topic: "SQL for Data Analytics & Relational Databases",
    level: "Intermediate",
    category: "Data Science",
    description: "SELECT queries, INNER/LEFT JOINs, Window Functions (ROW_NUMBER, RANK), CTEs (WITH clause), and Subqueries.",
    estimatedHours: 10,
    prerequisites: ["Basic Programming Concepts"],
    tags: ["SQL", "PostgreSQL", "Window Functions", "Data Analytics"],
    order: 3,
    documentation: [
      { title: "PostgreSQL SQL Documentation & Syntax Reference", type: "documentation", url: "https://www.postgresql.org/docs/current/sql.html", provider: "PostgreSQL Global Development", duration: "2.5h read" },
      { title: "MySQL Official Reference Manual", type: "documentation", url: "https://dev.mysql.com/doc/", provider: "Oracle MySQL", duration: "2h read" }
    ],
    resources: [
      { title: "SQLBolt Interactive SQL Lessons & Practice", type: "practice", url: "https://sqlbolt.com/", provider: "SQLBolt", duration: "2h practice" },
      { title: "Mode Advanced SQL Tutorial for Data Analysis", type: "tutorial", url: "https://mode.com/sql-tutorial/", provider: "Mode Analytics", duration: "3h read" }
    ],
    project: {
      title: "E-Commerce Customer Cohort Analytics Query Suite",
      difficulty: "Intermediate",
      summary: "Write advanced PostgreSQL queries with CTEs and Window Functions to compute monthly customer retention cohorts.",
      keyDeliverables: [
        "Write Common Table Expressions (CTEs) for customer first purchase date",
        "Calculate monthly retention using window functions",
        "Aggregate revenue per customer segment"
      ],
      starterTip: "Use ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) to isolate first purchases."
    },
    topicQuiz: [
      {
        question: "Which SQL clause creates named temporary result sets for use within a main query?",
        options: ["WITH (CTE)", "HAVING", "GROUP BY", "WHERE"],
        correctIndex: 0,
        explanation: "The WITH clause defines a Common Table Expression (CTE) for structuring modular SQL queries."
      }
    ]
  },

  // ==========================================
  // --- 5. CYBERSECURITY & ETHICAL HACKING ---
  // ==========================================
  {
    topic: "Computer Networking & OSI Model Fundamentals",
    level: "Beginner",
    category: "Cybersecurity",
    description: "OSI 7 Layers, TCP/IP Suite, IP Addressing (IPv4/IPv6), Subnetting, Wireshark packet capture, and DNS/HTTP protocols.",
    estimatedHours: 8,
    prerequisites: ["Basic Computer Literacy"],
    tags: ["Networking", "OSI Model", "TCP/IP", "Wireshark", "Subnetting"],
    order: 1,
    documentation: [
      { title: "IETF Internet Engineering Task Force Official RFCs", type: "documentation", url: "https://www.ietf.org/", provider: "IETF Standards", duration: "2h read" },
      { title: "Wireshark Official Documentation & User Guide", type: "documentation", url: "https://www.wireshark.org/docs/", provider: "Wireshark Foundation", duration: "2h read" }
    ],
    resources: [
      { title: "Professor Messer CompTIA Network+ Full Course", type: "video", url: "https://www.professormesser.com/network-plus/n10-008/n10-008-training-course/", provider: "Professor Messer", duration: "4h video" },
      { title: "NetworkChuck Networking Fundamentals Series", type: "video", url: "https://www.youtube.com/playlist?list=PLIhvCqGJlRX8GKeWTDqp7yQ154lB51O6d", provider: "NetworkChuck", duration: "3h video" }
    ],
    project: {
      title: "Wireshark Network Traffic Analysis & Packet Inspection",
      difficulty: "Beginner",
      summary: "Capture live network traffic in Wireshark, filter HTTP/DNS packets, analyze TCP 3-way handshakes, and inspect headers.",
      keyDeliverables: [
        "Filter packet capture for HTTP GET requests",
        "Inspect TCP SYN, SYN-ACK, ACK handshake frames",
        "Identify unencrypted credential transmission"
      ],
      starterTip: "Use Wireshark filter syntax `http || dns` to isolate web and domain name resolution traffic."
    },
    topicQuiz: [
      {
        question: "Which OSI layer is responsible for end-to-end transport control, segmentation, and port mapping (e.g., TCP, UDP)?",
        options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"],
        correctIndex: 2,
        explanation: "Layer 4 (Transport Layer) handles segmentation, port numbers, TCP connections, and UDP packets."
      }
    ]
  },
  {
    topic: "Web Application Security & OWASP Top 10",
    level: "Intermediate",
    category: "Cybersecurity",
    description: "SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, Authentication Bypass, Broken Access Control, and Burp Suite.",
    estimatedHours: 10,
    prerequisites: ["Computer Networking & OSI Model Fundamentals"],
    tags: ["Cybersecurity", "OWASP Top 10", "XSS", "SQLi", "Burp Suite"],
    order: 2,
    documentation: [
      { title: "OWASP Top 10 Vulnerabilities Official Documentation", type: "documentation", url: "https://owasp.org/Top10/", provider: "OWASP Foundation", duration: "2.5h read" },
      { title: "PortSwigger Web Security Academy Documentation", type: "documentation", url: "https://portswigger.net/web-security", provider: "PortSwigger / Burp Suite", duration: "3h read" }
    ],
    resources: [
      { title: "PortSwigger Interactive Web Security Labs", type: "practice", url: "https://portswigger.net/web-security/all-labs", provider: "PortSwigger", duration: "3h practice" },
      { title: "TryHackMe Cyber Security Hands-on Labs", type: "practice", url: "https://tryhackme.com/", provider: "TryHackMe", duration: "3h practice" }
    ],
    project: {
      title: "DVWA Vulnerability Auditing & Patching",
      difficulty: "Intermediate",
      summary: "Set up Damn Vulnerable Web Application (DVWA), intercept requests with Burp Suite, exploit SQLi, and patch PHP code.",
      keyDeliverables: [
        "Intercept HTTP POST requests using Burp Proxy",
        "Exploit SQL Injection parameter to extract database table names",
        "Remediate vulnerability using Prepared Statements"
      ],
      starterTip: "Always use parameterized queries (PDO / Prepared Statements) to mitigate SQL injection."
    },
    topicQuiz: [
      {
        question: "Which defense mechanism prevents SQL Injection vulnerabilities effectively?",
        options: ["Parameterized Queries / Prepared Statements", "Disabling JavaScript", "Using HTTPS", "Increasing Firewall Timeout"],
        correctIndex: 0,
        explanation: "Parameterized queries treat user input strictly as literal values rather than executable SQL command strings."
      }
    ]
  }
];

module.exports = sampleTopics;
