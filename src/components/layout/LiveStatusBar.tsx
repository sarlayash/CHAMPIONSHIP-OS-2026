import React, { useState, useEffect } from 'react';
import { ChampionshipSettings, Team, Participant, CertificateRecord } from '../../types';
import { 
  Radio, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface LiveStatusBarProps {
  settings: ChampionshipSettings;
  teams: Team[];
  participants: Participant[];
  certificates: CertificateRecord[];
}

export const LiveStatusBar: React.FC<LiveStatusBarProps> = ({
  settings,
  teams,
  participants,
  certificates,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [timeZoneName, setTimeZoneName] = useState<string>('IST');

  useEffect(() => {
    // Detect system timezone short name
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZoneName(tz ? tz.split('/').pop()?.replace('_', ' ') || 'LOCAL' : 'LOCAL');
    } catch {
      setTimeZoneName('LOCAL');
    }

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  const totalPoints = teams.reduce((acc, t) => acc + (t.totalPoints || 0), 0);

  return (
    <div className="w-full bg-[#030508] border-b border-[#d4af37]/30 text-xs text-slate-300 select-none no-print shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left: LIVE BEACON & Active Stage */}
        <div className="flex items-center gap-3">
          {/* Pulsing Live Beacon */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c130d] border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 font-mono-code">
              LIVE
            </span>
          </div>

          {/* Championship Status / Active Stage */}
          <div className="flex items-center gap-2">
            <span className="text-[#ffd700] font-bold text-xs tracking-tight flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              {settings.liveStatusText || 'CHAMPIONSHIP ACTIVE'}
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-white/90 text-[11px] font-medium hidden md:inline">
              {settings.activeStage || 'Stage 06: Grand Finale & Evaluation'}
            </span>
          </div>
        </div>

        {/* Center: Live Ledger Sync Status */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono-code text-slate-300">
          <span className="inline-flex items-center gap-1 text-slate-400">
            <Activity className="w-3 h-3 text-[#d4af37]" />
            Ledger Sync: <strong className="text-white">Real-Time</strong>
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300">
            Teams: <strong className="text-[#ffd700]">{teams.length}</strong>
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300">
            Learners: <strong className="text-white">{participants.length}</strong>
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300">
            Certs: <strong className="text-[#ffd700]">{certificates.length}</strong>
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-300">
            Score: <strong className="text-emerald-400">{totalPoints.toLocaleString()} pts</strong>
          </span>
        </div>

        {/* Right: Live System Date & Ticking Time */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0 font-mono-code text-[11px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0f1d] border border-[#d4af37]/40 shadow-sm text-slate-200">
            <Calendar className="w-3 h-3 text-[#ffd700]" />
            <span className="font-semibold text-white tracking-tight">
              {formatDate(currentDateTime)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#0d121f] to-[#121929] border border-[#d4af37]/60 shadow-[0_0_10px_rgba(212,175,55,0.15)] text-slate-100">
            <Clock className="w-3 h-3 text-[#ffd700] animate-pulse" />
            <span className="font-bold text-[#ffd700] tracking-wider">
              {formatTime(currentDateTime)}
            </span>
            <span className="px-1 py-0.2 rounded bg-[#ffd700]/15 text-[#ffd700] text-[9px] font-bold uppercase tracking-tight">
              {timeZoneName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
