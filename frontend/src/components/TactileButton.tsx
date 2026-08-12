'use client';

import React from 'react';

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function TactileButton({ children, className = '', ...props }: TactileButtonProps) {
  return (
    <button className={`custom-button ${className}`} {...props}>
      <div className="button-outer">
        <div className="button-inner">
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
}