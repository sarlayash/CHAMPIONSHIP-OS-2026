import React, { useState } from 'react';
import { 
  Team, 
  Participant, 
  CertificateRecord, 
  ChampionshipSettings,
  RubricCriterion,
  AwardItem,
  CertificateCategory
} from '../../types';
import { 
  ShieldCheck, 
  Users, 
  Trophy, 
  FileText, 
  Download, 
  Plus, 
  CheckCircle2, 
  Search, 
  Settings as SettingsIcon, 
  Layers, 
  Mail, 
  Sliders, 
  Trash2, 
  Eye, 
  Activity, 
  Lock,
  LogOut,
  RefreshCw,
  Sparkles,
  Save,
  BookOpen,
  ChevronDown,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportParticipantsCSV, exportTeamsCSV, exportCertificatesCSV } from '../../utils/csvExport';
import { LearnersManager } from './LearnersManager';
import { TeamsManager } from './TeamsManager';
import { RealNumbersAudit } from './RealNumbersAudit';
import { AdminUserManual } from './AdminUserManual';

interface AdminPortalProps {
  isAdminLoggedIn: boolean;
  onLogin: (id: string, pass: string) => boolean;
  onLogout: () => void;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  certificates: CertificateRecord[];
  setCertificates: React.Dispatch<React.SetStateAction<CertificateRecord[]>>;
  settings: ChampionshipSettings;
  setSettings: React.Dispatch<React.SetStateAction<ChampionshipSettings>>;
  rubricCriteria: RubricCriterion[];
  awards: AwardItem[];
  onOpenBulkModal: () => void;
  onViewCertificate: (cert: CertificateRecord) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isAdminLoggedIn,
  onLogin,
  onLogout,
  teams,
  setTeams,
  participants,
  setParticipants,
  certificates,
  setCertificates,
  settings,
  setSettings,
  rubricCriteria,
  awards,
  onOpenBulkModal,
  onViewCertificate,
}) => {
  // Login form state - hardcoded to KAPILADMIN / ADMIN123
  const [adminId, setAdminId] = useState('KAPILADMIN');
  const [password, setPassword] = useState('ADMIN123');
  const [loginError, setLoginError] = useState('');
  const [showLoginManual, setShowLoginManual] = useState(false);

  // Admin tabs - defaulted to learners for direct CRUD access
  const [activeTab, setActiveTab] = useState<'learners' | 'teams' | 'certificates' | 'rubric' | 'audit' | 'settings' | 'manual'>('learners');

  // Search & Filters for certificates
  const [searchCertQuery, setSearchCertQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');

  // Rubric evaluation state (Starts strictly at zero)
  const [evalTeamId, setEvalTeamId] = useState<string>(teams[0]?.id || '');
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({
    'rb-1': 0,
    'rb-2': 0,
    'rb-3': 0,
    'rb-4': 0,
    'rb-5': 0,
    'rb-6': 0,
  });
  const [evalFeedback, setEvalFeedback] = useState('');
  const [rubricSavedToast, setRubricSavedToast] = useState(false);

  // Settings form state
  const [tempSettings, setTempSettings] = useState<ChampionshipSettings>(settings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Single Certificate Creator Modal state
  const [singleIssueOpen, setSingleIssueOpen] = useState(false);
  const [newCertStudentId, setNewCertStudentId] = useState(participants[0]?.id || '');
  const [newCertCategory, setNewCertCategory] = useState<CertificateCategory>('excellence');
  const [newCertTitle, setNewCertTitle] = useState('Certificate of Excellence');
  const [newCertSubtitle, setNewCertSubtitle] = useState('Outstanding Algorithmic Achievement');
  const [newCertCitation, setNewCertCitation] = useState('Conferred for superlative problem solving precision in Java.');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = onLogin(adminId.trim(), password.trim());
    if (!success) {
      setLoginError('Invalid Administrator credentials. Required: KAPILADMIN / ADMIN123');
    }
  };

  // Filter certificates
  const filteredCertificates = certificates.filter(c => {
    const matchesSearch = 
      c.certificateNo.toLowerCase().includes(searchCertQuery.toLowerCase()) ||
      c.participantName.toLowerCase().includes(searchCertQuery.toLowerCase()) ||
      c.usn.toLowerCase().includes(searchCertQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || c.category === filterCategory;
    const matchesTeam = filterTeam === 'all' || c.teamId === filterTeam;
    return matchesSearch && matchesCat && matchesTeam;
  });

  // Handle delete / revoke certificate
  const handleRevokeCertificate = (id: string) => {
    if (confirm('Are you sure you want to revoke this digital certificate?')) {
      setCertificates(prev => prev.filter(c => c.id !== id));
    }
  };

  // Handle Create Single Certificate
  const handleCreateSingleCert = (e: React.FormEvent) => {
    e.preventDefault();
    const student = participants.find(p => p.id === newCertStudentId);
    if (!student) return;

    const certNo = `SNPS-JDSA26-${newCertCategory.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newRecord: CertificateRecord = {
      id: `cert-${Date.now()}`,
      certificateNo: certNo,
      participantId: student.id,
      participantName: student.name,
      recipientEmail: student.email,
      usn: student.usn,
      teamId: student.teamId,
      teamName: student.teamName,
      category: newCertCategory,
      title: newCertTitle,
      achievementSubtitle: newCertSubtitle,
      citation: newCertCitation,
      issueDate: "February 22, 2026",
      signatory1: { name: settings.directorName, title: settings.directorTitle },
      signatory2: { name: settings.deanName, title: settings.deanTitle },
      signatory3: { name: settings.vcName, title: settings.vcTitle },
      qrVerificationUrl: `${settings.verificationBaseUrl}${certNo}`,
      status: 'issued',
      downloadCount: 0
    };

    setCertificates(prev => [newRecord, ...prev]);
    setSingleIssueOpen(false);

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // ignore
    }
  };

  // Save Rubric Evaluation
  const handleSaveRubric = () => {
    const total = (Object.values(rubricScores) as number[]).reduce((a: number, b: number) => a + b, 0);
    setTeams(prev => prev.map(t => {
      if (t.id === evalTeamId) {
        return {
          ...t,
          rubricScore: total,
          judgeFeedback: evalFeedback
        };
      }
      return t;
    }));
    setRubricSavedToast(true);
    setTimeout(() => setRubricSavedToast(false), 2500);
  };

  // CSV Export state & handlers
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [csvDownloadToast, setCsvDownloadToast] = useState<string | null>(null);

  const handleDownloadParticipants = () => {
    if (participants.length === 0) {
      alert('There are currently 0 registered learners. Add students to the roster first to export CSV data.');
      return;
    }
    exportParticipantsCSV(participants);
    setCsvDownloadToast(`Successfully downloaded Participants Roster (${participants.length} learners) as CSV`);
    setDownloadMenuOpen(false);
    setTimeout(() => setCsvDownloadToast(null), 3500);
  };

  const handleDownloadTeams = () => {
    exportTeamsCSV(teams);
    setCsvDownloadToast(`Successfully downloaded Championship Team Standings (${teams.length} teams) as CSV`);
    setDownloadMenuOpen(false);
    setTimeout(() => setCsvDownloadToast(null), 3500);
  };

  const handleDownloadCertificates = () => {
    if (certificates.length === 0) {
      alert('No certificates have been issued yet. Issue credentials via the Bulk Issuance Engine or Single Issue.');
      return;
    }
    exportCertificatesCSV(certificates);
    setCsvDownloadToast(`Successfully downloaded Certificates Registry (${certificates.length} credentials) as CSV`);
    setDownloadMenuOpen(false);
    setTimeout(() => setCsvDownloadToast(null), 3500);
  };

  const handleDownloadBoth = () => {
    if (participants.length > 0) {
      exportParticipantsCSV(participants);
      setTimeout(() => {
        exportTeamsCSV(teams);
      }, 500);
      setCsvDownloadToast(`Downloaded Participants Roster (${participants.length}) and Team Standings (${teams.length})`);
    } else {
      exportTeamsCSV(teams);
      setCsvDownloadToast(`Downloaded Team Standings (${teams.length} teams). Learner roster was empty.`);
    }
    setDownloadMenuOpen(false);
    setTimeout(() => setCsvDownloadToast(null), 3500);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(tempSettings);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  // Explicit Reset to Ground Zero (0 Scores, 0 Certificates)
  const handleResetToGroundZero = () => {
    const confirmation = prompt('Type "RESET ZERO" to confirm resetting all team points to 0, clearing all certificates, and wiping all participant rosters:');
    if (confirmation === 'RESET ZERO') {
      setTeams(prev => prev.map(t => ({
        ...t,
        rank: 1,
        totalPoints: 0,
        memberCount: 0,
        stageScores: {
          learningLeague: 0,
          codingBattle: 0,
          quizKahoot: 0,
          hackathonFinale: 0,
        },
        rubricScore: 0,
        judgeFeedback: 'Awaiting jury evaluation.',
        awardedTitles: [],
      })));
      setParticipants([]);
      setCertificates([]);
      try {
        localStorage.clear();
      } catch {
        // ignore
      }
      alert('Championship OS has been reset to ground zero: 0 points, 0 certificates, and 0 registered participants.');
    }
  };

  // If Not logged in, render the secure Admin Login card
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold text-white text-center font-royal">
            ChampionshipOS Admin Login
          </h2>
          <p className="text-xs text-slate-400 text-center mt-1 mb-6">
            Authorized portal for credential issuance, rubric evaluation, and championship management.
          </p>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Administrator ID
              </label>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="KAPILADMIN"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono-code focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ADMIN123"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono-code focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Sign In to Admin Portal
              </button>
            </div>
          </form>

          {/* Preset Credentials Hint per Codex prompt */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-400">
            <p className="font-semibold text-slate-300">Hardcoded Administrator Credentials:</p>
            <div className="mt-1.5 font-mono-code text-amber-300 flex justify-center gap-4 text-xs font-bold">
              <span>Admin ID: <strong className="text-white">KAPILADMIN</strong></span>
              <span>Password: <strong className="text-white">ADMIN123</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAdminId('KAPILADMIN');
                setPassword('ADMIN123');
              }}
              className="mt-2.5 px-3 py-1 rounded bg-amber-500/20 text-[11px] text-amber-300 font-semibold border border-amber-500/30 hover:bg-amber-500/30 transition cursor-pointer"
            >
              Reset to KAPILADMIN / ADMIN123
            </button>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={() => setShowLoginManual(!showLoginManual)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-center gap-1.5 mx-auto transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                {showLoginManual ? 'Hide Administrator Manual' : '📖 Read Administrator Manual Guide (SOP)'}
              </button>
            </div>
          </div>
        </div>

        {showLoginManual && (
          <div className="mt-8">
            <AdminUserManual />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Admin Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white font-royal">
                Administrator & Issuance Console
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                KAPILADMIN Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              ChampionshipOS Powered By Kapil • Sapthgiri NPS University
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            Admin Manual
          </button>

          <button
            onClick={onOpenBulkModal}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            Bulk Issuance Engine
          </button>

          <div className="relative">
            <button
              id="admin-download-csv-btn"
              onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs flex items-center gap-2 border border-slate-700 hover:border-amber-500/50 shadow-md transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Download CSV</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${downloadMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {downloadMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDownloadMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-xs font-bold text-white uppercase tracking-wider font-mono-code">External Record Export</p>
                    <p className="text-[11px] text-slate-400">Download formatted CSV reports</p>
                  </div>

                  <button
                    onClick={handleDownloadParticipants}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between group transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Participants Roster</p>
                        <p className="text-[10px] text-slate-400">Rank, USN, Points, Attendance</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                      {participants.length}
                    </span>
                  </button>

                  <button
                    onClick={handleDownloadTeams}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between group transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Team Standings</p>
                        <p className="text-[10px] text-slate-400">Ranks, Stages, Rubric, Repos</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-800 text-blue-300">
                      {teams.length}
                    </span>
                  </button>

                  <button
                    onClick={handleDownloadCertificates}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between group transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Certificates Registry</p>
                        <p className="text-[10px] text-slate-400">ID, Verification URL, Status</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">
                      {certificates.length}
                    </span>
                  </button>

                  <div className="pt-1.5 mt-1 border-t border-slate-800">
                    <button
                      onClick={handleDownloadBoth}
                      className="w-full text-center px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Both (Learners & Teams)
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={onLogout}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 border border-slate-700 transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CSV Download Toast Notification */}
      {csvDownloadToast && (
        <div className="p-3.5 mb-6 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-xl shadow-emerald-500/10 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{csvDownloadToast}</span>
          </div>
          <button 
            onClick={() => setCsvDownloadToast(null)} 
            className="text-emerald-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-emerald-900/50"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span>Total Learners</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono-code">{participants.length}</p>
          <p className="text-[10px] text-slate-500">
            {participants.length > 0 ? 'Enrolled in 10 Teams' : 'Awaiting Real Entries'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span>Active Teams</span>
            <Trophy className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono-code">{teams.length}</p>
          <p className="text-[10px] text-slate-500 truncate">
            {teams[0]?.totalPoints > 0 ? `${teams[0].name} (${teams[0].totalPoints.toLocaleString()} pts)` : '10 Official Teams'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span>Certificates Issued</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 font-mono-code">{certificates.length}</p>
          <p className="text-[10px] text-emerald-500 font-medium">
            {certificates.length > 0 ? 'Cryptographically Registered' : 'Awaiting Issuance'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span>Awards & Badges</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-purple-400 font-mono-code">{awards.length}</p>
          <p className="text-[10px] text-slate-500">Framework Categories</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('learners')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'learners'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Learners Roster ({participants.length})
        </button>

        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'teams'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Championship Teams ({teams.length})
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'certificates'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Certificates Ledger ({certificates.length})
        </button>

        <button
          onClick={() => setActiveTab('rubric')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'rubric'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Judge Rubric Engine
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          Real Numbers Audit
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          Championship Config
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'manual'
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Admin User Manual (SOP)
        </button>
      </div>

      {/* TAB 0: LEARNERS ROSTER & MANAGEMENT */}
      {activeTab === 'learners' && (
        <LearnersManager
          participants={participants}
          setParticipants={setParticipants}
          teams={teams}
          setTeams={setTeams}
          certificates={certificates}
          setCertificates={setCertificates}
          settings={settings}
          setSettings={setSettings}
          onIssueCertificateForLearner={(learner) => {
            setNewCertStudentId(learner.id);
            setSingleIssueOpen(true);
            setActiveTab('certificates');
          }}
        />
      )}

      {/* TAB 1: CERTIFICATES LEDGER */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative min-w-[240px] flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchCertQuery}
                  onChange={(e) => setSearchCertQuery(e.target.value)}
                  placeholder="Search by ID, name, or USN..."
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="participation">Participation</option>
                <option value="merit">Merit</option>
                <option value="excellence">Excellence</option>
                <option value="winner">Winner</option>
                <option value="team_excellence">Team Excellence</option>
                <option value="special_recognition">Special Recognition</option>
              </select>

              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">All 10 Teams</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setSingleIssueOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Issue Single Certificate
            </button>
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Certificate ID</th>
                    <th className="py-3 px-4">Recipient Name</th>
                    <th className="py-3 px-4">USN</th>
                    <th className="py-3 px-4">Team</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 font-mono-code font-bold text-amber-300">
                        {cert.certificateNo}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {cert.participantName}
                      </td>
                      <td className="py-3 px-4 font-mono-code text-slate-400">
                        {cert.usn}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        Team {cert.teamName}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cert.category === 'winner' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          cert.category === 'excellence' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                          cert.category === 'team_excellence' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {cert.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {cert.issueDate}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => onViewCertificate(cert)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleRevokeCertificate(cert.id)}
                          className="p-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                          title="Revoke Certificate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: JUDGE RUBRIC EVALUATION */}
      {activeTab === 'rubric' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white font-royal">
                Judge Rubric Evaluation Engine
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official scoring framework for Grand Finale Hackathon code quality, innovation, and live demonstrations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-300 font-semibold">Select Team to Evaluate:</label>
              <select
                value={evalTeamId}
                onChange={(e) => setEvalTeamId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold text-xs"
              >
                {teams.map(t => (
                  <option key={t.id} value={t.id}>Team {t.name} (Rank #{t.rank})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Criteria scoring inputs */}
          <div className="py-6 space-y-5">
            {rubricCriteria.map((crit) => {
              const currentVal = rubricScores[crit.id] || 0;
              return (
                <div key={crit.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h4 className="text-sm font-bold text-white">{crit.name}</h4>
                      <p className="text-xs text-slate-400">{crit.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-amber-400 font-mono-code">
                        {currentVal}
                      </span>
                      <span className="text-xs text-slate-500 font-mono-code"> / {crit.maxScore} pts</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={crit.maxScore}
                    value={currentVal}
                    onChange={(e) => {
                      setRubricScores({
                        ...rubricScores,
                        [crit.id]: Number(e.target.value)
                      });
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              );
            })}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Judge Feedback & Official Remarks
              </label>
              <textarea
                rows={3}
                value={evalFeedback}
                onChange={(e) => setEvalFeedback(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                placeholder="Write detailed critique of architecture, code readability, concurrency..."
              />
            </div>

            {/* Total Rubric Score Summary */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-300 font-semibold">Total Aggregate Rubric Score</p>
                <p className="text-xs text-slate-400">Sum of all weighted categories</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400 font-mono-code">
                  {(Object.values(rubricScores) as number[]).reduce((a: number, b: number) => a + b, 0)}
                </span>
                <span className="text-xs text-amber-200/80 font-mono-code"> / 100</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {rubricSavedToast && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Rubric Evaluation Saved!
                </span>
              )}
              <button
                onClick={handleSaveRubric}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Commit Rubric Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: TEAMS MANAGEMENT */}
      {activeTab === 'teams' && (
        <TeamsManager
          teams={teams}
          setTeams={setTeams}
          participants={participants}
          setParticipants={setParticipants}
          certificates={certificates}
          setCertificates={setCertificates}
          settings={settings}
          setSettings={setSettings}
        />
      )}

      {/* TAB: REAL NUMBERS AUDIT */}
      {activeTab === 'audit' && (
        <RealNumbersAudit
          participants={participants}
          setParticipants={setParticipants}
          teams={teams}
          setTeams={setTeams}
          certificates={certificates}
        />
      )}

      {/* TAB 4: CONFIGURATION SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5 text-xs">
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Championship Portal Configuration</h2>
              <p className="text-slate-400">Update event names, dates, motto, vision, and signatories without changing code.</p>
            </div>
            {settingsSavedToast && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Settings Saved!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Championship Name</label>
              <input
                type="text"
                value={tempSettings.name}
                onChange={(e) => setTempSettings({ ...tempSettings, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Host University</label>
              <input
                type="text"
                value={tempSettings.university}
                onChange={(e) => setTempSettings({ ...tempSettings, university: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Lead Mentor & Program Director</label>
              <input
                type="text"
                value={tempSettings.directorName}
                onChange={(e) => setTempSettings({ ...tempSettings, directorName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dean / University Signatory</label>
              <input
                type="text"
                value={tempSettings.deanName}
                onChange={(e) => setTempSettings({ ...tempSettings, deanName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Official Championship Motto</label>
            <input
              type="text"
              value={tempSettings.motto}
              onChange={(e) => setTempSettings({ ...tempSettings, motto: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Official Vision Statement</label>
            <textarea
              rows={3}
              value={tempSettings.vision}
              onChange={(e) => setTempSettings({ ...tempSettings, vision: e.target.value })}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>

          {/* DANGER ZONE / GROUND ZERO PURGE */}
          <div className="mt-8 pt-6 border-t border-red-900/40 bg-red-950/20 border rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Ground Zero Reset Engine
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                  Enforce a clean slate: Reset all 10 teams to 0 total points, clear all stage breakdowns, empty the digital certificates repository, and wipe all local rosters.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetToGroundZero}
                className="px-4 py-2.5 rounded-xl bg-red-900/50 hover:bg-red-800/60 text-red-200 border border-red-500/40 text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                Reset Everything to Zero
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB: ADMIN USER MANUAL & SOP */}
      {activeTab === 'manual' && (
        <AdminUserManual />
      )}

      {/* SINGLE CERTIFICATE CREATOR MODAL */}
      {singleIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Issue Single Digital Certificate
              </h3>
              <button onClick={() => setSingleIssueOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSingleCert} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Student</label>
                <select
                  value={newCertStudentId}
                  onChange={(e) => setNewCertStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  {participants.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.usn} - Team {p.teamName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Certificate Category</label>
                <select
                  value={newCertCategory}
                  onChange={(e) => {
                    const cat = e.target.value as CertificateCategory;
                    setNewCertCategory(cat);
                    if (cat === 'winner') setNewCertTitle('Championship Winner Certificate');
                    else if (cat === 'excellence') setNewCertTitle('Certificate of Excellence');
                    else if (cat === 'merit') setNewCertTitle('Certificate of Merit');
                    else if (cat === 'team_excellence') setNewCertTitle('Team Excellence Certificate');
                    else if (cat === 'special_recognition') setNewCertTitle('Special Recognition Certificate');
                    else setNewCertTitle('Certificate of Participation');
                  }}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="excellence">Certificate of Excellence</option>
                  <option value="merit">Certificate of Merit</option>
                  <option value="winner">Championship Winner</option>
                  <option value="team_excellence">Team Excellence</option>
                  <option value="special_recognition">Special Recognition</option>
                  <option value="participation">Participation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Certificate Title</label>
                <input
                  type="text"
                  value={newCertTitle}
                  onChange={(e) => setNewCertTitle(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Achievement Subtitle</label>
                <input
                  type="text"
                  value={newCertSubtitle}
                  onChange={(e) => setNewCertSubtitle(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Citation Text</label>
                <textarea
                  rows={3}
                  value={newCertCitation}
                  onChange={(e) => setNewCertCitation(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSingleIssueOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Issue & Authenticate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
