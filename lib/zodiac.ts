/**
 * Lightweight Western astrology "sun sign" calculator.
 * This is intentionally simple — enough to feel personalized without
 * needing ephemeris data. Swap with a real library later if you want
 * moon/rising placements.
 */

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type ZodiacElement = 'Fire' | 'Earth' | 'Air' | 'Water';
export type ZodiacModality = 'Cardinal' | 'Fixed' | 'Mutable';

export interface ZodiacInfo {
  sign: ZodiacSign;
  symbol: string;
  element: ZodiacElement;
  modality: ZodiacModality;
  rulingPlanet: string;
  dateRange: string;
  /** 1–12, used for compatibility scoring. */
  order: number;
}

const SIGNS: ZodiacInfo[] = [
  { sign: 'Capricorn',   symbol: '♑', element: 'Earth', modality: 'Cardinal', rulingPlanet: 'Saturn',  dateRange: 'Dec 22 – Jan 19', order: 10 },
  { sign: 'Aquarius',    symbol: '♒', element: 'Air',   modality: 'Fixed',    rulingPlanet: 'Uranus',  dateRange: 'Jan 20 – Feb 18', order: 11 },
  { sign: 'Pisces',      symbol: '♓', element: 'Water', modality: 'Mutable',  rulingPlanet: 'Neptune', dateRange: 'Feb 19 – Mar 20', order: 12 },
  { sign: 'Aries',       symbol: '♈', element: 'Fire',  modality: 'Cardinal', rulingPlanet: 'Mars',    dateRange: 'Mar 21 – Apr 19', order: 1 },
  { sign: 'Taurus',      symbol: '♉', element: 'Earth', modality: 'Fixed',    rulingPlanet: 'Venus',   dateRange: 'Apr 20 – May 20', order: 2 },
  { sign: 'Gemini',      symbol: '♊', element: 'Air',   modality: 'Mutable',  rulingPlanet: 'Mercury', dateRange: 'May 21 – Jun 20', order: 3 },
  { sign: 'Cancer',      symbol: '♋', element: 'Water', modality: 'Cardinal', rulingPlanet: 'Moon',    dateRange: 'Jun 21 – Jul 22', order: 4 },
  { sign: 'Leo',         symbol: '♌', element: 'Fire',  modality: 'Fixed',    rulingPlanet: 'Sun',     dateRange: 'Jul 23 – Aug 22', order: 5 },
  { sign: 'Virgo',       symbol: '♍', element: 'Earth', modality: 'Mutable',  rulingPlanet: 'Mercury', dateRange: 'Aug 23 – Sep 22', order: 6 },
  { sign: 'Libra',       symbol: '♎', element: 'Air',   modality: 'Cardinal', rulingPlanet: 'Venus',   dateRange: 'Sep 23 – Oct 22', order: 7 },
  { sign: 'Scorpio',     symbol: '♏', element: 'Water', modality: 'Fixed',    rulingPlanet: 'Pluto',   dateRange: 'Oct 23 – Nov 21', order: 8 },
  { sign: 'Sagittarius', symbol: '♐', element: 'Fire',  modality: 'Mutable',  rulingPlanet: 'Jupiter', dateRange: 'Nov 22 – Dec 21', order: 9 },
];

/** Returns the sun sign for a given ISO birth date (YYYY-MM-DD). */
export function getSunSign(isoDate: string): ZodiacInfo {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return SIGNS.find(s => s.sign === 'Libra')!; // sane default
  const month = m;
  const day = d;

  const ranges: Array<[number, number, number, number, ZodiacSign]> = [
    [1,  1,  1,  19, 'Capricorn'],
    [1, 20,  2,  18, 'Aquarius'],
    [2, 19,  3,  20, 'Pisces'],
    [3, 21,  4,  19, 'Aries'],
    [4, 20,  5,  20, 'Taurus'],
    [5, 21,  6,  20, 'Gemini'],
    [6, 21,  7,  22, 'Cancer'],
    [7, 23,  8,  22, 'Leo'],
    [8, 23,  9,  22, 'Virgo'],
    [9, 23, 10,  22, 'Libra'],
    [10,23, 11,  21, 'Scorpio'],
    [11,22, 12,  21, 'Sagittarius'],
    [12,22, 12,  31, 'Capricorn'],
  ];
  for (const [sm, sd, em, ed, name] of ranges) {
    const inRange =
      (month === sm && day >= sd) ||
      (month === em && day <= ed) ||
      (sm !== em && month > sm && month < em);
    if (inRange) return SIGNS.find(s => s.sign === name)!;
  }
  return SIGNS.find(s => s.sign === 'Libra')!;
}

export function getAllSigns(): ZodiacInfo[] {
  return [...SIGNS].sort((a, b) => a.order - b.order);
}

export function getSignByName(name: ZodiacSign): ZodiacInfo {
  return SIGNS.find(s => s.sign === name)!;
}

/**
 * Returns an array of 3 "best matches" for a sign, picked with classic
 * Western astrology rules (trine + complementary element) — plus a dash
 * of charm so the output always feels warm.
 */
export function getBestMatches(sign: ZodiacSign): ZodiacSign[] {
  const matches: Record<ZodiacSign, ZodiacSign[]> = {
    Aries:       ['Leo', 'Sagittarius', 'Gemini'],
    Taurus:      ['Virgo', 'Capricorn', 'Cancer'],
    Gemini:      ['Libra', 'Aquarius', 'Aries'],
    Cancer:      ['Scorpio', 'Pisces', 'Taurus'],
    Leo:         ['Aries', 'Sagittarius', 'Libra'],
    Virgo:       ['Taurus', 'Capricorn', 'Cancer'],
    Libra:       ['Gemini', 'Aquarius', 'Leo'],
    Scorpio:     ['Cancer', 'Pisces', 'Capricorn'],
    Sagittarius: ['Aries', 'Leo', 'Aquarius'],
    Capricorn:   ['Taurus', 'Virgo', 'Scorpio'],
    Aquarius:    ['Gemini', 'Libra', 'Sagittarius'],
    Pisces:      ['Cancer', 'Scorpio', 'Taurus'],
  };
  return matches[sign];
}

/** Compatibility score 62–96 (so it always feels encouraging but believable). */
export function compatibilityScore(a: ZodiacSign, b: ZodiacSign): number {
  const best = getBestMatches(a);
  if (best[0] === b) return 96;
  if (best[1] === b) return 92;
  if (best[2] === b) return 88;
  const infoA = getSignByName(a);
  const infoB = getSignByName(b);
  if (infoA.element === infoB.element) return 82;
  // opposite sign of the zodiac = magnetic chemistry
  if (Math.abs(infoA.order - infoB.order) === 6) return 85;
  // seed pseudo-random but deterministic
  const seed = (infoA.order * 7 + infoB.order * 13) % 17;
  return 62 + seed * 2;
}
