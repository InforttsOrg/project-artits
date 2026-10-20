import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, FileText, Menu, X, Mail } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-zinc-950/60 backdrop-blur-sm border-b border-zinc-800/40 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-bold text-sm text-zinc-100 group-hover:border-zinc-700 transition-colors">
            SR
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              Sahil Rathee
            </span>
            <span className="text-[11px] text-zinc-400 font-mono tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for roles
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
          <button
            onClick={() => scrollToSection('systems')}
            className="px-3 py-1.5 rounded-md hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors cursor-pointer"
          >
            Systems & Work
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="px-3 py-1.5 rounded-md hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('radar')}
            className="px-3 py-1.5 rounded-md hover:text-zinc-100 hover:bg-zinc-900/60 transition-colors cursor-pointer"
          >
            Technical Stack
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="https://github.com/rttss-sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/rttss-sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/rttss_sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md transition-colors"
            title="X (Twitter)"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="/Sahil-Rathee-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
          <a
            href="mailto:sahil.artits.rathee@gmail.com"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white rounded-lg transition-colors font-sans shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-md"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-3 pb-6 flex flex-col gap-3">
          <button
            onClick={() => scrollToSection('systems')}
            className="text-left py-2 text-zinc-300 hover:text-white font-medium"
          >
            Systems & Work
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="text-left py-2 text-zinc-300 hover:text-white font-medium"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('radar')}
            className="text-left py-2 text-zinc-300 hover:text-white font-medium"
          >
            Technical Stack
          </button>
          <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3">
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 text-xs font-medium text-zinc-200 bg-zinc-900 rounded-lg border border-zinc-800"
            >
              Resume PDF
            </a>
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="flex-1 text-center py-2 text-xs font-medium text-zinc-950 bg-zinc-100 rounded-lg"
            >
              Contact Sahil
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
