import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CelestiaMatch',
  description: 'Our approach to Western astrology compatibility readings.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="px-5 py-16 md:py-20">
      <div className="max-w-2xl mx-auto prose-mystic">
        <div className="tag">About</div>
        <h1 className="section-title mt-3">A kinder way to read the stars.</h1>
        <p>
          CelestiaMatch is a small, love-letter project to the people who come back to astrology
          every time life gets a little wobbly. We believe the zodiac is at its best when it's used
          as a mirror — a way to recognize yourself, your patterns, and the people you're drawn to —
          rather than a fortune or a script.
        </p>
        <h2>What we do</h2>
        <p>
          Every reading on CelestiaMatch is grounded in traditional Western astrology (sun signs,
          moon placements, elements, and aspects) and written in plain, warm language. No jargon
          unless it helps. No doom-and-gloom unless the stars actually said it.
        </p>
        <h2>What we don't do</h2>
        <p>
          We don't predict futures, name names, or tell you what to do. We don't charge for readings.
          We don't store your birth details on our servers — the quiz lives in your browser's memory
          for the length of your session.
        </p>
        <h2>Why free</h2>
        <p>
          Astrology has always been for everyone. We cover costs through a small amount of
          respectful, clearly-labeled advertising. That's it.
        </p>
        <p>
          Thanks for being here. We hope your reading feels like a conversation with a wise friend —
          one who happens to know how to read the sky.
        </p>
      </div>
    </div>
  );
}
