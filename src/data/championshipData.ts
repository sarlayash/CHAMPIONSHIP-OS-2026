import { Team, Participant, Badge, AwardItem, RubricCriterion, ChampionshipSettings, CertificateRecord } from '../types';

export const INITIAL_SETTINGS: ChampionshipSettings = {
  name: "India's Most Comprehensive 13-Day Java DSA Championship 2026",
  shortName: "Java DSA Championship 2026",
  theme: "13-Day Java DSA & Hackathon Championship",
  university: "Sapthgiri NPS University",
  poweredBy: "Industry Oriented Training (IOT) Powered By Kapil",
  directorName: "Kapil Narula",
  directorTitle: "Program Director & Lead Technical Mentor",
  deanName: "Dr. K. R. Sharma",
  deanTitle: "Dean, Faculty of Engineering & Technology",
  vcName: "Dr. M. Venkatesh",
  vcTitle: "Vice Chancellor, Sapthgiri NPS University",
  motto: "Code Every Day. Compete Every Day. Improve Every Day.",
  vision: "To transform aspiring programmers into industry-ready software engineers through 13 days of continuous Java DSA learning, live coding, assessments, quizzes, debugging challenges, teamwork, personal branding, and a Grand Finale Hackathon—fostering technical excellence, innovation, collaboration, and professional growth.",
  startDate: "February 10, 2026",
  endDate: "February 22, 2026",
  totalLearners: 56,
  totalTeams: 10,
  verificationBaseUrl: "https://championshipos.verify.edu/cert/",
};

