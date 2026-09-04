import React, { useState } from 'react';
import { AwardItem, Team, Participant } from '../../types';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  Award, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  ExternalLink,
  Target,
  Flame,
  Building2
} from 'lucide-react';

interface HallOfFameProps {
  awards: AwardItem[];
  teams: Team[];
  participants: Participant[];
  onSelectTeam: (team: Team) => void;
  onSelectParticipant: (participant: Participant) => void;
}

export const HallOfFame: React.FC<HallOfFameProps> = ({
  awards,
  teams,
  participants,
  onSelectTeam,
  onSelectParticipant,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const championTeam = teams.find(t => t.rank === 1) || teams[0];
  const championStudent = participants.find(p => p.rank === 1) || (participants.length > 0 ? participants[0] : null);

  const categories = [
    { id: 'all', label: 'All Awards (50+)' },
    { id: 'championship_title', label: '👑 Championship Titles (8)' },
    { id: 'technical', label: '💻 Technical Excellence (10)' },
    { id: 'performance', label: '🌟 Performance Excellence (7)' },
    { id: 'leadership', label: '🤝 Leadership & Branding (10)' },
    { id: 'competition', label: '🎮 Competition & Battles (5)' },
    { id: 'team', label: '👥 Team Awards (10 Teams)' },
  ];

  const filteredAwards = activeCategory === 'all'
    ? awards
    : awards.filter(a => a.category === activeCategory);

  const mentorshipStatements = [
    {
      quote: "The 13-day championship curriculum is engineered to simulate high-stress tier-1 software engineering environments, developing both deep algorithmic instincts and robust production team dynamics.",
      author: "Kapil Narula",
      role: "Program Director & Lead Technical Mentor • Industry Oriented Training (IOT)",
      tag: "Lead Technical Mentor"
    },
    {
      quote: "Software architecture is not tested on easy problem sets. Through 13 continuous days of recursive challenges, dynamic programming, and live team defense, these learners proved their elite capability.",
      author: "Mentorship by Kapil",
      role: "Master Technical Syllabus & Competitive Benchmarking",
      tag: "Architectural Vision"
    },
    {
      quote: "Every single certificate issued carries cryptographically verifiable credentials. We do not distribute participation certificates lightly — each represents verifiable algorithmic mastery.",
      author: "Technical Credential Authority",
      role: "Official Mentorship & Certification Governance",
      tag: "Credential Authority"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 text-slate-100">
      {/* Top Banner — Fortune 500 Executive Black & Gold */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold mb-3">
          <Crown className="w-4 h-4 text-[#ffd700]" />
          Executive Archive • Mentorship by Kapil Narula
        </div>
        <h1 className="text-4xl font-black text-white font-royal tracking-tight">
          Championship Hall of Fame
        </h1>
        <p className="text-sm text-slate-400 mt-2 font-serif-title">
          Celebrating monumental individual brilliance, team supremacy, and algorithmic mastery achieved across the 13-day Java DSA championship.
        </p>
      </div>

      {/* Dual Pinnacle Champions Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Champion Individual */}
        {championStudent && championStudent.totalPoints > 0 ? (
          <div className="bg-gradient-to-br from-[#12192b] via-[#090e1a] to-[#03060c] border-2 border-[#ffd700] rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(212,175,55,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 text-[#ffd700] text-xs font-black uppercase tracking-widest mb-3 font-mono-code">
              <Trophy className="w-4 h-4 text-[#ffd700]" />
              Champion Learner of the Year 2026
            </div>
            <h3 className="text-3xl font-black text-white font-royal">
              {championStudent.name}
            </h3>
            <p className="text-xs text-[#ffd700] font-mono-code mt-1">
              USN: {championStudent.usn} • Captain, Team {championStudent.teamName}
            </p>
            <div className="my-4 p-4 bg-[#000000] border border-[#d4af37]/30 rounded-2xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Championship Points</span>
                <span className="text-xl font-black text-[#ffd700] font-mono-code">{(championStudent.totalPoints || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-slate-400">Attendance & Code Quality</span>
                <span className="text-sm font-bold text-emerald-400 font-mono-code">{championStudent.attendanceRate}% Verified</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
              &ldquo;Awarded the ultimate individual championship title for solving the highest quantity of hard algorithmic challenges and orchestrating team architecture.&rdquo;
            </p>
            <button
              onClick={() => onSelectParticipant(championStudent)}
              className="mt-5 px-5 py-2.5 bg-gradient-to-r from-[#ffd700] via-[#f5d76e] to-[#d4af37] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg hover:brightness-110"
            >
              View Student Dossier & Credentials
            </button>
          </div>
        ) : (
          <div className="bg-[#050811] border-2 border-dashed border-[#d4af37]/40 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] flex items-center justify-center">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white font-royal">Champion Learner Title Reserved</h3>
            <p className="text-xs text-slate-400 max-w-sm font-serif-title">
              Points initialize from zero. Once real student scores are recorded in the Admin Portal, the #1 ranked learner will automatically be crowned here.
            </p>
          </div>
        )}

        {/* Champion Team */}
        {championTeam && championTeam.totalPoints > 0 ? (
          <div className="bg-gradient-to-br from-[#12192b] via-[#090e1a] to-[#03060c] border-2 border-[#ffd700] rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(212,175,55,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 text-[#ffd700] text-xs font-black uppercase tracking-widest mb-3 font-mono-code">
              <Crown className="w-4 h-4 text-[#ffd700]" />
              Rank #1 Championship Team
            </div>
            <h3 className="text-3xl font-black text-white font-royal">
              Team {championTeam.name}
            </h3>
            <p className="text-xs text-[#ffd700] font-mono-code mt-1">
              Code: {championTeam.code} • {championTeam.memberCount} Registered Members
            </p>
            <div className="my-4 p-4 bg-[#000000] border border-[#d4af37]/30 rounded-2xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Team Points</span>
                <span className="text-xl font-black text-[#ffd700] font-mono-code">
                  {(championTeam.totalPoints || 0).toLocaleString()} pts
                </span>
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-slate-400">Grand Finale Project</span>
                <span className="text-xs font-bold text-white truncate">{championTeam.projectTitle || 'Project Title'}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
              Demonstrated exemplary collaborative engineering and algorithmic performance throughout the 13-day championship.
            </p>
            <button
              onClick={() => onSelectTeam(championTeam)}
              className="mt-5 px-5 py-2.5 bg-gradient-to-r from-[#ffd700] via-[#f5d76e] to-[#d4af37] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg hover:brightness-110"
            >
              View Team Dossier & Project
            </button>
          </div>
        ) : (
          <div className="bg-[#050811] border-2 border-dashed border-[#d4af37]/40 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] flex items-center justify-center">
              <Crown className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white font-royal">Champion Team Title Reserved</h3>
            <p className="text-xs text-slate-400 max-w-sm font-serif-title">
              All 10 official teams start cleanly from zero points. As stage assessments and hackathon rubric scores are recorded by the administration, the #1 champion team will be crowned here.
            </p>
          </div>
        )}
      </div>

      {/* Official Recognition Framework Category Filter & Cards */}
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-white font-royal flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ffd700]" />
              Official Recognition Framework
            </h2>
            <p className="text-xs text-slate-400 font-serif-title">
              Every learner receives authenticated digital certificates and badges, with prestigious titles conferred for excellence.
            </p>
          </div>

          {/* Categories bar */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#000000] p-1.5 rounded-2xl border border-[#d4af37]/35 shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#ffd700] text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#0c1222]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Award Grid — Fortune 500 Black & Gold Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAwards.map((award) => (
            <div
              key={award.id}
              className="bg-[#050811] border-2 border-[#d4af37]/30 hover:border-[#ffd700] rounded-2xl p-5 flex flex-col justify-between transition group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{award.icon}</span>
                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-[#000000] text-[#ffd700] border border-[#d4af37]/30 font-mono-code">
                    {award.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-[#ffd700] transition font-royal">
                  {award.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-serif-title">
                  {award.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between text-xs font-mono-code">
                <span className="text-slate-400">Conferred To:</span>
                <span className="font-bold text-[#ffd700]">
                  {award.recipientName ? award.recipientName : award.teamName ? `Team ${award.teamName}` : 'Awarded by Jury'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Mentorship Section — Exclusively Mentorship by Kapil Narula */}
      <div className="pt-6 border-t border-[#d4af37]/30">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="px-3 py-1 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] text-[11px] font-black uppercase font-mono-code">
            Direct Mentorship
          </span>
          <h2 className="text-2xl font-black text-white font-royal mt-2">
            Mentorship by Kapil Narula
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-serif-title">
            Industry Oriented Training (IOT) • Technical Direction & Credential Authority
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentorshipStatements.map((t, idx) => (
            <div key={idx} className="p-6 bg-[#050811] border-2 border-[#d4af37]/35 rounded-2xl flex flex-col justify-between shadow-xl">
              <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-[#d4af37]/20">
                <span className="text-[10px] font-mono-code text-[#ffd700] font-black uppercase tracking-wider block mb-1">
                  {t.tag}
                </span>
                <h4 className="text-xs font-black text-white">{t.author}</h4>
                <p className="text-[10px] text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
