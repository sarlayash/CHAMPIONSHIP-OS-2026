import React from 'react';
import { ShieldCheck, Award, Sparkles, Building2, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t-2 border-[#d4af37]/40 bg-[#020408] py-14 text-xs text-slate-300 no-print">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-base tracking-tight font-royal">
              Championship<span className="text-[#ffd700]">OS</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#ffd700]/15 text-[#ffd700] text-[10px] font-black border border-[#ffd700]/40 font-mono-code">
              FORTUNE 500 ENTERPRISE SPEC
            </span>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed text-xs font-serif-title">
            Official certificate issuance and championship operating system for India&apos;s 13-Day Java DSA Championship at Sapthgiri NPS University. Engineered for high-rigour algorithmic competition and tamper-proof digital credentials.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono-code pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographically Verified Credential Ledger • Mentorship by Kapil Narula</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 font-royal">
            Executive Ledger
          </h4>
          <ul className="space-y-2 text-slate-400 font-mono-code text-[11px]">
            <li className="flex items-center gap-1.5"><span className="text-[#ffd700]">◆</span> 10 Competing Teams</li>
            <li className="flex items-center gap-1.5"><span className="text-[#ffd700]">◆</span> 56 Active Learners</li>
            <li className="flex items-center gap-1.5"><span className="text-[#ffd700]">◆</span> 8 Championship Titles</li>
            <li className="flex items-center gap-1.5"><span className="text-[#ffd700]">◆</span> 10 Technical Honors</li>
            <li className="flex items-center gap-1.5"><span className="text-[#ffd700]">◆</span> 100% Real Numbers Sync</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 font-royal">
            Authority & Mentorship
          </h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>Sapthgiri NPS University, Bangalore</li>
            <li>Dept. of Computer Science & Engineering</li>
            <li>Industry Oriented Training (IOT)</li>
            <li className="text-[#ffd700] font-bold">Program Director: Kapil Narula</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <p>© 2026 ChampionshipOS. All Rights Reserved. Sapthgiri NPS University & Mentorship by Kapil.</p>
        <p className="flex items-center gap-1.5 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>Real-Time Operational System • Black & Gold Enterprise Edition</span>
        </p>
      </div>
    </footer>
  );
};
