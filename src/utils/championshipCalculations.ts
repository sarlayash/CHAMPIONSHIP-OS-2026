import { Participant, Team, CertificateRecord } from '../types';

/**
 * Recalculates strictly accurate, real numbers for participants and teams:
 * - Recalculates participant ranks #1 to #N based on descending totalPoints
 * - Recalculates team member counts from enrolled participants
 * - Recalculates team total points as the exact sum of its enrolled learners' points
 * - Recalculates team ranks #1 to #N based on descending totalPoints
 */
export function recalculateAllRealNumbers(
  participants: Participant[],
  teams: Team[]
): { updatedParticipants: Participant[]; updatedTeams: Team[] } {
  // 1. Sort participants by totalPoints descending, ties broken by attendanceRate
  const sortedParticipants = [...participants].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    return b.attendanceRate - a.attendanceRate;
  });

  const updatedParticipants: Participant[] = sortedParticipants.map((p, idx) => ({
    ...p,
    rank: idx + 1,
    // Ensure badges reflect real numbers
    badges: [
      p.totalPoints >= 40000 ? 'badge-gold' : p.totalPoints >= 25000 ? 'badge-silver' : 'badge-bronze',
      p.attendanceRate >= 98 ? 'badge-excellence' : 'badge-growth',
      p.isLeader ? 'badge-top-performer' : 'badge-smart-solver'
    ]
  }));

  // 2. Update each team's member count and calculate real total points
  const teamsWithRealStats = teams.map((team) => {
    const enrolledMembers = updatedParticipants.filter((p) => p.teamId === team.id);
    const realMemberCount = enrolledMembers.length;
    
    // Sum real points from enrolled members
    const memberPointsSum = enrolledMembers.reduce((sum, p) => sum + (Number(p.totalPoints) || 0), 0);
    const bonusPoints = Number(team.bonusPoints) || 0;
    const stageScoresSum = 
      (Number(team.stageScores?.learningLeague) || 0) +
      (Number(team.stageScores?.codingBattle) || 0) +
      (Number(team.stageScores?.quizKahoot) || 0) +
      (Number(team.stageScores?.hackathonFinale) || 0);

    // Auto-calculate team total score:
    // Sum of all enrolled team members' points + additional individual team bonus points + stage points
    const computedPoints = memberPointsSum + bonusPoints + stageScoresSum;

    // Determine current leader name
    const leader = enrolledMembers.find((m) => m.isLeader) || enrolledMembers[0];
    const leaderName = leader ? leader.name : team.leaderName;
    const leaderId = leader ? leader.id : team.leaderId;

    return {
      ...team,
      memberCount: realMemberCount,
      bonusPoints,
      totalPoints: computedPoints,
      leaderName,
      leaderId,
    };
  });

  // 3. Sort teams by total points descending to assign real rank #1 to #N
  const sortedTeams = [...teamsWithRealStats].sort((a, b) => b.totalPoints - a.totalPoints);
  const updatedTeams: Team[] = sortedTeams.map((t, idx) => ({
    ...t,
    rank: idx + 1,
  }));

  return { updatedParticipants, updatedTeams };
}

/**
 * Synchronize certificates when a learner's name, USN, or team is updated
 */
export function syncCertificatesForLearner(
  certificates: CertificateRecord[],
  updatedLearner: Participant
): CertificateRecord[] {
  return certificates.map((cert) => {
    if (cert.participantId === updatedLearner.id) {
      return {
        ...cert,
        participantName: updatedLearner.name,
        recipientEmail: updatedLearner.email,
        usn: updatedLearner.usn,
        teamId: updatedLearner.teamId,
        teamName: updatedLearner.teamName,
      };
    }
    return cert;
  });
}

/**
 * Synchronize participants and certificates when a team name changes
 */
export function syncTeamRename(
  teamId: string,
  newTeamName: string,
  participants: Participant[],
  certificates: CertificateRecord[]
): { updatedParticipants: Participant[]; updatedCertificates: CertificateRecord[] } {
  const updatedParticipants = participants.map((p) => {
    if (p.teamId === teamId) {
      return { ...p, teamName: newTeamName };
    }
    return p;
  });

  const updatedCertificates = certificates.map((c) => {
    if (c.teamId === teamId) {
      return { ...c, teamName: newTeamName };
    }
    return c;
  });

  return { updatedParticipants, updatedCertificates };
}
