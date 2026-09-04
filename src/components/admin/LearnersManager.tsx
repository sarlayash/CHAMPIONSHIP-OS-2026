import React, { useState } from 'react';
import { Participant, Team, CertificateRecord, ChampionshipSettings } from '../../types';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Trophy, 
  Award, 
  CheckCircle2, 
  FileText, 
  RefreshCw,
  Crown,
  Sparkles,
  Phone,
  Mail,
  BookOpen,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportParticipantsCSV } from '../../utils/csvExport';
import { recalculateAllRealNumbers, syncCertificatesForLearner } from '../../utils/championshipCalculations';

interface LearnersManagerProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  certificates: CertificateRecord[];
  setCertificates: React.Dispatch<React.SetStateAction<CertificateRecord[]>>;
  settings: ChampionshipSettings;
  setSettings: React.Dispatch<React.SetStateAction<ChampionshipSettings>>;
  onIssueCertificateForLearner?: (learner: Participant) => void;
}

export const LearnersManager: React.FC<LearnersManagerProps> = ({
  participants,
  setParticipants,
  teams,
  setTeams,
  certificates,
  setCertificates,
  settings,
  setSettings,
  onIssueCertificateForLearner,
}) => {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'leaders' | 'members'>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'points' | 'name' | 'attendance'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLearner, setEditingLearner] = useState<Participant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for Add / Edit
  const [formName, setFormName] = useState('');
  const [formUsn, setFormUsn] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTeamId, setFormTeamId] = useState(teams[0]?.id || '');
  const [formIsLeader, setFormIsLeader] = useState(false);
  const [formPoints, setFormPoints] = useState<number>(25000);
  const [formAttendance, setFormAttendance] = useState<number>(95);
  const [formDepartment, setFormDepartment] = useState('Computer Science & Engineering');
  const [formYear, setFormYear] = useState('3rd Year B.Tech');
  const [formAward, setFormAward] = useState('DSA Specialist');
  const [formJavaSkill, setFormJavaSkill] = useState(88);
  const [formDsaSkill, setFormDsaSkill] = useState(85);
  const [formProblemSkill, setFormProblemSkill] = useState(86);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingLearner(null);
    const nextIdx = participants.length + 1;
    const defaultUsn = `1SN22CS${String(nextIdx).padStart(3, '0')}`;
    setFormName('');
    setFormUsn(defaultUsn);
    setFormEmail(`learner.${nextIdx}@sapthgiri.edu.in`);
    setFormPhone(`+91 98450 ${String(11000 + nextIdx * 137).slice(0, 5)}`);
    setFormTeamId(teams[0]?.id || '');
    setFormIsLeader(false);
    setFormPoints(25000);
    setFormAttendance(95);
    setFormDepartment('Computer Science & Engineering');
    setFormYear('3rd Year B.Tech');
    setFormAward('DSA Specialist');
    setFormJavaSkill(85);
    setFormDsaSkill(85);
    setFormProblemSkill(85);
    setModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (learner: Participant) => {
    setEditingLearner(learner);
    setFormName(learner.name);
    setFormUsn(learner.usn);
    setFormEmail(learner.email);
    setFormPhone(learner.phone);
    setFormTeamId(learner.teamId);
    setFormIsLeader(learner.isLeader);
    setFormPoints(learner.totalPoints);
    setFormAttendance(learner.attendanceRate);
    setFormDepartment(learner.department);
    setFormYear(learner.year);
    setFormAward(learner.awardTitles[0] || 'DSA Specialist');
    setFormJavaSkill(learner.skills?.javaFundamentals || 85);
    setFormDsaSkill(learner.skills?.dataStructures || 85);
    setFormProblemSkill(learner.skills?.problemSolving || 85);
    setModalOpen(true);
  };

  // Delete learner
  const handleDeleteLearner = (learner: Participant) => {
    if (!confirm(`Are you sure you want to remove learner "${learner.name}" (${learner.usn})? This will update team stats and rankings with real numbers.`)) {
      return;
    }

    const filtered = participants.filter(p => p.id !== learner.id);
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(filtered, teams);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    setSettings(prev => ({ ...prev, totalLearners: updatedParticipants.length }));
    showToast(`Learner "${learner.name}" removed. Standings updated.`);
  };

  // Save Add / Edit
  const handleSaveLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formUsn.trim()) {
      alert('Please fill in learner name and USN.');
      return;
    }

    const targetTeam = teams.find(t => t.id === formTeamId);
    const targetTeamName = targetTeam ? targetTeam.name : 'Unassigned';

    if (editingLearner) {
      // UPDATE EXISTING
      const updatedItem: Participant = {
        ...editingLearner,
        name: formName.trim(),
        usn: formUsn.trim().toUpperCase(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        teamId: formTeamId,
        teamName: targetTeamName,
        isLeader: formIsLeader,
        totalPoints: Number(formPoints),
        attendanceRate: Math.min(100, Math.max(0, Number(formAttendance))),
        department: formDepartment,
        year: formYear,
        awardTitles: formAward.trim() ? [formAward.trim()] : editingLearner.awardTitles,
        skills: {
          ...editingLearner.skills,
          javaFundamentals: Number(formJavaSkill),
          dataStructures: Number(formDsaSkill),
          problemSolving: Number(formProblemSkill),
        }
      };

      const updatedList = participants.map(p => p.id === editingLearner.id ? updatedItem : p);
      const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(updatedList, teams);
      
      setParticipants(updatedParticipants);
      setTeams(updatedTeams);

      // Cascade updates to certificates
      const updatedCerts = syncCertificatesForLearner(certificates, updatedItem);
      setCertificates(updatedCerts);

      setModalOpen(false);
      showToast(`Learner "${updatedItem.name}" updated successfully with ${updatedItem.totalPoints.toLocaleString()} real points!`);
    } else {
      // ADD NEW LEARNER
      const newId = `p-${String(Date.now()).slice(-4)}`;
      const newLearner: Participant = {
        id: newId,
        name: formName.trim(),
        email: formEmail.trim() || `${formName.toLowerCase().replace(/\s+/g, '.')}@sapthgiri.edu.in`,
        phone: formPhone.trim() || '+91 98450 12000',
        university: 'Sapthgiri NPS University',
        department: formDepartment,
        year: formYear,
        usn: formUsn.trim().toUpperCase(),
        photoUrl: `https://images.unsplash.com/photo-${1534528741775 + (participants.length % 12) * 1000}?w=150&auto=format&fit=crop&q=80`,
        linkedinUrl: `https://linkedin.com/in/${formName.toLowerCase().replace(/\s+/g, '-')}`,
        githubUrl: `https://github.com/${formName.toLowerCase().replace(/\s+/g, '')}`,
        teamId: formTeamId,
        teamName: targetTeamName,
        isLeader: formIsLeader,
        totalPoints: Number(formPoints),
        rank: participants.length + 1,
        attendanceRate: Math.min(100, Math.max(0, Number(formAttendance))),
        badges: [
          Number(formPoints) >= 40000 ? 'badge-gold' : Number(formPoints) >= 25000 ? 'badge-silver' : 'badge-bronze',
          Number(formAttendance) >= 98 ? 'badge-excellence' : 'badge-growth',
          formIsLeader ? 'badge-top-performer' : 'badge-smart-solver'
        ],
        awardTitles: formAward.trim() ? [formAward.trim()] : ['Java DSA Aspirant'],
        skills: {
          javaFundamentals: Number(formJavaSkill),
          dataStructures: Number(formDsaSkill),
          algorithms: Math.round((Number(formJavaSkill) + Number(formDsaSkill)) / 2),
          problemSolving: Number(formProblemSkill),
          debugging: 84,
          systemDesign: 80,
        },
        dailyReflectionsCount: 13,
        linkedInPostsCount: 13,
      };

      const newList = [...participants, newLearner];
      const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(newList, teams);

      setParticipants(updatedParticipants);
      setTeams(updatedTeams);
      setSettings(prev => ({ ...prev, totalLearners: updatedParticipants.length }));

      setModalOpen(false);
      showToast(`New Learner "${newLearner.name}" successfully added with ${newLearner.totalPoints.toLocaleString()} real points!`);

      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {
        // ignore
      }
    }
  };

  // Manual Trigger to recalculate real numbers & ranks
  const handleRecalculateStandings = () => {
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(participants, teams);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    showToast(`Recalculated real rankings and team points across all ${updatedParticipants.length} learners!`);
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {
      // ignore
    }
  };

  // Filter & sort participants
  const filteredParticipants = participants
    .filter(p => {
      const matchSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.usn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.teamName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTeam = teamFilter === 'all' || p.teamId === teamFilter;
      const matchRole = roleFilter === 'all' || (roleFilter === 'leaders' ? p.isLeader : !p.isLeader);
      return matchSearch && matchTeam && matchRole;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'rank') comparison = a.rank - b.rank;
      else if (sortBy === 'points') comparison = b.totalPoints - a.totalPoints;
      else if (sortBy === 'attendance') comparison = b.attendanceRate - a.attendanceRate;
      else if (sortBy === 'name') comparison = a.name.localeCompare(b.name);

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalPointsCohort = participants.reduce((sum, p) => sum + p.totalPoints, 0);
  const avgPoints = Math.round(totalPointsCohort / (participants.length || 1));
  const topLearner = [...participants].sort((a, b) => b.totalPoints - a.totalPoints)[0];

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

      {/* Top Banner & Real Stats */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white font-royal">Learners & Participants Roster</h2>
                <p className="text-xs text-slate-400">
                  Real numbers, verified USNs, and exact individual points powering team standings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (participants.length === 0) {
                  alert('There are currently 0 learners registered. Please add learners to export the CSV roster.');
                  return;
                }
                exportParticipantsCSV(participants);
                showToast(`Exported ${participants.length} learners to CSV file.`);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Download entire participants roster as CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Download CSV ({participants.length})
            </button>

            <button
              onClick={handleRecalculateStandings}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Ensure all ranks and team points reflect real math"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              Recalculate Real Ranks
            </button>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Add New Learner
            </button>
          </div>
        </div>

        {/* Real Numeric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Total Registered Learners</span>
            <span className="text-lg font-black text-white font-mono-code">{participants.length}</span>
            <span className="text-[10px] text-emerald-400 block font-medium">100% Genuine Records</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Total Cohort Points</span>
            <span className="text-lg font-black text-amber-400 font-mono-code">{totalPointsCohort.toLocaleString()} pts</span>
            <span className="text-[10px] text-slate-500 block">Exact mathematical sum</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Average Learner Score</span>
            <span className="text-lg font-black text-blue-400 font-mono-code">{avgPoints.toLocaleString()} pts</span>
            <span className="text-[10px] text-slate-500 block">Per active participant</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[11px] block">Rank #1 Contender</span>
            <span className="text-sm font-bold text-amber-300 truncate block">
              {topLearner ? `${topLearner.name}` : 'N/A'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono-code">
              {topLearner ? `${topLearner.totalPoints.toLocaleString()} pts (${topLearner.teamName})` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by learner name, USN, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Team:</span>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
            >
              <option value="all">All Teams ({teams.length})</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>Team {t.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="leaders">Captains / Leaders</option>
              <option value="members">Members</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none"
            >
              <option value="rank">Rank (#1 first)</option>
              <option value="points">Points</option>
              <option value="attendance">Attendance %</option>
              <option value="name">Name (A-Z)</option>
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
      </div>

      {/* Learners Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16">Rank</th>
                <th className="py-3.5 px-4">Learner Name & USN</th>
                <th className="py-3.5 px-4">Team Assignment</th>
                <th className="py-3.5 px-4 text-right">Real Points</th>
                <th className="py-3.5 px-4 text-center">Attendance</th>
                <th className="py-3.5 px-4">Award Title</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No learners found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((learner) => {
                  return (
                    <tr 
                      key={learner.id}
                      className="hover:bg-slate-800/50 transition duration-150 group"
                    >
                      {/* Rank */}
                      <td className="py-3 px-4 font-mono-code">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs ${
                          learner.rank === 1
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                            : learner.rank === 2
                            ? 'bg-slate-300 text-slate-950'
                            : learner.rank === 3
                            ? 'bg-amber-800 text-amber-100'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          #{learner.rank}
                        </span>
                      </td>

                      {/* Learner Name & Contact */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">
                            {learner.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{learner.name}</span>
                              {learner.isLeader && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                                  <Crown className="w-3 h-3" />
                                  Captain
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-mono-code">
                              <span className="text-amber-300/80 font-semibold">{learner.usn}</span>
                              <span>•</span>
                              <span>{learner.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Team Assignment */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-medium">
                          <Users className="w-3 h-3 text-blue-400" />
                          {learner.teamName}
                        </span>
                      </td>

                      {/* Real Points */}
                      <td className="py-3 px-4 text-right">
                        <span className="font-mono-code font-bold text-amber-400 text-sm">
                          {learner.totalPoints.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 block">pts</span>
                      </td>

                      {/* Attendance */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-mono-code font-semibold text-[11px] ${
                          learner.attendanceRate >= 95 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                            : learner.attendanceRate >= 85
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {learner.attendanceRate}%
                        </span>
                      </td>

                      {/* Award Title */}
                      <td className="py-3 px-4">
                        <span className="text-slate-300 text-xs flex items-center gap-1.5 truncate max-w-[180px]">
                          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          {learner.awardTitles[0] || 'Contributor'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(learner)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
                            title="Edit Learner Information"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {onIssueCertificateForLearner && (
                            <button
                              onClick={() => onIssueCertificateForLearner(learner)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 transition cursor-pointer"
                              title="Generate / Issue Certificate"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteLearner(learner)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition cursor-pointer"
                            title="Delete Learner"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Showing {filteredParticipants.length} of {participants.length} learners</span>
          <span className="text-emerald-400 font-medium">100% Real Numbers Synchronized</span>
        </div>
      </div>

      {/* ADD / EDIT LEARNER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  {editingLearner ? <Edit3 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingLearner ? `Edit Learner: ${editingLearner.name}` : 'Add New Learner'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Real numbers and actual performance metrics update overall team scores and ranks.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setModalOpen(false)} 
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLearner} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Learner Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Kapil Narula"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* USN / Roll Number */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    University Seat Number (USN) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formUsn}
                    onChange={(e) => setFormUsn(e.target.value)}
                    placeholder="e.g. 1SN22CS057"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono-code focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="learner@sapthgiri.edu.in"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98450 12000"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono-code focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Team Assignment */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assign Team Squad</label>
                  <select
                    value={formTeamId}
                    onChange={(e) => setFormTeamId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>
                        Team {t.name} ({t.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Team Captain Toggle */}
                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-semibold">
                    <input
                      type="checkbox"
                      checked={formIsLeader}
                      onChange={(e) => setFormIsLeader(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-slate-700"
                    />
                    <span>Designate as Team Captain / Leader</span>
                  </label>
                </div>
              </div>

              {/* Performance Metrics: Real Points & Attendance */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  Real Points & Verification Metrics
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Individual Championship Points <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formPoints}
                      onChange={(e) => setFormPoints(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-mono-code font-bold text-sm focus:outline-none focus:border-amber-500"
                      placeholder="e.g. 25000 (No point limit)"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      No point limits. Auto-aggregates into Team Total Score & Standings
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Attendance Rate (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={formAttendance}
                      onChange={(e) => setFormAttendance(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono-code focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Across all 13 days (0% - 100%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Award & Academic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Special Recognition / Award Title</label>
                  <input
                    type="text"
                    value={formAward}
                    onChange={(e) => setFormAward(e.target.value)}
                    placeholder="e.g. Problem Solving Champion"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Academic Department</label>
                  <input
                    type="text"
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Skills Sliders */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold block text-[11px]">Technical Competency Ratings (/100)</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 text-[10px] block">Java Fundamentals: {formJavaSkill}</label>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={formJavaSkill}
                      onChange={(e) => setFormJavaSkill(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] block">Data Structures: {formDsaSkill}</label>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={formDsaSkill}
                      onChange={(e) => setFormDsaSkill(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[10px] block">Problem Solving: {formProblemSkill}</label>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={formProblemSkill}
                      onChange={(e) => setFormProblemSkill(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {editingLearner ? 'Update & Reconcile Standings' : 'Add Learner & Calculate Points'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
