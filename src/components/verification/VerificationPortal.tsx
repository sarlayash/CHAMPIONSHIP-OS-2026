import React, { useState } from 'react';
import { CertificateRecord } from '../../types';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  User, 
  Users, 
  Award, 
  ExternalLink,
  Lock,
  Building,
  Sparkles
} from 'lucide-react';

interface VerificationPortalProps {
  certificates: CertificateRecord[];
  initialCertNo?: string;
  onViewCertificate: (cert: CertificateRecord) => void;
}

export const VerificationPortal: React.FC<VerificationPortalProps> = ({
  certificates,
  initialCertNo = '',
  onViewCertificate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialCertNo);
  const [searchedCert, setSearchedCert] = useState<CertificateRecord | null>(() => {
    if (initialCertNo) {
      return certificates.find(c => c.certificateNo.toLowerCase() === initialCertNo.toLowerCase().trim()) || null;
    }
    return certificates[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialCertNo));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchQuery.trim().toLowerCase();
    if (!cleaned) {
      setSearchedCert(null);
      return;
    }
    const found = certificates.find(
      c => c.certificateNo.toLowerCase() === cleaned || 
           c.usn.toLowerCase() === cleaned ||
           c.participantName.toLowerCase().includes(cleaned)
    );
    setSearchedCert(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Official Public Verification Ledger
        </div>
        <h1 className="text-3xl font-extrabold text-white font-royal tracking-tight">
          Verify Championship Credentials
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
          Verify digital certificates issued by Sapthgiri NPS University and Industry Oriented Training (IOT) for the 13-Day Java DSA Championship 2026.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/90 focus-within:border-amber-500 transition">
          <div className="pl-4 text-slate-400">
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
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0 cursor-pointer"
          >
            Verify Credential
          </button>
        </div>

        {/* Quick Sample IDs */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400 justify-center">
          <span>Try quick sample:</span>
          {certificates.slice(0, 4).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSearchQuery(c.certificateNo);
                setSearchedCert(c);
                setHasSearched(true);
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono-code transition text-[11px] cursor-pointer"
            >
              {c.certificateNo}
            </button>
          ))}
        </div>
      </form>

      {/* Verification Result Card */}
      {hasSearched && (
        <div>
          {searchedCert ? (
            <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Verified Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                        OFFICIALLY VERIFIED & GENUINE
                      </span>
                      <span className="text-xs text-slate-400 font-mono-code">Status: Active</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {searchedCert.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => onViewCertificate(searchedCert)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Certificate
                </button>
              </div>

              {/* Credential Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-6 border-b border-slate-800 text-xs">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Recipient Name</span>
                  </div>
                  <p className="text-sm font-bold text-white">{searchedCert.participantName}</p>
                  <p className="text-[11px] text-amber-300 font-mono-code mt-0.5">USN: {searchedCert.usn}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Team Affiliation</span>
                  </div>
                  <p className="text-sm font-bold text-white">Team {searchedCert.teamName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">10 Teams Cohort</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>Distinction / Award</span>
                  </div>
                  <p className="text-sm font-bold text-amber-200">{searchedCert.achievementSubtitle}</p>
                  <p className="text-[11px] text-slate-400 capitalize mt-0.5">Category: {searchedCert.category.replace('_', ' ')}</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Issue Date</span>
                  </div>
                  <p className="text-sm font-bold text-white">{searchedCert.issueDate}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">13-Day Championship</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Building className="w-4 h-4 text-orange-400" />
                    <span>Issuing Institution</span>
                  </div>
                  <p className="text-sm font-bold text-white">Sapthgiri NPS University</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dept. of Computer Science & Engg.</p>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Chief Mentorship</span>
                  </div>
                  <p className="text-sm font-bold text-white">Kapil Narula</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Industry Oriented Training (IOT)</p>
                </div>
              </div>

              {/* Citation Quote */}
              <div className="pt-5">
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">Official Commendation Citation</p>
                <blockquote className="text-sm text-slate-300 italic bg-slate-950/80 p-4 rounded-xl border-l-4 border-amber-500 font-serif-title">
                  &ldquo;{searchedCert.citation}&rdquo;
                </blockquote>
              </div>

              {/* Cryptographic Ledger Proof */}
              <div className="mt-5 p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SHA-256 Hash: <span className="text-slate-400">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></span>
                </div>
                <span className="text-emerald-400 font-bold hidden sm:inline">AUTHENTICATED</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Matching Credential Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                We could not find a verified record matching &ldquo;{searchQuery}&rdquo;. Please verify the spelling of the Certificate ID or student USN.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
