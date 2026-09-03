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

  const leadershipStatements = [
    {
      quote: "The 13-day championship curriculum is engineered to simulate high-stress tier-1 software engineering environments, developing both deep algorithmic instincts and robust production team dynamics.",
      author: "Kapil Narula",
      role: "Program Director & Lead Technical Mentor • Industry Oriented Training (IOT)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    {
      quote: "Our objective at Sapthgiri NPS University is graduating engineers who excel in data structures, algorithms, and real-time collaboration. This platform provides immutable verification of their hard work.",
      author: "Dr. K. R. Sharma",
      role: "Dean, Faculty of Engineering & Technology • Sapthgiri NPS University",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    {
      quote: "Rigorous daily coding battles, synchronized assessment rubrics, and the Grand Finale Hackathon establish an authentic engineering benchmark for every participating learner.",
      author: "Academic Advisory Board",
      role: "Faculty of Engineering & Technology",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
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
        {championStudent ? (
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
                <span className="text-sm font-bold text-emerald-400 font-mono-code">{championStudent.attendanceRate}% Verified</span>
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
        ) : (
          <div className="bg-slate-900/80 border-2 border-dashed border-slate-700 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-royal">Champion Learner Title Reserved</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              All mock participant data has been wiped. Once the administrator inputs real student names, USNs, and scores in the Admin Portal, the #1 ranked learner will be automatically crowned here.
            </p>
          </div>
        )}

        {/* Champion Team */}
        {championTeam && championTeam.totalPoints > 0 ? (
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-indigo-500/60 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Crown className="w-4 h-4" />
              Rank #1 Championship Team
            </div>
            <h3 className="text-3xl font-black text-white font-royal">
              Team {championTeam.name}
            </h3>
            <p className="text-xs text-indigo-300 font-mono-code mt-1">
              Code: {championTeam.code} • {championTeam.memberCount} Registered Members
            </p>
            <div className="my-4 p-4 bg-slate-950/70 border border-indigo-500/20 rounded-2xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Team Points</span>
                <span className="text-xl font-black text-amber-400 font-mono-code">
                  {championTeam.totalPoints.toLocaleString()} pts
                </span>
              </div>
              <div className="flex justify-between items-center text-xs mt-2">
                <span className="text-slate-400">Grand Finale Project</span>
                <span className="text-xs font-semibold text-slate-200 truncate">{championTeam.projectTitle}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 italic font-serif-title leading-relaxed">
              Demonstrated exemplary collaborative engineering and algorithmic performance throughout the 13-day championship.
            </p>
            <button
              onClick={() => onSelectTeam(championTeam)}
              className="mt-5 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              View Team Dossier & Project
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/80 border-2 border-dashed border-slate-700 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Crown className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-royal">Champion Team Title Reserved</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              All 10 official teams start cleanly from zero points. As stage assessments and hackathon rubric scores are recorded by the administration, the #1 champion team will be crowned here.
            </p>
          </div>
        )}
      </div>

      {/* Official Recognition Framework Category Filter & Cards */}
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white font-royal flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Official Recognition Framework
            </h2>
            <p className="text-xs text-slate-400">
              Every learner receives at least one certificate and badge, with prestigious titles conferred for excellence.
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
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Award Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAwards.map((award) => (
            <div
              key={award.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between transition group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
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
                  {award.recipientName ? award.recipientName : award.teamName ? `Team ${award.teamName}` : 'Awarded by Jury'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Leadership Statements */}
      <div className="pt-6 border-t border-slate-800">
        <h2 className="text-xl font-bold text-white font-royal mb-6 text-center">
          Program Leadership & Mentorship
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadershipStatements.map((t, idx) => (
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
