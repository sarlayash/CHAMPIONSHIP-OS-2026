import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Trophy, 
  FileText, 
  Sliders, 
  Activity, 
  Settings as SettingsIcon, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Search, 
  HelpCircle, 
  KeyRound, 
  AlertTriangle, 
  ExternalLink,
  Crown,
  Sparkles,
  Download
} from 'lucide-react';

export const AdminUserManual: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'quickstart', title: '1. Quick Start & Authentication', icon: KeyRound },
    { id: 'learners', title: '2. Learners Roster Management (CRUD)', icon: Users },
    { id: 'teams', title: '3. Teams & Squads Administration', icon: Trophy },
    { id: 'certificates', title: '4. Certificate Issuance & Verification', icon: FileText },
    { id: 'realnumbers', title: '5. Mathematical Integrity & Audit', icon: Activity },
    { id: 'rubric', title: '6. Jury Rubric & Evaluation Engine', icon: Sliders },
    { id: 'settings', title: '7. Global Championship Settings', icon: SettingsIcon },
    { id: 'troubleshooting', title: '8. FAQ & Troubleshooting SOP Matrix', icon: HelpCircle },
  ];

  const filteredSections = sections.filter(s => 
    activeSection === 'all' || activeSection === s.id
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl print:border-none print:shadow-none print:bg-white print:text-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 print:hidden">
              <BookOpen className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-white font-royal print:text-black">
                  Administrator User Manual & Standard Operating Procedures (SOP)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 print:hidden">
                  Official v2.6
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Complete operational guide for Sapthgiri NPS University 13-Day Java Full Stack & DSA Championship 2026.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 print:hidden">
            <button
              onClick={() => handleCopy(MANUAL_MARKDOWN_EXPORT, 'all_manual')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Copy the entire guide as formatted Markdown"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              {copiedKey === 'all_manual' ? 'Copied Manual!' : 'Copy Markdown'}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Search and Section Jump Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 print:hidden flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search user manual topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
                activeSection === 'all'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Sections
            </button>
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-1 cursor-pointer ${
                    activeSection === s.id
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{s.title.split('.')[1]?.trim() || s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 1: QUICK START & AUTHENTICATION */}
      {(activeSection === 'all' || activeSection === 'quickstart') && (
        <div id="quickstart" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm">
              <KeyRound className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">1. Quick Start & Administrator Authentication</h3>
              <p className="text-xs text-slate-400">Credentials, permissions, and session access protocols.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
              <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                Confidential Access Protocols
              </span>
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Restricted Access Control (RBAC)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Administrator ID and authentication keys are strictly confidential and issued directly by the Sapthgiri NPS University Directorate to designated mentors and evaluators.
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  Never publish, share, or showcase credentials on public screens or distributed documentation.
                </p>
              </div>
              <p className="text-[11px] text-slate-500">
                Authorized for: Chief Mentors, Department Evaluators, and Championship Directors.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                Session Control & Security Policy
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Public Credentials:</strong> Administrative access fields must always remain blank and unexposed to public visitors.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Live Audit Persistence:</strong> All administrative modifications trigger live state updates across Leaderboard, Hall of Fame, and Team Directories.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Secure Sign-Out:</strong> Click the Logout button in the upper-right corner whenever stepping away from the scoring workstation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: LEARNERS ROSTER MANAGEMENT */}
      {(activeSection === 'all' || activeSection === 'learners') && (
        <div id="learners" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">2. Learners & Participants Management (CRUD SOP)</h3>
              <p className="text-xs text-slate-400">Step-by-step procedures for adding, updating, scoring, and organizing learners.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                <span>Step 2.1: Adding a New Learner</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
                <li>Navigate to the <strong>"Learners Roster"</strong> tab inside the Admin Portal.</li>
                <li>Click the amber <strong>"Add New Learner"</strong> button in the top right.</li>
                <li>Enter the student's <strong>Full Legal Name</strong> and valid <strong>University Seat Number (USN)</strong> (e.g., <code>1SN22CS056</code>).</li>
                <li>Select their assigned <strong>Championship Squad</strong> from the dropdown.</li>
                <li>If the student is designated as the squad leader, toggle <strong>"Designate as Team Captain / Leader"</strong>.</li>
                <li>Input their <strong>Championship Points</strong> (0 – 100,000) and <strong>Attendance Rate (%)</strong> across the 13 days.</li>
                <li>Adjust technical skill sliders (Java Fundamentals, Data Structures, Problem Solving) out of 100.</li>
                <li>Click <strong>"Add Learner & Calculate Points"</strong>. The system will auto-rank the student and rebalance squad point totals.</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-400 text-xs flex items-center gap-1.5">
                <span>Step 2.2: Editing Existing Learner Records & Cascading Synchronizations</span>
              </h4>
              <p className="text-slate-300">
                To edit any learner, find them using the search bar or team filter, then click the <strong>Edit (Pencil)</strong> icon:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                <li><strong>Changing Points:</strong> Immediately alters the student's rank and cascades into the team's total points.</li>
                <li><strong>Reassigning Squads:</strong> Updates both the old and new team's point totals and recalculates standings.</li>
                <li><strong>Certificate Cascade:</strong> Any edit to the student's name, USN, or award title automatically syncs with all issued certificate records.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-red-400 text-xs flex items-center gap-1.5">
                <span>Step 2.3: Removing a Learner</span>
              </h4>
              <p className="text-slate-300">
                Click the <strong>Trash</strong> icon next to a participant. A confirmation dialog will prompt before removal. Once confirmed:
              </p>
              <p className="text-slate-400">
                The student is unassigned, team point totals are mathematically recalculated, and cohort ranks are shifted without gaps.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Step 2.4: Downloading Participants Roster CSV for University Records</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Click <strong>"Download CSV"</strong> at the top of the Learners Roster or from the main Admin Portal header menu.
                The exported spreadsheet includes complete participant details: Championship Rank, Legal Full Name, USN, Email, Contact Phone, Assigned Team, Captain Status, Total Points, Attendance Percentage, Department, Academic Year, Conferred Awards, Technical Skills, and Profile Links. Formatted with UTF-8 BOM for immediate opening in Microsoft Excel and Google Sheets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TEAMS & SQUADS ADMINISTRATION */}
      {(activeSection === 'all' || activeSection === 'teams') && (
        <div id="teams" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">3. Championship Teams & Squads Administration</h3>
              <p className="text-xs text-slate-400">Procedures for team standings, stage scores, deliverables, and roster inspection.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block text-xs">Stage Score Breakdown Protocol</span>
              <p className="text-slate-300">Every team's performance is calibrated across 4 official competitive phases:</p>
              <ul className="space-y-1 text-slate-400 font-mono-code">
                <li>• <strong>Learning League:</strong> 0 - 35,000 pts (Quizzes & daily problem streaks)</li>
                <li>• <strong>Coding Battle:</strong> 0 - 65,000 pts (LeetCode/HackerRank live contest)</li>
                <li>• <strong>Quiz Kahoot:</strong> 0 - 35,000 pts (Speed syntax and JVM internals)</li>
                <li>• <strong>Hackathon Finale:</strong> 0 - 45,000 pts (Full stack functional architecture)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block text-xs">Auto-Calculated Real Numbers & Team Bonus Points</span>
              <p className="text-slate-300">
                Whenever an administrator adds or edits team members, changes member points, or awards bonus points, the system <strong>automatically recalculates</strong> all team scores and cohort rankings in real-time.
              </p>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono-code text-amber-300">
                Team Total = Σ(Member Points) + Team Bonus Points + Σ(Stage Scores)
              </div>
              <p className="text-[11px] text-slate-400">
                <strong>No Limit on Point Values:</strong> Both individual member scores and team bonus points accept unrestricted values to accommodate grand challenges and high-volume competitive point structures.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
            <span className="text-slate-200 font-bold block">Deliverables & Inspection Checklist</span>
            <p className="text-slate-300">
              When editing a team, ensure valid URLs are entered for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono-code text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <strong>GitHub URL:</strong> Verified repository containing Java source files & README.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <strong>Demo Video:</strong> YouTube or Drive demonstration of the live deployed system.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <strong>PPT Presentation:</strong> Final jury architecture slides and performance benchmarks.
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-blue-500/30 text-xs space-y-2">
            <h4 className="font-bold text-blue-400 text-xs flex items-center gap-1.5">
              <Download className="w-4 h-4 text-blue-400" />
              <span>Step 3.3: Downloading Team Standings CSV for Academic Records</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Click <strong>"Download CSV"</strong> at the top of the Teams tab or from the main Admin Portal header menu.
              The exported file records current rankings, team code, captain name, registered member count, stage score metrics (Learning League, Coding Battle, Quiz/Kahoot, Hackathon Finale), final Jury Rubric score (out of 100), jury evaluation remarks, project titles, repository URLs, and awarded titles.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 4: CERTIFICATES ISSUANCE & VERIFICATION */}
      {(activeSection === 'all' || activeSection === 'certificates') && (
        <div id="certificates" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 font-bold text-sm">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">4. Certificate Issuance & Verification Ledger SOP</h3>
              <p className="text-xs text-slate-400">Cryptographic hashes, QR codes, single and bulk generation workflows.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 text-xs">Single Certificate Issuance</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>From either the <strong>Certificates Ledger</strong> or <strong>Learners Roster</strong>, click <strong>"Issue Certificate"</strong>.</li>
                <li>Select the target learner by name/USN.</li>
                <li>Choose the certificate category:
                  <ul className="list-disc list-inside pl-4 text-slate-400 mt-1">
                    <li><strong>Rank 1:</strong> Winner (First Place)</li>
                    <li><strong>Rank 2:</strong> 1st Runner-Up (Second Place)</li>
                    <li><strong>Rank 3:</strong> 2nd Runner-Up (Third Place)</li>
                    <li><strong>Top Performers:</strong> Excellence / Merit Award</li>
                    <li><strong>Participants:</strong> Completion & Championship Participation</li>
                  </ul>
                </li>
                <li>Click <strong>"Generate & Issue Certificate"</strong>. The certificate is issued with a unique SHA-256 styled hash.</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 text-xs">Bulk Issuance Engine</h4>
              <p className="text-slate-300">
                To issue certificates for all 55+ participants in one click, select <strong>"Bulk Issuance Engine"</strong> from the top banner. The engine automatically assigns the proper category (Winner, Runner-up, Excellence, Participation) based on each student's official leaderboard rank.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-400 text-xs">Cryptographic Verification & QR Codes</h4>
              <p className="text-slate-300">
                Each certificate carries an immutable serial number (e.g., <code>SNPSU-JFS-2026-0001</code>) and verification QR code. Anyone scanning the QR code or visiting the public <strong>"Certificates"</strong> tab can search by USN or Certificate ID to confirm genuine authenticity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: REAL NUMBERS AUDIT & INTEGRITY */}
      {(activeSection === 'all' || activeSection === 'realnumbers') && (
        <div id="realnumbers" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">5. Mathematical Integrity & Real Numbers Audit</h3>
              <p className="text-xs text-slate-400">Ledger audit protocol ensuring zero artificial data, fake ranks, or math mismatches.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-xs">How Real Number Integrity is Maintained</h4>
              <p className="text-slate-300 leading-relaxed">
                In competitive championships, score transparency is critical. The system enforces two invariant mathematical rules:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono-code text-[11px]">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <strong className="text-amber-400 block mb-1">Rule 1: Rank Monotonicity</strong>
                  <span>Participant Rank #k always has Points ≥ Participant Rank #(k+1). No rank ties or inverted positions can exist.</span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <strong className="text-emerald-400 block mb-1">Rule 2: Team Sum Conservation</strong>
                  <span>A squad's score equals the sum of its enrolled participants: <code>TeamPoints = Σ MemberPoints</code>.</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 text-xs">Running the Real Numbers Audit</h4>
              <p className="text-slate-300">
                1. Switch to the <strong>"Real Numbers Audit"</strong> tab in the Admin Portal.<br />
                2. Review the verification table. If any team displays a difference ≠ 0, click the <strong>"Auto-Reconcile 100% Real Math"</strong> button.<br />
                3. The system will balance the ledger and celebrate with confetti once 100% synchronization is confirmed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: JURY RUBRIC EVALUATION */}
      {(activeSection === 'all' || activeSection === 'rubric') && (
        <div id="rubric" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">6. Jury Rubric & Evaluation Engine SOP</h3>
              <p className="text-xs text-slate-400">Objective scoring dimensions for project evaluations during the Hackathon Finale.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-xs">1. Architecture & Design (25 pts)</span>
                <p className="text-slate-400 mt-1 text-[11px]">OOP principles, modular package design, separation of concerns in Java 21.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-xs">2. Code Quality & DSA (20 pts)</span>
                <p className="text-slate-400 mt-1 text-[11px]">Time and space complexity optimizations, clean naming conventions, exception safety.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-xs">3. Live Working Demo (20 pts)</span>
                <p className="text-slate-400 mt-1 text-[11px]">Working application, API responses under load, zero crash defects during defense.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-xs">4. Innovation & Feasibility (15 pts)</span>
                <p className="text-slate-400 mt-1 text-[11px]">Novelty of algorithmic solution, real-world utility for enterprise scale.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-xs">5. Presentation & Defense (10 pts)</span>
                <p className="text-slate-400 mt-1 text-[11px]">Clarity of technical pitch, handling judge Q&A, slide communication.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-xs">6. Daily Reflection & Social (10 pts)</span>
                <p className="text-slate-400 mt-1 text-[11px]">13 days unbroken LinkedIn technical reflection posts and git commit history.</p>
              </div>
            </div>
            <p className="text-slate-400 text-[11px]">
              Jury scores are saved directly to the team's record and automatically factor into the <code>rubricScore</code> property.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 7: GLOBAL CHAMPIONSHIP CONFIGURATION */}
      {(activeSection === 'all' || activeSection === 'settings') && (
        <div id="settings" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-sm">
              <SettingsIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">7. Global Championship Settings</h3>
              <p className="text-xs text-slate-400">Institutional metadata, signatory configuration, and branding.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block text-xs">Championship Metadata</span>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>University:</strong> Sapthgiri NPS University (Bengaluru)</li>
                <li>• <strong>Cohort:</strong> 13-Day Java Full Stack & DSA Championship 2026</li>
                <li>• <strong>Venue:</strong> Turing Hall & Computing Centre</li>
                <li>• <strong>Batch:</strong> B.Tech CSE 3rd Year</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-blue-400 font-bold block text-xs">Authorized Signatories</span>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>Lead Trainer & Program Architect:</strong> Kapil Narula</li>
                <li>• <strong>Head of Department:</strong> Dr. HOD, CSE Department</li>
                <li>• <strong>Dean of Engineering:</strong> Dr. Dean, Faculty of Engineering</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: FAQ & TROUBLESHOOTING SOP MATRIX */}
      {(activeSection === 'all' || activeSection === 'troubleshooting') && (
        <div id="troubleshooting" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-400 font-bold text-sm">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white font-royal">8. FAQ & Troubleshooting SOP Matrix</h3>
              <p className="text-xs text-slate-400">Rapid resolutions for common operational questions and edge cases.</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-amber-300 font-bold block mb-1">
                Q: What happens if I update a student's USN or name?
              </span>
              <p className="text-slate-300">
                <strong>A:</strong> All issued certificates linked to that student are instantly synchronized. Their new name and USN will appear on the public ledger and in the printable certificate viewer automatically.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-amber-300 font-bold block mb-1">
                Q: Why did Team Brahmastra's rank change after I edited a student's score?
              </span>
              <p className="text-slate-300">
                <strong>A:</strong> Because real mathematical sorting is active. When a member's individual points increase, their squad total recalculates in real-time, which may cause them to overtake adjacent teams on the leaderboard.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-amber-300 font-bold block mb-1">
                Q: Can an external employer verify a certificate QR code?
              </span>
              <p className="text-slate-300">
                <strong>A:</strong> Yes. Scanning the QR code opens the verification page with the student's authentic record, verified issue date, and university signature credentials.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-amber-300 font-bold block mb-1">
                Q: How do I export data for reporting to university leadership?
              </span>
              <p className="text-slate-300">
                <strong>A:</strong> Click <strong>"Export CSV"</strong> in the upper right header to download a complete spreadsheet of all issued certificates, USNs, points, and issue timestamps.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Printable / Copy Note */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Sapthgiri NPS University • Official Administrator Operating Manual 2026</span>
        </div>
        <span className="text-slate-500 font-mono-code text-[11px]">
          Authored for Championship Directorate • Last Revised: Day 13 Finale
        </span>
      </div>
    </div>
  );
};

const MANUAL_MARKDOWN_EXPORT = `# SAPTHGIRI NPS UNIVERSITY
## 13-Day Java Full Stack & DSA Championship 2026
### Official Administrator User Manual & Standard Operating Procedures (SOP)

**Administrator Access Protocols:**
- Access credentials are confidential and issued by the Championship Directorate.
- Keep Administrator ID and Password strictly restricted to authorized staff.
- Administrative access is required for Stage Scoring, Rubric Evaluations, and Credential Issuance.

---

### 1. Quick Start & Authentication
Authorized access for Chief Mentors, Evaluators, and Championship Directors. Enter your assigned Administrator ID and Password in the Admin Portal to gain console privileges.

### 2. Learners Management SOP (CRUD)
- **Adding a Learner:**
  1. Open the "Learners Roster" tab.
  2. Click "Add New Learner".
  3. Enter Name, verified USN (e.g. 1SN22CS056), Squad assignment, points, and attendance.
  4. Submit. Standings and rankings recalculate dynamically.
- **Editing & Deleting:**
  - Click Edit to update scores or squad assignments.
  - Changes cascade to certificate records and squad totals.

### 3. Championship Teams SOP
- **Four Competitive Phases:**
  - Learning League (0 - 35,000 pts)
  - Coding Battle (0 - 65,000 pts)
  - Quiz Kahoot (0 - 35,000 pts)
  - Hackathon Finale (0 - 45,000 pts)
- **Real Member Sums:**
  - Click "Sync Points from Members" to enforce: Team_Points = Σ(Member_Points).

### 4. Certificates Issuance SOP
- **Single Issuance:** Select learner, pick category (Winner, Runner-up, Excellence, Participation), and issue.
- **Bulk Issuance Engine:** Issues all pending certificates in one click according to current leaderboard ranks.
- **Verification:** Each certificate includes a unique SHA-256 hash and QR code.

### 5. Mathematical Integrity & Real Numbers
- Monotonic descending rankings with zero gaps.
- The "Real Numbers Audit" tab verifies exact math equality between squad totals and member point sums.

### 6. Jury Rubric Evaluation (100 Points)
1. Architecture & Design Patterns (25 pts)
2. Code Quality & DSA Optimization (20 pts)
3. Live Working Demonstration (20 pts)
4. Innovation & Technical Feasibility (15 pts)
5. Presentation & Defense (10 pts)
6. Daily Reflections & Continuous Work (10 pts)

### 7. Support & Leadership
- Lead Trainer & Program Architect: Kapil Narula
- Institution: Sapthgiri NPS University, Bengaluru
`;
