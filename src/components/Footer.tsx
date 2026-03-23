'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-16 px-6 border-t border-border bg-transparent mt-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          © {currentYear} Vedhasagaran. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
