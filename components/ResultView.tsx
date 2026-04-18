'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AdSlot } from './AdSlot';
import { getSunSign, compatibilityScore, getSignByName, type ZodiacSign } from '@/lib/zodiac';
import { READINGS } from '@/lib/readings';
import {
  archetypeFor,
  chemistryTags,
  pairTitle,
  pairSubtitle,
  teaserCards,
  desireRadar,
  chapters,
  magneticAffinities,
  sensitivities,
} from '@/lib/pairReading';

type Answers = {
  agreed: boolean;
  relationship: string;
  you: { gender: string; name: string; birthDate: string; birthTime: string; birthPlace: string; vibe: string };
  partner: { gender: string; name: string; birthDate: string; birthTime: string; birthPlace: string; vibe: string };
};

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */

export function ResultView() {
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('celestia_answers');
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  const data = useMemo(() => {
    if (!answers?.you?.birthDate || !answers?.partner?.birthDate) return null;
    const yourSign = getSunSign(answers.you.birthDate);
    const partnerSign = getSunSign(answers.partner.birthDate);
    const score = compatibilityScore(yourSign.sign, partnerSign.sign);
    return {
      yourSign,
      partnerSign,
      score,
      tags: chemistryTags(score, yourSign.sign, partnerSign.sign),
      youArch: archetypeFor(yourSign.sign, score),
      partnerArch: archetypeFor(partnerSign.sign, score),
      teasers: teaserCards(answers.you.name, answers.partner.name, score),
      radar: desireRadar(score),
      chapters: chapters(answers.you.name, answers.partner.name, yourSign.sign, partnerSign.sign),
      affinities: magneticAffinities(yourSign.sign, partnerSign.sign, score),
      sensitivities: sensitivities(yourSign.sign, partnerSign.sign),
      youReading: READINGS[yourSign.sign],
      partnerReading: READINGS[partnerSign.sign],
    };
  }, [answers]);

  if (!answers) return <EmptyState />;
  if (!data) return <EmptyState />;

  const {
    yourSign, partnerSign, score, tags,
    youArch, partnerArch,
    teasers, radar, chapters: ch,
    affinities, sensitivities: sens,
    youReading, partnerReading,
  } = data;

  const youName = answers.you.name || 'you';
  const partnerName = answers.partner.name || 'them';

  const unlock = (id: string) => setUnlocked(s => ({ ...s, [id]: true }));

  return (
    <div className="space-y-12 animate-fade-up">
      {/* ========== SCORE HERO ========== */}
      <section className="text-center">
        <div className="text-sm uppercase tracking-widest text-mist-400 mb-2">
          <span className="text-mist-100 font-semibold">{youName}</span>
          <span className="mx-2">×</span>
          <span className="text-mist-100 font-semibold">{partnerName}</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl leading-tight text-mist-100 max-w-xl mx-auto">
          {pairTitle(score)}
        </h1>

        <div className="mt-8 inline-flex items-center px-4 py-1 rounded-full bg-ember-500/15 text-ember-400 text-[11px] uppercase tracking-widest">
          Cosmic compatibility score
        </div>
        <div className="mt-3 font-display text-7xl md:text-8xl gradient-text-gold leading-none">
          {score}
        </div>
        <div className="mt-2 text-mist-300">{pairSubtitle(score)}</div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {tags.map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-ember-500/10 text-ember-400 text-xs tracking-wide border border-ember-500/30">
              {t}
            </span>
          ))}
        </div>

        {/* Dual avatar card */}
        <div className="mt-10 card-mystic">
          <div className="grid grid-cols-2 gap-4 items-center">
            <AvatarBlock
              name={youName}
              tier={youArch.tier}
              archetype={youArch.label}
              emoji={youArch.emoji}
              sign={yourSign.sign}
              symbol={yourSign.symbol}
              whisper={youArch.whisper}
            />
            <AvatarBlock
              name={partnerName}
              tier={partnerArch.tier}
              archetype={partnerArch.label}
              emoji={partnerArch.emoji}
              sign={partnerSign.sign}
              symbol={partnerSign.symbol}
              whisper={partnerArch.whisper}
            />
          </div>
          <div className="mt-6 text-center text-4xl">♥</div>
        </div>
      </section>

      {/* ========== AD: TOP ========== */}
      <AdSlot slotKey="resultTop" />

      {/* ========== BLURRED % STATS ========== */}
      <section className="text-center">
        <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
          <StatCard
            label={`How magnetically drawn ${partnerName} is to you`}
            value={Math.min(99, score + 6)}
            blurred={!unlocked.stats}
          />
          <StatCard
            label={`How incomplete ${partnerName} feels without you`}
            value={Math.max(50, score - 4)}
            blurred={!unlocked.stats}
          />
        </div>
        <div className="mt-6 text-mist-300 max-w-md mx-auto leading-relaxed">
          This person breathes differently around you. They don't consciously know it.
          Their chart noticed before their mind did.
        </div>
        {!unlocked.stats && (
          <button className="btn-ghost mt-6" onClick={() => unlock('stats')}>
            Reveal the numbers ✶
          </button>
        )}
      </section>

      {/* ========== TEASER CARDS (3) ========== */}
      <section className="space-y-5">
        {teasers.map((t, i) => (
          <TeaserCard
            key={t.id}
            card={t}
            unlocked={!!unlocked[t.id]}
            onUnlock={() => unlock(t.id)}
            index={i}
          />
        ))}
      </section>

      {/* ========== AD: MID ========== */}
      <AdSlot slotKey="resultMid" />

      {/* ========== CHAPTERS ========== */}
      <section className="space-y-12">
        {ch.map((chapter, idx) => (
          <ChapterBlock key={chapter.number} chapter={chapter} isLast={idx === ch.length - 1}>
            {/* Chapter 1: include chart visualization */}
            {chapter.number === 1 && (
              <ChartVisualization
                yourSign={yourSign.sign}
                partnerSign={partnerSign.sign}
                youName={youName}
                partnerName={partnerName}
              />
            )}
            {/* Inline ad inside chapter 2 */}
            {chapter.number === 2 && <div className="mt-6"><AdSlot slotKey="infeed" /></div>}
            {/* Radar chart in chapter 3 */}
            {chapter.number === 3 && (
              <RadarBlock
                radar={radar}
                unlocked={!!unlocked.radar}
                onUnlock={() => unlock('radar')}
              />
            )}
          </ChapterBlock>
        ))}
      </section>

      {/* ========== MAGNETIC AFFINITIES + SENSITIVITIES ========== */}
      <section className="grid md:grid-cols-2 gap-5">
        <div className="card-mystic">
          <div className="tag mb-3">Magnetic affinities</div>
          <ul className="space-y-3 text-mist-200 text-sm leading-relaxed">
            {affinities.map((a, i) => (
              <li key={i} className="flex gap-2"><span className="text-gold-400">✦</span><span>{a}</span></li>
            ))}
          </ul>
        </div>
        <div className="card-mystic">
          <div className="tag mb-3">Handle with care</div>
          <ul className="space-y-3 text-mist-200 text-sm leading-relaxed">
            {sens.map((a, i) => (
              <li key={i} className="flex gap-2"><span className="text-ember-400">◦</span><span>{a}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== INDIVIDUAL READINGS ========== */}
      <section className="grid md:grid-cols-2 gap-5">
        <IndividualReading name={youName} sign={yourSign.sign} symbol={yourSign.symbol} reading={youReading.tagline} essence={youReading.coreEssence} />
        <IndividualReading name={partnerName} sign={partnerSign.sign} symbol={partnerSign.symbol} reading={partnerReading.tagline} essence={partnerReading.coreEssence} />
      </section>

      {/* ========== AD: BOTTOM ========== */}
      <AdSlot slotKey="resultBottom" />

      {/* ========== CTA TO JOURNAL + RESTART ========== */}
      <section className="card-mystic text-center">
        <h3 className="font-display text-2xl">Keep reading the sky.</h3>
        <p className="mt-2 text-mist-300 max-w-md mx-auto">
          New articles in our journal every week — compatibility, moon sign basics, transits, and more.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/blog" className="btn-gold">Read the journal →</Link>
          <Link href="/quiz" className="btn-ghost">Run another reading</Link>
        </div>
      </section>

      <div className="text-center text-xs text-mist-500 pt-6">
        Astrology is an invitation to reflect — not a fortune. Take what helps, leave the rest. ✦
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="card-mystic text-center max-w-md mx-auto">
      <div className="text-4xl">✦</div>
      <h2 className="mt-3 font-display text-2xl">No reading yet.</h2>
      <p className="mt-2 text-mist-300">
        Start a free compatibility reading to see your personalized chart here.
      </p>
      <Link href="/quiz" className="btn-gold mt-5 inline-block">Start my reading →</Link>
    </div>
  );
}

