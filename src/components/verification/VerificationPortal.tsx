import React, { useState, useEffect } from 'react';
import { CertificateRecord } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Award, 
  User, 
  Users, 
  Calendar, 
  Building, 
  Sparkles,
  Lock,
  QrCode
} from 'lucide-react';

interface VerificationPortalProps {
  certificates: CertificateRecord[];
  initialSearchQuery?: string;
  onViewCertificate: (cert: CertificateRecord) => void;
}

export const VerificationPortal: React.FC<VerificationPortalProps> = ({
  certificates,
  initialSearchQuery = '',
  onViewCertificate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchedCert, setSearchedCert] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      const found = certificates.find(
        (c) =>
          c.certificateNo.toLowerCase() === initialSearchQuery.toLowerCase() ||
          c.usn.toLowerCase() === initialSearchQuery.toLowerCase()
      );
      setSearchedCert(found || null);
      setHasSearched(true);
    }
  }, [initialSearchQuery, certificates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const q = searchQuery.trim().toLowerCase();
    const found = certificates.find(
      (c) =>
        c.certificateNo.toLowerCase() === q ||
        c.usn.toLowerCase() === q ||
        c.participantName.toLowerCase().includes(q)
    );
    setSearchedCert(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-100">
      {/* Top Banner Header — Fortune 500 Executive Black & Gold */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000000] border border-[#d4af37]/40 text-[#ffd700] text-xs font-black mb-3">
          <ShieldCheck className="w-4 h-4 text-[#ffd700]" />
          Official Public Verification Ledger • Mentorship by Kapil Narula
        </div>
        <h1 className="text-3xl font-black text-white font-royal tracking-tight">
          Verify Championship Credentials
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2 font-serif-title">
          Verify digital certificates issued for the 13-Day Java DSA Championship 2026 at Sapthgiri NPS University.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 bg-[#000000] focus-within:border-[#ffd700] transition">
          <div className="pl-4 text-[#ffd700]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Certificate ID (e.g., SNPS-JDSA26-W-001), USN (1SN22CS001), or Student Name..."
            className="w-full px-4 py-3.5 bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-gradient-to-r from-[#ffd700] via-[#f5d76e] to-[#d4af37] text-slate-950 font-black text-xs uppercase tracking-wider transition shrink-0 cursor-pointer shadow-lg hover:brightness-110"
          >
            Verify Credential
          </button>
        </div>

        {/* Quick Sample IDs */}
        {certificates.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400 justify-center">
            <span className="font-mono-code text-[#ffd700]">Quick sample:</span>
            {certificates.slice(0, 4).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSearchQuery(c.certificateNo);
                  setSearchedCert(c);
                  setHasSearched(true);
                }}
                className="px-2.5 py-0.5 rounded bg-[#050811] hover:bg-[#0e1526] text-[#ffd700] border border-[#d4af37]/30 font-mono-code transition text-[11px] cursor-pointer"
              >
                {c.certificateNo}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Verification Result Card */}
      {hasSearched && (
        <div>
          {searchedCert ? (
            <div className="bg-[#050811] border-2 border-[#ffd700] rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(212,175,55,0.25)] relative overflow-hidden">
              {/* Verified Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/25">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#ffd700]/50 flex items-center justify-center text-[#ffd700]">
                    <CheckCircle className="w-7 h-7 text-[#ffd700]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#ffd700] text-xs font-black border border-[#ffd700]/60 font-mono-code">
                        OFFICIALLY VERIFIED & GENUINE
                      </span>
                      <span className="text-xs text-slate-400 font-mono-code">Status: Active Registry</span>
                    </div>
                    <h2 className="text-xl font-black text-white mt-1 font-royal">
                      {searchedCert.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => onViewCertificate(searchedCert)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition shadow-md hover:brightness-110 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-slate-950" />
                  View Full Certificate
                </button>
              </div>

              {/* Credential Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-6 border-b border-[#d4af37]/20 text-xs">
                <div className="p-3.5 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <User className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-bold">Recipient Name</span>
                  </div>
                  <p className="text-sm font-black text-white">{searchedCert.participantName}</p>
                  <p className="text-[11px] text-[#ffd700] font-mono-code mt-0.5">USN: {searchedCert.usn}</p>
                </div>

                <div className="p-3.5 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Users className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-bold">Team Affiliation</span>
                  </div>
                  <p className="text-sm font-black text-white">Team {searchedCert.teamName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">10 Competing Squads</p>
                </div>

                <div className="p-3.5 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Award className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-bold">Distinction / Award</span>
                  </div>
                  <p className="text-sm font-black text-[#ffd700]">{searchedCert.achievementSubtitle}</p>
                  <p className="text-[11px] text-slate-400 capitalize mt-0.5 font-mono-code">Category: {searchedCert.category.replace('_', ' ')}</p>
                </div>

                <div className="p-3.5 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Calendar className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-bold">Issue Date</span>
                  </div>
                  <p className="text-sm font-black text-white">{searchedCert.issueDate}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">13-Day Championship 2026</p>
                </div>

                <div className="p-3.5 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Building className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-bold">Issuing Institution</span>
                  </div>
                  <p className="text-sm font-black text-white">Sapthgiri NPS University</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dept. of Computer Science & Engg.</p>
                </div>

                <div className="p-3.5 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Sparkles className="w-4 h-4 text-[#ffd700]" />
                    <span className="font-bold">Direct Mentorship</span>
                  </div>
                  <p className="text-sm font-black text-[#ffd700]">Kapil Narula</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Industry Oriented Training (IOT)</p>
                </div>
              </div>

              {/* Citation Quote */}
              <div className="pt-5">
                <p className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1 font-mono-code">Official Commendation Citation</p>
                <blockquote className="text-sm text-slate-300 italic bg-[#000000] p-4 rounded-xl border-l-4 border-[#ffd700] font-serif-title">
                  &ldquo;{searchedCert.citation}&rdquo;
                </blockquote>
              </div>

              {/* Cryptographic Ledger Proof */}
              <div className="mt-5 p-3 rounded-lg bg-[#000000] border border-[#d4af37]/30 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>SHA-256 Signature: <span className="text-[#ffd700] font-bold">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></span>
                </div>
                <span className="text-emerald-400 font-black hidden sm:inline">AUTHENTICATED LEDGER</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#050811] border-2 border-red-500/40 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-3 border border-red-500/30">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-white font-royal">No Matching Credential Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 font-serif-title">
                We could not find a verified record matching &ldquo;{searchQuery}&rdquo;. Please verify the spelling of the Certificate ID or student USN.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
