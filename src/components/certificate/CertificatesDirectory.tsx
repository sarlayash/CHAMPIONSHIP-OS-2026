import React, { useState } from 'react';
import { CertificateRecord, Team, CertificateCategory } from '../../types';
import { 
  Search, 
  Filter, 
  Award, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  Printer,
  Sparkles
} from 'lucide-react';

interface CertificatesDirectoryProps {
  certificates: CertificateRecord[];
  teams: Team[];
  isAdminLoggedIn?: boolean;
  onViewCertificate: (cert: CertificateRecord) => void;
  onOpenBulkModal: () => void;
}

export const CertificatesDirectory: React.FC<CertificatesDirectoryProps> = ({
  certificates,
  teams,
  isAdminLoggedIn = false,
  onViewCertificate,
  onOpenBulkModal,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');

  const filtered = certificates.filter((c) => {
    const matchesSearch = 
      c.participantName.toLowerCase().includes(search.toLowerCase()) ||
      c.certificateNo.toLowerCase().includes(search.toLowerCase()) ||
      c.usn.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesTeam = teamFilter === 'all' || c.teamId === teamFilter;
    return matchesSearch && matchesCategory && matchesTeam;
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Certificates' },
    { id: 'participation', label: '📜 Participation' },
    { id: 'merit', label: '🏅 Merit Distinctions' },
    { id: 'excellence', label: '🌟 Excellence Honors' },
    { id: 'winner', label: '🏆 Championship Winners' },
    { id: 'team_excellence', label: '👥 Team Excellence' },
    { id: 'special_recognition', label: '⭐ Special Recognition' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-100">
      {/* Top Banner — Fortune 500 Executive Black & Gold */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#03060a] border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffd700]" />
            Official Cryptographic Credential Ledger
          </div>
          <h1 className="text-3xl font-black text-white font-royal tracking-tight">
            Issued Digital Certificates
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-serif-title">
            Displaying <strong className="text-white">{filtered.length}</strong> verified credentials out of <strong className="text-[#ffd700]">{certificates.length}</strong> total issued in the live registry. Every credential is authenticated under Mentorship by Kapil Narula.
          </p>
        </div>

        {isAdminLoggedIn && (
          <button
            onClick={onOpenBulkModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] via-[#f5d76e] to-[#d4af37] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition cursor-pointer border border-[#fff1b8]"
          >
            <Layers className="w-4 h-4 text-slate-950" />
            Batch Issuance Engine
          </button>
        )}
      </div>

      {/* Filter Toolbar — Fortune 500 Black & Gold */}
      <div className="bg-[#050811] border-2 border-[#d4af37]/35 rounded-2xl p-4 sm:p-5 mb-8 space-y-3 shadow-xl ring-1 ring-[#d4af37]/20">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#ffd700] absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, USN (1SN22CS001), or Certificate ID..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#000000] border border-[#d4af37]/40 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#ffd700] transition"
            />
          </div>

          {/* Team Filter */}
          <div className="sm:col-span-3">
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#000000] border border-[#d4af37]/40 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-[#ffd700] cursor-pointer"
            >
              <option value="all">All 10 Teams</option>
              {teams.map(t => (
                <option key={t.id} value={t.id} className="bg-[#050811] text-white">Team {t.name}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#000000] border border-[#d4af37]/40 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-[#ffd700] cursor-pointer"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id} className="bg-[#050811] text-white">{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#d4af37]/20">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                categoryFilter === c.id
                  ? 'bg-[#ffd700] text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                  : 'bg-[#000000] text-slate-300 hover:text-white border border-[#d4af37]/25 hover:border-[#d4af37]/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Cards Grid — Executive Black & Gold Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cert) => {
          const isWinner = cert.category === 'winner';
          const isExcellence = cert.category === 'excellence';

          return (
            <div
              key={cert.id}
              className={`bg-[#050811] border-2 rounded-2xl p-5 shadow-xl transition hover:scale-[1.01] flex flex-col justify-between group relative overflow-hidden ${
                isWinner 
                  ? 'border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.25)]' 
                  : isExcellence 
                  ? 'border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'border-[#d4af37]/35 hover:border-[#d4af37]'
              }`}
            >
              {/* Corner Gold Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#ffd700]/10 to-transparent pointer-events-none" />

              {/* Category Top Banner */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  isWinner 
                    ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/60' 
                    : 'bg-[#000000] text-slate-200 border border-[#d4af37]/40'
                }`}>
                  {cert.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono-code text-[#ffd700] font-bold">
                  {cert.certificateNo}
                </span>
              </div>

              {/* Title & Student Name */}
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-[#ffd700] transition">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#ffd700]/90 font-medium mt-0.5">
                  {cert.achievementSubtitle}
                </p>

                <div className="mt-4 p-3 bg-[#000000] rounded-xl border border-[#d4af37]/30">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Awarded To</span>
                  <p className="text-sm font-black text-white font-serif-title mt-0.5">{cert.participantName}</p>
                  <p className="text-[11px] text-[#ffd700] font-mono-code">
                    USN: {cert.usn} • Team {cert.teamName}
                  </p>
                </div>

                <p className="text-xs text-slate-300 italic line-clamp-2 mt-3 font-serif-title">
                  &ldquo;{cert.citation}&rdquo;
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-mono-code flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewCertificate(cert)}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-[0_0_12px_rgba(212,175,55,0.3)] hover:brightness-110 cursor-pointer"
                  >
                    View & Print
                    <ExternalLink className="w-3 h-3 text-slate-950" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-[#050811] border-2 border-[#d4af37]/35 rounded-2xl">
          <Award className="w-12 h-12 text-[#d4af37] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-white font-royal">
            {certificates.length === 0 ? 'No Certificates Issued Yet' : 'No Certificates Match Filter'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto font-serif-title">
            {certificates.length === 0
              ? 'The repository is starting clean from zero. Once credentials are created and authorized via the Bulk Issuance Engine or Admin Portal, authentic certificates will be listed here with instant QR and hash verification.'
              : 'Try resetting the category filter, team selection, or search query.'}
          </p>
        </div>
      )}
    </div>
  );
};
