import React, { useState } from 'react';
import { Team, Participant } from '../../types';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  Users, 
  Flame, 
  ArrowUpRight, 
  ChevronRight, 
  Code, 
  Layers,
  Medal,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveLeaderboardProps {
  teams: Team[];
  participants: Participant[];
  onSelectTeam: (team: Team) => void;
  onSelectParticipant: (participant: Participant) => void;
}

export const LiveLeaderboard: React.FC<LiveLeaderboardProps> = ({
  teams,
  participants,
  onSelectTeam,
  onSelectParticipant,
}) => {
  const [viewMode, setViewMode] = useState<'teams' | 'individuals'>('teams');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#d4af37', '#ffffff', '#b38728', '#f5d76e']
      });
    } catch {
      // ignore
    }
  };

  const top3Teams = [...teams].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0)).slice(0, 3);
  const sortedTeams = [...teams].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
  const sortedParticipants = [...participants].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
  const hasTeamPoints = teams.some(t => (t.totalPoints || 0) > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-100">
      {/* Top Header & Podium Celebration — Fortune 500 Black & Gold */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#03060a] border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5 text-[#ffd700]" />
            Official Championship Standings
          </div>
          <h1 className="text-3xl font-black text-white font-royal tracking-tight">
            Live Championship Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-serif-title">
            Real-time standings across all 13 days of coding battles, quizzes, assessments, and the Grand Finale Hackathon.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasTeamPoints && (
            <button
              onClick={triggerConfetti}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] via-[#f5d76e] to-[#d4af37] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition cursor-pointer border border-[#fff1b8]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Celebrate Top 3 Podium
            </button>
          )}

          <div className="p-1 bg-[#000000] border border-[#d4af37]/35 rounded-xl flex items-center text-xs shadow-inner">
            <button
              onClick={() => setViewMode('teams')}
              className={`px-3.5 py-1.5 rounded-lg font-extrabold transition cursor-pointer ${
                viewMode === 'teams'
                  ? 'bg-[#ffd700] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              10 Teams
            </button>
            <button
              onClick={() => setViewMode('individuals')}
              className={`px-3.5 py-1.5 rounded-lg font-extrabold transition cursor-pointer ${
                viewMode === 'individuals'
                  ? 'bg-[#ffd700] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {participants.length} Individuals
            </button>
          </div>
        </div>
      </div>

      {/* Starting at Zero Notification when no points yet */}
      {!hasTeamPoints && viewMode === 'teams' && (
        <div className="bg-[#050811] border-2 border-[#d4af37]/35 rounded-2xl p-6 mb-8 text-center shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Championship Commencing at Ground Zero
          </div>
          <h3 className="text-lg font-black text-white font-royal">All 10 Teams Tied at 0 Points</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1 font-serif-title">
            Scores start clean from zero. Top 3 podium honors and dynamic rankings will populate automatically as stage challenges, quizzes, and Hackathon jury rubrics are recorded in the Admin Portal.
          </p>
        </div>
      )}

      {/* Top 3 Podium Cards (Shown only when teams have points) */}
      {hasTeamPoints && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 items-end">
          {/* Rank 2 (Silver) */}
          {top3Teams[1] && (
            <div 
              onClick={() => onSelectTeam(top3Teams[1])}
              className="order-2 md:order-1 bg-[#050811] border-2 border-slate-300 rounded-2xl p-6 text-center shadow-xl hover:border-white transition cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-400 to-slate-200" />
              <div className="w-12 h-12 rounded-full bg-[#0a0f1d] border-2 border-slate-300 text-slate-200 font-black flex items-center justify-center mx-auto mb-3 text-lg shadow">
                2
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-slate-200 border border-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono-code">
                1st Runner-Up
              </span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#ffd700] transition">
                {top3Teams[1].name}
              </h3>
              <p className="text-xs text-slate-400">Leader: {top3Teams[1].leaderName || 'Unassigned'}</p>
              <p className="text-2xl font-black text-slate-200 mt-3 font-mono-code">
                {(top3Teams[1].totalPoints || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
              </p>
              <p className="text-[11px] text-[#ffd700] italic mt-2 line-clamp-1">
                &ldquo;{top3Teams[1].projectTitle || 'Project Submission Pending'}&rdquo;
              </p>
            </div>
          )}

          {/* Rank 1 (Gold - Center & Elevated) */}
          {top3Teams[0] && (
            <div 
              onClick={() => onSelectTeam(top3Teams[0])}
              className="order-1 md:order-2 bg-gradient-to-b from-[#141d33] via-[#090f1d] to-[#040710] border-2 border-[#ffd700] rounded-2xl p-7 text-center shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:border-[#fff1b8] transition cursor-pointer relative overflow-hidden group scale-105 z-10"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#ffd700] via-[#fff1b8] to-[#d4af37]" />
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ffd700] to-[#d4af37] text-slate-950 font-black flex items-center justify-center mx-auto mb-3 text-xl shadow-lg shadow-[#ffd700]/30">
                <Crown className="w-8 h-8 text-slate-950" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#000000] border border-[#ffd700] text-[#ffd700] text-xs font-black uppercase tracking-wider font-mono-code">
                🏆 Grand Champion Team
              </span>
              <h3 className="text-2xl font-black text-white mt-2 group-hover:text-[#ffd700] transition font-royal">
                {top3Teams[0].name}
              </h3>
              <p className="text-xs text-slate-300">Captain: {top3Teams[0].leaderName || 'Unassigned'}</p>
              <p className="text-3xl font-black text-[#ffd700] mt-3 font-mono-code drop-shadow">
                {(top3Teams[0].totalPoints || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
              </p>
              <p className="text-xs text-slate-200 italic mt-2">
                &ldquo;{top3Teams[0].projectTitle || 'Project Submission'}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-[#d4af37]/30 flex items-center justify-center gap-1.5 text-xs text-[#ffd700] font-bold">
                <span>View Full Team Dossier</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3Teams[2] && (
            <div 
              onClick={() => onSelectTeam(top3Teams[2])}
              className="order-3 bg-[#050811] border-2 border-[#b38728] rounded-2xl p-6 text-center shadow-xl hover:border-[#d4af37] transition cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#b38728] to-[#805515]" />
              <div className="w-12 h-12 rounded-full bg-[#000000] border-2 border-[#b38728] text-[#ffd700] font-black flex items-center justify-center mx-auto mb-3 text-lg shadow">
                3
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#000000] border border-[#b38728] text-[#ffd700] text-[10px] font-bold uppercase tracking-wider font-mono-code">
                2nd Runner-Up
              </span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#ffd700] transition">
                {top3Teams[2].name}
              </h3>
              <p className="text-xs text-slate-400">Leader: {top3Teams[2].leaderName || 'Unassigned'}</p>
              <p className="text-2xl font-black text-slate-200 mt-3 font-mono-code">
                {(top3Teams[2].totalPoints || 0).toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
              </p>
              <p className="text-[11px] text-slate-400 italic mt-2 line-clamp-1">
                &ldquo;{top3Teams[2].projectTitle || 'Project Submission Pending'}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}

      {/* Main Leaderboard Table — Executive Black & Gold */}
      <div className="bg-[#050811] border-2 border-[#d4af37]/35 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#000000]">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ffd700]" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider font-royal">
              {viewMode === 'teams' ? 'All 10 Teams Standing & Breakdown' : `Top Performing Learners (${participants.length} Total)`}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono-code">
            {viewMode === 'teams' ? `${teams.length} Teams Registered` : `${participants.length} Active Learners`}
          </span>
        </div>

        {viewMode === 'teams' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#020408] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#d4af37]/20">
                <tr>
                  <th className="py-3 px-4 w-12 text-center font-bold">Rank</th>
                  <th className="py-3 px-4 font-bold">Team Name & Code</th>
                  <th className="py-3 px-4 font-bold">Leader</th>
                  <th className="py-3 px-4 font-bold">Members</th>
                  <th className="py-3 px-4 font-bold">Learning League</th>
                  <th className="py-3 px-4 font-bold">Coding Battle</th>
                  <th className="py-3 px-4 font-bold">Quiz / Kahoot</th>
                  <th className="py-3 px-4 font-bold">Grand Hackathon</th>
                  <th className="py-3 px-4 text-right font-bold">Total Points</th>
                  <th className="py-3 px-4 text-center font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/15">
                {sortedTeams.map((team, idx) => {
                  const isTop = idx === 0;
                  const isPodium = idx < 3;
                  return (
                    <tr 
                      key={team.id}
                      onClick={() => onSelectTeam(team)}
                      className={`hover:bg-[#0c1222] transition cursor-pointer ${
                        isTop ? 'bg-[#ffd700]/5' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-bold">
                        {idx === 0 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ffd700] text-slate-950 font-black text-xs">
                            1
                          </span>
                        ) : idx === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                            2
                          </span>
                        ) : idx === 2 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#b38728] text-white font-black text-xs">
                            3
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono-code font-bold">{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-sm hover:text-[#ffd700] transition">
                            {team.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#000000] text-[10px] text-[#ffd700] font-mono-code border border-[#d4af37]/30">
                            {team.code}
                          </span>
                          {isPodium && team.awardedTitles && team.awardedTitles[0] && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd700]/15 text-[#ffd700] font-bold border border-[#ffd700]/40">
                              {team.awardedTitles[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {team.projectTitle || 'Project Title Pending'}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {team.leaderName || 'Unassigned'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        <span className="flex items-center gap-1 font-mono-code">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {team.memberCount}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-300">
                        {(team.stageScores?.learningLeague || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-300">
                        {(team.stageScores?.codingBattle || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-300">
                        {(team.stageScores?.quizKahoot || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-300">
                        {(team.stageScores?.hackathonFinale || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-mono-code font-black text-[#ffd700] text-sm block">
                          {(team.totalPoints || 0).toLocaleString()}
                        </span>
                        {Boolean(team.bonusPoints && team.bonusPoints > 0) && (
                          <span className="text-[10px] font-mono-code text-emerald-400 font-bold inline-flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                            +{team.bonusPoints.toLocaleString()} bonus
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button className="p-1.5 rounded-lg bg-[#000000] hover:bg-[#ffd700] hover:text-slate-950 text-slate-300 transition border border-[#d4af37]/30 cursor-pointer">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#020408] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#d4af37]/20">
                <tr>
                  <th className="py-3 px-4 w-12 text-center font-bold">Rank</th>
                  <th className="py-3 px-4 font-bold">Student Name & USN</th>
                  <th className="py-3 px-4 font-bold">Team</th>
                  <th className="py-3 px-4 font-bold">Role</th>
                  <th className="py-3 px-4 font-bold">Attendance</th>
                  <th className="py-3 px-4 font-bold">Recognized Title</th>
                  <th className="py-3 px-4 text-right font-bold">Individual Score</th>
                  <th className="py-3 px-4 text-center font-bold">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/15">
                {sortedParticipants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] mx-auto flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold text-sm font-royal">No Learners Registered Yet</h3>
                        <p className="text-slate-400 text-xs font-serif-title">
                          The repository is ready for genuine student inputs. Add real learners, official USNs, and points via the Admin Portal.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedParticipants.map((learner, idx) => (
                    <tr 
                      key={learner.id}
                      onClick={() => onSelectParticipant(learner)}
                      className="hover:bg-[#0c1222] transition cursor-pointer"
                    >
                      <td className="py-3 px-4 text-center font-bold font-mono-code">
                        {idx < 3 ? (
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                            idx === 0 ? 'bg-[#ffd700] text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-[#b38728] text-white'
                          }`}>
                            {idx + 1}
                          </span>
                        ) : (
                          <span className="text-slate-400">{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-white text-sm hover:text-[#ffd700] transition">{learner.name}</p>
                        <p className="text-[10px] text-[#ffd700] font-mono-code">{learner.usn}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-medium">
                        Team {learner.teamName}
                      </td>
                      <td className="py-3 px-4">
                        {learner.isLeader ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-bold border border-[#ffd700]/40">
                            Team Captain
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">Member</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono-code">
                        <span className={learner.attendanceRate >= 98 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                          {learner.attendanceRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white text-xs font-semibold">
                          {learner.awardTitles[0] || 'Championship Participant'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono-code font-black text-[#ffd700]">
                        {(learner.totalPoints || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="p-1 rounded bg-[#000000] hover:bg-[#ffd700] hover:text-slate-950 text-slate-300 border border-[#d4af37]/30 transition">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
