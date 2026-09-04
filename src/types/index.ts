export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'judge' 
  | 'mentor' 
  | 'faculty' 
  | 'team_leader' 
  | 'participant' 
  | 'guest';

export type CertificateCategory = 
  | 'participation' 
  | 'merit' 
  | 'excellence' 
  | 'winner' 
  | 'team_excellence' 
  | 'special_recognition';

export interface CertificateRecord {
  id: string;
  certificateNo: string;
  participantId: string;
  participantName: string;
  recipientEmail: string;
  usn: string;
  teamId: string;
  teamName: string;
  category: CertificateCategory;
  title: string;
  achievementSubtitle: string;
  citation: string;
  issueDate: string;
  signatory1: { name: string; title: string };
  signatory2: { name: string; title: string };
  signatory3: { name: string; title: string };
  qrVerificationUrl: string;
  status: 'issued' | 'pending' | 'revoked';
  downloadCount: number;
}

export interface Team {
  id: string;
  name: string;
  rank: number;
  totalPoints: number;
  bonusPoints?: number;
  leaderId: string;
  leaderName: string;
  memberCount: number;
  code: string;
  projectTitle: string;
  projectDescription: string;
  githubUrl: string;
  demoVideoUrl: string;
  pptUrl: string;
  reportUrl: string;
  stageScores: {
    learningLeague: number;
    codingBattle: number;
    quizKahoot: number;
    hackathonFinale: number;
  };
  rubricScore?: number;
  judgeFeedback?: string;
  awardedTitles: string[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  year: string;
  usn: string;
  photoUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  teamId: string;
  teamName: string;
  isLeader: boolean;
  totalPoints: number;
  rank: number;
  attendanceRate: number; // percentage
  badges: string[]; // badge IDs
  awardTitles: string[];
  skills: {
    javaFundamentals: number;
    dataStructures: number;
    algorithms: number;
    problemSolving: number;
    debugging: number;
    systemDesign: number;
  };
  dailyReflectionsCount: number;
  linkedInPostsCount: number;
}

export interface Badge {
  id: string;
  name: string;
  tier: 'gold' | 'silver' | 'bronze' | 'special';
  icon: string;
  description: string;
  criteria: string;
}

export interface AwardItem {
  id: string;
  title: string;
  category: 'championship_title' | 'technical' | 'performance' | 'leadership' | 'competition' | 'team';
  icon: string;
  description: string;
  recipientName?: string;
  teamName?: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // percentage (sums to 100)
  maxScore: number;
}

export interface ChampionshipSettings {
  name: string;
  shortName: string;
  theme: string;
  university: string;
  poweredBy: string;
  directorName: string;
  directorTitle: string;
  deanName: string;
  deanTitle: string;
  vcName: string;
  vcTitle: string;
  motto: string;
  vision: string;
  startDate: string;
  endDate: string;
  totalLearners: number;
  totalTeams: number;
  verificationBaseUrl: string;
}
