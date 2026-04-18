import type { ZodiacSign, ZodiacInfo } from './zodiac';
import { compatibilityScore, getSignByName, getBestMatches } from './zodiac';

/**
 * Pair-based "compatibility archetype" content.
 * Inspired by the pair reading structure of Asian love-compatibility funnels,
 * translated into AdSense-safe Western astrology language.
 *
 * Tone: mystical, warm, a little magnetic — never explicit.
 */

export type ArchetypeTier = 'S' | 'A' | 'B' | 'C';

export interface ArchetypeAnimal {
  tier: ArchetypeTier;
  label: string;    // "The Silent Leopard"
  emoji: string;    // visual anchor
  whisper: string;  // the short "voice" line shown next to the avatar
}

/** Maps an element + compatibility score band → archetype. */
export function archetypeFor(sign: ZodiacSign, score: number): ArchetypeAnimal {
  const info = getSignByName(sign);
  const base: Record<ZodiacInfo['element'], ArchetypeAnimal[]> = {
    Fire: [
      { tier: 'S', label: 'The Phoenix Flame',  emoji: '🔥', whisper: "You burn them awake. They'll remember how." },
      { tier: 'A', label: 'The Wild Ember',     emoji: '🦁', whisper: "They can't look away. And they know it." },
      { tier: 'B', label: 'The Hunting Falcon', emoji: '🪶', whisper: "One glance, and they're already thinking about you." },
      { tier: 'C', label: 'The Moth to Light',  emoji: '🕯️', whisper: "They circle back — always." },
    ],
    Earth: [
      { tier: 'S', label: 'The Sacred Oak',      emoji: '🌳', whisper: "They feel safe enough to finally tell the truth." },
      { tier: 'A', label: 'The Silent Leopard',  emoji: '🐆', whisper: "Slow, patient, and impossible to shake." },
      { tier: 'B', label: 'The Velvet Garden',   emoji: '🌿', whisper: "Calm on the outside. Addictive underneath." },
      { tier: 'C', label: 'The Keeper of Keys',  emoji: '🗝️', whisper: "Trust takes time. Then it never leaves." },
    ],
    Air: [
      { tier: 'S', label: 'The Mirror Sky',        emoji: '🌌', whisper: "You think a thought — they finish the sentence." },
      { tier: 'A', label: 'The Crystal Current',   emoji: '💎', whisper: "Conversation with you feels like oxygen." },
      { tier: 'B', label: 'The Hidden Songbird',   emoji: '🕊️', whisper: "Soft voice, sharp mind, impossible to ignore." },
      { tier: 'C', label: 'The Drifting Lantern',  emoji: '🏮', whisper: "Always nearby — quieter than they look." },
    ],
    Water: [
      { tier: 'S', label: 'The Deep Tide',         emoji: '🌊', whisper: "They feel you before you say a word." },
      { tier: 'A', label: 'The Moonlit Stream',    emoji: '🌙', whisper: "You're safe here. And you can tell." },
      { tier: 'B', label: 'The Soft Storm',        emoji: '🌧️', whisper: "Gentle until the moment it isn't." },
      { tier: 'C', label: 'The Quiet Pearl',       emoji: '🦪', whisper: "The longer they stay, the rarer it feels." },
    ],
  };
  const band: ArchetypeTier =
    score >= 92 ? 'S' : score >= 85 ? 'A' : score >= 78 ? 'B' : 'C';
  return base[info.element].find(a => a.tier === band) ?? base[info.element][1];
}

/** Tags that appear as "chips" under the score — the headline-sized emotional promise. */
export function chemistryTags(score: number, youSign: ZodiacSign, partnerSign: ZodiacSign): string[] {
  const bank = {
    high: ['Magnetic Pull', 'Soulbound', 'Eye-Contact Risk', 'Heart Resonance', 'Gravity Lock'],
    mid:  ['Slow Burn', 'Quiet Obsession', 'Unfinished Sentence', 'Whisper Chemistry', 'Moonlight Pull'],
    low:  ['Late Bloom', 'Hidden Spark', 'Unexpected Warmth', 'Patient Heart'],
  };
  const pool = score >= 88 ? bank.high : score >= 75 ? bank.mid : bank.low;
  return pool.slice(0, 4);
}

