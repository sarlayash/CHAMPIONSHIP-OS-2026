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
  Sparkles
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
          <Users className="w-3.5 h-3.5" />
          The 10 Championship Contenders
        </div>
        <h1 className="text-3xl font-extrabold text-white font-royal">
          10 Teams & Project Showcase
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore all 10 competing teams, their grand finale hackathon software architectures, git repositories, rubric evaluations, and team certificate records.
        </p>
      </div>

      {/* Main Split View: Left List of 10 Teams, Right Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Teams List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Championship Teams (Ranked 1 to 10)
          </p>
          {teams.map((t) => {
            const isSelected = selectedTeam?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTeamId(t.id)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    t.rank === 1 
                      ? 'bg-amber-500 text-slate-950 shadow-md' 
                      : t.rank === 2 
                      ? 'bg-slate-300 text-slate-950' 
                      : t.rank === 3 
                      ? 'bg-amber-800 text-white' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    #{t.rank}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>Capt. {t.leaderName}</span>
                      <span>•</span>
                      <span>{t.memberCount} Members</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-mono-code font-bold text-amber-400">
                    {t.totalPoints.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500">Points</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Details & Project Dossier (8 cols) */}
        {selectedTeam && (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-bold text-white font-royal flex items-center gap-2">
                    Team {selectedTeam.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 text-xs font-mono-code">
                    {selectedTeam.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                    Rank #{selectedTeam.rank}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Team Captain: <strong className="text-slate-200">{selectedTeam.leaderName}</strong> • {selectedTeam.memberCount} Verified Learners
                </p>
              </div>

              <div className="text-right">
                <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Championship Points</span>
                  <span className="text-2xl font-black text-amber-400 font-mono-code">
                    {selectedTeam.totalPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Official Honors / Awards won */}
            <div className="py-4 border-b border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold mr-2 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Conferred Titles:
              </span>
              {selectedTeam.awardedTitles.map((title, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {title}
                </span>
              ))}
            </div>

            {/* Grand Finale Project Card */}
            <div className="my-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Grand Finale Hackathon Software Architecture
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {selectedTeam.projectTitle}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {selectedTeam.projectDescription}
              </p>

              {/* Resource Links */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-900">
                <a
                  href={selectedTeam.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
                <a
                  href={selectedTeam.demoVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  Demo Video
                </a>
                <a
                  href={selectedTeam.pptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  Pitch Deck (PPT)
                </a>
              </div>
            </div>

            {/* Judge Evaluation & Rubric Feedback */}
            <div className="mb-6 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-200">Judges Review & Rubric Score</span>
                </div>
                <span className="text-xs font-mono-code font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  Rubric Score: {selectedTeam.rubricScore || 90}/100
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">
                &ldquo;{selectedTeam.judgeFeedback}&rdquo;
              </p>
            </div>

            {/* Team Members List */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                Team Roster ({teamMembers.length} Members)
              </h4>
              {teamMembers.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-slate-800 text-center">
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
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{m.name}</span>
                          {m.isLeader && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                              Leader
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono-code">{m.usn}</p>
                        <p className="text-[10px] text-amber-300/80 mt-0.5">{m.awardTitles[0] || 'Participant'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono-code font-bold text-slate-300">
                          {m.totalPoints.toLocaleString()}
                        </p>
                        <p className="text-[9px] text-slate-500">Pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Team Digital Certificates */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Issued Team Certificates ({teamCertificates.length})
                </h4>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  All 100% Issued & Cryptographically Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {teamCertificates.slice(0, 6).map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => onViewCertificate(cert)}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition">
                        {cert.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {cert.participantName} • <span className="font-mono-code text-amber-400/80">{cert.certificateNo}</span>
                      </p>
                    </div>
                    <button className="text-slate-500 group-hover:text-amber-400 transition">
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