export const TEAMS_DATA: Team[] = [
  {
    id: "team-toxicos",
    name: "Toxicos",
    rank: 1,
    totalPoints: 233878,
    leaderId: "p-01",
    leaderName: "Aarav Sharma",
    memberCount: 6,
    code: "TOX-2026",
    projectTitle: "Distributed Graph Routing Engine in Core Java",
    projectDescription: "High-throughput in-memory graph traversal with custom concurrency primitives, achieving 1.2M queries/sec for hyper-scale logistics routing.",
    githubUrl: "https://github.com/toxicos-champions/graph-engine",
    demoVideoUrl: "https://youtube.com/watch?v=demo-toxicos",
    pptUrl: "https://storage.googleapis.com/championship/toxicos-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/toxicos-technical-report.pdf",
    stageScores: {
      learningLeague: 54914,
      codingBattle: 51750,
      quizKahoot: 45714,
      hackathonFinale: 81500
    },
    rubricScore: 98.4,
    judgeFeedback: "Exceptional mastery of Java Concurrency utilities and custom memory pooling. Outstanding pitch delivery and benchmarked proof.",
    awardedTitles: ["Champion Team 2026", "Best Technical Solution"]
  },
  {
    id: "team-techtok",
    name: "TechTok",
    rank: 2,
    totalPoints: 229488,
    leaderId: "p-07",
    leaderName: "Sneha Reddy",
    memberCount: 6,
    code: "TTK-2026",
    projectTitle: "Algorithmic Order-Book Matching Engine",
    projectDescription: "Lock-free FIFO order-matching pipeline implementing Red-Black Trees and Circular Ring Buffers in pure Java with sub-microsecond latency.",
    githubUrl: "https://github.com/techtok-devs/order-matching-engine",
    demoVideoUrl: "https://youtube.com/watch?v=demo-techtok",
    pptUrl: "https://storage.googleapis.com/championship/techtok-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/techtok-report.pdf",
    stageScores: {
      learningLeague: 53714,
      codingBattle: 99921,
      quizKahoot: 34126,
      hackathonFinale: 41727
    },
    rubricScore: 96.8,
    judgeFeedback: "Deep understanding of cache-line alignment and bit manipulation. Beautiful documentation and live stress-test demonstration.",
    awardedTitles: ["First Runner-Up Team", "Best Innovation Team"]
  },
  {
    id: "team-triple-bytes",
    name: "Triple Bytes",
    rank: 3,
    totalPoints: 224993,
    leaderId: "p-13",
    leaderName: "Rohan Kulkarni",
    memberCount: 6,
    code: "TBY-2026",
    projectTitle: "Dynamic Programming Gene Sequence Alignment Suite",
    projectDescription: "Parallelized Needleman-Wunsch & Smith-Waterman genomic analyzer with space-optimized banded matrices in Java 21.",
    githubUrl: "https://github.com/triplebytes/gene-align-dsa",
    demoVideoUrl: "https://youtube.com/watch?v=demo-triplebytes",
    pptUrl: "https://storage.googleapis.com/championship/triplebytes-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/triplebytes-report.pdf",
    stageScores: {
      learningLeague: 45714,
      codingBattle: 111290,
      quizKahoot: 34785,
      hackathonFinale: 33204
    },
    rubricScore: 94.5,
    judgeFeedback: "Superb algorithmic rigor and mathematical precision. Flawless handling of edge cases and memory footprints.",
    awardedTitles: ["Second Runner-Up Team", "Best Project Demonstration"]
  },
  {
    id: "team-shenex",
    name: "Shenex",
    rank: 4,
    totalPoints: 197377,
    leaderId: "p-19",
    leaderName: "Priyanka Nair",
    memberCount: 6,
    code: "SHX-2026",
    projectTitle: "LSM-Tree Key-Value Storage Engine with Bloom Filters",
    projectDescription: "Persistent LSM-Tree storage with SSTables, MemTables, and BitSet Bloom filters crafted from scratch in Java.",
    githubUrl: "https://github.com/shenex-core/lsm-engine",
    demoVideoUrl: "https://youtube.com/watch?v=demo-shenex",
    pptUrl: "https://storage.googleapis.com/championship/shenex-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/shenex-report.pdf",
    stageScores: {
      learningLeague: 47223,
      codingBattle: 74891,
      quizKahoot: 41910,
      hackathonFinale: 33353
    },
    rubricScore: 92.1,
    judgeFeedback: "Impressive systems programming in Java. Compaction strategy was clean and resilient under continuous randomized writes.",
    awardedTitles: ["Best Industry Impact"]
  },
  {
    id: "team-apex",
    name: "Apex",
    rank: 5,
    totalPoints: 179131,
    leaderId: "p-25",
    leaderName: "Vikramaditya Joshi",
    memberCount: 6,
    code: "APX-2026",
    projectTitle: "Trie-Based High-Frequency Spell & Syntax Autocomplete",
    projectDescription: "Compressed Radix/Trie architecture supporting Levenshtein distance fuzzy-search for coding IDE integration.",
    githubUrl: "https://github.com/apex-coders/trie-autocomplete",
    demoVideoUrl: "https://youtube.com/watch?v=demo-apex",
    pptUrl: "https://storage.googleapis.com/championship/apex-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/apex-report.pdf",
    stageScores: {
      learningLeague: 19119,
      codingBattle: 82250,
      quizKahoot: 48147,
      hackathonFinale: 29615
    },
    rubricScore: 89.7,
    judgeFeedback: "Great practical utility. Code was clean, modular, and followed SOLID principles rigorously.",
    awardedTitles: ["Best Problem Statement"]
  },
  {
    id: "team-mad",
    name: "Mad",
    rank: 6,
    totalPoints: 167844,
    leaderId: "p-31",
    leaderName: "Divya Bharathi",
    memberCount: 6,
    code: "MAD-2026",
    projectTitle: "Huffman & LZW Dynamic Adaptive Lossless Compressor",
    projectDescription: "Dynamic priority queue Huffman Tree generator with custom bitwise byte streaming and variable-length encoding.",
    githubUrl: "https://github.com/mad-hackers/java-compression",
    demoVideoUrl: "https://youtube.com/watch?v=demo-mad",
    pptUrl: "https://storage.googleapis.com/championship/mad-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/mad-report.pdf",
    stageScores: {
      learningLeague: 17796,
      codingBattle: 65720,
      quizKahoot: 81418,
      hackathonFinale: 2910
    },
    rubricScore: 87.2,
    judgeFeedback: "Fantastic quiz mastery and bitstream manipulation. High collaborative energy demonstrated throughout the 13 days.",
    awardedTitles: ["Best Team Collaboration"]
  },
  {
    id: "team-byte-force",
    name: "Byte Force",
    rank: 7,
    totalPoints: 118093,
    leaderId: "p-37",
    leaderName: "Karthik Verma",
    memberCount: 5,
    code: "BYF-2026",
    projectTitle: "Spatial Quadtree Collision & Proximity Detector",
    projectDescription: "Recursive 2D spatial partitioning QuadTree engine for gaming and spatial search with bounding-box query acceleration.",
    githubUrl: "https://github.com/byteforce/quadtree-engine",
    demoVideoUrl: "https://youtube.com/watch?v=demo-byteforce",
    pptUrl: "https://storage.googleapis.com/championship/byteforce-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/byteforce-report.pdf",
    stageScores: {
      learningLeague: 18476,
      codingBattle: 61750,
      quizKahoot: 14829,
      hackathonFinale: 23038
    },
    rubricScore: 85.0,
    judgeFeedback: "Strong visualization and spatial indexing. Great teamwork and clear presentation structure.",
    awardedTitles: ["People's Choice Team"]
  },
  {
    id: "team-veltrion",
    name: "Veltrion",
    rank: 8,
    totalPoints: 101602,
    leaderId: "p-42",
    leaderName: "Ananya Deshmukh",
    memberCount: 5,
    code: "VLT-2026",
    projectTitle: "Disjoint-Set (Union-Find) Dynamic Network Connectivity",
    projectDescription: "Path compression & rank-based Kruskal's Minimum Spanning Tree visualizer for smart grid power transmission topologies.",
    githubUrl: "https://github.com/veltrion-dev/network-dsu",
    demoVideoUrl: "https://youtube.com/watch?v=demo-veltrion",
    pptUrl: "https://storage.googleapis.com/championship/veltrion-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/veltrion-report.pdf",
    stageScores: {
      learningLeague: 17101,
      codingBattle: 16750,
      quizKahoot: 40847,
      hackathonFinale: 26904
    },
    rubricScore: 83.4,
    judgeFeedback: "Solid execution of graph theory and disjoint-set optimization. Demonstrated high consistency in daily challenges.",
    awardedTitles: ["Consistency Honors"]
  },
  {
    id: "team-backbenchers",
    name: "Backbenchers",
    rank: 9,
    totalPoints: 62400,
    leaderId: "p-47",
    leaderName: "Harsh Vardhan",
    memberCount: 5,
    code: "BKB-2026",
    projectTitle: "Min-Heap & Dijkstra Real-Time Transit Navigator",
    projectDescription: "Multi-modal transit pathfinder implementing indexed binary heaps and shortest path routing with live congestion weights.",
    githubUrl: "https://github.com/backbenchers-code/transit-pathfinder",
    demoVideoUrl: "https://youtube.com/watch?v=demo-backbenchers",
    pptUrl: "https://storage.googleapis.com/championship/backbenchers-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/backbenchers-report.pdf",
    stageScores: {
      learningLeague: 5400,
      codingBattle: 51750,
      quizKahoot: 2500,
      hackathonFinale: 2750
    },
    rubricScore: 81.6,
    judgeFeedback: "Tremendous leap forward in algorithmic speed during the final 48 hours. Inspiring perseverance and comeback spirit.",
    awardedTitles: ["Most Improved Team Spirit"]
  },
  {
    id: "team-brahmastra",
    name: "Brahmastra",
    rank: 10,
    totalPoints: 53620,
    leaderId: "p-52",
    leaderName: "Meera Krishnan",
    memberCount: 5,
    code: "BHM-2026",
    projectTitle: "Sliding Window & Two-Pointer High-Throughput Stream Analytics",
    projectDescription: "Real-time stream rolling-window statistics calculator maintaining amortized O(1) time complexity with Deque structures.",
    githubUrl: "https://github.com/brahmastra-devs/stream-window-dsa",
    demoVideoUrl: "https://youtube.com/watch?v=demo-brahmastra",
    pptUrl: "https://storage.googleapis.com/championship/brahmastra-presentation.pdf",
    reportUrl: "https://storage.googleapis.com/championship/brahmastra-report.pdf",
    stageScores: {
      learningLeague: 1500,
      codingBattle: 34569,
      quizKahoot: 15806,
      hackathonFinale: 1745
    },
    rubricScore: 80.0,
    judgeFeedback: "Clean functional Java implementation and thorough unit test coverage with JUnit 5. Showcased strong fundamentals.",
    awardedTitles: ["Foundational Resilience Award"]
  }
];