/** Title shown above the big score. */
export function pairTitle(score: number): string {
  if (score >= 94) return "You weren't supposed to meet by accident.";
  if (score >= 88) return 'A connection the stars were quietly planning.';
  if (score >= 82) return "There's something here neither of you is fully admitting.";
  if (score >= 75) return 'A slow-burn chemistry that gets dangerous on purpose.';
  if (score >= 68) return 'Not obvious. But definitely not ordinary.';
  return 'An unusual pairing with a story the stars want to tell.';
}

/** Short subtitle line under the score. */
export function pairSubtitle(score: number): string {
  if (score >= 92) return 'Even their voice shifts your breathing.';
  if (score >= 85) return 'Your name lives rent-free in their head.';
  if (score >= 78) return 'They notice you even when they pretend not to.';
  if (score >= 70) return 'You occupy more of their thoughts than they show.';
  return 'The pull is quiet — but it keeps returning.';
}

/** The three "blurred then revealed" teaser cards — the funnel heart. */
export interface TeaserCard {
  id: 'why' | 'unspoken' | 'truth';
  eyebrow: string;
  title: string;
  conclusion: string;
  body: string;
}

export function teaserCards(youName: string, partnerName: string, score: number): TeaserCard[] {
  return [
    {
      id: 'why',
      eyebrow: 'Locked Insight 01',
      title: `Why ${partnerName || 'they'} can't quite let you go`,
      conclusion: 'This is no longer just emotion — it has become a pattern they return to.',
      body:
        `${partnerName || 'They'} would describe the connection as "hard to explain," but the chart is blunt: your presence has become regulating for their nervous system. ` +
        `They orient toward you the way people orient toward a window in a long meeting — half unconsciously, constantly. ` +
        `It isn't obsession. It's gravity. And gravity doesn't need permission.`,
    },
    {
      id: 'unspoken',
      eyebrow: 'Locked Insight 02',
      title: `What ${partnerName || 'they'} has never said out loud`,
      conclusion: 'There is a sentence they rehearse and keep swallowing.',
      body:
        `There's a version of how they feel about you that never makes it to a text, a call, or a conversation. ` +
        `It's not dishonesty — it's that naming it would make it real in a way they're not ready to defend yet. ` +
        `The chart suggests this unspoken layer is actually more accurate than anything they've actually said.`,
    },
    {
      id: 'truth',
      eyebrow: 'Locked Insight 03',
      title: `How they actually feel when you're not in the room`,
      conclusion: 'Absence amplifies them toward you, not away.',
      body:
        `When you're not around, most people move on. ${partnerName || 'They'} doesn't, quite. ` +
        `The chart shows a pattern where your absence makes the connection louder inside them, not quieter. ` +
        `That's why they keep finding reasons to reach back out — even when the reason is thin.`,
    },
  ];
}

/** Radar-style "five desires" for the locked mini-chart. */
export function desireRadar(score: number): { label: string; value: number }[] {
  // Numbers are intentionally clustered to look dramatic, not chaotic.
  const base = score;
  return [
    { label: 'Emotional Pull',   value: Math.min(99, base + 6) },
    { label: 'Mental Chemistry', value: Math.min(99, base + 2) },
    { label: 'Physical Magnetism', value: Math.min(99, base + 8) },
    { label: 'Trust Signal',     value: Math.max(40, base - 14) },
    { label: 'Long-Term Fit',    value: Math.max(45, base - 6) },
  ];
}

/** Chapter-level "arcs" — each one is a long-scroll section. */
export interface Chapter {
  number: number;
  eyebrow: string;
  title: string;
  blurb: string;
  bullets: string[];
  closing: string;
}

