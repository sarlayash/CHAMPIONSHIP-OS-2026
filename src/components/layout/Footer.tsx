import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-400 no-print">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-base tracking-tight font-royal">
              Championship<span className="text-amber-400">OS</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
              Java DSA 2026
            </span>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed text-xs">
            Official certificate issuance and championship operating system for India&apos;s 13-Day Java DSA Championship at Sapthgiri NPS University. Built to recognize all 56 learners across 10 teams.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono-code pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified Credential Authority</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-royal">
            Championship Framework
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>10 Competing Teams</li>
            <li>56 Enrolled Learners</li>
            <li>8 Championship Titles</li>
            <li>10 Technical Excellence Awards</li>
            <li>10 Team Honors</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 font-royal">
            Partners & Mentorship
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>Sapthgiri NPS University</li>
            <li>Dept. of Computer Science & Engg.</li>
            <li>Industry Oriented Training (IOT)</li>
            <li>Program Director: Kapil Narula</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <p>© 2026 ChampionshipOS. All Rights Reserved. Sapthgiri NPS University.</p>
        <p className="flex items-center gap-1">
          Crafted for India&apos;s Next Generation of Software Architects
        </p>
      </div>
    </footer>
  );
};
