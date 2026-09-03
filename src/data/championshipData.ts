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
  totalLearners: 0,
  totalTeams: 10,
  verificationBaseUrl: "https://championshipos.verify.edu/cert/",
};

// 10 Official Teams with zeroed metrics ready for real admin score inputs
export const TEAMS_DATA: Team[] = [
  {
    id: "team-toxicos",
    name: "Toxicos",
    rank: 1,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "TOX-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-techtok",
    name: "TechTok",
    rank: 2,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "TTK-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-triple-bytes",
    name: "Triple Bytes",
    rank: 3,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "TBY-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-shenex",
    name: "Shenex",
    rank: 4,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "SHX-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-apex",
    name: "Apex",
    rank: 5,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "APX-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-mad",
    name: "Mad",
    rank: 6,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "MAD-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-byte-force",
    name: "Byte Force",
    rank: 7,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "BYF-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-veltrion",
    name: "Veltrion",
    rank: 8,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "VLT-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-backbenchers",
    name: "Backbenchers",
    rank: 9,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "BKB-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
  },
  {
    id: "team-brahmastra",
    name: "Brahmastra",
    rank: 10,
    totalPoints: 0,
    leaderId: "",
    leaderName: "Captain Unassigned",
    memberCount: 0,
    code: "BHM-2026",
    projectTitle: "Project Title Pending",
    projectDescription: "Software architecture and problem statement to be submitted during the Hackathon Finale.",
    githubUrl: "",
    demoVideoUrl: "",
    pptUrl: "",
    reportUrl: "",
    stageScores: {
      learningLeague: 0,
      codingBattle: 0,
      quizKahoot: 0,
      hackathonFinale: 0
    },
    rubricScore: 0,
    judgeFeedback: "Awaiting jury evaluation.",
    awardedTitles: []
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
    criteria: "13 consecutive daily learning reflections"
  }
];

