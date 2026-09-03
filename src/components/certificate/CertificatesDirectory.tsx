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
  Printer
} from 'lucide-react';

interface CertificatesDirectoryProps {
  certificates: CertificateRecord[];
  teams: Team[];
  onViewCertificate: (cert: CertificateRecord) => void;
  onOpenBulkModal: () => void;
}

export const CertificatesDirectory: React.FC<CertificatesDirectoryProps> = ({
  certificates,
  teams,
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Credential Repository
          </div>
          <h1 className="text-3xl font-extrabold text-white font-royal">
            Issued Digital Certificates
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Displaying {filtered.length} verified credentials out of {certificates.length} total issued. Zero simulated credentials — only administrator-authorized certificates appear here.
          </p>
        </div>

        <button
          onClick={onOpenBulkModal}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          Batch Issuance Engine
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8 space-y-3 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box (6 cols) */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, USN (1SN22CS001), or Certificate ID..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Team Filter (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="all">All 10 Teams</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>Team {t.name}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                categoryFilter === c.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cert) => {
          const isWinner = cert.category === 'winner';
          const isExcellence = cert.category === 'excellence';
          const isTeam = cert.category === 'team_excellence';

          return (
            <div
              key={cert.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition hover:scale-[1.01] flex flex-col justify-between group relative overflow-hidden ${
                isWinner 
                  ? 'border-amber-500/70 hover:border-amber-400' 
                  : isExcellence 
                  ? 'border-blue-500/50 hover:border-blue-400'
                  : isTeam
                  ? 'border-emerald-500/50 hover:border-emerald-400'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Category Top Banner */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isWinner ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  isExcellence ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                  isTeam ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {cert.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono-code text-slate-400 font-semibold">
                  {cert.certificateNo}
                </span>
              </div>

              {/* Title & Student Name */}
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition">
                  {cert.title}
                </h3>
                <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                  {cert.achievementSubtitle}
                </p>

                <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Awarded To</span>
                  <p className="text-sm font-bold text-white font-serif-title mt-0.5">{cert.participantName}</p>
                  <p className="text-[11px] text-slate-400 font-mono-code">
                    USN: {cert.usn} • Team {cert.teamName}
                  </p>
                </div>

                <p className="text-xs text-slate-400 italic line-clamp-2 mt-3 font-serif-title">
                  &ldquo;{cert.citation}&rdquo;
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-mono-code flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewCertificate(cert)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  >
                    View & Print
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">
            {certificates.length === 0 ? 'No Certificates Issued Yet' : 'No Certificates Match Filter'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {certificates.length === 0
              ? 'The repository is starting clean from zero. Once credentials are created and authorized via the Bulk Issuance Engine or Admin Portal, authentic certificates will be listed here with instant QR and hash verification.'
              : 'Try resetting the category filter, team selection, or search query.'}
          </p>
        </div>
      )}
    </div>
  );
};
