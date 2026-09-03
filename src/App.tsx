/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, CertificateRecord, Team, Participant, ChampionshipSettings } from './types';
import { 
  TEAMS_DATA, 
  PARTICIPANTS_DATA, 
  INITIAL_CERTIFICATES, 
  INITIAL_SETTINGS, 
  AWARDS_DATA, 
  BADGES_DATA, 
  RUBRIC_CRITERIA 
} from './data/championshipData';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingHero } from './components/landing/LandingHero';
import { CertificatesDirectory } from './components/certificate/CertificatesDirectory';
import { LiveLeaderboard } from './components/leaderboard/LiveLeaderboard';
import { TeamsDirectory } from './components/teams/TeamsDirectory';
import { HallOfFame } from './components/halloffame/HallOfFame';
import { VerificationPortal } from './components/verification/VerificationPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { BulkIssuanceModal } from './components/certificate/BulkIssuanceModal';
import { ParticipantModal } from './components/participant/ParticipantModal';

export default function App() {
  // Global Application State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [currentRole, setCurrentRole] = useState<UserRole>('participant');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Entities State
  const [teams, setTeams] = useState<Team[]>(TEAMS_DATA);
  const [participants, setParticipants] = useState<Participant[]>(PARTICIPANTS_DATA);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);
  const [settings, setSettings] = useState<ChampionshipSettings>(INITIAL_SETTINGS);

  // Active Modals State
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateRecord | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [bulkModalOpen, setBulkModalOpen] = useState<boolean>(false);
  const [verificationInitialCert, setVerificationInitialCert] = useState<string>('');

  // Handle URL query parameters for direct verification links (e.g. ?verify=SNPS-JDSA26-W-001)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verifyParam = params.get('verify');
    if (verifyParam) {
      setVerificationInitialCert(verifyParam);
      setActiveTab('verify');
    }
  }, []);

  // Admin login handler (KAPILADMIN / ADMIN123)
  const handleAdminLogin = (id: string, pass: string): boolean => {
    const cleanId = id.trim().toUpperCase();
    const cleanPass = pass.trim().toUpperCase();
    if (cleanId === 'KAPILADMIN' && cleanPass === 'ADMIN123') {
      setIsAdminLoggedIn(true);
      setCurrentRole('admin');
      setActiveTab('admin');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentRole('participant');
    setActiveTab('overview');
  };

  const handleAdminNavClick = () => {
    setActiveTab('admin');
  };

  const handleVerifyFromCert = (certNo: string) => {
    setVerificationInitialCert(certNo);
    setActiveTab('verify');
  };

  const handleBulkIssue = (newCerts: CertificateRecord[]) => {
    setCertificates((prev) => [...newCerts, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={(role) => {
          setCurrentRole(role);
          if (role === 'admin') {
            setIsAdminLoggedIn(true);
          }
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminClick={handleAdminNavClick}
      />

      {/* Main App Body */}
      <main className="flex-1 w-full">
        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto px-4">
            <LandingHero
              settings={settings}
              teams={teams}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenBulkModal={() => setBulkModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'certificates' && (
          <CertificatesDirectory
            certificates={certificates}
            teams={teams}
            onViewCertificate={(cert) => setSelectedCertificate(cert)}
            onOpenBulkModal={() => setBulkModalOpen(true)}
          />
        )}

        {activeTab === 'teams' && (
          <TeamsDirectory
            teams={teams}
            participants={participants}
            certificates={certificates}
            onViewCertificate={(cert) => setSelectedCertificate(cert)}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LiveLeaderboard
            teams={teams}
            participants={participants}
            onSelectTeam={(team) => {
              setActiveTab('teams');
            }}
            onSelectParticipant={(p) => setSelectedParticipant(p)}
          />
        )}

        {activeTab === 'halloffame' && (
          <HallOfFame
            awards={AWARDS_DATA}
            teams={teams}
            participants={participants}
            onSelectTeam={() => setActiveTab('teams')}
            onSelectParticipant={(p) => setSelectedParticipant(p)}
          />
        )}

        {activeTab === 'verify' && (
          <VerificationPortal
            certificates={certificates}
            initialCertNo={verificationInitialCert}
            onViewCertificate={(cert) => setSelectedCertificate(cert)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            isAdminLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            teams={teams}
            setTeams={setTeams}
            participants={participants}
            setParticipants={setParticipants}
            certificates={certificates}
            setCertificates={setCertificates}
            settings={settings}
            setSettings={setSettings}
            rubricCriteria={RUBRIC_CRITERIA}
            awards={AWARDS_DATA}
            onOpenBulkModal={() => setBulkModalOpen(true)}
            onViewCertificate={(cert) => setSelectedCertificate(cert)}
          />
        )}
      </main>

      {/* Certificate High-Res / Action Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        onVerify={handleVerifyFromCert}
      />

      {/* Bulk Issuance Engine Modal */}
      <BulkIssuanceModal
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        teams={teams}
        participants={participants}
        settings={settings}
        onBulkIssue={handleBulkIssue}
      />

      {/* Student Participant Dossier & Digital ID Card Modal */}
      <ParticipantModal
        participant={selectedParticipant}
        onClose={() => setSelectedParticipant(null)}
        certificates={certificates}
        allBadges={BADGES_DATA}
        onViewCertificate={(cert) => {
          setSelectedParticipant(null);
          setSelectedCertificate(cert);
        }}
      />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
