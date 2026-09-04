import React from 'react';
import { UserRole } from '../../types';
import { 
  Trophy, 
  Award, 
  Users, 
  ShieldCheck, 
  Crown, 
  Home, 
  Lock,
  UserCheck,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAdminLoggedIn: boolean;
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
  isAdminLoggedIn,
  onAdminClick,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'teams', label: '10 Teams', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'halloffame', label: 'Hall of Fame', icon: Crown },
    { id: 'verify', label: 'Verify Credential', icon: ShieldCheck },
  ];

  const roles: { id: UserRole; label: string }[] = [
    ...(isAdminLoggedIn ? [{ id: 'admin' as UserRole, label: 'Admin Console' }] : []),
    { id: 'participant', label: 'Learner View' },
    { id: 'team_leader', label: 'Team Leader View' },
    { id: 'judge', label: 'Judge View' },
    { id: 'mentor', label: 'Mentor View' },
    { id: 'faculty', label: 'Faculty View' },
    { id: 'guest', label: 'Guest View' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#04060b]/95 backdrop-blur-md border-b-2 border-[#d4af37]/40 shadow-[0_4px_30px_rgba(0,0,0,0.8)] no-print">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand & Executive Crest */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d4af37] via-[#ffd700] to-[#b38728] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center group-hover:scale-105 transition">
            <div className="w-full h-full rounded-[10px] bg-[#020408] flex items-center justify-center text-[#ffd700] font-royal font-black text-sm">
              🏆
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base tracking-tight font-royal">
                Championship<span className="text-[#ffd700]">OS</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-black border border-[#ffd700]/50 font-mono-code">
                2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block font-serif-title">
              Sapthgiri NPS University • 10 Teams
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links — Fortune 500 Black & Gold */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer tracking-wide ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ffd700]/20 to-[#d4af37]/15 text-[#ffd700] border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.25)] font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-[#0c1220] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffd700]' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Role Switcher & Admin Console Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Role selector dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#080d19] border border-[#d4af37]/30 rounded-xl text-xs">
            <UserCheck className="w-3.5 h-3.5 text-[#ffd700]" />
            <span className="text-slate-400 text-[11px] font-medium">Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id} className="bg-[#080d19] text-white">
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Admin Login / Console CTA */}
          <button
            onClick={onAdminClick}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer tracking-wide ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#fff1b8]'
                : isAdminLoggedIn
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/80 shadow-sm'
                : 'bg-[#0a0f1d] text-slate-200 hover:text-white border border-[#d4af37]/40 hover:border-[#ffd700]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden flex items-center gap-1.5 px-4 py-2 border-t border-[#d4af37]/20 overflow-x-auto bg-[#03050a]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#d4af37]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
