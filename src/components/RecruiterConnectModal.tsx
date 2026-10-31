import React, { useState } from 'react';
import { X, Send, Linkedin, Building, User, CheckCircle2 } from 'lucide-react';
import { submitRecruiterIntroduction } from '../utils/visitorTracker';

interface RecruiterConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterConnectModal: React.FC<RecruiterConnectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;

    setIsSubmitting(true);
    await submitRecruiterIntroduction({
      recruiterName: name.trim(),
      recruiterOrg: company.trim(),
      linkedinUrl: linkedinUrl.trim(),
      notes: note.trim()
    });
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-zinc-100 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Recruiter & Lead Introduction</h3>
              <p className="text-xs text-zinc-400">Directly connect your LinkedIn profile with Sahil</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Introduction Dispatched</h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              Thank you! Sahil has received your profile details and will connect promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                <span>Your Name</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Deepika Arora"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-zinc-500" />
                <span>Company / Client Organization</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SingleInterface / SolutionTech"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-zinc-500" />
                <span>LinkedIn Profile URL (Optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Short Note / Role Context (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Reviewing profile for Full Stack MEAN & Agentic AI role"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Notify Sahil on Telegram'}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
                <span>Or direct message:</span>
                <a
                  href="https://linkedin.com/in/rttss-sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  linkedin.com/in/rttss-sahil
                </a>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
