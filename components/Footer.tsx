import Link from 'next/link';
import { SITE } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-mist-500/10 mt-20 bg-night-950/70">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">
            <span className="text-mist-100">Celestia</span>
            <span className="gradient-text-gold">Match</span>
          </div>
          <p className="mt-3 text-sm text-mist-300 max-w-xs leading-relaxed">
            Thoughtful Western astrology readings, delivered in a minute. Always free, always star-powered.
          </p>
        </div>
        <div>
          <div className="text-sm uppercase tracking-widest text-gold-400 mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-mist-200">
            <li><Link href="/" className="hover:text-gold-400">Home</Link></li>
            <li><Link href="/quiz" className="hover:text-gold-400">Free compatibility reading</Link></li>
            <li><Link href="/blog" className="hover:text-gold-400">Astrology journal</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm uppercase tracking-widest text-gold-400 mb-3">About</div>
          <ul className="space-y-2 text-sm text-mist-200">
            <li><Link href="/about" className="hover:text-gold-400">Our approach</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-400">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-gold-400">Terms</Link></li>
          </ul>
          <p className="mt-4 text-xs text-mist-400 leading-relaxed">
            Readings are for entertainment and reflection. Please enjoy responsibly.
          </p>
        </div>
      </div>
      <div className="border-t border-mist-500/10">
        <div className="max-w-6xl mx-auto px-5 py-5 text-xs text-mist-400 flex flex-col md:flex-row justify-between gap-2">
          <div>© {year} {SITE.name}. All starlight reserved.</div>
          <div className="opacity-70">Made with constellations and coffee.</div>
        </div>
      </div>
    </footer>
  );
}
