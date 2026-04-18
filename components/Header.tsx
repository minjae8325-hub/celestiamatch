import Link from 'next/link';
import { SITE } from '@/lib/site';

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-night-950/70 border-b border-mist-500/10">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:animate-float-slow">✦</span>
          <span className="font-display text-xl tracking-wide">
            <span className="text-mist-100">Celestia</span>
            <span className="gradient-text-gold">Match</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-mist-200">
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <Link href="/quiz" className="hover:text-gold-400 transition-colors">Free Reading</Link>
          <Link href="/blog" className="hover:text-gold-400 transition-colors">Journal</Link>
        </nav>
        <Link
          href="/quiz"
          className="text-sm px-4 py-2 rounded-full bg-gradient-gold text-night-950 font-semibold shadow-glow hover:scale-[1.03] transition"
        >
          Start free →
        </Link>
      </div>
    </header>
  );
}
