import React, { useState } from 'react';
import { CertificateRecord } from '../../types';
import { CertificateRenderer } from './CertificateRenderer';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Share2, 
  Check, 
  Copy, 
  ExternalLink, 
  Send,
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  certificate: CertificateRecord | null;
  onClose: () => void;
  onVerify?: (certNo: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  onVerify,
}) => {
  const [copied, setCopied] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!certificate) return null;

  const certVerificationUrl = `${window.location.origin}?verify=${encodeURIComponent(certificate.certificateNo)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certVerificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    // Canvas-based download generator
    setTimeout(() => {
      const node = document.getElementById(`certificate-node-${certificate.certificateNo}`);
      if (node) {
        // We can create a simple printable download or export
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>${certificate.participantName} - ${certificate.title}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
                <style>
                  body { margin: 0; padding: 20px; background: #0c1222; font-family: system-ui, sans-serif; display: flex; justify-content: center; }
                  @media print { body { padding: 0; background: white; } }
                </style>
              </head>
              <body>
                ${node.outerHTML}
                <script>
                  window.onload = function() { window.print(); }
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      }
      setIsDownloading(false);
    }, 400);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmailModalOpen(false);
    }, 2000);
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `Excited to receive the official "${certificate.title}" (${certificate.achievementSubtitle}) from Sapthgiri NPS University and Industry Oriented Training (IOT) Powered by Kapil Narula at India's 13-Day Java DSA Championship 2026! 🚀\n\nVerified Credential ID: ${certificate.certificateNo}\nVerify here: ${certVerificationUrl}`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certVerificationUrl)}&summary=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎓 Verified Certificate: ${certificate.participantName} has been awarded "${certificate.title}" for Team ${certificate.teamName} at India's 13-Day Java DSA Championship 2026!\nCredential ID: ${certificate.certificateNo}\nVerify Authenticity: ${certVerificationUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto no-print">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                {certificate.title}
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono-code font-normal">
                  {certificate.certificateNo}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Conferred to <strong className="text-slate-200">{certificate.participantName}</strong> ({certificate.teamName})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Area */}
        <div className="p-4 md:p-8 bg-slate-950 flex items-center justify-center overflow-x-auto">
          <div className="w-full max-w-4xl">
            <CertificateRenderer certificate={certificate} />
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Preparing High-Res...' : 'Download Certificate'}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              Print PDF
            </button>

            <button
              onClick={() => {
                setEmailTo(certificate.recipientEmail);
                setEmailModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              Email
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareLinkedIn}
              className="px-3.5 py-2 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-[#0077b5] border border-[#0077b5]/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              LinkedIn
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              WhatsApp
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Verification Link'}
            </button>

            {onVerify && (
              <button
                onClick={() => {
                  onClose();
                  onVerify(certificate.certificateNo);
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                Verify
              </button>
            )}
          </div>
        </div>

        {/* Email Certificate Submodal */}
        {emailModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  Email Digital Certificate
                </h3>
                <button
                  onClick={() => setEmailModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {emailSent ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Certificate Dispatched!</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    An official authenticated copy and PDF link have been sent to <strong>{emailTo}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendEmail} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Recipient Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                      placeholder="student@sapthgiri.edu.in"
                    />
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
                    <p><strong className="text-slate-300">Subject:</strong> Official Credential: {certificate.title} - Sapthgiri NPS University</p>
                    <p><strong className="text-slate-300">Attachment:</strong> {certificate.certificateNo}.pdf (Digital Signed)</p>
                    <p><strong className="text-slate-300">Signatories:</strong> Kapil Narula & Dr. K. R. Sharma</p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEmailModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Certificate
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
