'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Trophy, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  KeyRound,
  Sparkles
} from 'lucide-react';
import { LAB_CHALLENGES, Challenge } from '@/lib/challenges';
import { TactileButton } from '@/components/TactileButton';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function DedicatedLabArena() {
  const params = useParams();
  const challengeId = params?.id as string;
  const challenge: Challenge = LAB_CHALLENGES.find((c) => c.id === challengeId) || LAB_CHALLENGES[0];

  const [showObjective, setShowObjective] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: `${challenge.name} agent initialized. Terminal ready.` }
  ]);
  const [input, setInput] = useState('');
  const [flag, setFlag] = useState('');
  const [flagStatus, setFlagStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg: string }>({ type: 'idle', msg: '' });
  const [toast, setToast] = useState<string | null>(null);

  const markSolved = () => {
    const saved = localStorage.getItem('break_ai_solved');
    const map = saved ? JSON.parse(saved) : {};
    if (!map[challenge.id]) {
      map[challenge.id] = true;
      localStorage.setItem('break_ai_solved', JSON.stringify(map));
      setToast(`🎉 Challenge Completed: ${challenge.name}!`);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: challenge.id, message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);

      if (data.response.includes('FLAG{')) {
        markSolved();
      }
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', text: '[System Error] Terminal API unreachable.' }]);
    }
  };

  const handleVerifyFlag = async () => {
    if (!flag.trim()) return;

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: challenge.id, flag }),
      });
      const data = await res.json();

      if (res.ok) {
        setFlagStatus({ type: 'success', msg: data.message });
        markSolved();
      } else {
        setFlagStatus({ type: 'error', msg: data.detail });
      }
    } catch {
      setFlagStatus({ type: 'error', msg: 'Verification server unreachable.' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans relative overflow-hidden transition-colors duration-250">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--orb-1)] rounded-full blur-[160px] pointer-events-none"></div>

      {/* Notification */}
      {toast && (
        <div className="fixed top-5 right-5 glass-card text-[var(--accent-orange)] font-bold font-mono px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-[var(--accent-orange)]/50 animate-bounce">
          <Sparkles className="w-5 h-5 text-[var(--accent-orange)]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="glass-panel sticky top-0 z-40 border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/challenges" className="p-2 glass-button-secondary rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)]">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-mono font-bold text-[var(--text-main)] flex items-center gap-2">
              {challenge.name}
              <span className="text-[10px] bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border border-[var(--accent-orange)]/30 px-2 py-0.5 rounded-md">
                {challenge.category}
              </span>
            </h1>
          </div>
        </div>

        <button
          onClick={() => setShowObjective(!showObjective)}
          className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 text-[var(--accent-orange)]"
        >
          <Trophy className="w-4 h-4" />
          <span>{showObjective ? 'Hide Objective' : 'View Objective & Submit Flag'}</span>
          {showObjective ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </header>

      {/* Objective Panel */}
      {showObjective && (
        <div className="glass-panel border-b border-[var(--border-color)] p-6 z-30">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4 rounded-xl border border-[var(--border-color)]">
              <h3 className="text-xs font-mono font-bold text-[var(--accent-orange)] uppercase mb-2">Objective</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{challenge.description}</p>
            </div>

            <div className="glass-card p-4 rounded-xl border border-[var(--border-color)] flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono font-bold text-[var(--text-main)] uppercase mb-2 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[var(--accent-orange)]" />
                  <span>Flag Verification</span>
                </h3>
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="FLAG{...}"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs font-mono focus:outline-none mb-3"
                />
                <TactileButton onClick={handleVerifyFlag} className="w-full">
                  VERIFY FLAG
                </TactileButton>
              </div>

              {flagStatus.type !== 'idle' && (
                <div className={`mt-3 p-2 rounded-xl text-xs font-mono flex items-center gap-2 ${
                  flagStatus.type === 'success' ? 'bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border border-[var(--accent-orange)]/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}>
                  {flagStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{flagStatus.msg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Focus Terminal */}
      <main className="flex-1 flex flex-col justify-between max-w-5xl w-full mx-auto p-4 md:p-6 z-10">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[80%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                m.sender === 'user' ? 'bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] border border-[var(--accent-orange)]/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl leading-relaxed text-xs font-mono ${
                  m.sender === 'user'
                    ? 'glass-card border-[var(--accent-orange)]/40 text-[var(--text-main)]'
                    : 'glass-panel border-[var(--border-color)] text-[var(--text-muted)]'
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono">{m.text}</pre>
              </div>
            </div>
          ))}
        </div>

        {/* Input Dock */}
        <div className="glass-panel rounded-2xl p-3 flex gap-3 shadow-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type payload..."
            className="flex-1 glass-input rounded-xl px-4 py-3 text-xs font-mono focus:outline-none"
          />
          <TactileButton onClick={handleSend}>
            EXECUTE <Send className="w-4 h-4" />
          </TactileButton>
        </div>
      </main>
    </div>
  );
}