export const BADGES_DATA: Badge[] = [
  {
    id: "badge-gold",
    name: "Gold Badge",
    tier: "gold",
    icon: "🥇",
    description: "Top 5% score across 13 days of coding challenges.",
    criteria: "Score > 40,000 individual points"
  },
  {
    id: "badge-silver",
    name: "Silver Badge",
    tier: "silver",
    icon: "🥈",
    description: "Top 15% overall score in championship track.",
    criteria: "Score > 30,000 individual points"
  },
  {
    id: "badge-bronze",
    name: "Bronze Badge",
    tier: "bronze",
    icon: "🥉",
    description: "Consistent high scoring across all 13 days.",
    criteria: "Score > 20,000 individual points"
  },
  {
    id: "badge-top-performer",
    name: "Top Performer",
    tier: "special",
    icon: "⭐",
    description: "Earned highest rating in daily battle rounds.",
    criteria: "Ranked #1 in 3 or more daily sprints"
  },
  {
    id: "badge-rising-star",
    name: "Rising Star",
    tier: "special",
    icon: "🔥",
    description: "Demonstrated most rapid acceleration in rank.",
    criteria: "Rank leap of > 15 positions in 48 hours"
  },
  {
    id: "badge-fast-finisher",
    name: "Fast Finisher",
    tier: "special",
    icon: "⚡",
    description: "Submitted zero-error solutions within first 15 mins.",
    criteria: "Speed coding submissions verified"
  },
  {
    id: "badge-smart-solver",
    name: "Smart Solver",
    tier: "special",
    icon: "🧠",
    description: "Achieved optimal O(N) time and O(1) auxiliary space.",
    criteria: "Selected for best algorithmic elegance"
  },
  {
    id: "badge-excellence",
    name: "Excellence Badge",
    tier: "gold",
    icon: "💎",
    description: "Demonstrated professional software engineering standard.",
    criteria: "100% clean code, docstrings & design patterns"
  },
  {
    id: "badge-precision-coder",
    name: "Precision Coder",
    tier: "special",
    icon: "🎯",
    description: "100% test case pass rate on first submission.",
    criteria: "Zero runtime exceptions or edge-case fails"
  },
  {
    id: "badge-growth",
    name: "Growth Badge",
    tier: "bronze",
    icon: "🚀",
    description: "Consistent daily participation and reflection journal.",
    criteria: "13 consecutive daily LinkedIn learning posts"
  }
];

