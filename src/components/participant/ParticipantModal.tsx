import React from 'react';
import { Participant, CertificateRecord, Badge } from '../../types';
import { 
  X, 
  Award, 
  CheckCircle2, 
  QrCode, 
  ExternalLink, 
  Github, 
  Linkedin, 
  FileText, 
  Calendar, 
  Sparkles, 
  Activity,
  Trophy,
  ShieldCheck
} from 'lucide-react';

interface ParticipantModalProps {
  participant: Participant | null;
  onClose: () => void;
  certificates: CertificateRecord[];
  allBadges: Badge[];
  onViewCertificate: (cert: CertificateRecord) => void;
}

export const ParticipantModal: React.FC<ParticipantModalProps> = ({
  participant,
  onClose,
  certificates,
  allBadges,
  onViewCertificate,
}) => {
  if (!participant) return null;

  const studentCerts = certificates.filter(c => c.participantId === participant.id);
  const studentBadges = allBadges.filter(b => participant.badges.includes(b.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-royal">
              Participant Dossier & Digital ID Card
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* DIGITAL ID CARD PREVIEW */}
          <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-slate-950 via-[#0d172e] to-slate-950 border-2 border-amber-500/50 rounded-2xl p-5 shadow-2xl overflow-hidden">
            {/* Background Watermark */}
            <div className="absolute top-2 right-2 text-amber-500/10 text-6xl font-black font-royal select-none pointer-events-none">
              SNPS
            </div>

            {/* Header of ID Card */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
              <div>
                <p className="text-[11px] font-extrabold text-amber-200 tracking-wider uppercase font-royal">
                  Sapthgiri NPS University
                </p>
                <p className="text-[9px] text-slate-400">Java DSA Championship 2026</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black uppercase">
                OFFICIAL ID
              </span>
            </div>

            {/* Body */}
            <div className="flex items-center gap-4">
              {/* Photo */}
              <div className="w-20 h-24 rounded-xl border-2 border-amber-500/60 overflow-hidden bg-slate-800 shrink-0 shadow-md">
                <img
                  src={participant.photoUrl}
                  alt={participant.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Data */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white truncate">{participant.name}</h3>
                  {participant.isLeader && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-bold">
                      CAPTAIN
                    </span>
                  )}
                </div>

                <p className="text-xs text-amber-300 font-mono-code mt-0.5">USN: {participant.usn}</p>
                <p className="text-[11px] text-slate-300 mt-1">Team: <strong>{participant.teamName}</strong></p>
                <p className="text-[10px] text-slate-400">{participant.department}</p>
              </div>

              {/* QR Code */}
              <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex flex-col items-center justify-center shadow">
                <QrCode className="w-12 h-12 text-slate-950" />
                <span className="text-[6px] text-slate-700 font-mono-code font-bold">VERIFIED</span>
              </div>
            </div>

            {/* Footer Strip */}
            <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400 font-mono-code">
              <span>IOT Powered By Kapil</span>
              <span className="text-emerald-400 font-bold">ACTIVE CREDENTIAL</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Overall Rank</span>
              <p className="text-xl font-black text-amber-400 font-mono-code">#{participant.rank}</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Points</span>
              <p className="text-xl font-black text-white font-mono-code">{participant.totalPoints.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Attendance</span>
              <p className="text-xl font-black text-emerald-400 font-mono-code">{participant.attendanceRate}%</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Reflections</span>
              <p className="text-xl font-black text-blue-400 font-mono-code">{participant.dailyReflectionsCount}/13</p>
            </div>
          </div>

          {/* Issued Certificates */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Verified Issued Certificates ({studentCerts.length})
            </h4>
            <div className="space-y-2">
              {studentCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => onViewCertificate(cert)}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 transition cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                        {cert.title}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono-code text-amber-400">
                        {cert.certificateNo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{cert.achievementSubtitle}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500 text-amber-400 group-hover:text-slate-950 font-bold text-xs transition flex items-center gap-1">
                    View
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Achievement Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Earned Digital Badges ({studentBadges.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {studentBadges.map((badge) => (
                <div key={badge.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{badge.name}</p>
                    <p className="text-[10px] text-slate-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Radar */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Technical Competency Benchmark (Java & DSA)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex justify-between mb-1 text-slate-400 text-[11px]">
                  <span>Java Core & JVM</span>
                  <span className="font-mono-code font-bold text-amber-300">{participant.skills.javaFundamentals}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${participant.skills.javaFundamentals}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex justify-between mb-1 text-slate-400 text-[11px]">
                  <span>Data Structures</span>
                  <span className="font-mono-code font-bold text-blue-300">{participant.skills.dataStructures}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${participant.skills.dataStructures}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex justify-between mb-1 text-slate-400 text-[11px]">
                  <span>Algorithms & DP</span>
                  <span className="font-mono-code font-bold text-purple-300">{participant.skills.algorithms}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${participant.skills.algorithms}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex justify-between mb-1 text-slate-400 text-[11px]">
                  <span>Problem Solving</span>
                  <span className="font-mono-code font-bold text-emerald-300">{participant.skills.problemSolving}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${participant.skills.problemSolving}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex justify-between mb-1 text-slate-400 text-[11px]">
                  <span>Concurrency & Debugging</span>
                  <span className="font-mono-code font-bold text-orange-300">{participant.skills.debugging}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: `${participant.skills.debugging}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex justify-between mb-1 text-slate-400 text-[11px]">
                  <span>System Architecture</span>
                  <span className="font-mono-code font-bold text-pink-300">{participant.skills.systemDesign}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full rounded-full" style={{ width: `${participant.skills.systemDesign}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
            <a
              href={participant.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-800"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={participant.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-800"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
