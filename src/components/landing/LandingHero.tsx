import React, { useState, useEffect } from 'react';
import { ChampionshipSettings, Team, Participant, CertificateRecord } from '../../types';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Calendar, 
  Users, 
  Code2, 
  Building2,
  Clock,
  Radio,
  Activity,
  Layers,
  FileCheck,
  Zap,
  Star,
  Compass
} from 'lucide-react';

interface LandingHeroProps {
  settings: ChampionshipSettings;
  teams: Team[];
  participants: Participant[];
  certificates: CertificateRecord[];
  onNavigate: (tab: string) => void;
  onOpenBulkModal: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  settings,
  teams,
  participants,
  certificates,
  onNavigate,
  onOpenBulkModal,
}) => {
  // Live ticking date and time on the landing page
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [timeZoneString, setTimeZoneString] = useState<string>('IST');

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZoneString(tz ? tz.split('/').pop()?.replace('_', ' ') || 'LOCAL' : 'LOCAL');
    } catch {
      setTimeZoneString('LOCAL');
    }

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  // Dynamic calculations based strictly on current admin data state
  const totalCohortPoints = teams.reduce((sum, t) => sum + (t.totalPoints || 0), 0);
  const sortedTeams = [...teams].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
  const topTeam = sortedTeams[0];
  const recentCerts = [...certificates].slice(0, 4);

  const stages = [
    { num: '01', name: 'Learning League', desc: 'Core Java, Memory Model, OOP & Collections' },
    { num: '02', name: 'Coding League', desc: 'Arrays, Two-Pointers, Sliding Windows & Stacks' },
    { num: '03', name: 'Innovation League', desc: 'Trees, Graphs, Disjoint Sets & Dynamic Programming' },
    { num: '04', name: 'Preliminary Hackathon', desc: 'Problem Definition & Architectural Blueprints' },
    { num: '05', name: 'Semi Finals', desc: 'Live Stage Coding Battles & Stress Testing' },
    { num: '06', name: 'Grand Finale', desc: 'Working Software Demonstrations & Rubric Defense' },
  ];

  return (
    <div className="space-y-12 py-6 text-slate-100">
      {/* FORTUNE 500 EXECUTIVE LIVE STATUS & SYSTEM CHRONOMETER BAR */}
      <div className="relative rounded-2xl bg-[#050811] border-2 border-[#d4af37]/40 p-4 sm:p-5 shadow-[0_0_30px_rgba(212,175,55,0.12)] ring-1 ring-[#d4af37]/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          {/* Left: Live Status Beacon & Active Stage */}
          <div className="flex flex-wrap items-center gap-3.5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#03060a] border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 font-mono-code">
                LIVE STATUS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white uppercase tracking-wider font-royal">
                {settings.liveStatusText || 'CHAMPIONSHIP SYSTEM ACTIVE'}
              </span>
              <span className="text-[#d4af37] font-bold">•</span>
              <span className="text-xs text-[#ffd700] font-semibold bg-[#ffd700]/10 px-2.5 py-0.5 rounded-full border border-[#ffd700]/30 font-mono-code">
                {settings.activeStage || 'Stage 06: Grand Finale Active'}
              </span>
            </div>
          </div>

          {/* Right: Live System Date & Ticking Time */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono-code self-stretch sm:self-auto justify-end">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#000000] border border-[#d4af37]/35 text-slate-200 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#ffd700]" />
              <span className="text-xs font-semibold text-white">
                {formatDate(currentDateTime)}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#070b14] to-[#0c1222] border-2 border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.2)] text-white">
              <Clock className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-[#ffd700] tracking-wider">
                {formatTime(currentDateTime)}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-extrabold uppercase">
                {timeZoneString}
              </span>
            </div>
          </div>
        </div>

        {/* Real-Time Admin Sync Banner Indicator */}
        <div className="mt-3 pt-3 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span>Real-Time Admin Ledger Synchronization: <strong>Active & Connected</strong></span>
          </div>
          <div className="text-slate-400">
            Any updates to points, teams, participants, or credentials reflect here instantaneously.
          </div>
        </div>
      </div>

      {/* HERO SECTION — FORTUNE 500 BLACK & GOLD EXECUTIVE ARCHITECTURE */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#080d1a] via-[#04070d] to-[#020306] border-2 border-[#d4af37]/50 p-8 md:p-14 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle gold radial ambient glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Double Gold Filigree Accent Frame Lines */}
        <div className="absolute inset-2 rounded-[22px] border border-[#d4af37]/20 pointer-events-none" />

        {/* Top Executive Authority Badges — Dynamically read from admin settings */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#000000] border-2 border-[#d4af37]/60 text-[#ffd700] text-xs font-bold tracking-wide shadow-md">
            <Trophy className="w-4 h-4 text-[#ffd700]" />
            <span>{settings.university || 'Sapthgiri NPS University • Bangalore'}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050912] border border-[#d4af37]/40 text-slate-200 text-xs font-semibold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>{settings.poweredBy || 'Industry Oriented Training (IOT) • Mentorship by Kapil Narula'}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono-code">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Cryptographically Verified</span>
          </div>
        </div>

        {/* Main Title — Dynamically driven by settings.name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-royal tracking-tight max-w-5xl mx-auto leading-tight relative z-10">
          {settings.name || "India's Most Comprehensive 13-Day Java DSA Championship 2026"}
        </h1>

        {/* Official Motto — Dynamically driven by settings.motto */}
        <div className="mt-6 inline-block px-6 py-2.5 rounded-2xl bg-[#000000] border-2 border-[#d4af37]/50 shadow-[0_0_20px_rgba(212,175,55,0.15)] relative z-10">
          <p className="text-xs sm:text-sm font-black text-[#ffd700] tracking-widest uppercase font-mono-code">
            &ldquo;{settings.motto || 'Code Every Day. Compete Every Day. Improve Every Day.'}&rdquo;
          </p>
        </div>

        {/* Subtitle & Dates */}
        <p className="max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 mt-5 leading-relaxed font-serif-title relative z-10">
          The official credentials repository and championship execution system for elite engineering contenders at{' '}
          <strong className="text-white">{settings.university}</strong> under technical guidance by{' '}
          <strong className="text-[#ffd700]">{settings.directorName}</strong> ({settings.directorTitle}).
        </p>

        <div className="mt-3 text-xs text-slate-400 font-mono-code relative z-10">
          Championship Timeline: <span className="text-white font-semibold">{settings.startDate}</span> — <span className="text-white font-semibold">{settings.endDate}</span>
        </div>

        {/* Executive Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 relative z-10">
          <button
            onClick={() => onNavigate('certificates')}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ffd700] via-[#f5d76e] to-[#d4af37] hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition cursor-pointer border border-[#fff1b8]"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>Browse Issued Certificates ({certificates.length})</span>
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="px-7 py-3.5 rounded-xl bg-[#090e1c] hover:bg-[#10172e] text-white font-bold text-xs flex items-center gap-2.5 border-2 border-[#d4af37]/60 hover:border-[#ffd700] shadow-lg transition cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-[#ffd700]" />
            <span>Live 10 Teams Standings</span>
          </button>

          <button
            onClick={() => onNavigate('verify')}
            className="px-7 py-3.5 rounded-xl bg-[#000000] hover:bg-slate-900 text-emerald-300 font-bold text-xs flex items-center gap-2 border border-emerald-500/50 shadow-md transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public Verification Portal</span>
          </button>
        </div>

        {/* LIVE REAL-TIME METRICS GRID — Dynamically reflects all Admin edits */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t-2 border-[#d4af37]/30 text-left relative z-10">
          <div className="p-4 rounded-xl bg-[#02050c] border border-[#d4af37]/40 shadow-inner">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Teams Registered</span>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono-code mt-0.5">
              {teams.length} Teams
            </p>
            <p className="text-[11px] text-[#ffd700] font-medium truncate mt-1">
              {totalCohortPoints > 0 && topTeam ? `Rank #1: ${topTeam.name}` : '10 Official Teams'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#02050c] border border-[#d4af37]/40 shadow-inner">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Learners</span>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono-code mt-0.5">
              {participants.length > 0 ? `${participants.length}` : '0'}
            </p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">
              {participants.length > 0 ? 'Verified Learners in Ledger' : 'Awaiting Admin Input'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#02050c] border border-[#d4af37]/40 shadow-inner">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Issued Certificates</span>
            <p className="text-2xl sm:text-3xl font-black text-[#ffd700] font-mono-code mt-0.5">
              {certificates.length}
            </p>
            <p className="text-[11px] text-slate-300 font-medium mt-1">
              {certificates.length > 0 ? 'Tamper-Proof Digital Certs' : '0 Issued Yet'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#02050c] border border-[#d4af37]/40 shadow-inner">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Cohort Total Points</span>
            <p className="text-2xl sm:text-3xl font-black text-[#f5d76e] font-mono-code mt-0.5">
              {totalCohortPoints.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-300 font-medium mt-1">
              Live Mathematical Sum
            </p>
          </div>
        </div>
      </div>

      {/* DYNAMIC TOP 3 CHAMPIONSHIP LEADERS — LIVE STANDINGS PREVIEW */}
      <div className="bg-[#050811] border-2 border-[#d4af37]/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#ffd700]" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-royal">
                Current Top Championship Standings (Live Admin Feed)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Dynamically re-ranked the instant points, bonuses, or rubric evaluations are updated in the Admin Console.
            </p>
          </div>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="text-xs text-[#ffd700] hover:text-white flex items-center gap-1.5 font-bold uppercase tracking-wider transition cursor-pointer"
          >
            <span>View All 10 Teams</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedTeams.slice(0, 3).map((team, idx) => (
            <div 
              key={team.id} 
              onClick={() => onNavigate('teams')}
              className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                idx === 0 
                  ? 'bg-gradient-to-b from-[#121929] to-[#080d19] border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.25)]' 
                  : 'bg-[#03060c] border-[#d4af37]/30 hover:border-[#d4af37]/80'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-sm font-mono-code ${
                    idx === 0 
                      ? 'bg-[#ffd700] text-slate-950 shadow-md' 
                      : idx === 1 
                      ? 'bg-slate-200 text-slate-950' 
                      : 'bg-[#996515] text-white'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-white tracking-wide">{team.name}</h4>
                    <p className="text-[11px] text-slate-400">Leader: {team.leaderName || 'Unassigned'}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-mono-code font-black text-sm text-[#ffd700]">
                    {(team.totalPoints || 0).toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                  </p>
                  {team.bonusPoints ? (
                    <span className="text-[10px] text-emerald-400 font-bold">
                      +{team.bonusPoints} bonus
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="truncate max-w-[180px] text-slate-300">
                  {team.projectTitle || 'Project Title Pending'}
                </span>
                <span className="text-[#d4af37] font-semibold text-[10px]">
                  {team.memberCount || 0} Members
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY ISSUED CERTIFICATES AUDIT TICKER (VISIBLE WHEN CERTS ARE ISSUED) */}
      {recentCerts.length > 0 && (
        <div className="bg-[#050811] border border-[#d4af37]/35 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ffd700]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-royal">
                Recently Issued & Verified Digital Certificates
              </h3>
            </div>
            <button
              onClick={() => onNavigate('certificates')}
              className="text-xs text-[#ffd700] hover:text-white flex items-center gap-1 font-bold"
            >
              <span>Explore All {certificates.length} Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentCerts.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => onNavigate('certificates')}
                className="p-3.5 rounded-xl bg-[#000000] border border-[#d4af37]/30 hover:border-[#ffd700] transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-mono-code text-[#ffd700]">{cert.certificateNo}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Issued
                  </span>
                </div>
                <h5 className="font-bold text-xs text-white truncate">{cert.participantName}</h5>
                <p className="text-[11px] text-slate-400 truncate">{cert.teamName} • {cert.usn}</p>
                <div className="mt-2 text-[10px] font-semibold text-[#ffd700] uppercase tracking-wider">
                  {cert.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFICIAL CHAMPIONSHIP VISION & MENTORSHIP AUTHORITY CARD */}
      <div className="relative bg-gradient-to-r from-[#070c18] via-[#03060d] to-[#070c18] border-2 border-[#d4af37]/40 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-2.5 text-[#ffd700] text-xs font-black uppercase tracking-widest mb-3">
          <Sparkles className="w-4 h-4 text-[#ffd700]" />
          Official Championship Vision & Executive Directorial Statement
        </div>

        <blockquote className="text-base sm:text-lg text-slate-200 italic font-serif-title leading-relaxed">
          &ldquo;{settings.vision}&rdquo;
        </blockquote>

        <div className="mt-6 pt-4 border-t border-[#d4af37]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div>
            <span className="text-slate-400">Authority Signatory: </span>
            <strong className="text-white font-royal text-sm">{settings.directorName}</strong>
            <span className="text-[#ffd700]"> — {settings.directorTitle}</span>
          </div>
          <div className="text-right font-mono-code text-[11px] text-slate-400">
            Official Institution: <strong className="text-white">{settings.university}</strong>
          </div>
        </div>
      </div>

      {/* 13-DAY CHAMPIONSHIP RIGOUR TIMELINE */}
      <div>
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#ffd700] uppercase tracking-widest">The 13-Day Rigour</span>
          <h2 className="text-2xl font-black text-white font-royal mt-1">
            Championship Progression Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((stage) => {
            const isActiveStage = settings.activeStage?.toLowerCase().includes(stage.name.toLowerCase());
            return (
              <div 
                key={stage.num} 
                className={`p-5 rounded-2xl border-2 transition ${
                  isActiveStage
                    ? 'bg-[#0f1526] border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#050811] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-black font-mono-code text-[#d4af37]">
                    {stage.num}
                  </span>
                  {isActiveStage && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider font-mono-code">
                      Active Stage
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-white">{stage.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{stage.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