function AvatarBlock({ name, tier, archetype, emoji, sign, symbol, whisper }: {
  name: string; tier: string; archetype: string; emoji: string; sign: string; symbol: string; whisper: string;
}) {
  return (
    <div className="text-center">
      <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] tracking-widest font-bold mb-2 ${
        tier === 'S' ? 'bg-gold-400 text-night-950' :
        tier === 'A' ? 'bg-ember-500 text-night-950' :
        tier === 'B' ? 'bg-mist-300 text-night-950' : 'bg-mist-500 text-night-950'
      }`}>{tier} TIER</div>
      <div className="text-xs text-mist-400 uppercase tracking-widest">{archetype}</div>
      <div className="mt-3 text-5xl">{emoji}</div>
      <div className="mt-3 font-display text-lg text-mist-100">{name}</div>
      <div className="text-sm text-gold-400">{symbol} {sign}</div>
      <div className="mt-3 text-xs text-mist-300 italic leading-relaxed px-2">"{whisper}"</div>
    </div>
  );
}

function StatCard({ label, value, blurred }: { label: string; value: number; blurred: boolean }) {
  return (
    <div className="card-mystic">
      <div className="text-xs text-mist-400 uppercase tracking-widest mb-3">{label}</div>
      <div className={`font-display text-5xl gradient-text-gold ${blurred ? 'blur-md select-none' : ''}`}>
        {value}%
      </div>
    </div>
  );
}

function TeaserCard({ card, unlocked, onUnlock, index }: {
  card: { id: string; eyebrow: string; title: string; conclusion: string; body: string };
  unlocked: boolean;
  onUnlock: () => void;
  index: number;
}) {
  return (
    <div className="card-mystic relative overflow-hidden">
      <div className="text-[10px] uppercase tracking-widest text-ember-400">{card.eyebrow}</div>
      <h3 className="mt-2 font-display text-xl md:text-2xl text-mist-100">{card.title}</h3>
      <div className={`mt-4 text-mist-200 leading-relaxed relative ${!unlocked ? 'max-h-36 overflow-hidden' : ''}`}>
        <p className={!unlocked ? 'blur-sm select-none' : ''}>{card.body}</p>
        {!unlocked && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-night-800/80 to-night-800 flex items-end justify-center pb-2">
            <div className="text-xs text-mist-400 italic">Sealed — tap to reveal</div>
          </div>
        )}
      </div>
      <div className={`mt-5 pt-4 border-t border-mist-500/10 text-sm font-semibold ${unlocked ? 'text-gold-400' : 'text-mist-500 blur-[3px] select-none'}`}>
        → {card.conclusion}
      </div>
      {!unlocked && (
        <div className="mt-4 text-right">
          <button onClick={onUnlock} className="btn-gold">Reveal this insight</button>
        </div>
      )}
    </div>
  );
}

function ChapterBlock({ chapter, children, isLast }: {
  chapter: { number: number; eyebrow: string; title: string; blurb: string; bullets: string[]; closing: string };
  children?: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <article className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="font-display text-5xl text-gold-400/30">0{chapter.number}</div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ember-400">{chapter.eyebrow}</div>
          <h2 className="font-display text-2xl md:text-3xl text-mist-100">{chapter.title}</h2>
        </div>
      </div>
      <div className="card-mystic">
        <p className="text-mist-200 leading-relaxed">{chapter.blurb}</p>
        <ul className="mt-5 space-y-3 text-mist-200 leading-relaxed">
          {chapter.bullets.map((b, i) => (
            <li key={i} className="flex gap-2"><span className="text-gold-400">✶</span><span>{b}</span></li>
          ))}
        </ul>
        <div className="mt-6 pt-5 border-t border-mist-500/10 italic text-gold-400">{chapter.closing}</div>
        {children}
      </div>
      {!isLast && (
        <div className="text-center text-xs text-mist-500 uppercase tracking-widest">✦  ✧  ✦</div>
      )}
    </article>
  );
}

function ChartVisualization({ yourSign, partnerSign, youName, partnerName }: {
  yourSign: ZodiacSign; partnerSign: ZodiacSign; youName: string; partnerName: string;
}) {
  const youInfo = getSignByName(yourSign);
  const partnerInfo = getSignByName(partnerSign);
  const elements: Array<'Fire' | 'Earth' | 'Air' | 'Water'> = ['Fire', 'Earth', 'Air', 'Water'];
  const bar = (el: string, active: boolean) => (
    <div className="flex items-center gap-2 text-xs">
      <div className="w-12 text-mist-300">{el}</div>
      <div className="flex-1 h-1.5 rounded-full bg-night-900 overflow-hidden">
        <div className={`h-full ${active ? 'bg-gradient-gold' : 'bg-mist-500/30'} transition-all`} style={{ width: active ? '80%' : '18%' }} />
      </div>
    </div>
  );
  return (
    <div className="mt-6 rounded-2xl border border-mist-500/15 bg-night-900/60 p-5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-mist-400">
        <span>Birth chart · Dual reading</span>
        <span>{youName} × {partnerName}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-mist-500/15 p-4 text-center">
          <div className="text-4xl">{youInfo.symbol}</div>
          <div className="font-display text-lg mt-1">{youInfo.sign}</div>
          <div className="text-xs text-mist-400 mt-1">{youInfo.element} · {youInfo.modality}</div>
          <div className="text-xs text-gold-400 mt-1">Ruled by {youInfo.rulingPlanet}</div>
        </div>
        <div className="rounded-xl border border-mist-500/15 p-4 text-center">
          <div className="text-4xl">{partnerInfo.symbol}</div>
          <div className="font-display text-lg mt-1">{partnerInfo.sign}</div>
          <div className="text-xs text-mist-400 mt-1">{partnerInfo.element} · {partnerInfo.modality}</div>
          <div className="text-xs text-gold-400 mt-1">Ruled by {partnerInfo.rulingPlanet}</div>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="text-[10px] uppercase tracking-widest text-mist-400">Element signatures</div>
        {elements.map(el => bar(el, youInfo.element === el || partnerInfo.element === el))}
      </div>
    </div>
  );
}

function RadarBlock({ radar, unlocked, onUnlock }: {
  radar: { label: string; value: number }[];
  unlocked: boolean;
  onUnlock: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-mist-500/15 bg-night-900/60 p-5">
      <div className="text-[10px] uppercase tracking-widest text-ember-400 mb-3">Locked Insight · Chemistry radar</div>
      <div className={`space-y-3 ${!unlocked ? 'blur-md select-none' : ''}`}>
        {radar.map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-xs text-mist-300 mb-1">
              <span>{r.label}</span>
              <span className="text-gold-400">{r.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-night-900 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-ember-500 to-gold-400" style={{ width: `${r.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      {!unlocked && (
        <div className="mt-4 text-center">
          <button className="btn-gold" onClick={onUnlock}>Unlock chemistry radar</button>
        </div>
      )}
    </div>
  );
}

function IndividualReading({ name, sign, symbol, reading, essence }: {
  name: string; sign: ZodiacSign | string; symbol: string; reading: string; essence: string;
}) {
  return (
    <div className="card-mystic">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{symbol}</div>
        <div>
          <div className="font-display text-lg text-mist-100">{name}</div>
          <div className="text-xs text-gold-400">{sign}</div>
        </div>
      </div>
      <div className="mt-3 italic text-gold-400 text-sm">{reading}</div>
      <p className="mt-3 text-mist-200 text-sm leading-relaxed">{essence}</p>
    </div>
  );
}
