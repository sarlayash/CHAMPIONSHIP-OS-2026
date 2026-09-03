import React from 'react';
import { ChampionshipSettings, Team } from '../../types';
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
  FileCheck
} from 'lucide-react';

interface LandingHeroProps {
  settings: ChampionshipSettings;
  teams: Team[];
  onNavigate: (tab: string) => void;
  onOpenBulkModal: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  settings,
  teams,
  onNavigate,
  onOpenBulkModal,
}) => {
  const stages = [
    { num: '01', name: 'Learning League', desc: 'Core Java, Memory Model, OOP & Collections' },
    { num: '02', name: 'Coding League', desc: 'Arrays, Two-Pointers, Sliding Windows & Stacks' },
    { num: '03', name: 'Innovation League', desc: 'Trees, Graphs, Disjoint Sets & Dynamic Programming' },
    { num: '04', name: 'Preliminary Hackathon', desc: 'Problem Definition & Architectural Blueprints' },
    { num: '05', name: 'Semi Finals', desc: 'Live Stage Coding Battles & Stress Testing' },
    { num: '06', name: 'Grand Finale', desc: 'Working Software Demonstrations & Rubric Defense' },
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-radial from-[#131d38] via-[#090f1d] to-[#050811] border border-amber-500/30 p-8 md:p-14 text-center shadow-2xl overflow-hidden">
        {/* Background glow & decorative elements */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Sapthgiri NPS University • Bangalore
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Industry Oriented Training (IOT) Powered By Kapil
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-royal tracking-tight max-w-4xl mx-auto leading-tight">
          India&apos;s Most Comprehensive <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">13-Day Java DSA</span> Championship 2026
        </h1>

        {/* Official Motto */}
        <div className="mt-5 inline-block px-5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
          <p className="text-xs sm:text-sm font-bold text-amber-300 tracking-wider uppercase font-mono-code">
            &ldquo;Code Every Day. Compete Every Day. Improve Every Day.&rdquo;
          </p>
        </div>

        {/* Description / Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300/90 mt-4 leading-relaxed font-serif-title">
          The verified credentials and championship operating system powering 56 student learners across 10 elite engineering teams at Sapthgiri NPS University.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <button
            onClick={() => onNavigate('certificates')}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Award className="w-4 h-4" />
            Browse Issued Certificates
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Live 10 Teams Standings
          </button>

          <button
            onClick={() => onNavigate('verify')}
            className="px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 font-semibold text-xs flex items-center gap-2 border border-emerald-500/40 transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verify Credential
          </button>
        </div>

        {/* Live Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Teams Cohort</span>
            <p className="text-2xl font-black text-white font-mono-code mt-0.5">10 Teams</p>
            <p className="text-[10px] text-amber-400">Toxicos leading (Rank #1)</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Learners</span>
            <p className="text-2xl font-black text-white font-mono-code mt-0.5">56 Students</p>
            <p className="text-[10px] text-emerald-400">100% Recognized</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Certificates Issued</span>
            <p className="text-2xl font-black text-amber-400 font-mono-code mt-0.5">168+ Records</p>
            <p className="text-[10px] text-slate-400">QR & Hash Verified</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Points Scored</span>
            <p className="text-2xl font-black text-blue-400 font-mono-code mt-0.5">1,478,426</p>
            <p className="text-[10px] text-slate-400">Over 13 Days</p>
          </div>
        </div>
      </div>

      {/* Official Vision Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          Official Championship Vision
        </div>
        <blockquote className="text-base sm:text-lg text-slate-200 italic font-serif-title leading-relaxed">
          &ldquo;{settings.vision}&rdquo;
        </blockquote>
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Signed: <strong>{settings.directorName}</strong> ({settings.directorTitle})</span>
          <span className="text-amber-300 font-royal font-semibold">Sapthgiri NPS University</span>
        </div>
      </div>

      {/* Championship Stages Timeline */}
      <div>
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">The 13-Day Rigour</span>
          <h2 className="text-2xl font-bold text-white font-royal mt-1">
            Championship Progression Stages
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((stage) => (
            <div key={stage.num} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition">
              <span className="text-2xl font-black font-mono-code text-amber-500/60 block mb-1">
                {stage.num}
              </span>
              <h3 className="font-bold text-base text-white">{stage.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 Quick Preview */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Current Top 3 Championship Leaders
          </h3>
          <button
            onClick={() => onNavigate('leaderboard')}
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            View All 10 Teams
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teams.slice(0, 3).map((team, idx) => (
            <div key={team.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  idx === 0 ? 'bg-amber-500 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-800 text-white'
                }`}>
                  #{idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">{team.name}</h4>
                  <p className="text-[11px] text-slate-400">Leader: {team.leaderName}</p>
                </div>
              </div>
              <p className="font-mono-code font-bold text-amber-400 text-xs">
                {team.totalPoints.toLocaleString()} pts
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