export function chapters(youName: string, partnerName: string, youSign: ZodiacSign, partnerSign: ZodiacSign): Chapter[] {
  const you = youName || 'you';
  const them = partnerName || 'they';
  const youInfo = getSignByName(youSign);
  const partnerInfo = getSignByName(partnerSign);
  return [
    {
      number: 1,
      eyebrow: 'Chapter 1',
      title: `The side of ${them} only your chart sees`,
      blurb:
        `Everyone gets the public version of ${them}. You get something else — the version of them the stars read when no one is performing.`,
      bullets: [
        `${them} moves through the world as a ${partnerInfo.sign}, ruled by ${partnerInfo.rulingPlanet}. That's the introduction.`,
        `The real story is how their ${partnerInfo.element} energy meets your ${youInfo.element} energy — that's where the private tone lives.`,
        `They don't show this side to everyone. It surfaces when they feel safe. And your chart makes them feel safe in a way their friends wouldn't guess.`,
      ],
      closing:
        `What the chart is quietly saying: the version of ${them} you meet is not the one their exes met.`,
    },
    {
      number: 2,
      eyebrow: 'Chapter 2',
      title: `The quiet way ${them} keeps thinking about ${you}`,
      blurb:
        `The stars have a specific reading for how ${them} carries you through a normal day. It's less dramatic than a love song, and more accurate.`,
      bullets: [
        `${them} finds themselves re-reading your messages at odd hours — not because something's wrong, but because something about you is steadying.`,
        `Songs, phrases, and places start to silently belong to you. They don't tell you which ones.`,
        `When they make plans with other people, a small part of their head is benchmarking against how they'd feel with you.`,
      ],
      closing:
        `In astrology terms: your signature has entered their private imagination. That's how this connection is operating on their end right now.`,
    },
    {
      number: 3,
      eyebrow: 'Chapter 3',
      title: `What ${them} is avoiding saying — and why`,
      blurb:
        `This part is sensitive. There's something ${them} wants to say that the timing, the pride, or the logistics keep postponing.`,
      bullets: [
        `They rehearse a sentence about you more than once. Then they don't send it.`,
        `It's not because they're hiding something bad. It's because naming it would change the shape of what you currently are.`,
        `The stars suggest this unspoken layer is ahead of their spoken one by roughly one chapter of the relationship.`,
      ],
      closing:
        `Translation: if you sense they're holding back a feeling, you're probably right. The chart agrees with you.`,
    },
    {
      number: 4,
      eyebrow: 'Chapter 4',
      title: `What you're being invited to notice now`,
      blurb:
        `This connection is not random, and it's not decoration. It's showing up in your life right now for reasons the stars want you to read honestly.`,
      bullets: [
        `The timing of this pairing aligns with a transit in your own chart asking you to grow in a specific direction.`,
        `The lesson ${them} is here to offer you has less to do with their behavior and more to do with your self-recognition.`,
        `You're allowed to enjoy this connection slowly. You're also allowed to ask more of it than you're currently asking.`,
      ],
      closing:
        `If there's a move to make here, it's smaller than you think — and softer than you think. The chart rewards honesty over strategy.`,
    },
  ];
}

/** Star-style "magnetic affinities" — short bulleted strengths. */
export function magneticAffinities(youSign: ZodiacSign, partnerSign: ZodiacSign, score: number): string[] {
  const score88 = score >= 85;
  const youInfo = getSignByName(youSign);
  const partnerInfo = getSignByName(partnerSign);
  const sameEl = youInfo.element === partnerInfo.element;
  const opposite = Math.abs(youInfo.order - partnerInfo.order) === 6;

  const arr: string[] = [];
  arr.push(
    sameEl
      ? `Matching element (${youInfo.element}) — you operate on the same emotional frequency without translation.`
      : `Complementary elements (${youInfo.element} × ${partnerInfo.element}) — you fill in what the other one forgets to bring.`,
  );
  arr.push(
    opposite
      ? 'Opposite signs across the zodiac wheel — classic "magnetic polarity" chemistry. Impossible to ignore each other for long.'
      : 'Harmonic angle between your signs — tension is productive, not destructive.',
  );
  if (score88) arr.push('Shared intuitive timing — you arrive at the same emotional temperature at nearly the same moment.');
  arr.push(
    `${getBestMatches(youSign).includes(partnerSign)
      ? 'Traditional best-match pairing — you sit in each other\'s classic compatibility list.'
      : 'Non-traditional pairing — which often produces the longest, most evolved relationships when both partners commit.'}`,
  );
  return arr;
}

/** Tiny "watch out for" list — grounds the reading so it doesn't feel all hype. */
export function sensitivities(youSign: ZodiacSign, partnerSign: ZodiacSign): string[] {
  return [
    `Communication rhythm: your ${getSignByName(youSign).modality} pace meets their ${getSignByName(partnerSign).modality} pace — watch for "I thought we agreed" moments.`,
    `Emotional disclosure: one of you tends to say things three days after feeling them. Leave room for the echo.`,
    `Energy management: when one of you is low, the other instinctively wants to fix it. Sometimes the move is to just sit with it together.`,
  ];
}
