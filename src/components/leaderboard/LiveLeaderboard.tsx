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
        colors: ['#eab308', '#f59e0b', '#3b82f6', '#10b981', '#ec4899']
      });
    } catch {
      // ignore
    }
  };

  const top3Teams = [...teams].sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 3);
  const sortedTeams = [...teams].sort((a, b) => b.totalPoints - a.totalPoints);
  const sortedParticipants = [...participants].sort((a, b) => b.totalPoints - a.totalPoints);
  const hasTeamPoints = teams.some(t => t.totalPoints > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Header & Podium Celebration */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            Official Championship Standings
          </div>
          <h1 className="text-3xl font-extrabold text-white font-royal">
            Live Championship Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time standings across all 13 days of coding battles, quizzes, assessments, and the Grand Finale Hackathon.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasTeamPoints && (
            <button
              onClick={triggerConfetti}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Celebrate Top 3 Podium
            </button>
          )}

          <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setViewMode('teams')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
                viewMode === 'teams'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              10 Teams
            </button>
            <button
              onClick={() => setViewMode('individuals')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
                viewMode === 'individuals'
                  ? 'bg-amber-500 text-slate-950'
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
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 text-center shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Championship Commencing at Ground Zero
          </div>
          <h3 className="text-lg font-bold text-white">All 10 Teams Tied at 0 Points</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1">
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
              className="order-2 md:order-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 text-center shadow-xl hover:border-slate-500 transition cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-400 to-slate-200" />
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-400 text-slate-300 font-bold flex items-center justify-center mx-auto mb-3 text-lg shadow">
                2
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                1st Runner-Up
              </span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-amber-400 transition">
                {top3Teams[1].name}
              </h3>
              <p className="text-xs text-slate-400">Leader: {top3Teams[1].leaderName}</p>
              <p className="text-2xl font-black text-slate-200 mt-3 font-mono-code">
                {top3Teams[1].totalPoints.toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
              </p>
              <p className="text-[11px] text-amber-300/90 italic mt-2 line-clamp-1">
                &ldquo;{top3Teams[1].projectTitle}&rdquo;
              </p>
            </div>
          )}

          {/* Rank 1 (Gold - Center & Elevated) */}
          {top3Teams[0] && (
            <div 
              onClick={() => onSelectTeam(top3Teams[0])}
              className="order-1 md:order-2 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500 rounded-2xl p-7 text-center shadow-2xl hover:border-amber-400 transition cursor-pointer relative overflow-hidden group scale-105 z-10"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
              <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center mx-auto mb-3 text-xl shadow-lg shadow-amber-500/40">
                <Crown className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                🏆 Grand Champion Team
              </span>
              <h3 className="text-2xl font-black text-white mt-2 group-hover:text-amber-300 transition font-royal">
                {top3Teams[0].name}
              </h3>
              <p className="text-xs text-slate-300">Captain: {top3Teams[0].leaderName}</p>
              <p className="text-3xl font-black text-amber-400 mt-3 font-mono-code drop-shadow">
                {top3Teams[0].totalPoints.toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
              </p>
              <p className="text-xs text-amber-200/90 italic mt-2">
                &ldquo;{top3Teams[0].projectTitle}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold">
                <span>View Dossier</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3Teams[2] && (
            <div 
              onClick={() => onSelectTeam(top3Teams[2])}
              className="order-3 bg-slate-900/90 border border-amber-800/60 rounded-2xl p-6 text-center shadow-xl hover:border-amber-700 transition cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-700 to-amber-600" />
              <div className="w-12 h-12 rounded-full bg-amber-950 border-2 border-amber-700 text-amber-300 font-bold flex items-center justify-center mx-auto mb-3 text-lg shadow">
                3
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                2nd Runner-Up
              </span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-amber-400 transition">
                {top3Teams[2].name}
              </h3>
              <p className="text-xs text-slate-400">Leader: {top3Teams[2].leaderName}</p>
              <p className="text-2xl font-black text-slate-200 mt-3 font-mono-code">
                {top3Teams[2].totalPoints.toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
              </p>
              <p className="text-[11px] text-amber-300/90 italic mt-2 line-clamp-1">
                &ldquo;{top3Teams[2].projectTitle}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}

      {/* Main Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {viewMode === 'teams' ? 'All 10 Teams Standing & Breakdown' : `Top Performing Learners (${participants.length} Total)`}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {viewMode === 'teams' ? `${teams.length} Teams participating` : `${participants.length} Active Learners`}
          </span>
        </div>

        {viewMode === 'teams' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">Rank</th>
                  <th className="py-3 px-4">Team Name & Code</th>
                  <th className="py-3 px-4">Leader</th>
                  <th className="py-3 px-4">Members</th>
                  <th className="py-3 px-4">Learning League</th>
                  <th className="py-3 px-4">Coding Battle</th>
                  <th className="py-3 px-4">Quiz / Kahoot</th>
                  <th className="py-3 px-4">Grand Hackathon</th>
                  <th className="py-3 px-4 text-right">Total Points</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sortedTeams.map((team, idx) => {
                  const isTop = idx === 0;
                  const isPodium = idx < 3;
                  return (
                    <tr 
                      key={team.id}
                      onClick={() => onSelectTeam(team)}
                      className={`hover:bg-slate-800/50 transition cursor-pointer ${
                        isTop ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-bold">
                        {idx === 0 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs">
                            1
                          </span>
                        ) : idx === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-slate-950 text-xs">
                            2
                          </span>
                        ) : idx === 2 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white text-xs">
                            3
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono-code">{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm hover:text-amber-400 transition">
                            {team.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono-code">
                            {team.code}
                          </span>
                          {isPodium && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                              {team.awardedTitles[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {team.projectTitle}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {team.leaderName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {team.memberCount}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-400">
                        {team.stageScores.learningLeague.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-400">
                        {team.stageScores.codingBattle.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-400">
                        {team.stageScores.quizKahoot.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono-code text-slate-400">
                        {team.stageScores.hackathonFinale.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-mono-code font-bold text-amber-300 text-sm block">
                          {team.totalPoints.toLocaleString()}
                        </span>
                        {Boolean(team.bonusPoints && team.bonusPoints > 0) && (
                          <span className="text-[10px] font-mono-code text-amber-400 font-semibold inline-flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                            +{team.bonusPoints.toLocaleString()} bonus
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition">
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
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">Rank</th>
                  <th className="py-3 px-4">Student Name & USN</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Recognized Title</th>
                  <th className="py-3 px-4 text-right">Individual Score</th>
                  <th className="py-3 px-4 text-center">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sortedParticipants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-bold text-sm">No Learners Registered Yet</h3>
                        <p className="text-slate-400 text-xs">
                          All mock learner data has been cleared. The Administrator can add real students, official USNs, and genuine points via the Admin Portal.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedParticipants.map((learner, idx) => (
                    <tr 
                      key={learner.id}
                      onClick={() => onSelectParticipant(learner)}
                      className="hover:bg-slate-800/50 transition cursor-pointer"
                    >
                      <td className="py-3 px-4 text-center font-bold font-mono-code">
                        {idx < 3 ? (
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                            idx === 0 ? 'bg-amber-500 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-800 text-white'
                          }`}>
                            {idx + 1}
                          </span>
                        ) : (
                          <span className="text-slate-400">{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-white text-sm hover:text-amber-400 transition">{learner.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono-code">{learner.usn}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-medium">
                        Team {learner.teamName}
                      </td>
                      <td className="py-3 px-4">
                        {learner.isLeader ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
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
                        <span className="text-amber-200 text-xs font-semibold">
                          {learner.awardTitles[0] || 'Championship Participant'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono-code font-bold text-amber-400">
                        {learner.totalPoints.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
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