export const AWARDS_DATA: AwardItem[] = [
  // Championship Titles (Individual)
  { id: "ct-1", title: "Java DSA Champion 2026", category: "championship_title", icon: "🏆", description: "Highest ranked overall learner across all 13 days of coding, quizzes, and hackathon.", recipientName: "Aarav Sharma", teamName: "Toxicos" },
  { id: "ct-2", title: "Java DSA Vice Champion", category: "championship_title", icon: "🥈", description: "2nd highest overall scoring learner with stellar algorithmic performance.", recipientName: "Sneha Reddy", teamName: "TechTok" },
  { id: "ct-3", title: "Java DSA Elite Performer", category: "championship_title", icon: "🥉", description: "3rd highest overall scoring learner with continuous podium finishes.", recipientName: "Rohan Kulkarni", teamName: "Triple Bytes" },
  { id: "ct-4", title: "Platinum Performer", category: "championship_title", icon: "💎", description: "Maintained >95% accuracy across all complex tree and dynamic programming challenges.", recipientName: "Priyanka Nair", teamName: "Shenex" },
  { id: "ct-5", title: "Gold Performer", category: "championship_title", icon: "🥇", description: "Flawless score streak in advanced graph traversal and backtracking tracks.", recipientName: "Vikramaditya Joshi", teamName: "Apex" },
  { id: "ct-6", title: "Silver Performer", category: "championship_title", icon: "🥈", description: "Exceptional speed and precision in memory optimization rounds.", recipientName: "Divya Bharathi", teamName: "Mad" },
  { id: "ct-7", title: "Bronze Performer", category: "championship_title", icon: "🥉", description: "Outstanding perseverance and high performance across all 13 modules.", recipientName: "Karthik Verma", teamName: "Byte Force" },
  { id: "ct-8", title: "Hall of Fame Inductee", category: "championship_title", icon: "⭐", description: "Permanent recognition for highest overall contributions and peer leadership.", recipientName: "Aarav Sharma", teamName: "Toxicos" },

  // Technical Excellence Awards (Individual)
  { id: "te-1", title: "Speed Coding Champion", category: "technical", icon: "⚡", description: "Fastest execution time for hard-tier algorithmic problems.", recipientName: "Aditya Hegde", teamName: "Toxicos" },
  { id: "te-2", title: "Logic Master", category: "technical", icon: "🧠", description: "Highest score in complex logic, bitmasking, and math riddles.", recipientName: "Varun Shenoy", teamName: "TechTok" },
  { id: "te-3", title: "Problem Solving Champion", category: "technical", icon: "🎯", description: "Solved maximum hard-level algorithmic problems with zero hints.", recipientName: "Ananya Deshmukh", teamName: "Veltrion" },
  { id: "te-4", title: "Debugging Champion", category: "technical", icon: "🐞", description: "Resolved convoluted multi-threaded concurrency bugs in record time.", recipientName: "Nikhil Rao", teamName: "Shenex" },
  { id: "te-5", title: "Algorithm Architect", category: "technical", icon: "📊", description: "Best design of custom data structures and abstract data types.", recipientName: "Tanvi Saxena", teamName: "Apex" },
  { id: "te-6", title: "DSA Pattern Master", category: "technical", icon: "🧩", description: "Mastery over sliding windows, two pointers, and monotonic queues.", recipientName: "Rahul Menon", teamName: "Triple Bytes" },
  { id: "te-7", title: "Code Optimization Expert", category: "technical", icon: "🔍", description: "Reduced memory consumption and time complexity to absolute theoretical limits.", recipientName: "Meera Krishnan", teamName: "Brahmastra" },
  { id: "te-8", title: "Java Fundamentals Master", category: "technical", icon: "☕", description: "100% score in Java memory model, JVM internals, and garbage collection quizzes.", recipientName: "Sanjay Patel", teamName: "Mad" },
  { id: "te-9", title: "Industry Ready Engineer", category: "technical", icon: "🚀", description: "Code adherence to corporate clean architecture and production patterns.", recipientName: "Kavya Murthy", teamName: "Toxicos" },
  { id: "te-10", title: "Coding Excellence Award", category: "technical", icon: "💎", description: "Highest aggregate coding benchmark score over 13 consecutive days.", recipientName: "Harsh Vardhan", teamName: "Backbenchers" },

  // Performance Excellence Awards
  { id: "pe-1", title: "Most Improved Performer", category: "performance", icon: "📈", description: "Greatest progression in points from Day 1 to Day 13.", recipientName: "Deepak Soni", teamName: "Backbenchers" },
  { id: "pe-2", title: "Consistency Champion", category: "performance", icon: "🔥", description: "Never missed a single submission deadline across all 13 days.", recipientName: "Pooja Hegde", teamName: "Veltrion" },
  { id: "pe-3", title: "Fastest Learner", category: "performance", icon: "⚡", description: "Mastered advanced tree algorithms in the shortest turnaround.", recipientName: "Gaurav Bhat", teamName: "Byte Force" },
  { id: "pe-4", title: "Outstanding Performer", category: "performance", icon: "🌟", description: "Ranked in the top 10% on every single daily assessment.", recipientName: "Manoj Kumar", teamName: "TechTok" },
  { id: "pe-5", title: "Never Give Up Award", category: "performance", icon: "💪", description: "Demonstrated remarkable grit overcoming difficult debugging hurdles.", recipientName: "Swati Iyer", teamName: "Brahmastra" },
  { id: "pe-6", title: "Perfect Attendance Champion", category: "performance", icon: "📋", description: "100% attendance across all morning theory and evening hands-on labs.", recipientName: "Neha Chawla", teamName: "Triple Bytes" },
  { id: "pe-7", title: "Punctuality Excellence Award", category: "performance", icon: "⏰", description: "First to check-in and submit on every session of the championship.", recipientName: "Arjun Das", teamName: "Shenex" },

  // Leadership & Professional Awards
  { id: "lp-1", title: "Team Leader of the Championship", category: "leadership", icon: "👑", description: "Exemplary guidance, mentoring, and coordination of championship-winning team.", recipientName: "Aarav Sharma", teamName: "Toxicos" },
  { id: "lp-2", title: "Best Team Player", category: "leadership", icon: "🤝", description: "Consistently supported peers and unblocked teammate challenges.", recipientName: "Shreya Ghoshal", teamName: "TechTok" },
  { id: "lp-3", title: "Innovation Catalyst", category: "leadership", icon: "💡", description: "Pioneered novel architectural approaches during the Grand Finale Hackathon.", recipientName: "Rohan Kulkarni", teamName: "Triple Bytes" },
  { id: "lp-4", title: "Peer Mentor Award", category: "leadership", icon: "🌟", description: "Voted by fellow learners as the most helpful peer tutor.", recipientName: "Vikramaditya Joshi", teamName: "Apex" },
  { id: "lp-5", title: "Collaboration Champion", category: "leadership", icon: "🎯", description: "Fostered seamless inter-team communication and code reviews.", recipientName: "Divya Bharathi", teamName: "Mad" },
  { id: "lp-6", title: "LinkedIn Trendsetter", category: "leadership", icon: "🌐", description: "Top engagement and viral reach on daily championship learnings.", recipientName: "Sneha Reddy", teamName: "TechTok" },
  { id: "lp-7", title: "Professional Branding Champion", category: "leadership", icon: "📢", description: "Impeccable technical portfolio, GitHub documentation, and personal brand.", recipientName: "Priyanka Nair", teamName: "Shenex" },
  { id: "lp-8", title: "Best Learning Reflection", category: "leadership", icon: "🎥", description: "Most insightful and articulate daily engineering reflection journals.", recipientName: "Ananya Deshmukh", teamName: "Veltrion" },
  { id: "lp-9", title: "Best Championship Journey", category: "leadership", icon: "📸", description: "Documented the full transformation journey with inspiring authenticity.", recipientName: "Karthik Verma", teamName: "Byte Force" },
  { id: "lp-10", title: "Technical Content Creator", category: "leadership", icon: "✍️", description: "Penned high-value technical articles breaking down complex DSA topics.", recipientName: "Meera Krishnan", teamName: "Brahmastra" },

  // Championship Competition Awards
  { id: "cc-1", title: "Kahoot Champion", category: "competition", icon: "🏆", description: "Undefeated champion across all live Kahoot speed trivia matches.", recipientName: "Tarun Bajaj", teamName: "Toxicos" },
  { id: "cc-2", title: "Daily Coding Battle Champion", category: "competition", icon: "⚔️", description: "Highest aggregate points won in 1-on-1 daily coding battle brackets.", recipientName: "Sneha Reddy", teamName: "TechTok" },
  { id: "cc-3", title: "Daily Quiz Champion", category: "competition", icon: "🎯", description: "Highest cumulative accuracy across daily Java conceptual quizzes.", recipientName: "Divya Bharathi", teamName: "Mad" },
  { id: "cc-4", title: "Live Coding Champion", category: "competition", icon: "💻", description: "Live coded solutions on the main stage before judges with zero compilation errors.", recipientName: "Rohan Kulkarni", teamName: "Triple Bytes" },
  { id: "cc-5", title: "Challenge Master", category: "competition", icon: "🧩", description: "Completed all bonus weekend algorithmic boss challenges.", recipientName: "Aarav Sharma", teamName: "Toxicos" },

  // Team Championship Awards (10 Teams)
  { id: "tc-1", title: "Champion Team", category: "team", icon: "🏆", description: "Overall Champions of the 13-Day Java DSA Championship 2026.", teamName: "Toxicos" },
  { id: "tc-2", title: "First Runner-Up Team", category: "team", icon: "🥈", description: "2nd place in overall championship points and hackathon score.", teamName: "TechTok" },
  { id: "tc-3", title: "Second Runner-Up Team", category: "team", icon: "🥉", description: "3rd place in overall championship points and hackathon score.", teamName: "Triple Bytes" },
  { id: "tc-4", title: "Best Innovation Team", category: "team", icon: "💡", description: "Most inventive and groundbreaking algorithmic architecture.", teamName: "TechTok" },
  { id: "tc-5", title: "Best Technical Solution", category: "team", icon: "💻", description: "Exceptional code quality, concurrency handling, and performance metrics.", teamName: "Toxicos" },
  { id: "tc-6", title: "Best Project Demonstration", category: "team", icon: "🎤", description: "Most persuasive, polished, and comprehensive live stage demo.", teamName: "Triple Bytes" },
  { id: "tc-7", title: "Best Industry Impact", category: "team", icon: "🚀", description: "Solution with highest commercial relevance and production readiness.", teamName: "Shenex" },
  { id: "tc-8", title: "Best Problem Statement", category: "team", icon: "🎯", description: "Most rigorous, challenging, and well-framed engineering scope.", teamName: "Apex" },
  { id: "tc-9", title: "Best Team Collaboration", category: "team", icon: "🤝", description: "Supreme coordination, git workflow discipline, and peer synergy.", teamName: "Mad" },
  { id: "tc-10", title: "People's Choice Team", category: "team", icon: "⭐", description: "Voted favorite project and presentation by the cohort.", teamName: "Byte Force" }
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  { id: "rb-1", name: "Technical Depth & Complexity", description: "Algorithmic elegance, time/space complexity optimization, data structure choice.", weight: 25, maxScore: 25 },
  { id: "rb-2", name: "Code Quality & Architecture", description: "Clean code, SOLID principles, proper OOP encapsulation, zero memory leaks.", weight: 20, maxScore: 20 },
  { id: "rb-3", name: "Innovation & Creativity", description: "Novelty of the solution, original application of DSA in modern systems.", weight: 15, maxScore: 15 },
  { id: "rb-4", name: "Live Demonstration & Working Prototype", description: "End-to-end functionality, benchmark tests, stress-testing under load.", weight: 15, maxScore: 15 },
  { id: "rb-5", name: "Presentation & Communication", description: "Clarity of delivery, slide deck quality, answering judges' probing queries.", weight: 15, maxScore: 15 },
  { id: "rb-6", name: "Documentation & Industry Readiness", description: "README, architecture diagrams, benchmark graphs, deployment guide.", weight: 10, maxScore: 10 }
];

