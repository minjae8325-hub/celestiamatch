import Link from 'next/link';
import { AdSlot } from '@/components/AdSlot';
import { SITE } from '@/lib/site';

export default function LandingPage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="px-5 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="tag mb-6">
            <span>✦</span> Western astrology · compatibility reading
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-mist-100">
            The stars already know{' '}
            <span className="shimmer-text">what your hearts</span>
            <br className="hidden md:block" /> are hiding.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-mist-300 max-w-2xl mx-auto leading-relaxed">
            A free, thoughtful Western-astrology reading of the magnetic pull between you and the person
            you can't stop thinking about. Takes about a minute. Feels like it shouldn't be this accurate.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quiz" className="btn-gold text-lg">
              Read our compatibility →
            </Link>
            <Link href="/blog" className="btn-ghost">
              Explore the journal
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs uppercase tracking-widest text-mist-400">
            <span>⭑ 100% free</span>
            <span>⭑ No signup</span>
            <span>⭑ 60 seconds</span>
          </div>

          <div className="mt-6 text-sm text-mist-400">
            Trusted by <span className="text-gold-400 font-semibold">412,908</span> stargazers this month.
          </div>
        </div>
      </section>

      {/* PROMISE / 3-UP */}
      <section className="px-5 pb-10">
        <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-3">
          {[
            {
              icon: '☾',
              title: 'A reading that reads you',
              body:
                "Not generic horoscope fluff. Your result is shaped by both birth charts, your elements, and the specific angle between your signs.",
            },
            {
              icon: '✶',
              title: 'The honest side of chemistry',
              body:
                "We surface what tends to stay unspoken — the pull, the pattern, and the quiet way one of you is already thinking about the other.",
            },
            {
              icon: '♡',
              title: 'Warm, never clinical',
              body:
                "Written the way a wise friend would say it: specific, a little mystical, always kind. No cold predictions.",
            },
          ].map(card => (
            <div key={card.title} className="card-mystic">
              <div className="text-3xl text-gold-400">{card.icon}</div>
              <h3 className="mt-3 font-display text-xl text-mist-100">{card.title}</h3>
              <p className="mt-2 text-mist-300 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AD SLOT — above the fold of section 4 */}
      <section className="px-5 my-10">
        <div className="max-w-4xl mx-auto">
          <AdSlot slotKey="header" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div className="tag mx-auto">How it works</div>
            <h2 className="section-title mt-4">Three small questions. One real reading.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { step: '01', title: 'Tell us about you', body: 'Your birth date, time (if you know it), and place.' },
              { step: '02', title: 'And about them',     body: "Same gentle questions, for the person the stars are pulling you toward." },
              { step: '03', title: 'Read the chart',     body: 'We map the resonance between your charts and write a reading only the two of you will recognize.' },
            ].map(s => (
              <div key={s.step} className="card-mystic relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-8xl font-display text-gold-400/10 select-none">{s.step}</div>
                <div className="relative">
                  <div className="text-gold-400 text-sm tracking-widest">{s.step}</div>
                  <h3 className="mt-2 font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-mist-300 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/quiz" className="btn-gold text-lg">Start my reading →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-5 py-16 md:py-20 border-t border-mist-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div className="tag mx-auto">Starlit reviews</div>
            <h2 className="section-title mt-4">What readers keep telling us.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { q: "It said a sentence I have literally never told anyone. I actually had to close the tab and sit down.", a: "— Maya, Libra ☉ / Cancer ☾" },
              { q: "We took it together on a third date. It accidentally became the real conversation.", a: "— Theo & Ana" },
              { q: "I didn't think I'd cry at a free astrology site. I was wrong.", a: "— Jules, Pisces ☉" },
            ].map((t, i) => (
              <blockquote key={i} className="card-mystic">
                <div className="text-gold-400 text-lg">“</div>
                <p className="text-mist-100 leading-relaxed italic">{t.q}</p>
                <div className="mt-4 text-sm text-mist-400">{t.a}</div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pt-10 pb-24">
        <div className="max-w-3xl mx-auto text-center card-mystic shadow-glow">
          <div className="tag mx-auto">Your reading is waiting</div>
          <h2 className="section-title mt-5">
            What if the stars already wrote <span className="gradient-text-gold">the sentence</span> they haven't said yet?
          </h2>
          <p className="mt-4 text-mist-300 max-w-xl mx-auto">
            Find out in about a minute. Free forever, no account required.
          </p>
          <div className="mt-7">
            <Link href="/quiz" className="btn-gold text-lg">Reveal our cosmic match →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER AD */}
      <section className="px-5 pb-16">
        <div className="max-w-4xl mx-auto">
          <AdSlot slotKey="resultBottom" />
        </div>
      </section>
    </div>
  );
}