export const AWARDS_DATA: AwardItem[] = [
  // Championship Titles (Individual - Real names assigned by admin)
  { id: "ct-1", title: "Java DSA Champion 2026", category: "championship_title", icon: "🏆", description: "Highest ranked overall learner across all 13 days of coding, quizzes, and hackathon." },
  { id: "ct-2", title: "Java DSA Vice Champion", category: "championship_title", icon: "🥈", description: "2nd highest overall scoring learner with stellar algorithmic performance." },
  { id: "ct-3", title: "Java DSA Elite Performer", category: "championship_title", icon: "🥉", description: "3rd highest overall scoring learner with continuous podium finishes." },
  { id: "ct-4", title: "Platinum Performer", category: "championship_title", icon: "💎", description: "Maintained >95% accuracy across all complex tree and dynamic programming challenges." },
  { id: "ct-5", title: "Gold Performer", category: "championship_title", icon: "🥇", description: "Flawless score streak in advanced graph traversal and backtracking tracks." },
  { id: "ct-6", title: "Silver Performer", category: "championship_title", icon: "🥈", description: "Exceptional speed and precision in memory optimization rounds." },
  { id: "ct-7", title: "Bronze Performer", category: "championship_title", icon: "🥉", description: "Outstanding perseverance and high performance across all 13 modules." },
  { id: "ct-8", title: "Hall of Fame Inductee", category: "championship_title", icon: "⭐", description: "Permanent recognition for highest overall contributions and peer leadership." },

  // Technical Excellence Awards (Individual)
  { id: "te-1", title: "Speed Coding Champion", category: "technical", icon: "⚡", description: "Fastest execution time for hard-tier algorithmic problems." },
  { id: "te-2", title: "Logic Master", category: "technical", icon: "🧠", description: "Highest score in complex logic, bitmasking, and math riddles." },
  { id: "te-3", title: "Problem Solving Champion", category: "technical", icon: "🎯", description: "Solved maximum hard-level algorithmic problems with zero hints." },
  { id: "te-4", title: "Debugging Champion", category: "technical", icon: "🐞", description: "Resolved convoluted multi-threaded concurrency bugs in record time." },
  { id: "te-5", title: "Algorithm Architect", category: "technical", icon: "📊", description: "Best design of custom data structures and abstract data types." },
  { id: "te-6", title: "DSA Pattern Master", category: "technical", icon: "🧩", description: "Mastery over sliding windows, two pointers, and monotonic queues." },
  { id: "te-7", title: "Code Optimization Expert", category: "technical", icon: "🔍", description: "Reduced memory consumption and time complexity to absolute theoretical limits." },
  { id: "te-8", title: "Java Fundamentals Master", category: "technical", icon: "☕", description: "100% score in Java memory model, JVM internals, and garbage collection quizzes." },
  { id: "te-9", title: "Industry Ready Engineer", category: "technical", icon: "🚀", description: "Code adherence to corporate clean architecture and production patterns." },
  { id: "te-10", title: "Coding Excellence Award", category: "technical", icon: "💎", description: "Highest aggregate coding benchmark score over 13 consecutive days." },

  // Performance Excellence Awards
  { id: "pe-1", title: "Most Improved Performer", category: "performance", icon: "📈", description: "Greatest progression in points from Day 1 to Day 13." },
  { id: "pe-2", title: "Consistency Champion", category: "performance", icon: "🔥", description: "Never missed a single submission deadline across all 13 days." },
  { id: "pe-3", title: "Fastest Learner", category: "performance", icon: "⚡", description: "Mastered advanced tree algorithms in the shortest turnaround." },
  { id: "pe-4", title: "Outstanding Performer", category: "performance", icon: "🌟", description: "Ranked in the top 10% on every single daily assessment." },
  { id: "pe-5", title: "Never Give Up Award", category: "performance", icon: "💪", description: "Demonstrated remarkable grit overcoming difficult debugging hurdles." },
  { id: "pe-6", title: "Perfect Attendance Champion", category: "performance", icon: "📋", description: "100% attendance across all morning theory and evening hands-on labs." },
  { id: "pe-7", title: "Punctuality Excellence Award", category: "performance", icon: "⏰", description: "First to check-in and submit on every session of the championship." },

  // Leadership & Professional Awards
  { id: "lp-1", title: "Team Leader of the Championship", category: "leadership", icon: "👑", description: "Exemplary guidance, mentoring, and coordination of team." },
  { id: "lp-2", title: "Best Team Player", category: "leadership", icon: "🤝", description: "Consistently supported peers and unblocked teammate challenges." },
  { id: "lp-3", title: "Innovation Catalyst", category: "leadership", icon: "💡", description: "Pioneered novel architectural approaches during the Grand Finale Hackathon." },
  { id: "lp-4", title: "Peer Mentor Award", category: "leadership", icon: "🌟", description: "Voted by fellow learners as the most helpful peer tutor." },
  { id: "lp-5", title: "Collaboration Champion", category: "leadership", icon: "🎯", description: "Fostered seamless inter-team communication and code reviews." },
  { id: "lp-6", title: "LinkedIn Trendsetter", category: "leadership", icon: "🌐", description: "Top engagement and reach on daily championship learnings." },
  { id: "lp-7", title: "Professional Branding Champion", category: "leadership", icon: "📢", description: "Impeccable technical portfolio, GitHub documentation, and personal brand." },
  { id: "lp-8", title: "Best Learning Reflection", category: "leadership", icon: "🎥", description: "Most insightful and articulate daily engineering reflection journals." },
  { id: "lp-9", title: "Best Championship Journey", category: "leadership", icon: "📸", description: "Documented the full transformation journey with authentic milestones." },
  { id: "lp-10", title: "Technical Content Creator", category: "leadership", icon: "✍️", description: "Penned high-value technical articles breaking down complex DSA topics." },

  // Championship Competition Awards
  { id: "cc-1", title: "Kahoot Champion", category: "competition", icon: "🏆", description: "Undefeated champion across all live Kahoot speed trivia matches." },
  { id: "cc-2", title: "Daily Coding Battle Champion", category: "competition", icon: "⚔️", description: "Highest aggregate points won in 1-on-1 daily coding battle brackets." },
  { id: "cc-3", title: "Daily Quiz Champion", category: "competition", icon: "🎯", description: "Highest cumulative accuracy across daily Java conceptual quizzes." },
  { id: "cc-4", title: "Live Coding Champion", category: "competition", icon: "💻", description: "Live coded solutions on the main stage before judges with zero compilation errors." },
  { id: "cc-5", title: "Challenge Master", category: "competition", icon: "🧩", description: "Completed all bonus weekend algorithmic boss challenges." },

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

// Clean participant roster ready for real administrator data entry
export const PARTICIPANTS_DATA: Participant[] = [];

// Clean certificates repository ready for real administrator issuance
export const INITIAL_CERTIFICATES: CertificateRecord[] = [];
