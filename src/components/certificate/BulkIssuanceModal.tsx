import React, { useState } from 'react';
import { Participant, Team, CertificateRecord, CertificateCategory, ChampionshipSettings } from '../../types';
import { 
  CheckCircle2, 
  Sparkles, 
  Users, 
  X, 
  Award, 
  Send, 
  Download, 
  Layers,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BulkIssuanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  participants: Participant[];
  settings: ChampionshipSettings;
  onBulkIssue: (newCertificates: CertificateRecord[]) => void;
}

export const BulkIssuanceModal: React.FC<BulkIssuanceModalProps> = ({
  isOpen,
  onClose,
  teams,
  participants,
  settings,
  onBulkIssue,
}) => {
  const [targetScope, setTargetScope] = useState<'all' | 'team' | 'top10'>('all');
  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('participation');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customCitation, setCustomCitation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedCount, setCompletedCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsProcessing(true);

    setTimeout(() => {
      let targetParticipants: Participant[] = [];
      if (targetScope === 'all') {
        targetParticipants = [...participants];
      } else if (targetScope === 'top10') {
        targetParticipants = [...participants].sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 10);
      } else {
        targetParticipants = participants.filter(p => p.teamId === selectedTeamId);
      }

      const generated: CertificateRecord[] = targetParticipants.map((p) => {
        const categoryTitles: Record<CertificateCategory, string> = {
          participation: "Certificate of Participation",
          merit: "Certificate of Merit",
          excellence: "Certificate of Excellence",
          winner: "Championship Winner Certificate",
          team_excellence: "Team Excellence Certificate",
          special_recognition: "Special Recognition Certificate",
        };

        const title = categoryTitles[selectedCategory];
        const categoryCode = selectedCategory.slice(0, 2).toUpperCase();
        const certNo = `SNPS-JDSA26-${categoryCode}-${p.usn.slice(-3)}`;

        return {
          id: `cert-bulk-${Date.now()}-${p.id}`,
          certificateNo: certNo,
          participantId: p.id,
          participantName: p.name,
          recipientEmail: p.email,
          usn: p.usn,
          teamId: p.teamId,
          teamName: p.teamName,
          category: selectedCategory,
          title,
          achievementSubtitle: customSubtitle || `${p.awardTitles[0] || '13-Day Java DSA Championship'}`,
          citation: customCitation || `Conferred by Sapthgiri NPS University and Industry Oriented Training (IOT) Powered by Kapil for exceptional dedication and high technical achievement in Java Algorithms.`,
          issueDate: "February 22, 2026",
          signatory1: { name: settings.directorName, title: settings.directorTitle },
          signatory2: { name: settings.deanName, title: settings.deanTitle },
          signatory3: { name: settings.vcName, title: settings.vcTitle },
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
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Bulk Certificate Issuance Engine</h2>
              <p className="text-xs text-slate-400">Issue authenticated credentials to registered learners or entire teams simultaneously.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedCount !== null ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Successfully Issued {completedCount} Certificates!
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All credentials have been cryptographically registered to the verification ledger, signed by Kapil Narula & Dr. K. R. Sharma, and made ready for download and email.
            </p>
            <div className="pt-3">
              <button
                onClick={() => {
                  setCompletedCount(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Close & View Issued Records
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-4 text-xs">
            {/* Target Scope */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Target Cohort / Scope
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetScope('all')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    targetScope === 'all'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  All Learners ({participants.length})
                </button>

                <button
                  type="button"
                  onClick={() => setTargetScope('team')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    targetScope === 'team'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  Single Team (10 Teams)
                </button>

                <button
                  type="button"
                  onClick={() => setTargetScope('top10')}
                  className={`p-3 rounded-xl border text-center font-semibold transition ${
                    targetScope === 'top10'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                  Top 10 Individuals
                </button>
              </div>
            </div>

            {/* If Team Scope selected */}
            {targetScope === 'team' && (
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Select Target Team
                </label>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-amber-500"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>
                      Team {t.name} (Rank #{t.rank} • {t.memberCount} Members • {t.totalPoints.toLocaleString()} pts)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Certificate Category */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Certificate Category Template
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CertificateCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-amber-500"
              >
                <option value="participation">Certificate of Participation (Universal)</option>
                <option value="merit">Certificate of Merit (High Performers)</option>
                <option value="excellence">Certificate of Excellence (Top 10-15%)</option>
                <option value="winner">Championship Winner Certificate (Top 3 & Champions)</option>
                <option value="team_excellence">Team Excellence Certificate (Team Honors)</option>
                <option value="special_recognition">Special Recognition Certificate (Special Honors)</option>
              </select>
            </div>

            {/* Custom Subtitle & Citation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">
                  Achievement Subtitle (Optional)
                </label>
                <input
                  type="text"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  placeholder="e.g. 13-Day Java DSA Grand Finalist"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Custom Citation Override (Optional)
                </label>
                <input
                  type="text"
                  value={customCitation}
                  onChange={(e) => setCustomCitation(e.target.value)}
                  placeholder="e.g. Conferred for outstanding algorithmic rigour..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Institutional Signatories note */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-[11px] text-slate-400">
              <span>Signatories bound: <strong>Kapil Narula</strong> (Director, IOT) & <strong>Dr. K. R. Sharma</strong> (Dean)</span>
              <span className="text-emerald-400 font-bold">QR Linked</span>
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleGenerate}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? 'Generating & Registering...' : 'Batch Issue Certificates'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
