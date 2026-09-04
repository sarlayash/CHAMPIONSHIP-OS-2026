import React, { useState, useEffect } from 'react';
import { Participant, Team, CertificateRecord, CertificateCategory, ChampionshipSettings } from '../../types';
import { 
  CheckCircle2, 
  Sparkles, 
  Users, 
  X, 
  Award, 
  Layers,
  User,
  ShieldCheck,
  Search,
  Filter,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type IssuanceMode = 'all' | 'team' | 'individual';

interface BulkIssuanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  participants: Participant[];
  settings: ChampionshipSettings;
  onBulkIssue: (newCertificates: CertificateRecord[]) => void;
  initialMode?: IssuanceMode;
  initialTeamId?: string;
  initialParticipantId?: string;
}

export const BulkIssuanceModal: React.FC<BulkIssuanceModalProps> = ({
  isOpen,
  onClose,
  teams,
  participants,
  settings,
  onBulkIssue,
  initialMode = 'all',
  initialTeamId,
  initialParticipantId,
}) => {
  const [issuanceMode, setIssuanceMode] = useState<IssuanceMode>(initialMode);
  
  // Team selection & member toggling
  const [selectedTeamId, setSelectedTeamId] = useState<string>(initialTeamId || teams[0]?.id || '');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  
  // Individual selection
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>(initialParticipantId || participants[0]?.id || '');
  const [learnerSearch, setLearnerSearch] = useState('');

  // Certificate template metadata
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('excellence');
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customCitation, setCustomCitation] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedCount, setCompletedCount] = useState<number | null>(null);

  // Sync mode and selections when opened
  useEffect(() => {
    if (isOpen) {
      setIssuanceMode(initialMode);
      if (initialTeamId) setSelectedTeamId(initialTeamId);
      if (initialParticipantId) setSelectedParticipantId(initialParticipantId);
      setCompletedCount(null);
    }
  }, [isOpen, initialMode, initialTeamId, initialParticipantId]);

  // When team changes, select all its members by default
  useEffect(() => {
    const teamMembers = participants.filter(p => p.teamId === selectedTeamId);
    setSelectedMemberIds(teamMembers.map(p => p.id));
  }, [selectedTeamId, participants]);

  // Adjust defaults based on category and mode
  useEffect(() => {
    const categoryTitles: Record<CertificateCategory, string> = {
      participation: "Certificate of Participation",
      merit: "Certificate of Merit",
      excellence: "Certificate of Excellence",
      winner: "Championship Winner Certificate",
      team_excellence: "Team Excellence Certificate",
      special_recognition: "Special Recognition Certificate",
    };

    if (!customTitle || Object.values(categoryTitles).includes(customTitle)) {
      setCustomTitle(categoryTitles[selectedCategory]);
    }

    if (issuanceMode === 'team') {
      const currentTeam = teams.find(t => t.id === selectedTeamId);
      const teamName = currentTeam?.name || 'Team';
      setCustomSubtitle(`Team Honors & Algorithmic Distinction - ${teamName}`);
      setCustomCitation(`Conferred under the direct Mentorship of Kapil Narula to ${teamName} for outstanding collaborative architecture, competitive programming prowess, and stellar contributions to the 13-Day Java DSA Championship 2026.`);
    } else if (issuanceMode === 'individual') {
      const p = participants.find(part => part.id === selectedParticipantId);
      const studentName = p?.name || 'the recipient';
      setCustomSubtitle(p?.awardTitles[0] || "Advanced Algorithmic Mastery & Problem Solving");
      setCustomCitation(`Conferred with high honors under the direct Mentorship of Kapil Narula upon ${studentName} for exceptional code rigor, algorithmic problem solving, and exemplary performance during the 13-Day Java DSA Championship.`);
    } else {
      setCustomSubtitle("13-Day Java Full Stack & DSA Masterclass");
      setCustomCitation(`Conferred with distinction under the direct Mentorship of Kapil Narula for exemplary dedication, algorithmic problem-solving excellence, and rigorous active participation in the 13-Day Java DSA Championship 2026.`);
    }
  }, [selectedCategory, issuanceMode, selectedTeamId, selectedParticipantId, teams, participants]);

  if (!isOpen) return null;

  // Filtered learners for individual mode
  const filteredLearners = participants.filter(p => 
    p.name.toLowerCase().includes(learnerSearch.toLowerCase()) ||
    p.usn.toLowerCase().includes(learnerSearch.toLowerCase()) ||
    p.teamName.toLowerCase().includes(learnerSearch.toLowerCase())
  );

  const currentSelectedTeam = teams.find(t => t.id === selectedTeamId);
  const currentTeamMembers = participants.filter(p => p.teamId === selectedTeamId);
  const currentSelectedParticipant = participants.find(p => p.id === selectedParticipantId);

  // Toggle member selection in team mode
  const toggleMember = (memberId: string) => {
    setSelectedMemberIds(prev => 
      prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
    );
  };

  const selectAllTeamMembers = () => {
    setSelectedMemberIds(currentTeamMembers.map(p => p.id));
  };

  const deselectAllTeamMembers = () => {
    setSelectedMemberIds([]);
  };

  // Execution handler
  const handleGenerate = () => {
    setIsProcessing(true);

    setTimeout(() => {
      let targetParticipants: Participant[] = [];

      if (issuanceMode === 'all') {
        targetParticipants = [...participants];
      } else if (issuanceMode === 'team') {
        targetParticipants = currentTeamMembers.filter(p => selectedMemberIds.includes(p.id));
      } else {
        if (currentSelectedParticipant) {
          targetParticipants = [currentSelectedParticipant];
        }
      }

      if (targetParticipants.length === 0) {
        setIsProcessing(false);
        alert("Please select at least one learner to issue certificates.");
        return;
      }

      const generated: CertificateRecord[] = targetParticipants.map((p, idx) => {
        const categoryCode = selectedCategory.slice(0, 2).toUpperCase();
        const randSuffix = Math.floor(100 + Math.random() * 900);
        const certNo = `SNPS-JDSA26-${categoryCode}-${p.usn ? p.usn.slice(-4) : (idx + 1).toString().padStart(3, '0')}-${randSuffix}`;

        return {
          id: `cert-${Date.now()}-${p.id}-${idx}`,
          certificateNo: certNo,
          participantId: p.id,
          participantName: p.name,
          recipientEmail: p.email,
          usn: p.usn,
          teamId: p.teamId,
          teamName: p.teamName,
          category: selectedCategory,
          title: customTitle || "Certificate of Excellence",
          achievementSubtitle: customSubtitle || "Mentorship by Kapil Narula",
          citation: customCitation || `Conferred under the direct Mentorship of Kapil Narula for exemplary performance and algorithmic excellence in the 13-Day Java DSA Championship 2026.`,
          issueDate: "February 22, 2026",
          // Strictly Kapil Narula - NO DEAN OR SENIORS
          signatory1: { 
            name: "Kapil Narula", 
            title: "Program Mentor & Lead Enterprise Architect" 
          },
          signatory2: { 
            name: "Mentorship by Kapil", 
            title: "Technical Mentorship & Industry Authority" 
          },
          signatory3: { 
            name: "Industry Oriented Training (IOT)", 
            title: "Official Championship Credential Registry" 
          },
          qrVerificationUrl: `${settings.verificationBaseUrl}${certNo}`,
          status: 'issued',
          downloadCount: 0
        };
      });

      onBulkIssue(generated);
      setIsProcessing(false);
      setCompletedCount(generated.length);

      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#090d16] border-2 border-[#d4af37]/60 rounded-2xl p-5 sm:p-7 shadow-2xl relative my-6 text-slate-100">
        
        {/* Header with Luxury Black & Gold Theme */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b38728] text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Award className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-royal tracking-wide">
                  Certificate Issuance Engine
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#15120a] border border-[#d4af37] text-[#ffd700]">
                  Black &amp; Gold Edition
                </span>
              </div>
              <p className="text-xs text-[#e2d9b6]/80 mt-0.5">
                Officially authenticated credentials • Sole Mentorship by <strong>Kapil Narula</strong> (IOT)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedCount !== null ? (
          /* SUCCESS STATE */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b38728] text-slate-950 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/30">
              <CheckCircle2 className="w-10 h-10 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white font-royal">
                Successfully Issued {completedCount} Certificate{completedCount > 1 ? 's' : ''}!
              </h3>
              <p className="text-xs text-[#e2d9b6] mt-1 max-w-md mx-auto">
                Conferred under the direct Mentorship of Kapil Narula with luxury Black &amp; Gold double-bordered styling and cryptographic validation.
              </p>
            </div>

            <div className="p-4 bg-[#0d121f] border border-[#d4af37]/40 rounded-xl max-w-md mx-auto text-left text-xs space-y-1.5 font-mono-code text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Theme Styling:</span>
                <span className="text-[#ffd700] font-bold">Black &amp; Gold (Double Bordered)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authorized Signatory:</span>
                <span className="text-white font-bold">Kapil Narula (Lead Mentor)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Registered:</span>
                <span className="text-emerald-400 font-bold">{completedCount} Credentials</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setCompletedCount(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#d4af37] hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                Close &amp; View Issued Certificates
              </button>
            </div>
          </div>
        ) : (
          /* CONFIGURATION / ISSUANCE FORM */
          <div className="space-y-4 pt-4 text-xs">
            
            {/* 1. THREE GRANULAR ISSUANCE MODES: ALL LEARNERS, TEAM-WISE, INDIVIDUAL */}
            <div>
              <label className="block text-[#ffd700] font-bold mb-2 uppercase tracking-wider text-[11px] font-royal">
                Step 1: Select Issuance Scope
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                
                {/* OPTION A: ALL LEARNERS */}
                <button
                  type="button"
                  onClick={() => setIssuanceMode('all')}
                  className={`p-3.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                    issuanceMode === 'all'
                      ? 'bg-gradient-to-b from-[#1a180e] to-[#0d121f] border-[#ffd700] text-white shadow-lg shadow-amber-500/15'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Users className={`w-5 h-5 mb-1.5 ${issuanceMode === 'all' ? 'text-[#ffd700]' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs">All Learners</span>
                  <span className="text-[10px] opacity-80 mt-0.5">
                    Cohort ({participants.length} learners)
                  </span>
                </button>

                {/* OPTION B: TEAM-WISE */}
                <button
                  type="button"
                  onClick={() => setIssuanceMode('team')}
                  className={`p-3.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                    issuanceMode === 'team'
                      ? 'bg-gradient-to-b from-[#1a180e] to-[#0d121f] border-[#ffd700] text-white shadow-lg shadow-amber-500/15'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Layers className={`w-5 h-5 mb-1.5 ${issuanceMode === 'team' ? 'text-[#ffd700]' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs">Team-Wise</span>
                  <span className="text-[10px] opacity-80 mt-0.5">
                    Filter by 10 Teams
                  </span>
                </button>

                {/* OPTION C: INDIVIDUAL */}
                <button
                  type="button"
                  onClick={() => setIssuanceMode('individual')}
                  className={`p-3.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center ${
                    issuanceMode === 'individual'
                      ? 'bg-gradient-to-b from-[#1a180e] to-[#0d121f] border-[#ffd700] text-white shadow-lg shadow-amber-500/15'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <User className={`w-5 h-5 mb-1.5 ${issuanceMode === 'individual' ? 'text-[#ffd700]' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs">Individual</span>
                  <span className="text-[10px] opacity-80 mt-0.5">
                    Single Learner &amp; Honors
                  </span>
                </button>
              </div>
            </div>

            {/* DYNAMIC SCOPE DETAILS */}
            {/* If ALL LEARNERS */}
            {issuanceMode === 'all' && (
              <div className="p-3 bg-[#0c121e] border border-amber-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-[#ffd700]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Universal Cohort Issuance</p>
                    <p className="text-[11px] text-slate-400">
                      Will issue certificates to all <strong className="text-amber-300">{participants.length}</strong> enrolled learners across all 10 championship teams simultaneously.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#15120a] border border-[#d4af37] text-[#ffd700] font-mono-code font-bold text-xs">
                  {participants.length} Recipient{participants.length === 1 ? '' : 's'}
                </span>
              </div>
            )}

            {/* If TEAM-WISE */}
            {issuanceMode === 'team' && (
              <div className="space-y-3 bg-[#0c121e] p-3.5 rounded-xl border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                    Select Team ({teams.length} Available)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={selectAllTeamMembers}
                      className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={deselectAllTeamMembers}
                      className="text-[10px] text-slate-400 hover:underline cursor-pointer"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-[#d4af37]"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>
                      Team {t.name} (Rank #{t.rank} • {t.memberCount} Members • {t.totalPoints.toLocaleString()} Pts)
                    </option>
                  ))}
                </select>

                {/* Team Members checklist */}
                <div className="mt-2">
                  <p className="text-[11px] text-slate-400 mb-1.5 font-semibold">
                    Target Team Members ({selectedMemberIds.length}/{currentTeamMembers.length} selected):
                  </p>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {currentTeamMembers.length === 0 ? (
                      <p className="text-slate-500 italic p-2 bg-slate-950 rounded">
                        No learners assigned to this team yet. Use the Team Manager in Admin Portal to add members.
                      </p>
                    ) : (
                      currentTeamMembers.map(member => {
                        const isSelected = selectedMemberIds.includes(member.id);
                        return (
                          <div
                            key={member.id}
                            onClick={() => toggleMember(member.id)}
                            className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                              isSelected 
                                ? 'bg-amber-950/20 border-amber-500/50 text-white' 
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded flex items-center justify-center text-xs border ${
                                isSelected ? 'bg-[#ffd700] text-slate-950 border-[#ffd700]' : 'border-slate-600'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="font-semibold text-xs text-slate-200">{member.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono-code">({member.usn})</span>
                            </div>
                            <span className="text-[10px] font-mono-code text-amber-400 font-bold">
                              {member.totalPoints} pts
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* If INDIVIDUAL */}
            {issuanceMode === 'individual' && (
              <div className="space-y-3 bg-[#0c121e] p-3.5 rounded-xl border border-slate-800">
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  Select Individual Learner
                </label>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={learnerSearch}
                    onChange={(e) => setLearnerSearch(e.target.value)}
                    placeholder="Search by student name, USN, or team..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                  {filteredLearners.length === 0 ? (
                    <p className="text-slate-500 italic p-2 bg-slate-950 rounded">
                      No learners match &ldquo;{learnerSearch}&rdquo;
                    </p>
                  ) : (
                    filteredLearners.map(learner => {
                      const isSelected = selectedParticipantId === learner.id;
                      return (
                        <div
                          key={learner.id}
                          onClick={() => setSelectedParticipantId(learner.id)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                            isSelected 
                              ? 'bg-amber-950/40 border-[#ffd700] text-white shadow-sm' 
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{learner.name}</span>
                              <span className="text-[10px] text-amber-300 font-mono-code px-1.5 py-0.5 rounded bg-amber-950/50 border border-amber-500/30">
                                {learner.usn}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              Team: {learner.teamName} • Rank #{learner.rank}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold font-mono-code text-[#ffd700]">
                              {learner.totalPoints.toLocaleString()} pts
                            </span>
                            {isSelected && (
                              <span className="block text-[9px] text-emerald-400 font-semibold">
                                ✓ Selected
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* 2. CERTIFICATE CATEGORY TEMPLATE */}
            <div>
              <label className="block text-[#ffd700] font-bold mb-1.5 uppercase tracking-wider text-[11px] font-royal">
                Step 2: Certificate Category &amp; Honors
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CertificateCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-[#d4af37]"
              >
                <option value="excellence">Certificate of Excellence (Top Performers &amp; High Accuracy)</option>
                <option value="winner">Championship Winner Certificate (1st, 2nd, 3rd Podium Finishes)</option>
                <option value="merit">Certificate of Merit (Consistent Coding &amp; Project Honors)</option>
                <option value="team_excellence">Team Excellence Certificate (Team Hackathon Distinctions)</option>
                <option value="special_recognition">Special Recognition Certificate (Special Mentorship Honors)</option>
                <option value="participation">Certificate of Participation (13-Day Active Completion)</option>
              </select>
            </div>

            {/* 3. CERTIFICATE TITLE & CITATION DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-[11px]">
                  Certificate Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Certificate of Excellence"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-[11px]">
                  Achievement Subtitle
                </label>
                <input
                  type="text"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  placeholder="e.g. Advanced Algorithmic Mastery &amp; Problem Solving"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1 text-[11px]">
                  Official Citation Text
                </label>
                <textarea
                  rows={2}
                  value={customCitation}
                  onChange={(e) => setCustomCitation(e.target.value)}
                  placeholder="Citation text..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* STRICT SOLE MENTORSHIP SIGNATORY GUARANTEE */}
            <div className="p-3 bg-[#0d121f] border border-[#d4af37]/40 rounded-xl flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ffd700]" />
                <span className="text-slate-300">
                  Sole Endorsement Authority: <strong className="text-[#ffd700]">Kapil Narula</strong> (Program Mentor &amp; Lead Enterprise Architect, IOT)
                </span>
              </div>
              <span className="text-emerald-400 font-mono-code font-bold">No College Dean / Senior</span>
            </div>

            {/* ACTION BAR */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                Ready to issue: <strong className="text-white">
                  {issuanceMode === 'all' 
                    ? `${participants.length} learners`
                    : issuanceMode === 'team'
                    ? `${selectedMemberIds.length} team members`
                    : (currentSelectedParticipant ? currentSelectedParticipant.name : '0 learner')}
                </strong>
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleGenerate}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#d4af37] hover:brightness-110 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  {isProcessing 
                    ? 'Registering Credentials...' 
                    : issuanceMode === 'all'
                    ? `Issue to All Learners (${participants.length})`
                    : issuanceMode === 'team'
                    ? `Issue to Team (${selectedMemberIds.length})`
                    : 'Issue Individual Certificate'}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

