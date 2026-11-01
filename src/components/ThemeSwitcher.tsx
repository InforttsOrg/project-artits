import React, { useState, useEffect } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

type ThemeMode = 'system' | 'light' | 'dark';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('artits_theme') as ThemeMode;
      if (saved === 'system' || saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'system';
  });

  const applyTheme = (targetTheme: ThemeMode) => {
    try {
      const root = document.documentElement;
      let isDark = false;

      if (targetTheme === 'dark') {
        isDark = true;
      } else if (targetTheme === 'light') {
        isDark = false;
      } else {
        // System preference
        isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      if (isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem('artits_theme', theme);
    } catch {
      // Ignore
    }

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        applyTheme('system');
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  const modes: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    {
      id: 'system',
      label: 'System',
      icon: <Laptop className="w-4 h-4" />
    },
    {
      id: 'light',
      label: 'Light',
      icon: <Sun className="w-4 h-4" />
    },
    {
      id: 'dark',
      label: 'Dark',
      icon: <Moon className="w-4 h-4" />
    }
  ];

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[99999] flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl backdrop-blur-md select-none transition-all hover:border-zinc-700 theme-switcher-container"
      role="group"
      aria-label="Theme Switcher"
    >
      {modes.map((mode) => {
        const isActive = theme === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => setTheme(mode.id)}
            title={`Switch to ${mode.label} Theme`}
            aria-label={`Switch to ${mode.label} Theme`}
            aria-pressed={isActive}
            className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-zinc-800 text-white shadow-sm theme-switcher-active'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 theme-switcher-inactive'
            }`}
          >
            {mode.icon}
          </button>
        );
      })}
    </div>
  );
};
