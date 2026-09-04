import React, { useRef, useState, useEffect } from 'react';
import { CertificateRecord } from '../../types';
import { Award, CheckCircle2, ShieldCheck, Sparkles, Lock, ExternalLink } from 'lucide-react';
import QRCode from 'qrcode';
import { resolveCertificateDate } from '../../utils/dateUtils';

interface CertificateRendererProps {
  certificate: CertificateRecord;
  showVerificationBadge?: boolean;
}

export const CertificateRenderer: React.FC<CertificateRendererProps> = ({
  certificate,
  showVerificationBadge = true,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Automatic real system date resolution
  const displayDate = resolveCertificateDate(certificate.issueDate);

  // Generate real, functional QR code pointing to live verification route
  useEffect(() => {
    let isMounted = true;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://championship.iot';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    // Clean verification link that works directly in browser and smartphone cameras
    const verificationUrl = `${origin}${path}?verify=${encodeURIComponent(certificate.certificateNo)}`;

    QRCode.toDataURL(verificationUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#0a0a0f',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (isMounted) setQrCodeDataUrl(url);
      })
      .catch((err) => {
        console.error('QR code generation error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [certificate.certificateNo]);

  // Category specific badge description (refined, understated elegance)
  const getBadgeLabel = () => {
    switch (certificate.category) {
      case 'winner':
        return 'PODIUM CHAMPION';
      case 'excellence':
        return 'EXCELLENCE HONORS';
      case 'team_excellence':
        return 'TEAM DISTINCTION';
      case 'merit':
        return 'MERIT DISTINCTION';
      case 'special_recognition':
        return 'SPECIAL RECOGNITION';
      default:
        return 'OFFICIAL CREDENTIAL';
    }
  };

  return (
    <div
      ref={certRef}
      id={`certificate-node-${certificate.certificateNo}`}
      className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#07080d] text-slate-100 p-3 sm:p-4 md:p-6 rounded-xl shadow-2xl overflow-hidden select-none"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 40px rgba(197, 160, 89, 0.15)',
        background: 'radial-gradient(ellipse at 50% 35%, #10131d 0%, #08090e 65%, #040407 100%)',
      }}
    >
      {/* 1. OUTER REFINED ANTIQUE GOLD BORDER (CLASSICAL 2PX LINE) */}
      <div 
        className="absolute inset-2 sm:inset-3 md:inset-3.5 border-[2px] border-[#c5a059] rounded-lg pointer-events-none"
        style={{
          boxShadow: '0 0 8px rgba(197, 160, 89, 0.25), inset 0 0 8px rgba(197, 160, 89, 0.15)'
        }}
      />

      {/* 2. INNER ELEGANT HAIRLINE GOLD BORDER - CLEAN DOUBLE-BORDER WITH 8PX INSET */}
      <div 
        className="absolute inset-4 sm:inset-5 md:inset-6 border-[1px] border-[#c5a059]/50 rounded-sm pointer-events-none" 
      />

      {/* REFINED CORNER ACCENTS - GEOMETRIC STEPPED BRACKETS */}
      <div className="absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-l-2 border-[#e5c158] pointer-events-none flex items-start justify-start p-0.5">
        <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-none" />
      </div>
      <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-r-2 border-[#e5c158] pointer-events-none flex items-start justify-end p-0.5">
        <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-none" />
      </div>
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-l-2 border-[#e5c158] pointer-events-none flex items-end justify-start p-0.5">
        <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-none" />
      </div>
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-r-2 border-[#e5c158] pointer-events-none flex items-end justify-end p-0.5">
        <div className="w-1.5 h-1.5 bg-[#c5a059] rounded-none" />
      </div>

      {/* SUBTLE GUILLOCHE WATERMARK (LOW CONTRAST - NOT LOUD) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-8 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="guilloche-refined" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 0 40 Q 20 0, 40 40 T 80 40 M 0 40 Q 20 80, 40 40 T 80 40"
              fill="none"
              stroke="#c5a059"
              strokeWidth="0.5"
            />
            <circle cx="40" cy="40" r="18" fill="none" stroke="#c5a059" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#guilloche-refined)" />
      </svg>

      {/* MAIN CERTIFICATE BODY */}
      <div className="relative z-10 flex flex-col justify-between h-full px-4 sm:px-8 py-3.5 sm:py-5">
        
        {/* HEADER SECTION: INSTITUTION & MENTORSHIP PILL */}
        <div className="flex flex-col items-center text-center">
          
          {/* Top Header Bar */}
          <div className="flex items-center justify-between w-full px-1 sm:px-3 mb-1.5">
            {/* Left Monogram / Seal */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#c5a059] bg-[#0d1017] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full rounded-full border border-dashed border-[#c5a059]/60 flex items-center justify-center text-[#e5c158] font-royal font-bold text-xs tracking-tighter">
                  KN
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#e5c158] uppercase font-royal">
                  Mentorship By Kapil
                </p>
                <p className="text-[9px] text-slate-400 font-medium">
                  Industry Oriented Training (IOT)
                </p>
              </div>
            </div>

            {/* Center Pill: Badge Category */}
            <div className="px-3 py-0.5 rounded-full border border-[#c5a059]/60 bg-[#0d1017] text-[#e5c158] text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>{getBadgeLabel()}</span>
            </div>

            {/* Right Monogram: Championship Year */}
            <div className="flex items-center gap-2 text-right">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#e5c158] uppercase font-royal">
                  Java DSA Championship
                </p>
                <p className="text-[9px] text-slate-400 font-medium">
                  13-Day Technical Masterclass
                </p>
              </div>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#c5a059] bg-[#0d1017] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full rounded-full border border-dashed border-[#c5a059]/60 flex items-center justify-center text-[#e5c158] font-bold text-xs">
                  2026
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Line */}
          <div className="mt-1">
            <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-slate-400 uppercase font-semibold font-royal">
              Sapthagiri NPS University • Industry Oriented Training
            </p>
          </div>

          {/* Certificate Main Title (Warm Champagne Gold, Sophisticated Serif) */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-wide uppercase font-royal mt-1 bg-gradient-to-r from-[#fef08a] via-[#e5c158] to-[#c5a059] bg-clip-text text-transparent">
            {certificate.title}
          </h1>

          <p className="text-[9px] sm:text-[11px] text-[#c5a059] font-medium tracking-[0.15em] uppercase mt-0.5">
            {certificate.achievementSubtitle || "Under The Exclusive Mentorship Of Kapil"}
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 italic mt-2 font-serif-title">
            This certifies that
          </p>

          {/* Recipient Name (Crisp off-white, prominent but balanced) */}
          <div className="relative mt-0.5 mb-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold font-serif-title text-[#f8fafc] tracking-wide px-4 py-0.5">
              {certificate.participantName}
            </h2>
            {/* Fine Hairline Underline */}
            <div className="h-[1px] w-48 sm:w-64 mx-auto bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
          </div>

          {/* USN & Team Badges */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-300 mt-1 mb-1 font-mono-code">
            <span className="px-2.5 py-0.5 bg-[#0a0d15] border border-[#c5a059]/40 rounded text-[#e5c158] text-[10px] font-medium">
              USN: {certificate.usn}
            </span>
            <span className="text-[#c5a059]">•</span>
            <span className="px-2.5 py-0.5 bg-[#0a0d15] border border-[#c5a059]/40 rounded text-[#e5c158] text-[10px] font-medium">
              Team: {certificate.teamName}
            </span>
          </div>

          {/* Citation Statement */}
          <p className="max-w-2xl text-center text-[11px] sm:text-[12px] text-slate-300 leading-relaxed px-4 font-serif-title italic mt-0.5">
            &ldquo;{certificate.citation || `Awarded for exceptional algorithmic problem-solving, architectural rigor, and active participation in the 13-Day Java DSA Championship under the direct mentorship of Kapil Narula.`}&rdquo;
          </p>
        </div>

        {/* FOOTER SECTION: SIGNATORY + MEDALLION SEAL + REAL QR CODE */}
        <div>
          <div className="grid grid-cols-12 items-end pt-2 sm:pt-3 px-2 sm:px-6 border-t border-[#c5a059]/30">
            
            {/* LEFT: EXCLUSIVELY MENTORSHIP BY KAPIL (NO DEAN OR SENIORS) */}
            <div className="col-span-4 text-center flex flex-col items-center">
              <div className="h-8 sm:h-9 flex items-end justify-center mb-1">
                <span 
                  className="font-serif-title italic text-lg sm:text-xl font-bold text-[#e5c158] -rotate-2 select-none tracking-wide"
                >
                  Kapil Narula
                </span>
              </div>
              <div className="w-32 sm:w-40 border-b border-[#c5a059] mb-1" />
              <p className="text-[10px] sm:text-[11px] font-bold text-white tracking-wider font-royal">
                Kapil Narula
              </p>
              <p className="text-[8px] sm:text-[9px] text-[#c5a059] font-medium leading-tight">
                Program Director & Lead Mentor
              </p>
              <p className="text-[8px] text-slate-400 leading-tight">
                Industry Oriented Training (IOT)
              </p>
            </div>

            {/* CENTER: UNDERSTATED ANTIQUE GOLD MEDALLION SEAL + AUTOMATIC SYSTEM REAL DATE */}
            <div className="col-span-4 flex flex-col items-center justify-center relative">
              <div className="relative flex flex-col items-center">
                {/* Clean, Refined Gold Seal (No loud red ribbons) */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-0.5 shadow-xl relative z-10 border border-[#fef08a]/50"
                  style={{
                    background: 'radial-gradient(circle, #fef08a 0%, #d4af37 40%, #997321 85%, #4a360a 100%)',
                    boxShadow: '0 0 16px rgba(197, 160, 89, 0.35)'
                  }}
                >
                  <div className="w-full h-full rounded-full border border-dashed border-[#422e05] flex flex-col items-center justify-center text-[#2d1e02] p-1 text-center bg-gradient-to-b from-[#fff6cc] via-[#e5c158] to-[#b38b22]">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#382400]" />
                    <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-tight leading-none mt-0.5">
                      MENTORSHIP
                    </span>
                    <span className="text-[5.5px] sm:text-[6px] font-black tracking-widest text-[#382400] uppercase">
                      BY KAPIL
                    </span>
                    <span className="text-[5.5px] font-bold opacity-90">2026</span>
                  </div>
                </div>

                {/* AUTOMATIC REAL SYSTEM DATE */}
                <div className="mt-1 text-center">
                  <p className="text-[8px] sm:text-[9px] text-slate-400 font-mono-code uppercase tracking-wider">
                    Date of Issuance
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-[#e5c158] font-mono-code font-bold tracking-tight">
                    {displayDate}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: REAL SCANNABLE QR CODE (LIVE VERIFICATION URL) */}
            <div className="col-span-4 text-center flex flex-col items-center">
              <div className="mb-1 flex flex-col items-center">
                {qrCodeDataUrl ? (
                  <div className="p-1 bg-white rounded border border-[#c5a059]/70 shadow-md">
                    <img 
                      src={qrCodeDataUrl} 
                      alt={`Real QR Verification Code for ${certificate.certificateNo}`}
                      className="w-11 h-11 sm:w-13 sm:h-13 object-contain block"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 sm:w-13 sm:h-13 bg-white/90 rounded border border-[#c5a059]/50 flex items-center justify-center text-slate-900 text-[8px] font-mono">
                    QR Ready
                  </div>
                )}
              </div>
              <div className="w-32 sm:w-40 border-b border-[#c5a059] mb-1" />
              <p className="text-[9px] sm:text-[10px] font-bold text-white tracking-wider font-mono-code">
                {certificate.certificateNo}
              </p>
              <p className="text-[8px] sm:text-[9px] text-[#c5a059] font-medium leading-tight">
                Scan to Verify Credential
              </p>
              <p className="text-[7.5px] sm:text-[8px] text-emerald-400 font-mono-code leading-tight flex items-center gap-1 justify-center">
                <CheckCircle2 className="w-2.5 h-2.5" /> Real-time Authenticated
              </p>
            </div>
          </div>

          {/* BOTTOM MICRO-SECURITY LEDGER FOOTER */}
          <div className="relative z-10 flex items-center justify-between text-[7.5px] sm:text-[8.5px] text-slate-400 px-2 sm:px-6 pt-1.5 mt-1 border-t border-[#c5a059]/20 font-mono-code">
            <div className="flex items-center gap-1.5">
              <Lock className="w-2.5 h-2.5 text-[#c5a059]" />
              <span>OFFICIAL REGISTRY:</span>
              <span className="text-[#e5c158] font-semibold">INDUSTRY ORIENTED TRAINING (IOT)</span>
            </div>

            {showVerificationBadge && (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 hidden sm:inline">EXCLUSIVE MENTORSHIP BY KAPIL</span>
                <div className="px-2 py-0.5 rounded bg-[#0f121a] border border-[#c5a059]/40 text-[#e5c158] font-bold">
                  GENUINE CREDENTIAL
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
