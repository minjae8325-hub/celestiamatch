import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdSlot } from '@/components/AdSlot';
import { BLOG_POSTS, getPostBySlug, getAllPosts } from '@/lib/blogPosts';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const others = getAllPosts().filter(p => p.slug !== post.slug).slice(0, 2);

  // very small markdown-ish renderer (we ship content as plain text with ## / - / **).
  const blocks = post.body.trim().split(/\n\n+/);

  return (
    <article className="px-5 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-xs text-mist-400 hover:text-gold-400 uppercase tracking-widest">
          ← Back to journal
        </Link>

        <header className="mt-6 mb-10 text-center">
          <div className="text-5xl text-gold-400">{post.heroEmoji}</div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-mist-400 uppercase tracking-widest">
            <span>{post.category}</span><span>·</span><span>{post.readTime}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-5xl text-mist-100 leading-tight">{post.title}</h1>
          <p className="mt-4 text-mist-300 max-w-xl mx-auto">{post.description}</p>
          <div className="mt-3 text-xs text-mist-500">{formatDate(post.publishedAt)}</div>
        </header>

        <div className="prose-mystic">
          {blocks.map((block, i) => (
            <RenderBlock key={i} text={block} index={i} />
          ))}
        </div>

        <div className="my-10"><AdSlot slotKey="blogInline" /></div>

        {/* CTA */}
        <div className="card-mystic text-center mt-12">
          <h3 className="font-display text-2xl">Curious what the stars say about you?</h3>
          <p className="mt-2 text-mist-300">
            Get a free, personalized compatibility reading — it takes about a minute.
          </p>
          <Link href="/quiz" className="btn-gold mt-5 inline-block">Start free reading →</Link>
        </div>

        {/* More posts */}
        <div className="mt-14">
          <div className="tag mb-4">Keep reading</div>
          <div className="grid gap-4 md:grid-cols-2">
            {others.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card-mystic block hover:shadow-glow transition">
                <div className="text-gold-400 text-2xl">{p.heroEmoji}</div>
                <div className="mt-2 font-display text-lg">{p.title}</div>
                <div className="mt-1 text-sm text-mist-300">{p.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            author: { '@type': 'Organization', name: 'CelestiaMatch' },
          }),
        }}
      />
    </article>
  );
}

function RenderBlock({ text, index }: { text: string; index: number }) {
  const t = text.trim();
  if (t.startsWith('## ')) return <h2>{t.slice(3)}</h2>;
  if (t.startsWith('### ')) return <h3>{t.slice(4)}</h3>;
  if (t.startsWith('- ')) {
    const items = t.split('\n').filter(Boolean).map(l => l.replace(/^- /, ''));
    return <ul>{items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inlineFmt(li) }} />)}</ul>;
  }
  // include an inline ad after every 3 paragraphs
  const paragraph = <p dangerouslySetInnerHTML={{ __html: inlineFmt(t) }} />;
  if (index > 0 && index % 4 === 0) {
    return (
      <>
        <div className="my-8"><AdSlot slotKey="blogInline" /></div>
        {paragraph}
      </>
    );
  }
  return paragraph;
}

function inlineFmt(s: string) {
  // **bold**
  let out = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
