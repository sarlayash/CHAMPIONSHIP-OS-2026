import { Participant, Team, CertificateRecord } from '../types';

/**
 * Escapes a cell value according to RFC 4180 CSV specifications.
 * Wraps in quotes and escapes internal double-quotes.
 */
function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  const str = String(value);
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Triggers a browser download of a CSV file with UTF-8 BOM for Excel/Google Sheets compatibility.
 */
function downloadCSV(csvContent: string, fileName: string): void {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports participants roster to CSV for external university record-keeping and audit.
 */
export function exportParticipantsCSV(participants: Participant[]): void {
  const headers = [
    'Championship Rank',
    'Full Name',
    'University Serial Number (USN)',
    'Email Address',
    'Phone Number',
    'Assigned Team',
    'Team Role',
    'Total Points',
    'Attendance (%)',
    'Department',
    'Academic Year',
    'Conferred Award Titles',
    'Badges Earned Count',
    'Java Fundamentals Score',
    'DSA Score',
    'Problem Solving Score',
    'Daily Learning Reflections',
    'LinkedIn Posts Count',
    'GitHub URL',
    'LinkedIn Profile'
  ];

  // Sort by rank ascending (1st place first)
  const sorted = [...participants].sort((a, b) => {
    if (a.rank && b.rank) return a.rank - b.rank;
    return b.totalPoints - a.totalPoints;
  });

  const rows = sorted.map((p, index) => [
    p.rank || index + 1,
    escapeCSV(p.name),
    escapeCSV(p.usn),
    escapeCSV(p.email || ''),
    escapeCSV(p.phone || ''),
    escapeCSV(p.teamName || 'Unassigned'),
    escapeCSV(p.isLeader ? 'Team Captain' : 'Member'),
    p.totalPoints ?? 0,
    `${p.attendanceRate ?? 100}%`,
    escapeCSV(p.department || 'CSE'),
    escapeCSV(p.year || '3rd Year'),
    escapeCSV((p.awardTitles || []).join('; ')),
    (p.badges || []).length,
    p.skills?.javaFundamentals ?? 0,
    p.skills?.dataStructures ?? 0,
    p.skills?.problemSolving ?? 0,
    p.dailyReflectionsCount ?? 0,
    p.linkedInPostsCount ?? 0,
    escapeCSV(p.githubUrl || ''),
    escapeCSV(p.linkedinUrl || '')
  ]);

  const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(csvString, `Java_DSA_Championship_Participants_${timestamp}.csv`);
}

/**
 * Exports championship team standings to CSV for external university record-keeping.
 */
export function exportTeamsCSV(teams: Team[]): void {
  const headers = [
    'Standing Rank',
    'Team Name',
    'Team Code',
    'Team Captain / Leader',
    'Registered Members Count',
    'Total Points',
    'Stage 1: Learning League Score',
    'Stage 2: Coding Battle Score',
    'Stage 3: Quiz & Kahoot Score',
    'Stage 4: Hackathon Finale Score',
    'Jury Rubric Score (Max 100)',
    'Hackathon Project Title',
    'Project Scope / Description',
    'Jury Evaluation Feedback',
    'Awarded Team Honors',
    'GitHub Repository',
    'Demo Video URL',
    'Presentation Slide Deck',
    'Technical Report'
  ];

  // Sort by rank ascending (Rank 1 first)
  const sorted = [...teams].sort((a, b) => {
    if (a.rank && b.rank) return a.rank - b.rank;
    return b.totalPoints - a.totalPoints;
  });

  const rows = sorted.map((t, index) => [
    t.rank || index + 1,
    escapeCSV(t.name),
    escapeCSV(t.code),
    escapeCSV(t.leaderName || 'Captain Unassigned'),
    t.memberCount ?? 0,
    t.totalPoints ?? 0,
    t.stageScores?.learningLeague ?? 0,
    t.stageScores?.codingBattle ?? 0,
    t.stageScores?.quizKahoot ?? 0,
    t.stageScores?.hackathonFinale ?? 0,
    t.rubricScore ?? 0,
    escapeCSV(t.projectTitle || ''),
    escapeCSV(t.projectDescription || ''),
    escapeCSV(t.judgeFeedback || ''),
    escapeCSV((t.awardedTitles || []).join('; ')),
    escapeCSV(t.githubUrl || ''),
    escapeCSV(t.demoVideoUrl || ''),
    escapeCSV(t.pptUrl || ''),
    escapeCSV(t.reportUrl || '')
  ]);

  const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(csvString, `Java_DSA_Championship_Team_Standings_${timestamp}.csv`);
}

/**
 * Exports issued certificates registry to CSV for external credential verification.
 */
export function exportCertificatesCSV(certificates: CertificateRecord[]): void {
  const headers = [
    'Certificate Number',
    'Recipient Student Name',
    'USN',
    'Recipient Email',
    'Assigned Team',
    'Certificate Category',
    'Certificate Title',
    'Achievement Subtitle',
    'Citation Text',
    'Date of Conformance',
    'Issuance Status',
    'Verification URL',
    'Signatory: Director',
    'Signatory: Dean',
    'Signatory: Vice Chancellor'
  ];

  const rows = certificates.map(c => [
    escapeCSV(c.certificateNo),
    escapeCSV(c.participantName),
    escapeCSV(c.usn),
    escapeCSV(c.recipientEmail || ''),
    escapeCSV(c.teamName || ''),
    escapeCSV(c.category),
    escapeCSV(c.title),
    escapeCSV(c.achievementSubtitle || ''),
    escapeCSV(c.citation || ''),
    escapeCSV(c.issueDate),
    escapeCSV(c.status),
    escapeCSV(c.qrVerificationUrl),
    escapeCSV(c.signatory1?.name || ''),
    escapeCSV(c.signatory2?.name || ''),
    escapeCSV(c.signatory3?.name || '')
  ]);

  const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(csvString, `Java_DSA_Championship_Certificates_Registry_${timestamp}.csv`);
}
