'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, X, Settings, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-[var(--border-color)] shadow-2xl relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
          <div className="flex items-center space-x-2 text-[var(--accent-orange)]">
            <Settings className="w-5 h-5" />
            <h2 className="text-base font-bold font-mono tracking-wider text-[var(--text-main)]">
              SYSTEM SETTINGS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl glass-button-secondary text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-mono font-bold text-[var(--text-muted)] block uppercase tracking-wider">
            Interface Theme
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-mono text-xs ${
                theme === 'dark'
                  ? 'bg-[#030712] border-[var(--accent-orange)] text-[var(--accent-orange)] shadow-[0_0_20px_rgba(249,115,22,0.25)]'
                  : 'glass-card text-[var(--text-muted)] hover:border-white/20'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>Dark Cobalt</span>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-mono text-xs ${
                theme === 'light'
                  ? 'bg-slate-200 border-[var(--accent-orange)] text-[var(--accent-orange)] shadow-[0_0_20px_rgba(249,115,22,0.25)]'
                  : 'glass-card text-[var(--text-muted)] hover:border-white/20'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span>Cyber Ice</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-orange)]" /> break-ai v0.1
          </span>
          <span>Theme Engine Active</span>
        </div>

      </div>
    </div>
  );
}