import React, { useState } from 'react';
import { AwardItem, Team, Participant } from '../../types';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  Star, 
  Flame, 
  Medal, 
  Award,
  MessageSquare, 
  Image as ImageIcon,
  CheckCircle2,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const championStudent = participants.find(p => p.rank === 1) || participants[0];

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

  const testimonials = [
    {
      quote: "The 13-day Java DSA Championship completely transformed how I think about algorithms. Building the Distributed Graph Engine under Kapil Sir's mentorship gave me genuine corporate engineering confidence.",
      author: "Aarav Sharma",
      role: "Java DSA Champion 2026 • Captain, Team Toxicos",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    },
    {
      quote: "The daily live coding battles and instant rubric evaluations pushed our team to optimize lock-free order matching to microsecond latency. Receiving this official verifiable certificate is the pinnacle of my college career.",
      author: "Sneha Reddy",
      role: "Java DSA Vice Champion • Captain, Team TechTok",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    {
      quote: "Every single one of our 56 cohort learners left recognized and empowered. The standard of technical guidance from Industry Oriented Training at Sapthgiri was world-class.",
      author: "Rohan Kulkarni",
      role: "Elite Performer • Team Triple Bytes",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <Crown className="w-4 h-4 text-amber-400" />
          Permanent Academic Archive
        </div>
        <h1 className="text-4xl font-extrabold text-white font-royal tracking-tight">
          Championship Hall of Fame
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Celebrating monumental individual brilliance, team supremacy, and technical mastery achieved at Sapthgiri NPS University.
        </p>
      </div>

      {/* Dual Pinnacle Champions Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Champion Individual */}
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4" />
            Champion Learner of the Year 2026
          </div>
          <h3 className="text-3xl font-black text-white font-serif-title">
            {championStudent.name}
          </h3>
          <p className="text-xs text-amber-300 font-mono-code mt-1">
            USN: {championStudent.usn} • Captain, Team {championStudent.teamName}
          </p>
          <div className="my-4 p-4 bg-slate-950/70 border border-amber-500/20 rounded-2xl">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Championship Points</span>
              <span className="text-xl font-black text-amber-400 font-mono-code">{championStudent.totalPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-2">
              <span className="text-slate-400">Attendance & Submission Consistency</span>
              <span className="text-sm font-bold text-emerald-400 font-mono-code">100% Flawless</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
            &ldquo;Awarded the ultimate individual championship title for solving the highest quantity of hard algorithmic challenges and orchestrating team architecture.&rdquo;
          </p>
          <button
            onClick={() => onSelectParticipant(championStudent)}
            className="mt-5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            View Student Profile & Credentials
          </button>
        </div>

        {/* Champion Team */}
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-indigo-500/60 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-4 h-4" />
            Overall Grand Champion Team
          </div>
          <h3 className="text-3xl font-black text-white font-royal">
            Team {championTeam.name}
          </h3>
          <p className="text-xs text-indigo-300 font-mono-code mt-1">
            Code: {championTeam.code} • 6 Active Learners
          </p>
          <div className="my-4 p-4 bg-slate-950/70 border border-indigo-500/20 rounded-2xl">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Team Points</span>
              <span className="text-xl font-black text-amber-400 font-mono-code">233,878 pts</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-2">
              <span className="text-slate-400">Grand Finale Project</span>
              <span className="text-xs font-semibold text-slate-200 truncate">{championTeam.projectTitle}</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
            &ldquo;Demonstrated undisputed collaborative supremacy, setting unprecedented benchmarks in concurrent graph traversal in Java 21.&rdquo;
          </p>
          <button
            onClick={() => onSelectTeam(championTeam)}
            className="mt-5 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            View Team Dossier & Project
          </button>
        </div>
      </div>

      {/* Official Recognition Framework Category Filter & Cards */}
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white font-royal flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Official Recognition Framework (56 Learners Guarantee)
            </h2>
            <p className="text-xs text-slate-400">
              Every learner receives at least one certificate and badge, with prestigious titles reserved for excellence.
            </p>
          </div>

          {/* Categories bar */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredAwards.map((award) => (
            <div
              key={award.id}
              className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{award.icon}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono-code">
                    {award.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition">
                  {award.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {award.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Conferred To:</span>
                <span className="font-semibold text-amber-200">
                  {award.recipientName ? `${award.recipientName}` : `Team ${award.teamName}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Testimonials */}
      <div className="pt-6 border-t border-slate-800">
        <h2 className="text-xl font-bold text-white font-royal mb-6 text-center">
          Student Voices & Cohort Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
              <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[10px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
