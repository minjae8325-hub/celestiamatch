import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blogPosts';
import { AdSlot } from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Astrology Journal',
  description:
    'Thoughtful articles on Western astrology, zodiac compatibility, moon signs, transits, and understanding your birth chart.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="px-5 py-14 md:py-20">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <div className="tag mx-auto">The journal</div>
          <h1 className="section-title mt-4">Stories the stars keep telling us.</h1>
          <p className="mt-4 text-mist-300 max-w-xl mx-auto">
            Warm, practical guides to Western astrology — written for people who feel things, not
            just horoscope consumers.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card-mystic group hover:shadow-glow transition-all block">
              <div className="flex items-center gap-3 text-xs text-mist-400 uppercase tracking-widest">
                <span className="text-gold-400 text-2xl">{p.heroEmoji}</span>
                <span>{p.category}</span>
                <span>·</span>
                <span>{p.readTime}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl text-mist-100 group-hover:text-gold-400 transition">
                {p.title}
              </h2>
              <p className="mt-3 text-mist-300 leading-relaxed">{p.description}</p>
              <div className="mt-4 text-xs text-mist-400">{formatDate(p.publishedAt)}</div>
            </Link>
          ))}
        </div>

        <div className="mt-12"><AdSlot slotKey="blogInline" /></div>
      </div>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
