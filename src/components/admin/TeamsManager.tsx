import React, { useState } from 'react';
import { Team, Participant, CertificateRecord, ChampionshipSettings } from '../../types';
import { 
  Users, 
  Trophy, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Github, 
  Video, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  Crown, 
  Sparkles, 
  ArrowUpDown,
  Sliders,
  ExternalLink,
  Download,
  Star,
  UserPlus,
  Check,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportTeamsCSV } from '../../utils/csvExport';
import { recalculateAllRealNumbers, syncTeamRename } from '../../utils/championshipCalculations';

interface TeamsManagerProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  certificates: CertificateRecord[];
  setCertificates: React.Dispatch<React.SetStateAction<CertificateRecord[]>>;
  settings: ChampionshipSettings;
  setSettings: React.Dispatch<React.SetStateAction<ChampionshipSettings>>;
  onOpenBulkModal?: (mode?: 'all' | 'team' | 'individual', teamId?: string, participantId?: string) => void;
}

export const TeamsManager: React.FC<TeamsManagerProps> = ({
  teams,
  setTeams,
  participants,
  setParticipants,
  certificates,
  setCertificates,
  settings,
  setSettings,
  onOpenBulkModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'points' | 'members' | 'rubric'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modals
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [rosterModalTeam, setRosterModalTeam] = useState<Team | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formLeaderName, setFormLeaderName] = useState('');
  const [formProjectTitle, setFormProjectTitle] = useState('');
  const [formProjectDesc, setFormProjectDesc] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formPptUrl, setFormPptUrl] = useState('');
  const [formReportUrl, setFormReportUrl] = useState('');
  
  // Stage scores & bonus points
  const [formLearningLeague, setFormLearningLeague] = useState(30000);
  const [formCodingBattle, setFormCodingBattle] = useState(50000);
  const [formQuizKahoot, setFormQuizKahoot] = useState(30000);
  const [formHackathonFinale, setFormHackathonFinale] = useState(30000);
  const [formBonusPoints, setFormBonusPoints] = useState(0);
  const [formRubricScore, setFormRubricScore] = useState(90.0);
  const [formJudgeFeedback, setFormJudgeFeedback] = useState('');
  const [formAwardTitles, setFormAwardTitles] = useState('Top Innovation Contender');

  // Quick Bonus Points Modal
  const [bonusModalTeam, setBonusModalTeam] = useState<Team | null>(null);
  const [quickBonusPoints, setQuickBonusPoints] = useState<number>(0);

  // Quick Add Member Modal
  const [addMemberModalTeam, setAddMemberModalTeam] = useState<Team | null>(null);
  const [quickMemberName, setQuickMemberName] = useState('');
  const [quickMemberUsn, setQuickMemberUsn] = useState('');
  const [quickMemberPoints, setQuickMemberPoints] = useState<number>(25000);
  const [quickMemberIsCaptain, setQuickMemberIsCaptain] = useState(false);
  const [quickMemberEmail, setQuickMemberEmail] = useState('');
  const [quickMemberPhone, setQuickMemberPhone] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingTeam(null);
    const nextNum = teams.length + 1;
    setFormName(`Team Alpha ${nextNum}`);
    setFormCode(`ALP-${2026 + nextNum}`);
    setFormLeaderName('To be assigned');
    setFormProjectTitle('NextGen Distributed Algorithmic Engine');
    setFormProjectDesc('High performance in-memory computing primitives in Java 21.');
    setFormGithubUrl('https://github.com/champions/new-team');
    setFormDemoUrl('https://youtube.com/watch?v=demo');
    setFormPptUrl('');
    setFormReportUrl('');
    setFormLearningLeague(25000);
    setFormCodingBattle(50000);
    setFormQuizKahoot(25000);
    setFormHackathonFinale(30000);
    setFormBonusPoints(0);
    setFormRubricScore(88.5);
    setFormJudgeFeedback('Strong engineering fundamentals and modular clean architecture.');
    setFormAwardTitles('Rising Star Team');
    setTeamModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (team: Team) => {
    setEditingTeam(team);
    setFormName(team.name);
    setFormCode(team.code);
    setFormLeaderName(team.leaderName);
    setFormProjectTitle(team.projectTitle);
    setFormProjectDesc(team.projectDescription);
    setFormGithubUrl(team.githubUrl);
    setFormDemoUrl(team.demoVideoUrl);
    setFormPptUrl(team.pptUrl);
    setFormReportUrl(team.reportUrl);
    setFormLearningLeague(team.stageScores?.learningLeague || 0);
    setFormCodingBattle(team.stageScores?.codingBattle || 0);
    setFormQuizKahoot(team.stageScores?.quizKahoot || 0);
    setFormHackathonFinale(team.stageScores?.hackathonFinale || 0);
    setFormBonusPoints(team.bonusPoints || 0);
    setFormRubricScore(team.rubricScore || 85.0);
    setFormJudgeFeedback(team.judgeFeedback || '');
    setFormAwardTitles(team.awardedTitles?.join(', ') || '');
    setTeamModalOpen(true);
  };

  // Open Quick Bonus Modal
  const handleOpenBonusModal = (team: Team) => {
    setBonusModalTeam(team);
    setQuickBonusPoints(team.bonusPoints || 0);
  };

  // Save Quick Bonus Points
  const handleSaveQuickBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bonusModalTeam) return;

    const newBonus = Math.max(0, Number(quickBonusPoints) || 0);
    const updatedTeamList = teams.map(t => {
      if (t.id === bonusModalTeam.id) {
        return {
          ...t,
          bonusPoints: newBonus,
        };
      }
      return t;
    });

    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(participants, updatedTeamList);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);

    const updatedTeam = updatedTeams.find(t => t.id === bonusModalTeam.id);
    showToast(`Bonus points updated for Team "${bonusModalTeam.name}"! Auto-calculated total score: ${updatedTeam?.totalPoints.toLocaleString()} pts (Rank #${updatedTeam?.rank})`);
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {
      // ignore
    }

    setBonusModalTeam(null);
  };

  // Open Quick Add Member Modal
  const handleOpenAddMemberModal = (team: Team) => {
    setAddMemberModalTeam(team);
    setQuickMemberName('');
    const randomUsnNum = Math.floor(100 + Math.random() * 900);
    setQuickMemberUsn(`1SN22CS${randomUsnNum}`);
    setQuickMemberPoints(25000);
    setQuickMemberEmail('');
    setQuickMemberPhone('+91 98450 12000');
    const hasExistingMembers = participants.some(p => p.teamId === team.id);
    setQuickMemberIsCaptain(!hasExistingMembers);
  };

  // Save Quick Add Member
  const handleSaveQuickMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addMemberModalTeam) return;
    if (!quickMemberName.trim() || !quickMemberUsn.trim()) {
      alert('Please provide member name and USN.');
      return;
    }

    const memberPts = Math.max(0, Number(quickMemberPoints) || 0);
    const newId = `p-${String(Date.now()).slice(-4)}`;

    // If making captain, unset leader for others in this team
    let updatedExisting = participants;
    if (quickMemberIsCaptain) {
      updatedExisting = participants.map(p => {
        if (p.teamId === addMemberModalTeam.id) {
          return { ...p, isLeader: false };
        }
        return p;
      });
    }

    const newParticipant: Participant = {
      id: newId,
      name: quickMemberName.trim(),
      usn: quickMemberUsn.trim().toUpperCase(),
      email: quickMemberEmail.trim() || `${quickMemberName.toLowerCase().replace(/\s+/g, '.')}@sapthgiri.edu.in`,
      phone: quickMemberPhone.trim() || '+91 98450 12000',
      university: 'Sapthgiri NPS University',
      department: 'Computer Science & Engineering',
      year: '3rd Year B.Tech',
      photoUrl: `https://images.unsplash.com/photo-${1534528741775 + (participants.length % 12) * 1000}?w=150&auto=format&fit=crop&q=80`,
      linkedinUrl: `https://linkedin.com/in/${quickMemberName.toLowerCase().replace(/\s+/g, '-')}`,
      githubUrl: `https://github.com/${quickMemberName.toLowerCase().replace(/\s+/g, '')}`,
      teamId: addMemberModalTeam.id,
      teamName: addMemberModalTeam.name,
      isLeader: quickMemberIsCaptain,
      totalPoints: memberPts,
      rank: participants.length + 1,
      attendanceRate: 100,
      badges: [
        memberPts >= 40000 ? 'badge-gold' : memberPts >= 25000 ? 'badge-silver' : 'badge-bronze',
        'badge-excellence',
        quickMemberIsCaptain ? 'badge-top-performer' : 'badge-smart-solver'
      ],
      awardTitles: quickMemberIsCaptain ? ['Team Captain'] : ['Core Team Contender'],
      skills: {
        javaFundamentals: 90,
        dataStructures: 88,
        algorithms: 86,
        problemSolving: 90,
        debugging: 85,
        systemDesign: 82,
      },
      dailyReflectionsCount: 13,
      linkedInPostsCount: 13,
    };

    const combinedList = [...updatedExisting, newParticipant];
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(combinedList, teams);

    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    setSettings(prev => ({ ...prev, totalLearners: updatedParticipants.length }));

    const updatedTeam = updatedTeams.find(t => t.id === addMemberModalTeam.id);
    if (rosterModalTeam && rosterModalTeam.id === addMemberModalTeam.id && updatedTeam) {
      setRosterModalTeam(updatedTeam);
    }

    showToast(`Added ${newParticipant.name} (${memberPts.toLocaleString()} pts) to Team ${addMemberModalTeam.name}! Auto-calculated total score: ${updatedTeam?.totalPoints.toLocaleString()} pts.`);
    try {
      confetti({ particleCount: 60, spread: 70 });
    } catch {
      // ignore
    }

    setAddMemberModalTeam(null);
  };

  // Quick update member points from roster modal
  const handleUpdateMemberPoints = (memberId: string, newPoints: number) => {
    const pts = Math.max(0, Number(newPoints) || 0);
    const updatedList = participants.map(p => p.id === memberId ? { ...p, totalPoints: pts } : p);
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(updatedList, teams);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    if (rosterModalTeam) {
      const refreshedTeam = updatedTeams.find(t => t.id === rosterModalTeam.id);
      if (refreshedTeam) setRosterModalTeam(refreshedTeam);
    }
  };

  // Remove member from team in roster modal
  const handleRemoveMemberFromTeam = (member: Participant) => {
    if (!confirm(`Unassign "${member.name}" from this squad?`)) return;
    const updatedList = participants.map(p => {
      if (p.id === member.id) {
        return { ...p, teamId: 'unassigned', teamName: 'Unassigned', isLeader: false };
      }
      return p;
    });
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(updatedList, teams);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    if (rosterModalTeam) {
      const refreshedTeam = updatedTeams.find(t => t.id === rosterModalTeam.id);
      if (refreshedTeam) setRosterModalTeam(refreshedTeam);
    }
    showToast(`Unassigned ${member.name}. Team score auto-calculated and updated.`);
  };

  // Delete team
  const handleDeleteTeam = (team: Team) => {
    const enrolledCount = participants.filter(p => p.teamId === team.id).length;
    if (!confirm(`Are you sure you want to delete Team "${team.name}"? ${enrolledCount} learners will be unassigned.`)) {
      return;
    }

    // Unassign learners
    const updatedParticipantsList = participants.map(p => {
      if (p.teamId === team.id) {
        return { ...p, teamId: 'unassigned', teamName: 'Unassigned', isLeader: false };
      }
      return p;
    });

    const remainingTeams = teams.filter(t => t.id !== team.id);
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(updatedParticipantsList, remainingTeams);

    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    setSettings(prev => ({ ...prev, totalTeams: updatedTeams.length }));
    showToast(`Team "${team.name}" deleted. Standings and rankings updated.`);
  };

  // Save Add / Edit
  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) {
      alert('Please provide a team name and code.');
      return;
    }

    const stageScoresSum = 
      Number(formLearningLeague) + 
      Number(formCodingBattle) + 
      Number(formQuizKahoot) + 
      Number(formHackathonFinale);
    const bonusPoints = Number(formBonusPoints) || 0;

    const parsedTitles = formAwardTitles
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingTeam) {
      // UPDATE EXISTING
      const enrolledMembers = participants.filter(p => p.teamId === editingTeam.id);
      const memberPointsSum = enrolledMembers.reduce((sum, p) => sum + (Number(p.totalPoints) || 0), 0);

      // Auto-calculated team total: member points sum + team bonus points + stage points
      const finalPoints = memberPointsSum + bonusPoints + stageScoresSum;

      const updatedTeamItem: Team = {
        ...editingTeam,
        name: formName.trim(),
        code: formCode.trim().toUpperCase(),
        leaderName: formLeaderName.trim(),
        projectTitle: formProjectTitle.trim(),
        projectDescription: formProjectDesc.trim(),
        githubUrl: formGithubUrl.trim(),
        demoVideoUrl: formDemoUrl.trim(),
        pptUrl: formPptUrl.trim(),
        reportUrl: formReportUrl.trim(),
        stageScores: {
          learningLeague: Number(formLearningLeague),
          codingBattle: Number(formCodingBattle),
          quizKahoot: Number(formQuizKahoot),
          hackathonFinale: Number(formHackathonFinale),
        },
        bonusPoints,
        totalPoints: finalPoints,
        rubricScore: Number(formRubricScore),
        judgeFeedback: formJudgeFeedback.trim(),
        awardedTitles: parsedTitles.length > 0 ? parsedTitles : editingTeam.awardedTitles,
      };

      const updatedTeamsList = teams.map(t => t.id === editingTeam.id ? updatedTeamItem : t);

      // Cascade team rename if name changed
      let currentParticipants = participants;
      let currentCerts = certificates;
      if (editingTeam.name !== formName.trim()) {
        const synced = syncTeamRename(editingTeam.id, formName.trim(), participants, certificates);
        currentParticipants = synced.updatedParticipants;
        currentCerts = synced.updatedCertificates;
        setCertificates(currentCerts);
      }

      const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(currentParticipants, updatedTeamsList);
      setParticipants(updatedParticipants);
      setTeams(updatedTeams);

      setTeamModalOpen(false);
      showToast(`Team "${updatedTeamItem.name}" updated successfully with ${updatedTeamItem.totalPoints.toLocaleString()} real points!`);
    } else {
      // ADD NEW TEAM
      const newId = `team-${formName.toLowerCase().replace(/\s+/g, '-')}-${String(Date.now()).slice(-4)}`;
      const newTeam: Team = {
        id: newId,
        name: formName.trim(),
        code: formCode.trim().toUpperCase(),
        rank: teams.length + 1,
        totalPoints: bonusPoints + stageScoresSum,
        bonusPoints,
        leaderId: '',
        leaderName: formLeaderName.trim() || 'Pending Assignment',
        memberCount: 0,
        projectTitle: formProjectTitle.trim() || 'Java DSA Applied Project',
        projectDescription: formProjectDesc.trim() || 'Core Java implementation showcasing algorithmic optimization.',
        githubUrl: formGithubUrl.trim() || 'https://github.com/champions',
        demoVideoUrl: formDemoUrl.trim() || '',
        pptUrl: formPptUrl.trim() || '',
        reportUrl: formReportUrl.trim() || '',
        stageScores: {
          learningLeague: Number(formLearningLeague),
          codingBattle: Number(formCodingBattle),
          quizKahoot: Number(formQuizKahoot),
          hackathonFinale: Number(formHackathonFinale),
        },
        rubricScore: Number(formRubricScore),
        judgeFeedback: formJudgeFeedback.trim(),
        awardedTitles: parsedTitles.length > 0 ? parsedTitles : ['Contender Team 2026'],
      };

      const updatedTeamsList = [...teams, newTeam];
      const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(participants, updatedTeamsList);

      setParticipants(updatedParticipants);
      setTeams(updatedTeams);
      setSettings(prev => ({ ...prev, totalTeams: updatedTeams.length }));

      setTeamModalOpen(false);
      showToast(`New Team "${newTeam.name}" created with ${newTeam.totalPoints.toLocaleString()} points!`);

      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {
        // ignore
      }
    }
  };

  // Sync All Team Points from Exact Member Sums
  const handleSyncAllTeamsWithMembers = () => {
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(participants, teams);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    showToast(`All ${updatedTeams.length} teams synchronized with real member point totals!`);
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {
      // ignore
    }
  };

  // Filter & sort
  const filteredTeams = teams
    .filter(t => {
      const matchSearch = 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.leaderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'rank') comparison = a.rank - b.rank;
      else if (sortBy === 'points') comparison = b.totalPoints - a.totalPoints;
      else if (sortBy === 'members') comparison = b.memberCount - a.memberCount;
      else if (sortBy === 'rubric') comparison = (b.rubricScore || 0) - (a.rubricScore || 0);

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalPointsCohort = teams.reduce((sum, t) => sum + t.totalPoints, 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-lg shadow-emerald-500/10 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Top Banner & Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Trophy className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white font-royal">Championship Teams & Squads</h2>
                <p className="text-xs text-slate-400">
                  Real numbers, member score aggregations, stage score breakdowns, and rubric standings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                exportTeamsCSV(teams);
                setToastMessage(`Exported ${teams.length} team standings to CSV file.`);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Download full championship team standings as CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Download CSV ({teams.length})
            </button>

            <button
              onClick={handleSyncAllTeamsWithMembers}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Sync team scores with exact sum of member points"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              Sync Points from Members
            </button>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Team
            </button>
          </div>
        </div>

        {/* Real Numeric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Active Contender Teams</span>
            <span className="text-lg font-black text-white font-mono-code">{teams.length}</span>
            <span className="text-[10px] text-emerald-400 block font-medium">Ranked #1 to #{teams.length}</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Cumulative Championship Points</span>
            <span className="text-lg font-black text-amber-400 font-mono-code">{totalPointsCohort.toLocaleString()} pts</span>
            <span className="text-[10px] text-slate-500 block">Real aggregate score</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Champion Leader (Rank #1)</span>
            <span className="text-sm font-bold text-amber-300 truncate block">
              Team {teams[0]?.name || 'N/A'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono-code">
              {teams[0]?.totalPoints.toLocaleString()} pts
            </span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Total Enrolled Members</span>
            <span className="text-lg font-black text-blue-400 font-mono-code">{participants.length}</span>
            <span className="text-[10px] text-slate-500 block">Across all teams</span>
          </div>
        </div>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search teams by name, code, leader, project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
          >
            <option value="rank">Rank (#1 First)</option>
            <option value="points">Total Points</option>
            <option value="members">Member Count</option>
            <option value="rubric">Rubric Score</option>
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-400 hover:text-white"
            title="Toggle Sort Order"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeams.map((team) => {
          const enrolledMembers = participants.filter(p => p.teamId === team.id);
          const memberPointsSum = enrolledMembers.reduce((sum, p) => sum + (Number(p.totalPoints) || 0), 0);
          const stageScoresSum = 
            Number(team.stageScores?.learningLeague || 0) + 
            Number(team.stageScores?.codingBattle || 0) + 
            Number(team.stageScores?.quizKahoot || 0) + 
            Number(team.stageScores?.hackathonFinale || 0);
          const teamBonus = Number(team.bonusPoints) || 0;

          return (
            <div 
              key={team.id} 
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl space-y-3.5 shadow-lg transition duration-150"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                    team.rank === 1
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : team.rank === 2
                      ? 'bg-slate-300 text-slate-950'
                      : team.rank === 3
                      ? 'bg-amber-800 text-amber-100'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    #{team.rank}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">Team {team.name}</h3>
                      <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-slate-950 text-amber-300 border border-slate-800">
                        {team.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Crown className="w-3 h-3 text-amber-400" />
                      <span>Captain: <strong className="text-slate-200">{team.leaderName}</strong></span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-amber-400 font-mono-code block">
                    {team.totalPoints.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-code">auto-total pts</span>
                </div>
              </div>

              {/* Point Composition Bar */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-slate-300">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>Members: <strong className="font-mono-code text-white">{memberPointsSum.toLocaleString()}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-amber-300">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  <span>Bonus: <strong className="font-mono-code text-amber-400">+{teamBonus.toLocaleString()}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Stages: <strong className="font-mono-code text-slate-300">+{stageScoresSum.toLocaleString()}</strong></span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-semibold block mb-0.5">Project Title</span>
                <p className="font-bold text-slate-200 line-clamp-1">{team.projectTitle}</p>
                <p className="text-slate-400 text-[11px] line-clamp-2 mt-1">{team.projectDescription}</p>
              </div>

              {/* Stage Breakdown Badges */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">League</span>
                  <span className="font-mono-code font-bold text-slate-300">{team.stageScores?.learningLeague.toLocaleString()}</span>
                </div>
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Battle</span>
                  <span className="font-mono-code font-bold text-slate-300">{team.stageScores?.codingBattle.toLocaleString()}</span>
                </div>
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Kahoot</span>
                  <span className="font-mono-code font-bold text-slate-300">{team.stageScores?.quizKahoot.toLocaleString()}</span>
                </div>
                <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Finale</span>
                  <span className="font-mono-code font-bold text-slate-300">{team.stageScores?.hackathonFinale.toLocaleString()}</span>
                </div>
              </div>

              {/* Footer with Direct Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setRosterModalTeam(team)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>Roster ({enrolledMembers.length})</span>
                  </button>

                  <button
                    onClick={() => handleOpenAddMemberModal(team)}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 border border-blue-500/30 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
                    title="Quick Add Team Member"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Member</span>
                  </button>

                  <button
                    onClick={() => handleOpenBonusModal(team)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
                    title="Add or Adjust Team Bonus Points"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400/30" />
                    <span>⭐ Bonus</span>
                  </button>

                  {onOpenBulkModal && (
                    <button
                      onClick={() => onOpenBulkModal('team', team.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37]/30 text-[#ffd700] hover:text-white border border-[#d4af37]/40 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                      title="Issue Team Certificates (Black & Gold Theme)"
                    >
                      <Award className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>Issue Certs</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(team)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
                    title="Edit Team Information & Scores"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteTeam(team)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition cursor-pointer"
                    title="Delete Team"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROSTER MODAL */}
      {rosterModalTeam && (() => {
        const enrolled = participants
          .filter(p => p.teamId === rosterModalTeam.id)
          .sort((a, b) => b.totalPoints - a.totalPoints);
        const membersSum = enrolled.reduce((s, p) => s + (Number(p.totalPoints) || 0), 0);
        const bonusPts = Number(rosterModalTeam.bonusPoints) || 0;
        const stagesSum = 
          Number(rosterModalTeam.stageScores?.learningLeague || 0) + 
          Number(rosterModalTeam.stageScores?.codingBattle || 0) + 
          Number(rosterModalTeam.stageScores?.quizKahoot || 0) + 
          Number(rosterModalTeam.stageScores?.hackathonFinale || 0);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-h-[88vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                    #{rosterModalTeam.rank}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Team {rosterModalTeam.name} Roster & Score Breakdown</h3>
                    <p className="text-[11px] text-slate-400">
                      Auto-calculated team total: <strong className="text-amber-400 font-mono-code">{rosterModalTeam.totalPoints.toLocaleString()} pts</strong>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAddMemberModal(rosterModalTeam)}
                    className="px-2.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Add Member</span>
                  </button>
                  <button
                    onClick={() => handleOpenBonusModal(rosterModalTeam)}
                    className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>⭐ Bonus</span>
                  </button>
                  <button onClick={() => setRosterModalTeam(null)} className="text-slate-400 hover:text-white cursor-pointer px-1">✕</button>
                </div>
              </div>

              {/* Real numbers formula bar */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">👥 Members ({enrolled.length})</span>
                  <span className="font-mono-code font-bold text-white">{membersSum.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 block">⭐ Team Bonus</span>
                  <span className="font-mono-code font-bold text-amber-400">+{bonusPts.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">⚔️ Stages</span>
                  <span className="font-mono-code font-bold text-slate-300">+{stagesSum.toLocaleString()}</span>
                </div>
                <div className="bg-amber-500/10 rounded-lg p-1 border border-amber-500/30">
                  <span className="text-[10px] text-amber-300 block font-bold">Auto-Calculated Total</span>
                  <span className="font-mono-code font-black text-amber-400">{rosterModalTeam.totalPoints.toLocaleString()} pts</span>
                </div>
              </div>

              <div className="space-y-2">
                {enrolled.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800/80">
                    <p className="text-xs text-slate-400 mb-3">No learners are currently assigned to this team.</p>
                    <button
                      onClick={() => handleOpenAddMemberModal(rosterModalTeam)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add First Team Member</span>
                    </button>
                  </div>
                ) : (
                  enrolled.map((m, idx) => (
                    <div key={m.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{m.name}</span>
                            {m.isLeader && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                                Captain
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono-code">{m.usn} • {m.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <label className="text-[9px] text-slate-500 block uppercase">Points (No Limit)</label>
                          <input
                            type="number"
                            min={0}
                            defaultValue={m.totalPoints}
                            onBlur={(e) => handleUpdateMemberPoints(m.id, Number(e.target.value))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateMemberPoints(m.id, Number((e.target as HTMLInputElement).value));
                              }
                            }}
                            className="w-24 px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-right font-mono-code font-bold text-amber-400 focus:outline-none focus:border-amber-400 text-xs"
                          />
                        </div>

                        <button
                          onClick={() => handleRemoveMemberFromTeam(m)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-slate-800 transition cursor-pointer"
                          title="Unassign member from this team"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 text-[11px]">
                  💡 Changing any member's points automatically recalculates team scores and leaderboard rankings instantly.
                </span>
                <button
                  onClick={() => setRosterModalTeam(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close Roster
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ADD / EDIT TEAM MODAL */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Trophy className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingTeam ? `Edit Team: ${editingTeam.name}` : 'Add New Championship Team'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Real numbers and actual stage scores dictate leaderboard ranks.
                  </p>
                </div>
              </div>
              <button onClick={() => setTeamModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Team Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Toxicos"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Team Code <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="e.g. TOX-2026"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono-code focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Captain / Leader Name</label>
                  <input
                    type="text"
                    value={formLeaderName}
                    onChange={(e) => setFormLeaderName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Judge Rubric Score (/100)</label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={100}
                    value={formRubricScore}
                    onChange={(e) => setFormRubricScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-amber-300 font-mono-code focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Stage Scores Breakdown */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    Stage Scores Breakdown (Real Numbers)
                  </h4>
                  <span className="font-mono-code text-xs text-slate-300">
                    Sum: <strong className="text-amber-400">
                      {(Number(formLearningLeague) + Number(formCodingBattle) + Number(formQuizKahoot) + Number(formHackathonFinale)).toLocaleString()}
                    </strong> pts
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">Learning League</label>
                    <input
                      type="number"
                      min={0}
                      value={formLearningLeague}
                      onChange={(e) => setFormLearningLeague(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono-code text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">Coding Battle</label>
                    <input
                      type="number"
                      min={0}
                      value={formCodingBattle}
                      onChange={(e) => setFormCodingBattle(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono-code text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">Quiz Kahoot</label>
                    <input
                      type="number"
                      min={0}
                      value={formQuizKahoot}
                      onChange={(e) => setFormQuizKahoot(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono-code text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">Hackathon Finale</label>
                    <input
                      type="number"
                      min={0}
                      value={formHackathonFinale}
                      onChange={(e) => setFormHackathonFinale(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono-code text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bonus Points Section with Real-Time Auto-Calculate Preview */}
              {(() => {
                const currentEnrolled = editingTeam ? participants.filter(p => p.teamId === editingTeam.id) : [];
                const currentMemberSum = currentEnrolled.reduce((sum, p) => sum + (Number(p.totalPoints) || 0), 0);
                const currentStageSum = Number(formLearningLeague) + Number(formCodingBattle) + Number(formQuizKahoot) + Number(formHackathonFinale);
                const currentBonus = Math.max(0, Number(formBonusPoints) || 0);
                const autoCalculatedTotal = currentMemberSum + currentBonus + currentStageSum;

                return (
                  <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 rounded-xl border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                        Additional Bonus Points for Individual Team
                      </h4>
                      <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        No Point Limit
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Team Bonus Points (pts)
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={formBonusPoints}
                          onChange={(e) => setFormBonusPoints(Math.max(0, Number(e.target.value)))}
                          placeholder="e.g. 5000"
                          className="w-full px-3 py-2 bg-slate-900 border border-amber-500/40 rounded-lg text-amber-300 font-mono-code font-bold text-sm focus:outline-none focus:border-amber-400"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Discretionary team bonus for outstanding innovation, rapid completion, or jury citation.
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] space-y-1">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                          Auto-Calculation Forecast
                        </span>
                        <div className="flex justify-between text-slate-300">
                          <span>👥 Members ({currentEnrolled.length}):</span>
                          <span className="font-mono-code">{currentMemberSum.toLocaleString()} pts</span>
                        </div>
                        <div className="flex justify-between text-amber-300 font-semibold">
                          <span>⭐ Team Bonus:</span>
                          <span className="font-mono-code">+{currentBonus.toLocaleString()} pts</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>⚔️ Stages Sum:</span>
                          <span className="font-mono-code">+{currentStageSum.toLocaleString()} pts</span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-800 flex justify-between font-bold text-white text-xs">
                          <span className="text-amber-400">🏆 Team Total Score:</span>
                          <span className="font-mono-code text-amber-400 font-black">
                            {autoCalculatedTotal.toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Project & Repositories */}
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Project Title</label>
                  <input
                    type="text"
                    value={formProjectTitle}
                    onChange={(e) => setFormProjectTitle(e.target.value)}
                    placeholder="e.g. Distributed Graph Routing Engine"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Project Technical Description</label>
                  <textarea
                    rows={2}
                    value={formProjectDesc}
                    onChange={(e) => setFormProjectDesc(e.target.value)}
                    placeholder="Describe technical implementation, algorithms, and results..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={formGithubUrl}
                      onChange={(e) => setFormGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Demo Video URL</label>
                    <input
                      type="url"
                      value={formDemoUrl}
                      onChange={(e) => setFormDemoUrl(e.target.value)}
                      placeholder="https://youtube.com/..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Awarded Titles (comma-separated)</label>
                  <input
                    type="text"
                    value={formAwardTitles}
                    onChange={(e) => setFormAwardTitles(e.target.value)}
                    placeholder="e.g. Champion Team 2026, Best Technical Solution"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {editingTeam ? 'Save Team & Recalculate' : 'Create Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK BONUS POINTS MODAL */}
      {bonusModalTeam && (() => {
        const enrolled = participants.filter(p => p.teamId === bonusModalTeam.id);
        const membersSum = enrolled.reduce((s, p) => s + (Number(p.totalPoints) || 0), 0);
        const stageSum = 
          Number(bonusModalTeam.stageScores?.learningLeague || 0) + 
          Number(bonusModalTeam.stageScores?.codingBattle || 0) + 
          Number(bonusModalTeam.stageScores?.quizKahoot || 0) + 
          Number(bonusModalTeam.stageScores?.hackathonFinale || 0);
        const computedBonus = Math.max(0, Number(quickBonusPoints) || 0);
        const projectedTotal = membersSum + computedBonus + stageSum;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Star className="w-5 h-5 fill-amber-400/20" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Award Team Bonus Points</h3>
                    <p className="text-[11px] text-slate-400">
                      Team <strong className="text-amber-300">{bonusModalTeam.name}</strong> ({bonusModalTeam.code})
                    </p>
                  </div>
                </div>
                <button onClick={() => setBonusModalTeam(null)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleSaveQuickBonus} className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-200 font-semibold">
                      Bonus Points for This Team (pts)
                    </label>
                    <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      No Limit on Point Values
                    </span>
                  </div>

                  <input
                    type="number"
                    min={0}
                    value={quickBonusPoints}
                    onChange={(e) => setQuickBonusPoints(Math.max(0, Number(e.target.value)))}
                    placeholder="Enter bonus points..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-amber-500/50 rounded-xl text-amber-300 font-mono-code font-black text-lg focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Bonus points are added directly to this team's score alongside individual member points and stage challenges.
                  </p>
                </div>

                {/* Quick Add Buttons */}
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">
                    Quick Increment Presets
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[500, 1000, 2500, 5000, 10000, 25000].map((inc) => (
                      <button
                        type="button"
                        key={inc}
                        onClick={() => setQuickBonusPoints(prev => (Number(prev) || 0) + inc)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono-code font-bold transition cursor-pointer"
                      >
                        +{inc.toLocaleString()}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setQuickBonusPoints(0)}
                      className="px-2.5 py-1 bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Reset 0
                    </button>
                  </div>
                </div>

                {/* Auto-Calculation Real-time Breakdown */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>👥 Enrolled Members ({enrolled.length}):</span>
                    <span className="font-mono-code text-slate-200">{membersSum.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-semibold">
                    <span>⭐ Team Bonus Points:</span>
                    <span className="font-mono-code">+{computedBonus.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>⚔️ Stage Challenge Scores:</span>
                    <span className="font-mono-code text-slate-300">+{stageSum.toLocaleString()} pts</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-sm">
                    <span className="text-amber-400">🏆 Auto-Calculated Total:</span>
                    <span className="font-mono-code text-amber-400 font-black">
                      {projectedTotal.toLocaleString()} pts
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setBonusModalTeam(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Bonus & Auto-Calculate</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

      {/* QUICK ADD TEAM MEMBER MODAL */}
      {addMemberModalTeam && (() => {
        const enrolled = participants.filter(p => p.teamId === addMemberModalTeam.id);
        const membersSum = enrolled.reduce((s, p) => s + (Number(p.totalPoints) || 0), 0);
        const bonusPts = Number(addMemberModalTeam.bonusPoints) || 0;
        const stageSum = 
          Number(addMemberModalTeam.stageScores?.learningLeague || 0) + 
          Number(addMemberModalTeam.stageScores?.codingBattle || 0) + 
          Number(addMemberModalTeam.stageScores?.quizKahoot || 0) + 
          Number(addMemberModalTeam.stageScores?.hackathonFinale || 0);
        const newMemberPts = Math.max(0, Number(quickMemberPoints) || 0);
        const projectedTotal = membersSum + newMemberPts + bonusPts + stageSum;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <UserPlus className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Add Team Member</h3>
                    <p className="text-[11px] text-slate-400">
                      Assign learner to Team <strong className="text-blue-300">{addMemberModalTeam.name}</strong>
                    </p>
                  </div>
                </div>
                <button onClick={() => setAddMemberModalTeam(null)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleSaveQuickMember} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Learner Full Name *</label>
                  <input
                    type="text"
                    required
                    value={quickMemberName}
                    onChange={(e) => setQuickMemberName(e.target.value)}
                    placeholder="e.g. Rohith Kumar"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">University USN *</label>
                    <input
                      type="text"
                      required
                      value={quickMemberUsn}
                      onChange={(e) => setQuickMemberUsn(e.target.value.toUpperCase())}
                      placeholder="1SN22CS101"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono-code focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-slate-300 font-semibold">
                        Learner Points *
                      </label>
                      <span className="text-[9px] text-blue-300 font-bold px-1.5 py-0.2 rounded bg-blue-500/10">
                        No Limit
                      </span>
                    </div>
                    <input
                      type="number"
                      min={0}
                      required
                      value={quickMemberPoints}
                      onChange={(e) => setQuickMemberPoints(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-mono-code font-bold focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                {/* Point Presets */}
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                    Quick Points Presets
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[10000, 20000, 25000, 35000, 50000, 75000].map((pts) => (
                      <button
                        type="button"
                        key={pts}
                        onClick={() => setQuickMemberPoints(pts)}
                        className={`px-2 py-0.5 rounded text-xs font-mono-code font-bold transition cursor-pointer ${
                          quickMemberPoints === pts 
                            ? 'bg-blue-500 text-slate-950' 
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {pts.toLocaleString()} pts
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="quickCaptainCheck"
                    checked={quickMemberIsCaptain}
                    onChange={(e) => setQuickMemberIsCaptain(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <label htmlFor="quickCaptainCheck" className="text-slate-300 font-semibold cursor-pointer">
                    Designate as Team Captain
                  </label>
                </div>

                {/* Live Forecast */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Team Score Auto-Calculation Impact
                  </span>
                  <div className="flex justify-between text-slate-400">
                    <span>Current Team Score:</span>
                    <span className="font-mono-code text-slate-300">{addMemberModalTeam.totalPoints.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between text-blue-300 font-semibold">
                    <span>+ New Member Contribution ({quickMemberName.trim() || 'New Learner'}):</span>
                    <span className="font-mono-code">+{newMemberPts.toLocaleString()} pts</span>
                  </div>
                  {bonusPts > 0 && (
                    <div className="flex justify-between text-amber-300">
                      <span>⭐ Team Bonus Points:</span>
                      <span className="font-mono-code">+{bonusPts.toLocaleString()} pts</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-sm">
                    <span className="text-amber-400">🏆 Projected Auto-Calculated Total:</span>
                    <span className="font-mono-code text-amber-400 font-black">
                      {projectedTotal.toLocaleString()} pts
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setAddMemberModalTeam(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-400 text-slate-950 rounded-xl font-bold shadow-lg shadow-blue-500/20 cursor-pointer flex items-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Member & Recalculate</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
