import React from 'react';
import { Participant, Team, CertificateRecord } from '../../types';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  Users, 
  FileText, 
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { recalculateAllRealNumbers } from '../../utils/championshipCalculations';

interface RealNumbersAuditProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  certificates: CertificateRecord[];
}

export const RealNumbersAudit: React.FC<RealNumbersAuditProps> = ({
  participants,
  setParticipants,
  teams,
  setTeams,
  certificates,
}) => {
  // Compute Real Cohort Math
  const totalLearnerPoints = participants.reduce((sum, p) => sum + p.totalPoints, 0);
  const totalTeamPoints = teams.reduce((sum, t) => sum + t.totalPoints, 0);
  const avgLearnerPoints = Math.round(totalLearnerPoints / (participants.length || 1));
  
  // Calculate discrepancies between recorded team points and sum of members
  const auditReport = teams.map((t) => {
    const enrolledMembers = participants.filter((p) => p.teamId === t.id);
    const memberPointsSum = enrolledMembers.reduce((sum, p) => sum + p.totalPoints, 0);
    const difference = t.totalPoints - memberPointsSum;
    const isExact = difference === 0;

    return {
      team: t,
      enrolledCount: enrolledMembers.length,
      memberPointsSum,
      recordedPoints: t.totalPoints,
      difference,
      isExact,
    };
  });

  const exactMatchCount = auditReport.filter(r => r.isExact).length;
  const is100PercentSynchronized = exactMatchCount === teams.length;

  const handleSyncAll = () => {
    const { updatedParticipants, updatedTeams } = recalculateAllRealNumbers(participants, teams);
    setParticipants(updatedParticipants);
    setTeams(updatedTeams);
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white font-royal">
                Mathematical Integrity & Real Numbers Audit
              </h2>
              <p className="text-xs text-slate-400">
                100% verified ledger auditing individual learner point distributions against team totals. Zero fake data.
              </p>
            </div>
          </div>

          <button
            onClick={handleSyncAll}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Auto-Reconcile 100% Real Math
          </button>
        </div>

        {/* Global KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Total Learner Points</span>
            <span className="text-xl font-black text-amber-400 font-mono-code">
              {totalLearnerPoints.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 block">Sum of {participants.length} learners</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Total Team Points</span>
            <span className="text-xl font-black text-blue-400 font-mono-code">
              {totalTeamPoints.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 block">Sum of {teams.length} teams</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Average Learner Score</span>
            <span className="text-xl font-black text-purple-400 font-mono-code">
              {avgLearnerPoints.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 block">pts / active participant</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Audit Integrity Status</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {is100PercentSynchronized ? '100% Math Match' : `${exactMatchCount} / ${teams.length} Teams Matched`}
            </span>
            <span className="text-[10px] text-slate-500 block font-mono-code">Zero fake values</span>
          </div>
        </div>
      </div>

      {/* Team by Team Verification Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            Team-by-Team Score & Roster Mathematical Verification
          </h3>
          <span className="text-[11px] text-slate-400">
            {teams.length} Teams Audited
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 text-[11px] font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Team Name & Code</th>
                <th className="py-3 px-4 text-center">Enrolled Members</th>
                <th className="py-3 px-4 text-right">Sum of Member Points</th>
                <th className="py-3 px-4 text-right">Recorded Team Points</th>
                <th className="py-3 px-4 text-center">Difference</th>
                <th className="py-3 px-4 text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {auditReport.map((row) => (
                <tr key={row.team.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono-code font-bold text-slate-300">
                    #{row.team.rank}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">Team {row.team.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono-code">{row.team.code} • Capt. {row.team.leaderName}</div>
                  </td>
                  <td className="py-3 px-4 text-center font-mono-code text-slate-200">
                    {row.enrolledCount} members
                  </td>
                  <td className="py-3 px-4 text-right font-mono-code text-amber-300 font-semibold">
                    {row.memberPointsSum.toLocaleString()} pts
                  </td>
                  <td className="py-3 px-4 text-right font-mono-code text-white font-bold">
                    {row.recordedPoints.toLocaleString()} pts
                  </td>
                  <td className="py-3 px-4 text-center font-mono-code">
                    {row.difference === 0 ? (
                      <span className="text-emerald-400 font-semibold">0</span>
                    ) : (
                      <span className="text-amber-400 font-semibold">
                        {row.difference > 0 ? `+${row.difference.toLocaleString()}` : row.difference.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.isExact ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Exact Match
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Sync Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
