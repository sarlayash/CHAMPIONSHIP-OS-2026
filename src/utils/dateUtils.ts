/**
 * System Real Date Utilities for ChampionshipOS Credentials
 * Provides real, automatic system date formatting for certificate issuance and verification.
 */

export const getSystemRealFormattedDate = (): string => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  } catch {
    const d = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
};

export const getSystemISODate = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Resolves the certificate issue date, defaulting automatically to the current real system date
 * if the date is missing, empty, or unassigned.
 */
export const resolveCertificateDate = (dateString?: string): string => {
  if (!dateString || dateString.trim() === '' || dateString === 'Pending') {
    return getSystemRealFormattedDate();
  }
  return dateString;
};
