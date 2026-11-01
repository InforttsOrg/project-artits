import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Unlock,
  FileText,
  Download,
  AlertCircle,
  Building,
  Calendar,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Phone,
  X,
  Send,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { trackVisitorEvent } from '../utils/visitorTracker';

export const HrVerificationView: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  
  // OTP Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterOrg, setRecruiterOrg] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterLinkedin, setRecruiterLinkedin] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [challengeToken, setChallengeToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Check saved authorized session token on mount (24h validity)
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('artits_bgv_session');
      if (savedToken) {
        const decoded = JSON.parse(atob(savedToken));
        if (decoded.expiresAt && Date.now() < decoded.expiresAt) {
          setIsUnlocked(true);
          setVerifiedEmail(decoded.email || 'Verified Recruiter');
        } else {
          localStorage.removeItem('artits_bgv_session');
        }
      }
    } catch {
      localStorage.removeItem('artits_bgv_session');
    }
  }, []);

  // Cooldown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleOpenModal = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setOtpStep('request');
    setIsOtpModalOpen(true);
    trackVisitorEvent('bgv_unmask_requested', {
      source: 'hr_verification_view'
    });
  };

  const handleCloseModal = () => {
    setIsOtpModalOpen(false);
    setErrorMsg('');
  };

  useEffect(() => {
    if (!isOtpModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOtpModalOpen]);

  const handleLockSession = () => {
    localStorage.removeItem('artits_bgv_session');
    setIsUnlocked(false);
    setVerifiedEmail('');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = recruiterEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid official work email address.');
      return;
    }

    setIsLoading(true);
    try {
      const resp = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          name: recruiterName.trim(),
          company: recruiterOrg.trim(),
          linkedin: recruiterLinkedin.trim()
        })
      });

      const data = await resp.json();
      if (!resp.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch verification code.');
      }

      setChallengeToken(data.challengeToken);
      setSuccessMsg(`Verification request received for ${cleanEmail}. Telemetry dispatched directly to Sahil.`);
      setOtpStep('verify');
      setResendCooldown(60);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending verification request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanOtp = otpCode.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      setErrorMsg('Please enter your 4-digit or 6-digit access code.');
      return;
    }

    setIsLoading(true);
    try {
      const resp = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: recruiterEmail.trim().toLowerCase(),
          otp: cleanOtp,
          challengeToken
        })
      });

      const data = await resp.json();
      if (!resp.ok || !data.success) {
        throw new Error(data.error || 'Verification failed. Code may be incorrect or expired.');
      }

      // Save authorized session token
      localStorage.setItem('artits_bgv_session', data.sessionToken);
      setIsUnlocked(true);
      setVerifiedEmail(data.email);
      setIsOtpModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid code. Please re-check your inbox and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const compensationRecords = [
    {
      company: 'Gym Wise India Private Limited',
      role: 'Solution Architect / Lead Full Stack Engineer',
      type: 'Full-Time Corporate Employment',
      period: 'Jul 2024 – Nov 2025',
      model: 'Full-Time Corporate Employment',
      payoutType: 'Monthly Corporate NEFT / IMPS Credits',
      pfStatus: 'Standard Corporate Remuneration on Record',
      bankVerifiedUnlocked: '17 credits verified (₹10,37,447 total in Kotak 5945XXXX866)',
      bankVerifiedMasked: '17 credits verified (₹••,••,••• in Kotak 5945XXXX866)',
      amountUnlocked: '₹10,37,447',
      amountMasked: '₹••,••,•••',
      taxTreatment: 'Standard Corporate Remuneration',
      documentsAvailable: ['Relieving Letter', 'Experience Letter', 'Verified Bank Statement Extract']
    },
    {
      company: 'BigHit Pvt Ltd',
      role: 'Full Stack Engineer',
      type: 'Full-Time Corporate Employment',
      period: 'Nov 2022 – Mar 2024',
      model: 'Full-Time Corporate Employment',
      payoutType: 'Monthly Corporate CMS Payroll Deposits',
      pfStatus: 'Standard Corporate Remuneration on Record',
      bankVerifiedUnlocked: '15 consecutive CMS credits (₹8,38,623 total in Kotak 5945XXXX866)',
      bankVerifiedMasked: '15 consecutive CMS credits (₹••,••,••• in Kotak 5945XXXX866)',
      amountUnlocked: '₹8,38,623',
      amountMasked: '₹••,••,•••',
      taxTreatment: 'Standard Corporate Remuneration',
      documentsAvailable: ['Appointment Letter', 'Relieving Documentation', 'Verified Bank Statement Extract']
    },
    {
      company: 'Gamix Labs Private Limited',
      role: 'Game & Web Software Engineer',
      type: 'Full-Time Corporate Employment',
      period: 'Apr 2022 – Sep 2022',
      model: 'Full-Time Corporate Employment',
      payoutType: 'Monthly Corporate NEFT Salary Credits',
      pfStatus: 'Standard Corporate Remuneration on Record',
      bankVerifiedUnlocked: '6 consecutive NEFT credits (₹1,75,100 total in Kotak 5945XXXX866)',
      bankVerifiedMasked: '6 consecutive NEFT credits (₹••,••,••• in Kotak 5945XXXX866)',
      amountUnlocked: '₹1,75,100',
      amountMasked: '₹••,••,•••',
      taxTreatment: 'Standard Corporate Remuneration',
      documentsAvailable: ['Experience Letter', 'Relieving Letter', 'Verified Bank Statement Extract']
    },
    {
      company: 'NaiBooking',
      role: 'Principal Architect & Technical Lead',
      type: 'Freelance & Startup Retainership',
      period: 'Aug 2024 – Present',
      model: 'Early-Stage Startup Framework (Exempt under EPF Act, 1952 § 1(3))',
      payoutType: 'Direct Bank Remuneration (NEFT / IMPS)',
      pfStatus: 'Statutorily Exempt (< 20 workforce count)',
      bankVerifiedUnlocked: 'Direct client retainer disbursements',
      bankVerifiedMasked: 'Direct client retainer disbursements',
      amountUnlocked: 'Direct Retainer',
      amountMasked: 'Direct Retainer',
      taxTreatment: 'Direct Remuneration / Sec 194J TDS where applicable',
      documentsAvailable: ['Appointment Retainer', 'Verified Monthly Bank Credits', 'Direct Invoices']
    },
    {
      company: 'Orealfit',
      role: 'Lead Software Engineer (Contractual)',
      type: 'Freelance & Contractual System Architecture',
      period: 'May 2024 – Jul 2024',
      model: 'Contractual Professional Retainer',
      payoutType: 'Direct Account Credit',
      pfStatus: 'Contractual Engagement (No PF Line-item)',
      bankVerifiedUnlocked: 'Direct contract milestone transfers',
      bankVerifiedMasked: 'Direct contract milestone transfers',
      amountUnlocked: 'Contract Retainer',
      amountMasked: 'Contract Retainer',
      taxTreatment: 'Professional Fees (Sec 194J TDS)',
      documentsAvailable: ['Contract Agreement', 'Project Invoices', 'Bank Statements']
    }
  ];

  return (
    <div className="w-full min-h-full bg-[#050508] text-zinc-100 font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col gap-10">
        
        {/* Navigation Breadcrumb & Recruiter Session Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            {isUnlocked ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Recruiter: {verifiedEmail}</span>
                </span>
                <button
                  onClick={handleLockSession}
                  className="text-[11px] text-zinc-500 hover:text-zinc-300 underline transition-colors cursor-pointer"
                  title="Lock remuneration ledger"
                >
                  Lock
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-amber-300/90 font-medium">
                  Remuneration Masked (Public Privacy)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sahil Rathee
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                BGV Gateway
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              Senior Software Engineer & AI Architect • Gurgaon, Haryana, India
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
              <a href="mailto:sahil.artits.rathee@gmail.com" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                sahil.artits.rathee@gmail.com
              </a>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                +91 96252 13480
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-zinc-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>1-Page Resume (PDF)</span>
            </a>
            <a
              href="/Sahil-Rathee-Resume-Full.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Full Detailed CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* SECURITY & UNMASK CALLOUT BANNER (WHEN LOCKED) */}
        {!isUnlocked && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-zinc-900/60 to-emerald-950/30 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Compensation & Banking Ledger is Masked</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                    OTP Required
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl font-sans">
                  To protect compensation confidentiality while guaranteeing 100% transparency for genuine employers, enter your official recruiter or company work email. A 6-digit one-time code will be dispatched to unmask all banking credits and payroll sums for 24 hours.
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 shrink-0 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Verify Work Email via OTP</span>
            </button>
          </div>
        )}

        {/* CRITICAL STATUTORY DECLARATION: NO PF DEDUCTION */}
        <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Statutory Declaration: Provident Fund (EPF) Exemption & Remuneration Structure
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-3 font-sans">
            <p>
              <strong>To Human Resources, Talent Acquisition & BGV Teams:</strong>
            </p>
            <p>
              This official clarification confirms that candidate compensation for recent high-impact engagements (including <strong>NaiBooking</strong> and <strong>Orealfit</strong>) operates under <strong>Direct Professional Software Engineering Retainership</strong> and <strong>Early-Stage Startup Frameworks</strong> that are statutorily exempt from Employees' Provident Fund (EPF) registration.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>
                <strong className="text-zinc-200">Statutory EPFO Exemption:</strong> Under <em>Section 1(3) of the Employees' Provident Funds and Miscellaneous Provisions Act, 1952</em>, organizations with fewer than 20 personnel are not statutorily mandated to maintain EPF/UAN registrations.
              </li>
              <li>
                <strong className="text-zinc-200">Direct Banking Credits:</strong> 100% of candidate compensation is disbursed directly into candidate bank accounts via automated electronic transfers (RTGS / NEFT / IMPS) against contractual deliverables and monthly professional retainers.
              </li>
              <li>
                <strong className="text-zinc-200">Tax Compliance:</strong> Engagements are treated as Gross Professional Remuneration (subject to Section 194J TDS where applicable), without statutory PF/ESI line-item deductions on pay slips.
              </li>
              <li>
                <strong className="text-zinc-200">Conclusive Proof:</strong> Verified monthly bank credit entries, client retainership agreements, and appointment letters serve as complete, legally binding proof of continuous engagement and remuneration.
              </li>
            </ul>
          </div>
        </div>

        {/* BANK SALARY CREDITS AUDIT SUMMARY */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-emerald-500/30 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Verified Bank Statement Salary Ledger (Kotak Mahindra Bank)
                </h3>
                <p className="text-xs text-zinc-400">
                  Account 5945XXXX866 • IFSC KKBK0004359 • CRN 459755520
                </p>
              </div>
            </div>

            {isUnlocked ? (
              <a
                href="/Sahil-Rathee-Salary-Credits-Masked.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Masked Statement (PDF)</span>
              </a>
            ) : (
              <button
                onClick={handleOpenModal}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Unlock Statement (OTP Required)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <span className="text-zinc-500 text-[11px] block">GymWise India Pvt Ltd</span>
              <span className="text-emerald-400 font-bold text-sm">
                {isUnlocked ? '₹10,37,447' : '₹••,••,•••'}
              </span>
              <span className="text-zinc-400 text-[11px] block mt-0.5">
                {isUnlocked ? '17 Verified Credits (2024-2025)' : '17 Credits • Recruiter Locked'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <span className="text-zinc-500 text-[11px] block">BigHit Pvt Ltd</span>
              <span className="text-emerald-400 font-bold text-sm">
                {isUnlocked ? '₹8,38,623' : '₹••,••,•••'}
              </span>
              <span className="text-zinc-400 text-[11px] block mt-0.5">
                {isUnlocked ? '15 Consecutive CMS Credits (2022-2024)' : '15 Credits • Recruiter Locked'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <span className="text-zinc-500 text-[11px] block">Gamix Labs Pvt Ltd</span>
              <span className="text-emerald-400 font-bold text-sm">
                {isUnlocked ? '₹1,75,100' : '₹••,••,•••'}
              </span>
              <span className="text-zinc-400 text-[11px] block mt-0.5">
                {isUnlocked ? '6 Consecutive NEFT Credits (2022)' : '6 Credits • Recruiter Locked'}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/80">
            <strong className="text-zinc-200">Total Authenticated Payroll:</strong>{' '}
            {isUnlocked ? (
              <span className="text-emerald-400 font-bold">₹20,51,170.29</span>
            ) : (
              <span className="text-zinc-400 font-mono">₹••,••,••• (Recruiter Locked)</span>
            )}{' '}
            across 38 monthly bank deposits. Account number, recipient name (Sahil Rathee), transaction reference IDs, and IFSC are verified and certified for background check (BGV) clearance.
          </div>
        </div>

        {/* Compensation & Employment Ledger */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" />
              Verified Employment & Compensation Ledger
            </h3>
            <span className="text-[11px] text-zinc-500">Cross-verified against banking statements</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {compensationRecords.map((rec, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{rec.company}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${rec.type.includes('Full-Time') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400">{rec.role}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {rec.period}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-zinc-500 block">Engagement Model:</span>
                    <span className="text-zinc-300 font-medium">{rec.model}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Payout Mechanism:</span>
                    <span className="text-zinc-300 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {rec.payoutType}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">PF Deduction Status:</span>
                    <span className="text-amber-400/90 font-medium">{rec.pfStatus}</span>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <span className="text-zinc-500 block">Banking Statement Verification:</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {isUnlocked ? rec.bankVerifiedUnlocked : rec.bankVerifiedMasked}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/40 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-zinc-500">Available Proofs:</span>
                  {rec.documentsAvailable.map((doc, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 rounded text-[11px] bg-zinc-800/60 border border-zinc-700/50 text-zinc-300"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Vault */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            Verified Document Repository
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-white">1-Page Executive Resume</span>
                <span className="text-[11px] text-zinc-400">Strict single-page summary with core achievements</span>
              </div>
              <a
                href="/Sahil-Rathee-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-center font-medium text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download 1-Page PDF</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-white">Full Comprehensive CV</span>
                <span className="text-[11px] text-zinc-400">Detailed multi-page technical experience & systems architecture</span>
              </div>
              <a
                href="/Sahil-Rathee-Resume-Full.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full CV PDF</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Bank Salary Credits Extract</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Verified</span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  {isUnlocked
                    ? 'Masked Kotak statements proving 38 consecutive monthly salary credits (₹20.51L total)'
                    : 'Masked Kotak statements proving 38 consecutive monthly salary credits (Recruiter Locked)'}
                </span>
              </div>
              {isUnlocked ? (
                <a
                  href="/Sahil-Rathee-Salary-Credits-Masked.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Masked Extract (PDF)</span>
                </a>
              ) : (
                <button
                  onClick={handleOpenModal}
                  className="w-full py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-zinc-300 text-xs text-center font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify Email to Download</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-white">Appointment & Experience Letters</span>
                <span className="text-[11px] text-zinc-400">Consolidated documentation from corporate & contractual partners</span>
              </div>
              <div className="py-2 px-3 rounded-lg bg-zinc-800/40 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Available on BGV Request</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* BGV / HR FAQ */}
        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex flex-col gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            Frequently Asked Questions for Verification Teams
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 font-sans">
            <div>
              <h4 className="font-semibold text-white">Q: How can we authenticate past CTC without an EPFO UAN passbook?</h4>
              <p className="text-zinc-400 text-xs mt-1">
                A: Candidate provides verified bank account statements demonstrating monthly salary deposits directly corresponding to agreed gross retainer amounts, alongside formal contractual agreements and client invoices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Q: Is candidate immediately available to join?</h4>
              <p className="text-zinc-400 text-xs mt-1">
                A: Yes. Notice period is <strong>Immediate (0 Days)</strong> with zero contractual encumbrances or ongoing non-compete liabilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Q: How can our verification agency perform reference checks?</h4>
              <p className="text-zinc-400 text-xs mt-1">
                A: Please email <code className="text-emerald-400">sahil.artits.rathee@gmail.com</code> with your official agency letterhead or form for immediate formal response.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* RECRUITER EMAIL OTP VERIFICATION MODAL */}
      {isOtpModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans cursor-pointer"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl text-zinc-100 flex flex-col gap-5 overflow-hidden cursor-default"
          >
            
            {/* Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Recruiter Email Verification
                  </h3>
                  <p className="text-xs text-zinc-400">One-Time Code (OTP) Access Gate</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ERROR / SUCCESS ALERTS */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* STEP 1: REQUEST OTP */}
            {otpStep === 'request' && (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-300 font-medium">
                    Official Work / Corporate Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. recruiter@company.com"
                    value={recruiterEmail}
                    onChange={(e) => setRecruiterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                  />
                  <span className="text-[11px] text-zinc-500">
                    A 6-digit verification code will be sent to confirm email ownership.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-300 font-medium">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Deepika Sharma"
                      value={recruiterName}
                      onChange={(e) => setRecruiterName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-300 font-medium">Company / Agency</label>
                    <input
                      type="text"
                      placeholder="e.g. Tekskills, EXL"
                      value={recruiterOrg}
                      onChange={(e) => setRecruiterOrg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-300 font-medium">LinkedIn Profile URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    value={recruiterLinkedin}
                    onChange={(e) => setRecruiterLinkedin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/30 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Logging Verification Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Recruiter Access</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: VERIFY OTP / ACCESS PASSCODE */}
            {otpStep === 'verify' && (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Request Dispatched for:</span>
                    <span className="text-emerald-400 font-bold">{recruiterEmail}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    Your verification request has been directly logged with Sahil on Telegram. If you have been provided with an Access Passcode, enter it below to unmask immediately.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-300 font-medium text-center">
                    Enter Verification Code or Access Passcode
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="Enter Passcode or Code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.trim())}
                    className="w-full text-center tracking-[0.25em] text-xl font-bold py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-emerald-400 focus:outline-none focus:border-emerald-400 transition-colors font-mono"
                  />
                  <span className="text-[11px] text-center text-zinc-500 font-sans">
                    Enter the access passcode provided by Sahil or the 6-digit code from your briefing.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otpCode.length < 4}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 text-black font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Passcode...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Verify Passcode &amp; Unmask Dossier</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-800/80">
                  <button
                    type="button"
                    onClick={() => setOtpStep('request')}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    &larr; Edit Details
                  </button>

                  <a
                    href="https://linkedin.com/in/rttss-sahil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Connect on LinkedIn &nearr;
                  </a>
                </div>
              </form>
            )}

            <div className="pt-2 border-t border-zinc-800/60 text-center">
              <span className="text-[11px] text-zinc-500 font-mono">
                Candidate: Sahil Rathee • Senior Software Engineer & AI Architect
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default HrVerificationView;