// Helper to generate 56 realistic student learners across the 10 teams
const STUDENT_PROFILES = [
  // Team 1: Toxicos (6 members)
  { name: "Aarav Sharma", email: "aarav.sharma@sapthgiri.edu.in", usn: "1SN22CS001", teamId: "team-toxicos", teamName: "Toxicos", isLeader: true, points: 48920, rank: 1, attendance: 100, award: "Java DSA Champion 2026" },
  { name: "Kavya Murthy", email: "kavya.m@sapthgiri.edu.in", usn: "1SN22CS002", teamId: "team-toxicos", teamName: "Toxicos", isLeader: false, points: 42100, rank: 4, attendance: 98, award: "Industry Ready Engineer" },
  { name: "Aditya Hegde", email: "aditya.h@sapthgiri.edu.in", usn: "1SN22CS003", teamId: "team-toxicos", teamName: "Toxicos", isLeader: false, points: 41250, rank: 6, attendance: 96, award: "Speed Coding Champion" },
  { name: "Tarun Bajaj", email: "tarun.b@sapthgiri.edu.in", usn: "1SN22CS004", teamId: "team-toxicos", teamName: "Toxicos", isLeader: false, points: 36800, rank: 12, attendance: 97, award: "Kahoot Champion" },
  { name: "Isha Sundaram", email: "isha.s@sapthgiri.edu.in", usn: "1SN22CS005", teamId: "team-toxicos", teamName: "Toxicos", isLeader: false, points: 34200, rank: 17, attendance: 95, award: "Smart Solver" },
  { name: "Rishi Chander", email: "rishi.c@sapthgiri.edu.in", usn: "1SN22CS006", teamId: "team-toxicos", teamName: "Toxicos", isLeader: false, points: 30608, rank: 24, attendance: 94, award: "Precision Coder" },

  // Team 2: TechTok (6 members)
  { name: "Sneha Reddy", email: "sneha.r@sapthgiri.edu.in", usn: "1SN22CS007", teamId: "team-techtok", teamName: "TechTok", isLeader: true, points: 47850, rank: 2, attendance: 100, award: "Java DSA Vice Champion" },
  { name: "Varun Shenoy", email: "varun.s@sapthgiri.edu.in", usn: "1SN22CS008", teamId: "team-techtok", teamName: "TechTok", isLeader: false, points: 43200, rank: 3, attendance: 99, award: "Logic Master" },
  { name: "Manoj Kumar", email: "manoj.k@sapthgiri.edu.in", usn: "1SN22CS009", teamId: "team-techtok", teamName: "TechTok", isLeader: false, points: 39400, rank: 8, attendance: 98, award: "Outstanding Performer" },
  { name: "Shreya Ghoshal", email: "shreya.g@sapthgiri.edu.in", usn: "1SN22CS010", teamId: "team-techtok", teamName: "TechTok", isLeader: false, points: 36100, rank: 14, attendance: 96, award: "Best Team Player" },
  { name: "Chirag Singhal", email: "chirag.s@sapthgiri.edu.in", usn: "1SN22CS011", teamId: "team-techtok", teamName: "TechTok", isLeader: false, points: 33400, rank: 19, attendance: 94, award: "Fast Finisher" },
  { name: "Anil Kulkarni", email: "anil.k@sapthgiri.edu.in", usn: "1SN22CS012", teamId: "team-techtok", teamName: "TechTok", isLeader: false, points: 29538, rank: 27, attendance: 92, award: "Rising Star" },

  // Team 3: Triple Bytes (6 members)
  { name: "Rohan Kulkarni", email: "rohan.k@sapthgiri.edu.in", usn: "1SN22CS013", teamId: "team-triple-bytes", teamName: "Triple Bytes", isLeader: true, points: 46900, rank: 3, attendance: 100, award: "Java DSA Elite Performer" },
  { name: "Rahul Menon", email: "rahul.m@sapthgiri.edu.in", usn: "1SN22CS014", teamId: "team-triple-bytes", teamName: "Triple Bytes", isLeader: false, points: 41800, rank: 5, attendance: 99, award: "DSA Pattern Master" },
  { name: "Neha Chawla", email: "neha.c@sapthgiri.edu.in", usn: "1SN22CS015", teamId: "team-triple-bytes", teamName: "Triple Bytes", isLeader: false, points: 38700, rank: 9, attendance: 100, award: "Perfect Attendance Champion" },
  { name: "Abhishek Pai", email: "abhishek.p@sapthgiri.edu.in", usn: "1SN22CS016", teamId: "team-triple-bytes", teamName: "Triple Bytes", isLeader: false, points: 35200, rank: 15, attendance: 95, award: "Innovation Catalyst" },
  { name: "Bhavana Rao", email: "bhavana.r@sapthgiri.edu.in", usn: "1SN22CS017", teamId: "team-triple-bytes", teamName: "Triple Bytes", isLeader: false, points: 32100, rank: 21, attendance: 93, award: "Precision Coder" },
  { name: "Chetan Jain", email: "chetan.j@sapthgiri.edu.in", usn: "1SN22CS018", teamId: "team-triple-bytes", teamName: "Triple Bytes", isLeader: false, points: 30293, rank: 25, attendance: 94, award: "Growth Badge" },

  // Team 4: Shenex (6 members)
  { name: "Priyanka Nair", email: "priyanka.n@sapthgiri.edu.in", usn: "1SN22CS019", teamId: "team-shenex", teamName: "Shenex", isLeader: true, points: 41500, rank: 7, attendance: 99, award: "Platinum Performer" },
  { name: "Nikhil Rao", email: "nikhil.r@sapthgiri.edu.in", usn: "1SN22CS020", teamId: "team-shenex", teamName: "Shenex", isLeader: false, points: 37900, rank: 11, attendance: 97, award: "Debugging Champion" },
  { name: "Arjun Das", email: "arjun.d@sapthgiri.edu.in", usn: "1SN22CS021", teamId: "team-shenex", teamName: "Shenex", isLeader: false, points: 34800, rank: 16, attendance: 100, award: "Punctuality Excellence Award" },
  { name: "Tanmay Bhat", email: "tanmay.b@sapthgiri.edu.in", usn: "1SN22CS022", teamId: "team-shenex", teamName: "Shenex", isLeader: false, points: 31200, rank: 23, attendance: 94, award: "Professional Branding Champion" },
  { name: "Divyesh Patel", email: "divyesh.p@sapthgiri.edu.in", usn: "1SN22CS023", teamId: "team-shenex", teamName: "Shenex", isLeader: false, points: 28400, rank: 30, attendance: 92, award: "Smart Solver" },
  { name: "Simran Kaur", email: "simran.k@sapthgiri.edu.in", usn: "1SN22CS024", teamId: "team-shenex", teamName: "Shenex", isLeader: false, points: 23577, rank: 37, attendance: 91, award: "Excellence Badge" },

  // Team 5: Apex (6 members)
  { name: "Vikramaditya Joshi", email: "vikram.j@sapthgiri.edu.in", usn: "1SN22CS025", teamId: "team-apex", teamName: "Apex", isLeader: true, points: 38200, rank: 10, attendance: 98, award: "Gold Performer" },
  { name: "Tanvi Saxena", email: "tanvi.s@sapthgiri.edu.in", usn: "1SN22CS026", teamId: "team-apex", teamName: "Apex", isLeader: false, points: 36400, rank: 13, attendance: 97, award: "Algorithm Architect" },
  { name: "Pranav Pillai", email: "pranav.p@sapthgiri.edu.in", usn: "1SN22CS027", teamId: "team-apex", teamName: "Apex", isLeader: false, points: 31800, rank: 22, attendance: 95, award: "Peer Mentor Award" },
  { name: "Akash Deep", email: "akash.d@sapthgiri.edu.in", usn: "1SN22CS028", teamId: "team-apex", teamName: "Apex", isLeader: false, points: 27900, rank: 31, attendance: 92, award: "Fast Finisher" },
  { name: "Monika Sen", email: "monika.s@sapthgiri.edu.in", usn: "1SN22CS029", teamId: "team-apex", teamName: "Apex", isLeader: false, points: 24500, rank: 35, attendance: 90, award: "Rising Star" },
  { name: "Siddharth Roy", email: "siddharth.r@sapthgiri.edu.in", usn: "1SN22CS030", teamId: "team-apex", teamName: "Apex", isLeader: false, points: 20331, rank: 41, attendance: 89, award: "Growth Badge" },

  // Team 6: Mad (6 members)
  { name: "Divya Bharathi", email: "divya.b@sapthgiri.edu.in", usn: "1SN22CS031", teamId: "team-mad", teamName: "Mad", isLeader: true, points: 37500, rank: 12, attendance: 98, award: "Silver Performer" },
  { name: "Sanjay Patel", email: "sanjay.p@sapthgiri.edu.in", usn: "1SN22CS032", teamId: "team-mad", teamName: "Mad", isLeader: false, points: 33900, rank: 18, attendance: 96, award: "Java Fundamentals Master" },
  { name: "Kunal Ghosh", email: "kunal.g@sapthgiri.edu.in", usn: "1SN22CS033", teamId: "team-mad", teamName: "Mad", isLeader: false, points: 29800, rank: 26, attendance: 93, award: "Daily Quiz Champion" },
  { name: "Shruti Hegde", email: "shruti.h@sapthgiri.edu.in", usn: "1SN22CS034", teamId: "team-mad", teamName: "Mad", isLeader: false, points: 26400, rank: 33, attendance: 91, award: "Collaboration Champion" },
  { name: "Tushar Gupta", email: "tushar.g@sapthgiri.edu.in", usn: "1SN22CS035", teamId: "team-mad", teamName: "Mad", isLeader: false, points: 22100, rank: 39, attendance: 88, award: "Smart Solver" },
  { name: "Ritu Verma", email: "ritu.v@sapthgiri.edu.in", usn: "1SN22CS036", teamId: "team-mad", teamName: "Mad", isLeader: false, points: 18144, rank: 45, attendance: 86, award: "Precision Coder" },

  // Team 7: Byte Force (5 members)
  { name: "Karthik Verma", email: "karthik.v@sapthgiri.edu.in", usn: "1SN22CS037", teamId: "team-byte-force", teamName: "Byte Force", isLeader: true, points: 32600, rank: 20, attendance: 96, award: "Bronze Performer" },
  { name: "Gaurav Bhat", email: "gaurav.b@sapthgiri.edu.in", usn: "1SN22CS038", teamId: "team-byte-force", teamName: "Byte Force", isLeader: false, points: 28700, rank: 29, attendance: 94, award: "Fastest Learner" },
  { name: "Aniket Joshi", email: "aniket.j@sapthgiri.edu.in", usn: "1SN22CS039", teamId: "team-byte-force", teamName: "Byte Force", isLeader: false, points: 23100, rank: 38, attendance: 90, award: "Best Championship Journey" },
  { name: "Rhea Paul", email: "rhea.p@sapthgiri.edu.in", usn: "1SN22CS040", teamId: "team-byte-force", teamName: "Byte Force", isLeader: false, points: 19400, rank: 43, attendance: 87, award: "Rising Star" },
  { name: "Rohit Nair", email: "rohit.n@sapthgiri.edu.in", usn: "1SN22CS041", teamId: "team-byte-force", teamName: "Byte Force", isLeader: false, points: 14293, rank: 49, attendance: 84, award: "Growth Badge" },

  // Team 8: Veltrion (5 members)
  { name: "Ananya Deshmukh", email: "ananya.d@sapthgiri.edu.in", usn: "1SN22CS042", teamId: "team-veltrion", teamName: "Veltrion", isLeader: true, points: 29100, rank: 28, attendance: 95, award: "Problem Solving Champion" },
  { name: "Pooja Hegde", email: "pooja.h@sapthgiri.edu.in", usn: "1SN22CS043", teamId: "team-veltrion", teamName: "Veltrion", isLeader: false, points: 25800, rank: 34, attendance: 99, award: "Consistency Champion" },
  { name: "Harshil Dave", email: "harshil.d@sapthgiri.edu.in", usn: "1SN22CS044", teamId: "team-veltrion", teamName: "Veltrion", isLeader: false, points: 20900, rank: 40, attendance: 89, award: "Best Learning Reflection" },
  { name: "Nandini R", email: "nandini.r@sapthgiri.edu.in", usn: "1SN22CS045", teamId: "team-veltrion", teamName: "Veltrion", isLeader: false, points: 16200, rank: 47, attendance: 85, award: "Smart Solver" },
  { name: "Yashwant Rao", email: "yashwant.r@sapthgiri.edu.in", usn: "1SN22CS046", teamId: "team-veltrion", teamName: "Veltrion", isLeader: false, points: 9602, rank: 54, attendance: 82, award: "Growth Badge" },

  // Team 9: Backbenchers (5 members)
  { name: "Harsh Vardhan", email: "harsh.v@sapthgiri.edu.in", usn: "1SN22CS047", teamId: "team-backbenchers", teamName: "Backbenchers", isLeader: true, points: 27100, rank: 32, attendance: 93, award: "Coding Excellence Award" },
  { name: "Deepak Soni", email: "deepak.s@sapthgiri.edu.in", usn: "1SN22CS048", teamId: "team-backbenchers", teamName: "Backbenchers", isLeader: false, points: 17800, rank: 46, attendance: 88, award: "Most Improved Performer" },
  { name: "Suresh Prabhu", email: "suresh.p@sapthgiri.edu.in", usn: "1SN22CS049", teamId: "team-backbenchers", teamName: "Backbenchers", isLeader: false, points: 12400, rank: 51, attendance: 83, award: "Never Give Up Award" },
  { name: "Kavita Rao", email: "kavita.r@sapthgiri.edu.in", usn: "1SN22CS050", teamId: "team-backbenchers", teamName: "Backbenchers", isLeader: false, points: 10100, rank: 53, attendance: 80, award: "Rising Star" },
  { name: "Amit Trivedi", email: "amit.t@sapthgiri.edu.in", usn: "1SN22CS051", teamId: "team-backbenchers", teamName: "Backbenchers", isLeader: false, points: 5000, rank: 56, attendance: 78, award: "Growth Badge" },

  // Team 10: Brahmastra (5 members)
  { name: "Meera Krishnan", email: "meera.k@sapthgiri.edu.in", usn: "1SN22CS052", teamId: "team-brahmastra", teamName: "Brahmastra", isLeader: true, points: 23900, rank: 36, attendance: 94, award: "Code Optimization Expert" },
  { name: "Swati Iyer", email: "swati.i@sapthgiri.edu.in", usn: "1SN22CS053", teamId: "team-brahmastra", teamName: "Brahmastra", isLeader: false, points: 18900, rank: 44, attendance: 91, award: "Never Give Up Award" },
  { name: "Lokesh Jain", email: "lokesh.j@sapthgiri.edu.in", usn: "1SN22CS054", teamId: "team-brahmastra", teamName: "Brahmastra", isLeader: false, points: 14800, rank: 48, attendance: 85, award: "Technical Content Creator" },
  { name: "Payal Mittal", email: "payal.m@sapthgiri.edu.in", usn: "1SN22CS055", teamId: "team-brahmastra", teamName: "Brahmastra", isLeader: false, points: 11200, rank: 52, attendance: 82, award: "Precision Coder" },
  { name: "Vikas Dubey", email: "vikas.d@sapthgiri.edu.in", usn: "1SN22CS056", teamId: "team-brahmastra", teamName: "Brahmastra", isLeader: false, points: 7820, rank: 55, attendance: 80, award: "Growth Badge" }
];

