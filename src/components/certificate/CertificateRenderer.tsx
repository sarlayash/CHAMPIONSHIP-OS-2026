import React, { useRef } from 'react';
import { CertificateRecord } from '../../types';
import { Award, CheckCircle2, ShieldCheck, Sparkles, QrCode } from 'lucide-react';

interface CertificateRendererProps {
  certificate: CertificateRecord;
  showVerificationBadge?: boolean;
}

export const CertificateRenderer: React.FC<CertificateRendererProps> = ({
  certificate,
  showVerificationBadge = true,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  // Category specific badge description (all adhering strictly to the Black & Gold palette)
  const getBadgeLabel = () => {
    switch (certificate.category) {
      case 'winner':
        return '🏆 PODIUM CHAMPION';
      case 'excellence':
        return '⭐ EXCELLENCE HONORS';
      case 'team_excellence':
        return '👥 TEAM DISTINCTION';
      case 'merit':
        return '🏅 MERIT DISTINCTION';
      case 'special_recognition':
        return '✨ SPECIAL RECOGNITION';
      default:
        return '📜 OFFICIAL CREDENTIAL';
    }
  };

  return (
    <div
      ref={certRef}
      id={`certificate-node-${certificate.certificateNo}`}
      className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#05070c] text-slate-100 p-3 sm:p-4 md:p-6 rounded-xl shadow-2xl overflow-hidden select-none"
      style={{
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.2), inset 0 0 100px rgba(0, 0, 0, 0.9)',
        background: 'radial-gradient(ellipse at 50% 35%, #101626 0%, #070a12 55%, #020306 100%)',
      }}
    >
      {/* 1. FIRST (OUTER) LUXURY GOLD BORDER */}
      <div 
        className="absolute inset-2 sm:inset-3 border-[3.5px] border-[#d4af37] rounded-lg pointer-events-none"
        style={{
          boxShadow: '0 0 12px rgba(212, 175, 55, 0.4), inset 0 0 12px rgba(212, 175, 55, 0.25)'
        }}
      />

      {/* 2. SECOND (INNER) LUXURY GOLD BORDER - CREATING THE DOUBLE BORDER EFFECT */}
      <div 
        className="absolute inset-4 sm:inset-5 md:inset-6 border-[1.5px] border-[#eab308]/85 rounded pointer-events-none" 
      />

      {/* Ornate Corner Geometric Filigrees */}
      <div className="absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#ffd700] rounded-tl pointer-events-none flex items-start justify-start p-1">
        <div className="w-2 h-2 bg-[#ffd700] rounded-full shadow-sm shadow-amber-400" />
      </div>
      <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-[#ffd700] rounded-tr pointer-events-none flex items-start justify-end p-1">
        <div className="w-2 h-2 bg-[#ffd700] rounded-full shadow-sm shadow-amber-400" />
      </div>
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-[#ffd700] rounded-bl pointer-events-none flex items-end justify-start p-1">
        <div className="w-2 h-2 bg-[#ffd700] rounded-full shadow-sm shadow-amber-400" />
      </div>
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-[#ffd700] rounded-br pointer-events-none flex items-end justify-end p-1">
        <div className="w-2 h-2 bg-[#ffd700] rounded-full shadow-sm shadow-amber-400" />
      </div>

      {/* Intricate Gold Guilloche Background Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="guilloche-gold" width="70" height="70" patternUnits="userSpaceOnUse">
            <path
              d="M 0 35 Q 17.5 0, 35 35 T 70 35 M 0 35 Q 17.5 70, 35 35 T 70 35"
              fill="none"
              stroke="#eab308"
              strokeWidth="0.65"
            />
            <circle cx="35" cy="35" r="16" fill="none" stroke="#d4af37" strokeWidth="0.5" />
            <circle cx="35" cy="35" r="32" fill="none" stroke="#ffd700" strokeWidth="0.3" strokeDasharray="3,3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#guilloche-gold)" />
      </svg>

      {/* MAIN CERTIFICATE CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col justify-between h-full px-4 sm:px-8 py-4 sm:py-5">
        
        {/* TOP HEADER: MENTORSHIP BY KAPIL & IOT BRANDING */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-between w-full px-2 sm:px-4 mb-2">
            
            {/* Left Monogram: Kapil Narula Mentorship */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#d4af37] bg-gradient-to-b from-[#1c1a14] to-[#0a0805] p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#ffd700]/70 flex items-center justify-center text-[#ffd700] font-royal font-black text-xs sm:text-sm tracking-tighter">
                  KN
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-bold tracking-widest text-[#ffd700] uppercase font-royal">
                  Mentorship By Kapil
                </p>
                <p className="text-[9px] text-[#e2d9b6]/80 font-medium">
                  Industry Oriented Training (IOT)
                </p>
              </div>
            </div>

            {/* Center Pill: Category Badge */}
            <div className="px-3.5 py-1 rounded-full border border-[#d4af37]/80 bg-[#121008] text-[#ffd700] text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md shadow-amber-950/60">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              {getBadgeLabel()}
            </div>

            {/* Right Monogram: IOT Masterclass */}
            <div className="flex items-center gap-2 text-right">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold tracking-widest text-[#ffd700] uppercase font-royal">
                  Java DSA Championship
                </p>
                <p className="text-[9px] text-[#e2d9b6]/80 font-medium">
                  13-Day Technical Masterclass
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#d4af37] bg-gradient-to-b from-[#1c1a14] to-[#0a0805] p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#ffd700]/70 flex items-center justify-center text-[#ffd700] font-bold text-xs sm:text-sm">
                  2026
                </div>
              </div>
            </div>
          </div>

          {/* Golden Ribbon Banner */}
          <div className="my-1 px-6 py-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent border-y border-[#d4af37]/40 w-full max-w-xl">
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#ffd700] uppercase font-royal">
              India&apos;s 13-Day Java Full Stack & DSA Championship
            </p>
          </div>

          {/* Primary Certificate Title in Shimmering Gold Typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-wide uppercase font-royal mt-1.5 bg-gradient-to-r from-[#fff3b0] via-[#ffd700] to-[#d4af37] bg-clip-text text-transparent drop-shadow-md">
            {certificate.title}
          </h1>

          <p className="text-[10px] sm:text-xs text-[#e5d499] font-medium tracking-[0.2em] uppercase mt-0.5">
            {certificate.achievementSubtitle || "Under The Exclusive Mentorship Of Kapil"}
          </p>

          <p className="text-[11px] text-slate-400 italic mt-2.5 font-serif-title tracking-wide">
            This prestigious credential is proud testimony that
          </p>

          {/* Recipient Full Name */}
          <div className="relative mt-1 mb-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold font-serif-title text-[#fffbeb] tracking-wider px-6 py-0.5 drop-shadow">
              {certificate.participantName}
            </h2>
            {/* Elegant Dual-Tapered Gold Underline */}
            <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-[#ffd700] to-transparent shadow-sm shadow-amber-400" />
          </div>

          {/* USN & Team Identity Badge in Black & Gold */}
          <div className="flex items-center justify-center gap-2.5 text-xs text-slate-200 mt-1 mb-1.5 font-mono-code">
            <span className="px-2.5 py-0.5 bg-[#0b0f19] border border-[#d4af37]/60 rounded text-[#ffd700] font-medium text-[11px]">
              USN: {certificate.usn}
            </span>
            <span className="text-[#d4af37]">•</span>
            <span className="px-2.5 py-0.5 bg-[#0b0f19] border border-[#d4af37]/60 rounded text-[#ffd700] font-medium text-[11px]">
              Team: {certificate.teamName}
            </span>
          </div>

          {/* Citation Text */}
          <p className="max-w-2xl text-center text-xs sm:text-[13px] text-slate-300 leading-relaxed px-4 font-serif-title italic">
            &ldquo;{certificate.citation || `Awarded for exceptional algorithmic problem-solving, architectural rigor, and active participation in the 13-Day Java DSA Championship under the direct mentorship of Kapil Narula.`}&rdquo;
          </p>
        </div>

        {/* FOOTER SECTION: EXCLUSIVELY MENTORSHIP BY KAPIL (NO DEAN OR COLLEGE SENIORS) */}
        <div>
          <div className="grid grid-cols-12 items-end pt-3 sm:pt-4 px-2 sm:px-6 border-t border-[#d4af37]/30">
            
            {/* SOLE SIGNATORY: KAPIL NARULA (LEFT) */}
            <div className="col-span-4 text-center flex flex-col items-center">
              {/* Stylized Signature */}
              <div className="h-9 sm:h-11 flex items-end justify-center mb-1">
                <span 
                  className="font-serif-title italic text-xl sm:text-2xl font-bold text-[#ffd700] -rotate-3 select-none"
                  style={{
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                  }}
                >
                  Kapil Narula
                </span>
              </div>
              <div className="w-36 sm:w-44 border-b-2 border-[#d4af37] mb-1 shadow-sm" />
              <p className="text-[11px] sm:text-xs font-bold text-white tracking-wider font-royal">
                Kapil Narula
              </p>
              <p className="text-[9px] sm:text-[10px] text-[#d4af37] font-semibold leading-tight">
                Program Mentor & Industry Lead
              </p>
              <p className="text-[8px] sm:text-[9px] text-slate-400 leading-tight">
                Industry Oriented Training (IOT)
              </p>
            </div>

            {/* EMBOSSED 3D GOLD MEDALLION FOIL SEAL (CENTER) */}
            <div className="col-span-4 flex flex-col items-center justify-center relative">
              <div className="relative flex flex-col items-center -top-2">
                {/* Medallion Circle */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-1 shadow-2xl relative z-10"
                  style={{
                    background: 'radial-gradient(circle, #fff099 0%, #ffd700 35%, #d4af37 70%, #78350f 100%)',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.6), inset 0 2px 4px rgba(255,255,255,0.9)'
                  }}
                >
                  <div className="w-full h-full rounded-full border border-dashed border-[#573600] flex flex-col items-center justify-center text-[#3a2000] p-1 text-center bg-gradient-to-b from-[#ffeaa7] via-[#ffd700] to-[#d4af37]">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#4a2e00]" />
                    <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-tighter leading-none mt-0.5">
                      MENTORSHIP
                    </span>
                    <span className="text-[6px] sm:text-[7px] font-black tracking-widest text-[#4a2e00] uppercase">
                      BY KAPIL
                    </span>
                    <span className="text-[6px] font-bold opacity-90">2026</span>
                  </div>
                </div>

                {/* Rich Foil Ribbons Dropping Below */}
                <div className="flex gap-2 -mt-2">
                  <div className="w-3.5 h-5 bg-[#991b1b] rounded-b shadow-md border-r border-[#d4af37] transform -rotate-6" />
                  <div className="w-3.5 h-5 bg-[#7f1d1d] rounded-b shadow-md border-l border-[#d4af37] transform rotate-6" />
                </div>

                <p className="text-[9px] sm:text-[10px] text-[#ffd700] font-mono-code mt-0.5 font-semibold">
                  Date: {certificate.issueDate || "Feb 22, 2026"}
                </p>
              </div>
            </div>

            {/* VERIFICATION & TAMPER-PROOF AUTHENTICATION STRIP (RIGHT) */}
            <div className="col-span-4 text-center flex flex-col items-center">
              <div className="h-9 sm:h-11 flex items-center justify-center mb-1">
                <div className="p-1 rounded bg-[#0b0e17] border border-[#d4af37]/60 text-[#ffd700]">
                  <QrCode className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
              </div>
              <div className="w-36 sm:w-44 border-b-2 border-[#d4af37] mb-1" />
              <p className="text-[11px] sm:text-xs font-bold text-white tracking-wider font-mono-code">
                {certificate.certificateNo}
              </p>
              <p className="text-[9px] sm:text-[10px] text-[#d4af37] font-semibold leading-tight">
                Authentic Digital Credential
              </p>
              <p className="text-[8px] sm:text-[9px] text-emerald-400 font-mono-code leading-tight flex items-center gap-1 justify-center">
                <CheckCircle2 className="w-2.5 h-2.5" /> Cryptographically Verified
              </p>
            </div>
          </div>

          {/* BOTTOM MICRO-SECURITY BAR */}
          <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-400 px-2 sm:px-6 pt-2 mt-1 border-t border-[#d4af37]/20 font-mono-code">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#ffd700]" />
              <span>OFFICIAL ISSUANCE:</span>
              <span className="text-[#ffd700] font-bold">INDUSTRY ORIENTED TRAINING (IOT)</span>
            </div>

            {showVerificationBadge && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 hidden sm:inline">EXCLUSIVE MENTORSHIP & MASTERY</span>
                <div className="px-2 py-0.5 rounded bg-[#15120a] border border-[#d4af37]/50 text-[#ffd700] font-bold">
                  AUTHENTICATED • 2026
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

