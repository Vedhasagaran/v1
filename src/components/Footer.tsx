'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Vedhasagaran Mahalingam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