// Sort profiles descending by points to assign exact, genuine ranks with zero discrepancies
const SORTED_PROFILES = [...STUDENT_PROFILES].sort((a, b) => b.points - a.points);
const RANK_MAP = new Map<string, number>();
SORTED_PROFILES.forEach((p, idx) => {
  RANK_MAP.set(p.usn, idx + 1);
});

export const PARTICIPANTS_DATA: Participant[] = STUDENT_PROFILES.map((p, idx) => ({
  id: `p-${String(idx + 1).padStart(2, '0')}`,
  name: p.name,
  email: p.email,
  phone: `+91 98450 ${String(11000 + idx * 137).slice(0, 5)}`,
  university: "Sapthgiri NPS University",
  department: "Computer Science & Engineering",
  year: "3rd Year B.Tech",
  usn: p.usn,
  photoUrl: `https://images.unsplash.com/photo-${1534528741775 + (idx % 12) * 1000}?w=150&auto=format&fit=crop&q=80`,
  linkedinUrl: `https://linkedin.com/in/${p.name.toLowerCase().replace(/\s+/g, '-')}`,
  githubUrl: `https://github.com/${p.name.toLowerCase().replace(/\s+/g, '')}`,
  teamId: p.teamId,
  teamName: p.teamName,
  isLeader: p.isLeader,
  totalPoints: p.points,
  rank: RANK_MAP.get(p.usn) || (idx + 1),
  attendanceRate: p.attendance,
  badges: [
    p.points >= 40000 ? "badge-gold" : p.points >= 25000 ? "badge-silver" : "badge-bronze",
    p.attendance >= 98 ? "badge-excellence" : "badge-growth",
    p.isLeader ? "badge-top-performer" : "badge-smart-solver"
  ],
  awardTitles: [p.award],
  skills: {
    javaFundamentals: Math.min(99, Math.floor(75 + (p.points / 50000) * 24)),
    dataStructures: Math.min(99, Math.floor(70 + (p.points / 50000) * 28)),
    algorithms: Math.min(98, Math.floor(68 + (p.points / 50000) * 30)),
    problemSolving: Math.min(99, Math.floor(72 + (p.points / 50000) * 26)),
    debugging: Math.min(97, Math.floor(65 + (p.points / 50000) * 31)),
    systemDesign: Math.min(95, Math.floor(60 + (p.points / 50000) * 35)),
  },
  dailyReflectionsCount: Math.min(13, Math.floor(9 + (p.points / 50000) * 4)),
  linkedInPostsCount: Math.min(13, Math.floor(8 + (p.points / 50000) * 5))
}));

