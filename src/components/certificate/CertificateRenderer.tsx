import React, { useRef } from 'react';
import { CertificateRecord } from '../../types';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CertificateRendererProps {
  certificate: CertificateRecord;
  showVerificationBadge?: boolean;
}

export const CertificateRenderer: React.FC<CertificateRendererProps> = ({
  certificate,
  showVerificationBadge = true,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  // Category specific accent theme
  const getTheme = () => {
    switch (certificate.category) {
      case 'winner':
        return {
          primary: '#b45309', // amber-700
          accent: '#d97706',
          bgGradient: 'from-amber-950/20 via-slate-900 to-amber-950/30',
          sealColor: '#eab308',
          sealRibbon: '#b91c1c',
          badgeText: 'PODIUM CHAMPION',
          borderAccent: '#f59e0b',
        };
      case 'excellence':
        return {
          primary: '#1e40af', // blue-800
          accent: '#3b82f6',
          bgGradient: 'from-blue-950/20 via-slate-900 to-blue-950/30',
          sealColor: '#38bdf8',
          sealRibbon: '#1d4ed8',
          badgeText: 'EXCELLENCE HONORS',
          borderAccent: '#60a5fa',
        };
      case 'team_excellence':
        return {
          primary: '#047857', // emerald-700
          accent: '#10b981',
          bgGradient: 'from-emerald-950/20 via-slate-900 to-emerald-950/30',
          sealColor: '#34d399',
          sealRibbon: '#065f46',
          badgeText: 'TEAM DISTINCTION',
          borderAccent: '#10b981',
        };
      case 'merit':
        return {
          primary: '#7c3aed', // purple-700
          accent: '#a855f7',
          bgGradient: 'from-purple-950/20 via-slate-900 to-purple-950/30',
          sealColor: '#c084fc',
          sealRibbon: '#6b21a8',
          badgeText: 'MERIT DISTINCTION',
          borderAccent: '#c084fc',
        };
      default:
        return {
          primary: '#475569', // slate-600
          accent: '#ca8a04',
          bgGradient: 'from-slate-900 via-slate-950 to-slate-900',
          sealColor: '#eab308',
          sealRibbon: '#991b1b',
          badgeText: 'OFFICIAL CREDENTIAL',
          borderAccent: '#d97706',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      ref={certRef}
      id={`certificate-node-${certificate.certificateNo}`}
      className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#0c1222] text-slate-100 p-6 md:p-8 rounded-xl shadow-2xl border-4 border-[#b48c36] overflow-hidden select-none"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 80px rgba(180, 140, 54, 0.15)',
        background: 'radial-gradient(ellipse at center, #131d36 0%, #080d19 100%)'
      }}
    >
      {/* Intricate Guilloche Background Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="guilloche" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 0 30 Q 15 0, 30 30 T 60 30 M 0 30 Q 15 60, 30 30 T 60 30"
              fill="none"
              stroke="#eab308"
              strokeWidth="0.75"
            />
            <circle cx="30" cy="30" r="14" fill="none" stroke="#eab308" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="28" fill="none" stroke="#eab308" strokeWidth="0.25" strokeDasharray="2,2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#guilloche)" />
      </svg>

      {/* Decorative Inner Dual Border with Corner Ornaments */}
      <div className="absolute inset-3 md:inset-4 border border-[#eab308]/40 pointer-events-none rounded-lg" />
      <div className="absolute inset-5 md:inset-6 border-2 border-[#eab308]/60 pointer-events-none rounded" />

      {/* Corner Filigree Flourishes */}
      <div className="absolute top-5 left-5 w-12 h-12 border-t-4 border-l-4 border-[#f59e0b] rounded-tl-sm pointer-events-none" />
      <div className="absolute top-5 right-5 w-12 h-12 border-t-4 border-r-4 border-[#f59e0b] rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-12 h-12 border-b-4 border-l-4 border-[#f59e0b] rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-12 h-12 border-b-4 border-r-4 border-[#f59e0b] rounded-br-sm pointer-events-none" />

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 md:pt-4">
        {/* Top Badges & Institution */}
        <div className="flex items-center justify-between w-full px-6 md:px-10 mb-2">
          {/* University Crest Emblem */}
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-800 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0d1527] flex items-center justify-center text-amber-300 font-royal font-bold text-xs">
                SNPS
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-semibold tracking-wider text-amber-200 uppercase font-royal">Sapthgiri NPS University</p>
              <p className="text-[9px] text-slate-400">Department of Computer Science & Engineering</p>
            </div>
          </div>

          {/* Center Badge Pill */}
          <div className="px-3.5 py-1 rounded-full border border-amber-500/40 bg-amber-950/40 text-amber-300 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {theme.badgeText}
          </div>

          {/* IOT & Kapil Branding */}
          <div className="flex items-center gap-2 text-right">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-semibold tracking-wider text-amber-200 uppercase font-royal">Industry Oriented Training</p>
              <p className="text-[9px] text-slate-400">Powered By Kapil</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-800 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0d1527] flex items-center justify-center text-indigo-300 font-bold text-xs">
                IOT
              </div>
            </div>
          </div>
        </div>

        {/* Championship Ribbon Banner */}
        <div className="my-1 px-4 py-0.5 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent border-y border-amber-500/30 w-full max-w-xl">
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-amber-300/90 uppercase font-royal">
            India&apos;s Most Comprehensive 13-Day Java DSA Championship 2026
          </p>
        </div>

        {/* Main Certificate Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase font-royal mt-2 bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
          {certificate.title}
        </h1>

        <p className="text-[11px] md:text-xs text-amber-200/80 font-medium tracking-widest uppercase mt-0.5">
          {certificate.achievementSubtitle}
        </p>

        <p className="text-[11px] text-slate-400 italic mt-3 font-serif-title tracking-wide">
          This credential is proud, official testimony that
        </p>

        {/* Recipient Name in Display Typography */}
        <div className="relative mt-1 mb-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif-title text-white tracking-wide px-6 py-0.5">
            {certificate.participantName}
          </h2>
          <div className="h-0.5 w-4/5 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* Student USN & Team Identity */}
        <div className="flex items-center justify-center gap-3 text-xs text-slate-300 mt-1 mb-2 font-mono-code">
          <span className="px-2.5 py-0.5 bg-slate-800/80 border border-slate-700 rounded text-amber-200/90 font-medium text-[11px]">
            USN: {certificate.usn}
          </span>
          <span className="text-slate-500">•</span>
          <span className="px-2.5 py-0.5 bg-slate-800/80 border border-slate-700 rounded text-blue-200/90 font-medium text-[11px]">
            Team: {certificate.teamName}
          </span>
        </div>

        {/* Citation text */}
        <p className="max-w-2xl text-center text-xs md:text-[13px] text-slate-300/90 leading-relaxed px-6 font-serif-title italic">
          &ldquo;{certificate.citation}&rdquo;
        </p>
      </div>

      {/* Bottom Signatures, Gold Medallion Seal & Verification QR */}
      <div className="relative z-10 grid grid-cols-12 items-end pt-5 md:pt-8 px-4 md:px-8 border-t border-amber-500/20 mt-4">
        {/* Left Signature: Kapil Narula */}
        <div className="col-span-3 text-center flex flex-col items-center">
          <div className="h-10 flex items-end justify-center mb-1">
            <span className="font-serif-title italic text-lg font-bold text-amber-300 -rotate-3 select-none">
              Kapil Narula
            </span>
          </div>
          <div className="w-32 border-b border-amber-500/60 mb-1" />
          <p className="text-[11px] font-bold text-slate-200 tracking-wider font-royal">{certificate.signatory1.name}</p>
          <p className="text-[9px] text-slate-400 leading-tight">{certificate.signatory1.title}</p>
        </div>

        {/* Center Medallion Foil Seal with Ribbons */}
        <div className="col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative flex flex-col items-center -top-2">
            {/* Medallion Circle */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center p-1 shadow-2xl relative z-10"
              style={{
                background: 'radial-gradient(circle, #fde047 0%, #ca8a04 60%, #78350f 100%)',
                boxShadow: '0 0 25px rgba(234, 179, 8, 0.4), inset 0 2px 4px rgba(255,255,255,0.8)'
              }}
            >
              <div className="w-full h-full rounded-full border border-dashed border-amber-900/60 flex flex-col items-center justify-center text-amber-950 p-1 text-center bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-amber-900" />
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-tighter leading-none mt-0.5">
                  OFFICIAL SEAL
                </span>
                <span className="text-[6px] font-bold opacity-80">2026</span>
              </div>
            </div>

            {/* Ribbons Dropping Below */}
            <div className="flex gap-2 -mt-2">
              <div className="w-4 h-6 bg-red-700 rounded-b shadow-md clip-ribbon transform -rotate-6" />
              <div className="w-4 h-6 bg-red-800 rounded-b shadow-md clip-ribbon transform rotate-6" />
            </div>

            <p className="text-[10px] text-amber-300/80 font-mono-code mt-1 font-semibold">
              Date: {certificate.issueDate}
            </p>
          </div>
        </div>

        {/* Right Signature: Dean Dr. K. R. Sharma & Verification */}
        <div className="col-span-3 text-center flex flex-col items-center">
          <div className="h-10 flex items-end justify-center mb-1">
            <span className="font-serif-title italic text-base font-bold text-amber-300 rotate-2 select-none">
              Dr. K. R. Sharma
            </span>
          </div>
          <div className="w-32 border-b border-amber-500/60 mb-1" />
          <p className="text-[11px] font-bold text-slate-200 tracking-wider font-royal">{certificate.signatory2.name}</p>
          <p className="text-[9px] text-slate-400 leading-tight">{certificate.signatory2.title}</p>
        </div>
      </div>

      {/* Footer Security Strip & QR Code preview */}
      <div className="relative z-10 flex items-center justify-between text-[9px] text-slate-500 px-6 pt-3 mt-2 border-t border-slate-800 font-mono-code">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400">CERTIFICATE ID:</span>
          <span className="text-amber-400 font-bold">{certificate.certificateNo}</span>
        </div>

        {showVerificationBadge && (
          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden md:inline">CRYPTOGRAPHIC TAMPER-PROOF VERIFIED</span>
            <div className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
              GENUINE • 2026
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
