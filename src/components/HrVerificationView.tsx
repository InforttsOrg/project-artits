import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Unlock,
  FileText,
  Download,
  Copy,
  Check,
  AlertCircle,
  Building,
  Calendar,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';

export const HrVerificationView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-unlock if valid token query param is provided (?token=verified or ?token=hr)
  useEffect(() => {
    const token = searchParams.get('token');
    if (token === 'verified' || token === 'hr' || token === 'tekskills' || token === 'exl') {
      setIsUnlocked(true);
    }
  }, [searchParams]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '2026' || pin.trim().toLowerCase() === 'hr') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Access Code. (Hint: Use 2026)');
    }
  };

  const copyVerificationLink = () => {
    const url = `${window.location.origin}/verify?token=verified`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const compensationRecords = [
    {
      company: 'NaiBooking',
      role: 'Software Engineer',
      period: 'Aug 2026 – Present',
      model: 'Early-Stage Startup Framework (Exempt under EPF Act, 1952 § 1(3))',
      payoutType: 'Direct Bank Remuneration (NEFT / IMPS)',
      pfStatus: 'Statutorily Exempt (< 20 workforce count)',
      taxTreatment: 'Direct Remuneration / Sec 194J TDS where applicable',
      documentsAvailable: ['Appointment Retainer', 'Verified Monthly Bank Credits', 'Direct Invoices']
    },
    {
      company: 'Orealfit',
      role: 'Lead Software Engineer (Contractual)',
      period: 'May 2026 – Jul 2026',
      model: 'Contractual Professional Retainer',
      payoutType: 'Direct Account Credit',
      pfStatus: 'Contractual Engagement (No PF Line-item)',
      taxTreatment: 'Professional Fees (Sec 194J TDS)',
      documentsAvailable: ['Contract Agreement', 'Project Invoices', 'Bank Statements']
    },
    {
      company: 'Gym Wise India Private Limited',
      role: 'Solution Architect',
      period: 'Jul 2024 – Nov 2025',
      model: 'Full-time Corporate Employment',
      payoutType: 'Monthly Corporate Payroll',
      pfStatus: 'Standard Corporate Payroll on Record',
      taxTreatment: 'Standard Corporate Remuneration',
      documentsAvailable: ['Relieving Letter', 'Experience Letter', 'Salary Slips']
    }
  ];

  return (
    <div className="w-full min-h-full bg-[#050508] text-zinc-100 font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col gap-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
              Official HR Verification Gateway
            </span>
          </div>
        </div>

        {/* Access Gate (Locked State) */}
        {!isUnlocked ? (
          <div className="max-w-md mx-auto w-full py-12 flex flex-col gap-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-emerald-400">
              <Lock className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Candidate Employment & Compensation Dossier
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Contains statutory PF exemption memoranda, verified bank credit ledger, and formal documentation for Background Verification (BGV) teams.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Enter HR Access Code"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors flex items-center gap-1.5"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock</span>
                </button>
              </div>
              {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
              <p className="text-[11px] text-zinc-500">
                Authorized Recruiters & BGV Teams: Use default access code <code className="text-zinc-300">2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* Unlocked Full Dossier */
          <div className="flex flex-col gap-10">
            
            {/* Header Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Sahil Rathee
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Dossier
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
                    +91 97171 44437
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={copyVerificationLink}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors flex items-center gap-1.5 border border-zinc-700"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy HR Direct Link'}</span>
                </button>
                <a
                  href="/Sahil-Rathee-Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Master CV</span>
                </a>
              </div>
            </div>

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
                        <h4 className="text-base font-bold text-white">{rec.company}</h4>
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
                    <span className="text-xs font-bold text-white">Full Professional Resume</span>
                    <span className="text-[11px] text-zinc-400">Complete verified technical experience & project history</span>
                  </div>
                  <a
                    href="/Sahil-Rathee-Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-center font-medium text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-white">Bank Salary Credits Extract</span>
                    <span className="text-[11px] text-zinc-400">Redacted statements confirming regular monthly remuneration credits</span>
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-zinc-800/40 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                    <span>Available on BGV Request</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
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
        )}

      </div>
    </div>
  );
};
export default HrVerificationView;
