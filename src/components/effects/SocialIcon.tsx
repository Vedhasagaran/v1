'use client';

import React from 'react';

interface SocialIconProps {
  href: string;
  children: React.ReactNode;
  title: string;
  brandColor?: string;
  colorMode?: 'brand' | 'accent';
}

export default function SocialIcon({
  href,
  children,
  title,
  brandColor,
  colorMode = 'brand',
}: Readonly<SocialIconProps>) {
  const hoverColor = colorMode === 'brand' && brandColor ? brandColor : 'var(--accent-color)';

  const customStyles = {
    '--hover-color': hoverColor,
  } as React.CSSProperties;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden w-10 h-10 rounded-full border border-border hover:border-[var(--hover-color)] flex items-center justify-center bg-card transition-all duration-700 hover:scale-105 group select-none"
      style={customStyles}
      title={title}
    >
      <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-[var(--hover-color)] transition-transform duration-700 ease-in-out z-0" />
      <span className="relative z-10 flex items-center justify-center text-muted-foreground group-hover:text-white transition-all duration-700 ease-in-out group-hover:[transform:rotateY(360deg)]">
        {children}
      </span>
    </a>
  );
}
