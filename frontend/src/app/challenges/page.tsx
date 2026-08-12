'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Trophy, ArrowRight, CheckCircle2, Lock, Star } from 'lucide-react';
import { LAB_CHALLENGES, Challenge } from '@/lib/challenges';
import { TactileButton } from '@/components/TactileButton';

export default function ChallengeMatrix() {
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('break_ai_solved');
    if (saved) {
      try {
        setSolvedMap(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const solvedCount = LAB_CHALLENGES.filter((c) => solvedMap[c.id]).length;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-6 md:p-10 font-sans relative overflow-hidden transition-colors duration-250">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[var(--orb-1)] rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header */}
      <header className="max-w-5xl mx-auto flex justify-between items-center pb-6 border-b border-[var(--border-color)] mb-8 relative z-10">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 bg-[var(--accent-orange)]/10 border border-[var(--accent-orange)]/30 rounded-xl text-[var(--accent-orange)]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono tracking-wider uppercase text-[var(--text-main)]">
              BREAK<span className="text-[var(--accent-orange)]">-AI</span>
            </h1>
            <p className="text-xs text-[var(--text-muted)]">Agent Security Playground</p>
          </div>
        </div>

        <div className="text-xs font-mono glass-card border border-[var(--border-color)] px-4 py-2.5 rounded-xl flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Scoreboard: <strong className="text-[var(--accent-orange)]">{solvedCount} / {LAB_CHALLENGES.length}</strong> Solved</span>
        </div>
      </header>

      {/* Glass Challenge Matrix */}
      <main className="max-w-5xl mx-auto space-y-4 relative z-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Challenge Matrix</h2>

        {LAB_CHALLENGES.map((ch: Challenge, idx: number) => {
          const isSolved = !!solvedMap[ch.id];
          const isLocked = idx > 0 && !solvedMap[LAB_CHALLENGES[idx - 1].id];

          return (
            <div
              key={ch.id}
              className={`glass-panel rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                isSolved
                  ? 'border-[var(--accent-orange)]/50 bg-[var(--accent-orange)]/5'
                  : isLocked
                  ? 'opacity-50'
                  : 'hover:border-[var(--accent-orange)]/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {isSolved ? (
                    <CheckCircle2 className="w-6 h-6 text-[var(--accent-orange)]" />
                  ) : isLocked ? (
                    <Lock className="w-6 h-6 text-[var(--text-muted)]" />
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-mono font-bold">!</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold font-mono text-sm text-[var(--text-main)]">{ch.name}</span>
                    <span className="text-[10px] font-mono glass-card text-[var(--text-muted)] border border-[var(--border-color)] px-2 py-0.5 rounded-md">
                      {ch.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{ch.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                <div className="flex text-amber-500 text-xs">
                  {Array.from({ length: ch.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>

                {!isLocked ? (
                  <Link href={`/challenge/${ch.id}`}>
                    <TactileButton>
                      START LAB <ArrowRight className="w-3.5 h-3.5" />
                    </TactileButton>
                  </Link>
                ) : (
                  <button disabled className="glass-button-secondary text-[var(--text-muted)] font-mono text-xs px-4 py-2.5 rounded-xl cursor-not-allowed">
                    LOCKED
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}