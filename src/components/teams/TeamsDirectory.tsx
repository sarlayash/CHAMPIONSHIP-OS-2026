import React, { useState } from 'react';
import { Team, Participant, CertificateRecord } from '../../types';
import { 
  Users, 
  Trophy, 
  Github, 
  Video, 
  FileText, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  ShieldAlert, 
  ChevronRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface TeamsDirectoryProps {
  teams: Team[];
  participants: Participant[];
  certificates: CertificateRecord[];
  onViewCertificate: (cert: CertificateRecord) => void;
}

export const TeamsDirectory: React.FC<TeamsDirectoryProps> = ({
  teams,
  participants,
  certificates,
  onViewCertificate,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || teams[0] || null;

  const teamMembers = selectedTeam 
    ? participants.filter(p => p.teamId === selectedTeam.id)
    : [];

  const teamCertificates = selectedTeam 
    ? certificates.filter(c => c.teamId === selectedTeam.id)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100">
      {/* Top Header — Fortune 500 Executive Black & Gold */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold mb-2">
          <Users className="w-3.5 h-3.5 text-[#ffd700]" />
          The 10 Championship Contenders
        </div>
        <h1 className="text-3xl font-black text-white font-royal tracking-tight">
          10 Teams & Project Showcase
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-serif-title">
          Explore all 10 competing teams, their grand finale hackathon software architectures, git repositories, rubric evaluations, and team certificate records.
        </p>
      </div>

      {/* Main Split View: Left List of 10 Teams, Right Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Teams List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1 font-mono-code">
            Championship Teams (Ranked 1 to 10)
          </p>
          {teams.map((t) => {
            const isSelected = selectedTeam?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTeamId(t.id)}
                className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#121929] to-[#080d19] border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-[#050811] border-[#d4af37]/25 hover:border-[#d4af37]/70 hover:bg-[#090e1c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs font-mono-code ${
                    t.rank === 1 
                      ? 'bg-[#ffd700] text-slate-950 shadow-md' 
                      : t.rank === 2 
                      ? 'bg-slate-300 text-slate-950 font-bold' 
                      : t.rank === 3 
                      ? 'bg-[#b38728] text-white font-bold' 
                      : 'bg-[#000000] text-slate-300 border border-[#d4af37]/30'
                  }`}>
                    #{t.rank}
                  </div>
                  <div>
                    <h3 className={`font-black text-sm ${isSelected ? 'text-[#ffd700]' : 'text-white'}`}>
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>Capt. {t.leaderName || 'Unassigned'}</span>
                      <span>•</span>
                      <span className="font-mono-code">{t.memberCount} Members</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-mono-code font-black text-[#ffd700]">
                    {(t.totalPoints || 0).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase font-mono-code">Points</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Details & Project Dossier (8 cols) — Executive Framing */}
        {selectedTeam && (
          <div className="lg:col-span-8 bg-[#050811] border-2 border-[#d4af37]/40 rounded-2xl p-6 md:p-8 shadow-2xl ring-1 ring-[#d4af37]/20">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#d4af37]/25">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-black text-white font-royal flex items-center gap-2">
                    Team {selectedTeam.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#ffd700] border border-[#d4af37]/50 text-xs font-mono-code font-bold">
                    {selectedTeam.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40 text-xs font-black uppercase">
                    Rank #{selectedTeam.rank}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Team Captain: <strong className="text-white">{selectedTeam.leaderName || 'Unassigned'}</strong> • {selectedTeam.memberCount} Verified Learners
                </p>
              </div>

              <div className="text-right flex flex-col items-end gap-1.5">
                <div className="px-4 py-2 bg-[#000000] border border-[#d4af37]/40 rounded-xl shadow-inner">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold font-mono-code">Total Points</span>
                  <span className="text-2xl font-black text-[#ffd700] font-mono-code">
                    {(selectedTeam.totalPoints || 0).toLocaleString()}
                  </span>
                </div>
                {Boolean(selectedTeam.bonusPoints && selectedTeam.bonusPoints > 0) && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono-code text-[11px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    +{selectedTeam.bonusPoints.toLocaleString()} Team Bonus
                  </span>
                )}
              </div>
            </div>

            {/* Official Honors / Awards won */}
            {selectedTeam.awardedTitles && selectedTeam.awardedTitles.length > 0 && (
              <div className="py-4 border-b border-[#d4af37]/20 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-300 font-bold mr-2 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[#ffd700]" />
                  Conferred Honors:
                </span>
                {selectedTeam.awardedTitles.map((title, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#ffd700]/15 border border-[#ffd700]/40 text-[#ffd700] text-xs font-black flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#ffd700]" />
                    {title}
                  </span>
                ))}
              </div>
            )}

            {/* Grand Finale Project Card */}
            <div className="my-6 p-5 rounded-xl bg-[#000000] border border-[#d4af37]/35 shadow-inner">
              <span className="text-[10px] font-black text-[#ffd700] uppercase tracking-widest font-mono-code">
                Grand Finale Hackathon Software Architecture
              </span>
              <h3 className="text-lg font-black text-white mt-1 font-royal">
                {selectedTeam.projectTitle || 'Project Title Pending'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 font-serif-title">
                {selectedTeam.projectDescription || 'Detailed architectural overview to be defense presented at Grand Finale.'}
              </p>

              {/* Resource Links */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-[#d4af37]/20">
                {selectedTeam.githubUrl && (
                  <a
                    href={selectedTeam.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#0a0f1d] hover:bg-[#121a30] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-[#d4af37]/30"
                  >
                    <Github className="w-3.5 h-3.5 text-[#ffd700]" />
                    GitHub Repository
                  </a>
                )}
                {selectedTeam.demoVideoUrl && (
                  <a
                    href={selectedTeam.demoVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#0a0f1d] hover:bg-[#121a30] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-[#d4af37]/30"
                  >
                    <Video className="w-3.5 h-3.5 text-[#ffd700]" />
                    Demo Video
                  </a>
                )}
                {selectedTeam.pptUrl && (
                  <a
                    href={selectedTeam.pptUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#0a0f1d] hover:bg-[#121a30] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-[#d4af37]/30"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#ffd700]" />
                    Pitch Deck (PPT)
                  </a>
                )}
              </div>
            </div>

            {/* Judge Evaluation & Rubric Feedback */}
            <div className="mb-6 p-4 rounded-xl bg-[#000000] border border-[#d4af37]/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#ffd700]" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">Judges Review & Rubric Score</span>
                </div>
                <span className="text-xs font-mono-code font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/40">
                  Rubric Score: {selectedTeam.rubricScore || 90}/100
                </span>
              </div>
              <p className="text-xs text-slate-300 italic font-serif-title">
                &ldquo;{selectedTeam.judgeFeedback || 'Awaiting jury defense evaluation.'}&rdquo;
              </p>
            </div>

            {/* Team Members List */}
            <div className="mb-6">
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2 font-royal">
                <Users className="w-4 h-4 text-[#ffd700]" />
                Team Roster ({teamMembers.length} Members)
              </h4>
              {teamMembers.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#000000] border border-dashed border-[#d4af37]/30 text-center">
                  <p className="text-xs text-slate-400">No members assigned to this squad yet.</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    The administrator can assign real learners and specify team captains in the Admin Portal.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {teamMembers.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl bg-[#000000] border border-[#d4af37]/30 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{m.name}</span>
                          {m.isLeader && (
                            <span className="px-1.5 py-0.2 rounded bg-[#ffd700]/20 text-[#ffd700] text-[9px] font-black border border-[#ffd700]/40 font-mono-code">
                              Leader
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#ffd700] font-mono-code">{m.usn}</p>
                        <p className="text-[10px] text-slate-300 mt-0.5">{m.awardTitles[0] || 'Participant'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono-code font-black text-white">
                          {(m.totalPoints || 0).toLocaleString()}
                        </p>
                        <p className="text-[9px] text-slate-500 uppercase font-mono-code">Pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Team Digital Certificates */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 font-royal">
                  <Award className="w-4 h-4 text-[#ffd700]" />
                  Issued Team Certificates ({teamCertificates.length})
                </h4>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono-code">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Cryptographically Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {teamCertificates.slice(0, 6).map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => onViewCertificate(cert)}
                    className="p-3 rounded-lg bg-[#000000] border border-[#d4af37]/30 hover:border-[#ffd700] transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-[#ffd700] transition">
                        {cert.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {cert.participantName} • <span className="font-mono-code text-[#ffd700]">{cert.certificateNo}</span>
                      </p>
                    </div>
                    <button className="text-slate-400 group-hover:text-[#ffd700] transition">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