// Pre-generated certified records for the 56 learners guaranteeing "every one of the 56 learners leaves with recognition"
export const INITIAL_CERTIFICATES: CertificateRecord[] = PARTICIPANTS_DATA.flatMap((student) => {
  const records: CertificateRecord[] = [];

  // 1. Universal Participation Certificate (All 56 Students)
  records.push({
    id: `cert-part-${student.id}`,
    certificateNo: `SNPS-JDSA26-P-${student.usn.slice(-3)}`,
    participantId: student.id,
    participantName: student.name,
    recipientEmail: student.email,
    usn: student.usn,
    teamId: student.teamId,
    teamName: student.teamName,
    category: 'participation',
    title: "Certificate of Participation",
    achievementSubtitle: "13-Day Intensive Java Data Structures & Algorithms Championship",
    citation: `Has successfully demonstrated active commitment, rigorous problem solving, and disciplined attendance throughout all 13 days of the championship at Sapthgiri NPS University.`,
    issueDate: "February 22, 2026",
    signatory1: { name: INITIAL_SETTINGS.directorName, title: INITIAL_SETTINGS.directorTitle },
    signatory2: { name: INITIAL_SETTINGS.deanName, title: INITIAL_SETTINGS.deanTitle },
    signatory3: { name: INITIAL_SETTINGS.vcName, title: INITIAL_SETTINGS.vcTitle },
    qrVerificationUrl: `https://championshipos.verify.edu/cert/SNPS-JDSA26-P-${student.usn.slice(-3)}`,
    status: 'issued',
    downloadCount: 1
  });

  // 2. Merit / Excellence / Winner / Team / Special Recognitions based on rank & team
  if (student.rank <= 3) {
    records.push({
      id: `cert-win-${student.id}`,
      certificateNo: `SNPS-JDSA26-W-${student.usn.slice(-3)}`,
      participantId: student.id,
      participantName: student.name,
      recipientEmail: student.email,
      usn: student.usn,
      teamId: student.teamId,
      teamName: student.teamName,
      category: 'winner',
      title: "Championship Winner Certificate",
      achievementSubtitle: `${student.awardTitles[0]} | Rank #${student.rank} Overall`,
      citation: `Awarded the prestigious title of ${student.awardTitles[0]} for monumental performance, algorithmic brilliance, and ranking in the grand podium of the championship.`,
      issueDate: "February 22, 2026",
      signatory1: { name: INITIAL_SETTINGS.directorName, title: INITIAL_SETTINGS.directorTitle },
      signatory2: { name: INITIAL_SETTINGS.deanName, title: INITIAL_SETTINGS.deanTitle },
      signatory3: { name: INITIAL_SETTINGS.vcName, title: INITIAL_SETTINGS.vcTitle },
      qrVerificationUrl: `https://championshipos.verify.edu/cert/SNPS-JDSA26-W-${student.usn.slice(-3)}`,
      status: 'issued',
      downloadCount: 3
    });
  } else if (student.rank <= 15) {
    records.push({
      id: `cert-exc-${student.id}`,
      certificateNo: `SNPS-JDSA26-E-${student.usn.slice(-3)}`,
      participantId: student.id,
      participantName: student.name,
      recipientEmail: student.email,
      usn: student.usn,
      teamId: student.teamId,
      teamName: student.teamName,
      category: 'excellence',
      title: "Certificate of Excellence",
      achievementSubtitle: `Honored as: ${student.awardTitles[0]}`,
      citation: `Conferred in recognition of outstanding coding mastery, zero-error problem solving speed, and stellar contribution to Team ${student.teamName}.`,
      issueDate: "February 22, 2026",
      signatory1: { name: INITIAL_SETTINGS.directorName, title: INITIAL_SETTINGS.directorTitle },
      signatory2: { name: INITIAL_SETTINGS.deanName, title: INITIAL_SETTINGS.deanTitle },
      signatory3: { name: INITIAL_SETTINGS.vcName, title: INITIAL_SETTINGS.vcTitle },
      qrVerificationUrl: `https://championshipos.verify.edu/cert/SNPS-JDSA26-E-${student.usn.slice(-3)}`,
      status: 'issued',
      downloadCount: 2
    });
  } else if (student.rank <= 35) {
    records.push({
      id: `cert-mer-${student.id}`,
      certificateNo: `SNPS-JDSA26-M-${student.usn.slice(-3)}`,
      participantId: student.id,
      participantName: student.name,
      recipientEmail: student.email,
      usn: student.usn,
      teamId: student.teamId,
      teamName: student.teamName,
      category: 'merit',
      title: "Certificate of Merit",
      achievementSubtitle: `Award Title: ${student.awardTitles[0]}`,
      citation: `Presented with distinction for high consistency, algorithmic persistence, and technical proficiency throughout the 13-day learning curriculum.`,
      issueDate: "February 22, 2026",
      signatory1: { name: INITIAL_SETTINGS.directorName, title: INITIAL_SETTINGS.directorTitle },
      signatory2: { name: INITIAL_SETTINGS.deanName, title: INITIAL_SETTINGS.deanTitle },
      signatory3: { name: INITIAL_SETTINGS.vcName, title: INITIAL_SETTINGS.vcTitle },
      qrVerificationUrl: `https://championshipos.verify.edu/cert/SNPS-JDSA26-M-${student.usn.slice(-3)}`,
      status: 'issued',
      downloadCount: 1
    });
  } else {
    // Special recognition for foundational growth & perseverance
    records.push({
      id: `cert-spc-${student.id}`,
      certificateNo: `SNPS-JDSA26-S-${student.usn.slice(-3)}`,
      participantId: student.id,
      participantName: student.name,
      recipientEmail: student.email,
      usn: student.usn,
      teamId: student.teamId,
      teamName: student.teamName,
      category: 'special_recognition',
      title: "Special Recognition Certificate",
      achievementSubtitle: `${student.awardTitles[0]} | Team ${student.teamName}`,
      citation: `Recognized for continuous dedication, daily learning reflections, and demonstrable growth in Java algorithmic concepts.`,
      issueDate: "February 22, 2026",
      signatory1: { name: INITIAL_SETTINGS.directorName, title: INITIAL_SETTINGS.directorTitle },
      signatory2: { name: INITIAL_SETTINGS.deanName, title: INITIAL_SETTINGS.deanTitle },
      signatory3: { name: INITIAL_SETTINGS.vcName, title: INITIAL_SETTINGS.vcTitle },
      qrVerificationUrl: `https://championshipos.verify.edu/cert/SNPS-JDSA26-S-${student.usn.slice(-3)}`,
      status: 'issued',
      downloadCount: 1
    });
  }

  // If student belongs to Champion Team Toxicos (Rank 1), grant Team Excellence Certificate
  if (student.teamId === 'team-toxicos') {
    records.push({
      id: `cert-teamexc-${student.id}`,
      certificateNo: `SNPS-JDSA26-TE-${student.usn.slice(-3)}`,
      participantId: student.id,
      participantName: student.name,
      recipientEmail: student.email,
      usn: student.usn,
      teamId: student.teamId,
      teamName: student.teamName,
      category: 'team_excellence',
      title: "Team Excellence Certificate",
      achievementSubtitle: "Team Toxicos - Overall Grand Champion Team 2026",
      citation: `Honoring collaborative supremacy, project architectural distinction, and capturing 1st Place with 233,878 Total Championship Points.`,
      issueDate: "February 22, 2026",
      signatory1: { name: INITIAL_SETTINGS.directorName, title: INITIAL_SETTINGS.directorTitle },
      signatory2: { name: INITIAL_SETTINGS.deanName, title: INITIAL_SETTINGS.deanTitle },
      signatory3: { name: INITIAL_SETTINGS.vcName, title: INITIAL_SETTINGS.vcTitle },
      qrVerificationUrl: `https://championshipos.verify.edu/cert/SNPS-JDSA26-TE-${student.usn.slice(-3)}`,
      status: 'issued',
      downloadCount: 2
    });
  }

  return records;
});
