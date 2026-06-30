"use client";

import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export function ExpandableText({ text, maxLength = 130, className }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  const cutIndex = text.lastIndexOf(' ', maxLength);
  const safeCut = cutIndex > 0 ? cutIndex : maxLength;
  const excerpt = text.substring(0, safeCut);

  return (
    <p className={className}>
      {isExpanded ? text : `${excerpt}...`}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'none',
          border: 'none',
          color: '#c99d4a',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '0 0 0 4px',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          display: 'inline'
        }}
      >
        {isExpanded ? 'Mostrar menos' : 'Ler mais'}
      </button>
    </p>
  );
}
