'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdSlot } from './AdSlot';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type QuizAnswers = {
  agreed: boolean;
  relationship: string;
  you: Person;
  partner: Person;
};

type Person = {
  gender: 'female' | 'male' | 'other' | '';
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM or 'unknown'
  birthPlace: string;
  vibe: string; // optional trait
};

const emptyPerson: Person = {
  gender: '',
  name: '',
  birthDate: '',
  birthTime: '',
  birthPlace: '',
  vibe: '',
};

const defaultAnswers: QuizAnswers = {
  agreed: false,
  relationship: '',
  you: { ...emptyPerson },
  partner: { ...emptyPerson },
};

/* -------------------------------------------------------------------------- */
/*  Step configuration                                                        */
/* -------------------------------------------------------------------------- */

const RELATIONSHIP_OPTIONS = [
  { emoji: '🔥', label: 'A one-sided crush',      tag: 'Crush' },
  { emoji: '🌙', label: 'Something undefined',    tag: 'Talking' },
  { emoji: '🤫', label: 'A quiet romance',        tag: 'Private' },
  { emoji: '💞', label: 'Someone I want to know deeper', tag: 'Dating' },
  { emoji: '💍', label: 'A partner I want to fall for again', tag: 'Couple' },
];

const STEPS = [
  'gate',            // 0
  'relationship',    // 1
  'you-gender',      // 2
  'you-name',        // 3
  'you-birthdate',   // 4
  'you-birthtime',   // 5
  'you-place',       // 6
  'partner-gender',  // 7
  'partner-name',    // 8
  'partner-birthdate', // 9
  'partner-birthtime', // 10
  'partner-place',     // 11
] as const;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<QuizAnswers>(defaultAnswers);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const setYou = (patch: Partial<Person>) => setA(s => ({ ...s, you: { ...s.you, ...patch } }));
  const setPartner = (patch: Partial<Person>) => setA(s => ({ ...s, partner: { ...s.partner, ...patch } }));

  function canAdvance(): { ok: boolean; msg?: string } {
    switch (STEPS[step]) {
      case 'gate':             return a.agreed ? { ok: true } : { ok: false, msg: 'Please check the box to begin.' };
      case 'relationship':     return a.relationship ? { ok: true } : { ok: false, msg: 'Pick the option that fits best.' };
      case 'you-gender':       return a.you.gender ? { ok: true } : { ok: false, msg: 'Select an option to continue.' };
      case 'you-name':         return a.you.name.trim().length > 0 ? { ok: true } : { ok: false, msg: 'Tell us what to call you.' };
      case 'you-birthdate':    return validDate(a.you.birthDate);
      case 'you-birthtime':    return a.you.birthTime ? { ok: true } : { ok: false, msg: 'Enter a time or tap "I\'m not sure".' };
      case 'you-place':        return a.you.birthPlace.trim().length > 0 ? { ok: true } : { ok: false, msg: 'Type a city or region.' };
      case 'partner-gender':   return a.partner.gender ? { ok: true } : { ok: false, msg: 'Select an option.' };
      case 'partner-name':     return a.partner.name.trim().length > 0 ? { ok: true } : { ok: false, msg: 'A name helps the stars focus.' };
      case 'partner-birthdate':return validDate(a.partner.birthDate);
      case 'partner-birthtime':return a.partner.birthTime ? { ok: true } : { ok: false, msg: 'Time, or "I\'m not sure".' };
      case 'partner-place':    return a.partner.birthPlace.trim().length > 0 ? { ok: true } : { ok: false, msg: 'Type a city or region.' };
      default: return { ok: true };
    }
  }

  function next() {
    const result = canAdvance();
    if (!result.ok) {
      setError(result.msg || 'Please complete this step.');
      return;
    }
    setError('');
    if (step === STEPS.length - 1) {
      finish();
    } else {
      setStep(step + 1);
    }
  }

  function back() {
    if (step > 0) {
      setStep(step - 1);
      setError('');
    }
  }

  function finish() {
    setLoading(true);
    try {
      sessionStorage.setItem('celestia_answers', JSON.stringify(a));
    } catch {}
    router.push('/result');
  }

  if (loading) {
    return <LoadingInterstitial />;
  }

  return (
    <div className="relative animate-fade-up">
      {/* Progress indicator */}
      {STEPS[step] !== 'gate' && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-mist-400 mb-2">
            <span>Step {step} of {STEPS.length - 1}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-night-800 overflow-hidden">
            <div
              className="h-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="card-mystic min-h-[420px] flex flex-col">
        <StepBody
          step={STEPS[step]}
          a={a}
          setA={setA}
          setYou={setYou}
          setPartner={setPartner}
        />

        {error && (
          <div className="mt-3 text-sm text-ember-400" role="alert">{error}</div>
        )}

        <div className="mt-auto pt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="text-sm text-mist-400 hover:text-gold-400 transition">
              ← Back
            </button>
          ) : (
            <span />
          )}

          <button type="button" onClick={next} className="btn-gold">
            {step === STEPS.length - 1 ? 'Read our chart →' : 'Continue →'}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-mist-400">
        Your answers stay in your browser. We don't store them.
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step body renderer                                                        */
/* -------------------------------------------------------------------------- */

function StepBody({
  step,
  a,
  setA,
  setYou,
  setPartner,
}: {
  step: typeof STEPS[number];
  a: QuizAnswers;
  setA: (u: (s: QuizAnswers) => QuizAnswers) => void;
  setYou: (p: Partial<Person>) => void;
  setPartner: (p: Partial<Person>) => void;
}) {
  switch (step) {
    case 'gate':
      return <GateStep checked={a.agreed} onToggle={() => setA(s => ({ ...s, agreed: !s.agreed }))} />;
    case 'relationship':
      return (
        <OptionList
          heart="1"
          title="What are they to you, right now?"
          hint="This just helps us tune the reading's tone."
          options={RELATIONSHIP_OPTIONS}
          value={a.relationship}
          onChange={v => setA(s => ({ ...s, relationship: v }))}
        />
      );
    case 'you-gender':
      return (
        <GenderStep
          heart="2"
          title="Your gender"
          value={a.you.gender}
          onChange={v => setYou({ gender: v })}
        />
      );
    case 'you-name':
      return (
        <NameStep
          heart="3"
          title="What should we call you?"
          subtitle="Nicknames are perfect. This is only used inside your reading."
          value={a.you.name}
          onChange={v => setYou({ name: v })}
        />
      );
    case 'you-birthdate':
      return (
        <BirthDateStep
          heart="4"
          title="Your birth date"
          value={a.you.birthDate}
          onChange={v => setYou({ birthDate: v })}
        />
      );
    case 'you-birthtime':
      return (
        <BirthTimeStep
          heart="5"
          title="Your birth time (optional)"
          value={a.you.birthTime}
          onChange={v => setYou({ birthTime: v })}
        />
      );
    case 'you-place':
      return (
        <PlaceStep
          heart="6"
          title="Where were you born?"
          value={a.you.birthPlace}
          onChange={v => setYou({ birthPlace: v })}
        />
      );
    case 'partner-gender':
      return (
        <GenderStep
          heart="7"
          title="Their gender"
          value={a.partner.gender}
          onChange={v => setPartner({ gender: v })}
        />
      );
    case 'partner-name':
      return (
        <NameStep
          heart="8"
          title="What do you call them?"
          subtitle="A name, a nickname, the way you think of them — whatever fits."
          value={a.partner.name}
          onChange={v => setPartner({ name: v })}
        />
      );
    case 'partner-birthdate':
      return (
        <BirthDateStep
          heart="9"
          title="Their birth date"
          value={a.partner.birthDate}
          onChange={v => setPartner({ birthDate: v })}
        />
      );
    case 'partner-birthtime':
      return (
        <BirthTimeStep
          heart="10"
          title="Their birth time (optional)"
          value={a.partner.birthTime}
          onChange={v => setPartner({ birthTime: v })}
        />
      );
    case 'partner-place':
      return (
        <PlaceStep
          heart="11"
          title="Where were they born?"
          value={a.partner.birthPlace}
          onChange={v => setPartner({ birthPlace: v })}
        />
      );
  }
}

/* -------------------------------------------------------------------------- */
/*  Reusable step UI                                                          */
/* -------------------------------------------------------------------------- */

function HeartBadge({ n }: { n: string }) {
  return (
    <div className="mx-auto mb-6 relative w-14 h-14 flex items-center justify-center">
      <div className="absolute inset-0 text-5xl text-ember-500 drop-shadow-[0_0_18px_rgba(255,111,141,0.6)]">♥</div>
      <div className="relative font-display text-lg text-mist-100">{n}</div>
    </div>
  );
}

function GateStep({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-3">🕯️ 🕯️</div>
      <div className="tag mx-auto mb-4">A gentle agreement</div>
      <h2 className="font-display text-3xl md:text-4xl mb-3">Please read this softly.</h2>
      <p className="text-mist-300 leading-relaxed max-w-md mx-auto">
        This reading can feel very specific — sometimes eerily so. Please use it for reflection, not manipulation.
        If you get an insight about how the other person feels, let it make you kinder, not strategic.
      </p>
      <ul className="mt-6 text-left max-w-md mx-auto space-y-2 text-mist-200 text-sm">
        <li>🤫 Private details about the other person (kept gentle)</li>
        <li>🫀 Their emotional patterns — how closeness feels to them</li>
        <li>🌙 Their unspoken timing, and yours</li>
        <li>✨ What the stars notice that the two of you don't say</li>
      </ul>
      <button
        type="button"
        onClick={onToggle}
        className={`mt-7 inline-flex items-center gap-3 px-5 py-3 rounded-full border transition ${
          checked
            ? 'border-ember-500 bg-ember-500/10 text-ember-400'
            : 'border-mist-500/30 text-mist-200 hover:border-gold-400'
        }`}
      >
        <span
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            checked ? 'border-ember-500 bg-ember-500' : 'border-mist-500/40'
          }`}
        >
          {checked && <span className="text-night-950 text-xs">✓</span>}
        </span>
        I'll use this reading with care.
      </button>
    </div>
  );
}

function OptionList({
  heart, title, hint, options, value, onChange,
}: {
  heart: string;
  title: string;
  hint?: string;
  options: { emoji: string; label: string; tag: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <HeartBadge n={heart} />
      <h2 className="font-display text-2xl md:text-3xl text-center mb-2">{title}</h2>
      {hint && <div className="text-center text-mist-400 text-sm mb-5">{hint}</div>}
      <div className="space-y-3">
        {options.map(opt => {
          const selected = value === opt.label;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onChange(opt.label)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-4 rounded-2xl border transition text-left ${
                selected
                  ? 'border-ember-500 bg-ember-500/10 text-mist-100 shadow-glow'
                  : 'border-mist-500/20 hover:border-gold-400/60 text-mist-200'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{opt.emoji}</span>
                <span>{opt.label}</span>
              </span>
              <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                selected ? 'bg-ember-500 text-night-950' : 'bg-night-700 text-mist-300'
              }`}>{opt.tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GenderStep({ heart, title, value, onChange }: {
  heart: string; title: string; value: string; onChange: (v: 'female' | 'male' | 'other') => void;
}) {
  const options: { v: 'female' | 'male' | 'other'; label: string }[] = [
    { v: 'female', label: 'Woman' },
    { v: 'male',   label: 'Man' },
    { v: 'other',  label: 'Non-binary / prefer not to say' },
  ];
  return (
    <div>
      <HeartBadge n={heart} />
      <h2 className="font-display text-2xl md:text-3xl text-center mb-5">{title}</h2>
      <div className="space-y-3">
        {options.map(o => {
          const selected = value === o.v;
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              className={`w-full px-4 py-4 rounded-2xl border transition ${
                selected
                  ? 'border-ember-500 bg-ember-500/10 text-mist-100 shadow-glow'
                  : 'border-mist-500/20 hover:border-gold-400/60 text-mist-200'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NameStep({ heart, title, subtitle, value, onChange }: {
  heart: string; title: string; subtitle?: string; value: string; onChange: (v: string) => void;
}) {
  const randomName = () => {
    const pool = ['Luna', 'Nyx', 'Orion', 'Vesper', 'Selene', 'Cassian', 'Astra', 'Rowan', 'Mira', 'Sol'];
    onChange(pool[Math.floor(Math.random() * pool.length)]);
  };
  return (
    <div>
      <HeartBadge n={heart} />
      <h2 className="font-display text-2xl md:text-3xl text-center mb-2">{title}</h2>
      {subtitle && <div className="text-center text-mist-400 text-sm mb-5">{subtitle}</div>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Type a name or nickname"
        className="w-full px-4 py-4 rounded-2xl bg-night-900/70 border border-mist-500/20 focus:border-gold-400 focus:outline-none text-mist-100 placeholder-mist-500"
        autoFocus
      />
      <button
        type="button"
        onClick={randomName}
        className="mt-3 w-full px-4 py-3 rounded-2xl border border-mist-500/20 text-mist-300 hover:border-gold-400 hover:text-gold-400 transition text-sm"
      >
        ✦ Give me a starlit nickname
      </button>
    </div>
  );
}

function BirthDateStep({ heart, title, value, onChange }: {
  heart: string; title: string; value: string; onChange: (v: string) => void;
}) {
  const [y, m, d] = (value || '').split('-');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  const months = [
    { v: '01', n: 'January' }, { v: '02', n: 'February' }, { v: '03', n: 'March' },
    { v: '04', n: 'April' }, { v: '05', n: 'May' }, { v: '06', n: 'June' },
    { v: '07', n: 'July' }, { v: '08', n: 'August' }, { v: '09', n: 'September' },
    { v: '10', n: 'October' }, { v: '11', n: 'November' }, { v: '12', n: 'December' },
  ];
  const daysInMonth = (yy: string, mm: string) => {
    const yi = parseInt(yy, 10); const mi = parseInt(mm, 10);
    if (!yi || !mi) return 31;
    return new Date(yi, mi, 0).getDate();
  };
  const days = Array.from({ length: daysInMonth(y, m) }, (_, i) => String(i + 1).padStart(2, '0'));
  const update = (ny: string, nm: string, nd: string) => {
    if (ny && nm && nd) {
      const maxD = daysInMonth(ny, nm);
      const clampedD = Math.min(parseInt(nd, 10) || 1, maxD);
      onChange(`${ny}-${nm}-${String(clampedD).padStart(2, '0')}`);
    } else {
      onChange('');
    }
  };
  const selectClass = "w-full px-3 py-4 rounded-2xl bg-night-900/70 border border-mist-500/20 focus:border-gold-400 focus:outline-none text-mist-100 appearance-none";
  return (
    <div>
      <HeartBadge n={heart} />
      <h2 className="font-display text-2xl md:text-3xl text-center mb-5">{title}</h2>
      <div className="grid grid-cols-3 gap-2">
        <select
          value={y || ''}
          onChange={e => update(e.target.value, m || '', d || '')}
          className={selectClass}
          aria-label="Year"
        >
          <option value="">Year</option>
          {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
        </select>
        <select
          value={m || ''}
          onChange={e => update(y || '', e.target.value, d || '')}
          className={selectClass}
          aria-label="Month"
        >
          <option value="">Month</option>
          {months.map(mo => <option key={mo.v} value={mo.v}>{mo.n}</option>)}
        </select>
        <select
          value={d || ''}
          onChange={e => update(y || '', m || '', e.target.value)}
          className={selectClass}
          aria-label="Day"
        >
          <option value="">Day</option>
          {days.map(dy => <option key={dy} value={dy}>{parseInt(dy, 10)}</option>)}
        </select>
      </div>
      <p className="mt-3 text-xs text-mist-400 text-center">
        Your sun sign is read from this date.
      </p>
    </div>
  );
}

function BirthTimeStep({ heart, title, value, onChange }: {
  heart: string; title: string; value: string; onChange: (v: string) => void;
}) {
  const isUnknown = value === 'unknown';
  const [h24, mm] = (!isUnknown && value ? value : '').split(':');
  const h24num = parseInt(h24, 10);
  const period: 'AM' | 'PM' = isNaN(h24num) ? 'AM' : (h24num >= 12 ? 'PM' : 'AM');
  const hour12 = isNaN(h24num) ? '' : String(((h24num + 11) % 12) + 1);
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const update = (hh12: string, min: string, per: 'AM' | 'PM') => {
    if (hh12 && min) {
      let h = parseInt(hh12, 10) % 12;
      if (per === 'PM') h += 12;
      onChange(`${String(h).padStart(2, '0')}:${min}`);
    } else {
      onChange('');
    }
  };
  const markUnknown = () => onChange('unknown');
  const selectClass = "w-full px-3 py-4 rounded-2xl bg-night-900/70 border border-mist-500/20 focus:border-gold-400 focus:outline-none text-mist-100 appearance-none";
  return (
    <div>
      <HeartBadge n={heart} />
      <h2 className="font-display text-2xl md:text-3xl text-center mb-5">{title}</h2>
      <div className="grid grid-cols-3 gap-2">
        <select
          value={isUnknown ? '' : hour12}
          onChange={e => update(e.target.value, mm || '', period)}
          className={selectClass}
          aria-label="Hour"
        >
          <option value="">Hour</option>
          {hours.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <select
          value={isUnknown ? '' : (mm || '')}
          onChange={e => update(hour12 || '', e.target.value, period)}
          className={selectClass}
          aria-label="Minute"
        >
          <option value="">Min</option>
          {minutes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={isUnknown ? '' : period}
          onChange={e => update(hour12 || '', mm || '', e.target.value as 'AM' | 'PM')}
          className={selectClass}
          aria-label="AM or PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        type="button"
        onClick={markUnknown}
        className={`mt-3 w-full px-4 py-3 rounded-2xl border transition text-sm ${
          isUnknown
            ? 'border-gold-400 text-gold-400'
            : 'border-mist-500/20 text-mist-300 hover:border-gold-400 hover:text-gold-400'
        }`}
      >
        I'm not sure of the time
      </button>
      <p className="mt-3 text-xs text-mist-400 text-center">
        Time unlocks your moon + rising signs for a more specific read.
      </p>
    </div>
  );
}

function PlaceStep({ heart, title, value, onChange }: {
  heart: string; title: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <HeartBadge n={heart} />
      <h2 className="font-display text-2xl md:text-3xl text-center mb-5">{title}</h2>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="City, Country"
        className="w-full px-4 py-4 rounded-2xl bg-night-900/70 border border-mist-500/20 focus:border-gold-400 focus:outline-none text-mist-100 placeholder-mist-500"
      />
      <p className="mt-3 text-xs text-mist-400 text-center">
        Used to calibrate rising sign and house placements.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Loading interstitial                                                      */
/* -------------------------------------------------------------------------- */

const LOADING_STEPS = [
  { label: 'Aligning the celestial bodies…',          sub: 'Reading the sky at the moment of your birth.' },
  { label: 'Mapping your sun and moon placements…',   sub: 'Where the light was when you arrived.' },
  { label: 'Locating their rising sign…',             sub: 'The face the world sees, before the person does.' },
  { label: 'Cross-referencing elements…',             sub: 'Fire, earth, air, water — who balances whom.' },
  { label: 'Measuring angular harmonics…',            sub: 'The exact geometry between your two charts.' },
  { label: 'Checking Venus chemistry…',               sub: 'The planet of affection is quite specific with you two.' },
  { label: 'Reading unspoken emotional signatures…',  sub: 'What the chart notices that the mouth forgets.' },
  { label: 'Calibrating timing windows…',             sub: 'When this connection is designed to matter.' },
  { label: 'Translating archetypes…',                 sub: 'Turning planetary data into human language.' },
  { label: 'Weighing magnetic pull…',                 sub: 'The quiet reasons you keep thinking about each other.' },
  { label: 'Composing your reading…',                 sub: 'Writing only what the stars actually said.' },
  { label: 'Finalizing your insight…',                sub: 'Almost there — breathe once, then scroll.' },
];

function LoadingInterstitial() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < LOADING_STEPS.length - 1) {
      const t = setTimeout(() => setI(i + 1), 380);
      return () => clearTimeout(t);
    }
    // After the final step, wait a short beat and navigate.
    const t = setTimeout(() => {
      if (typeof window !== 'undefined') window.location.href = '/result';
    }, 700);
    return () => clearTimeout(t);
  }, [i]);

  const pct = Math.round(((i + 1) / LOADING_STEPS.length) * 100);

  return (
    <div className="animate-fade-up">
      <div className="card-mystic text-center">
        <div className="text-5xl animate-float-slow">✦</div>
        <h2 className="mt-5 font-display text-3xl">Reading your chart…</h2>
        <div className="mt-1 text-mist-400 text-sm uppercase tracking-widest">
          Sealed compatibility · Hidden chemistry · Soulbound pull
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-mist-400 mb-2">
            <span>Analyzing</span>
            <span className="text-ember-400">{i + 1} / {LOADING_STEPS.length}</span>
          </div>
          <div className="h-1 rounded-full bg-night-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-ember-500 via-gold-400 to-ember-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-10 min-h-[88px]">
          <div className="font-display text-xl text-mist-100">{LOADING_STEPS[i].label}</div>
          <div className="mt-2 text-sm text-mist-300">{LOADING_STEPS[i].sub}</div>
        </div>
      </div>

      <div className="mt-6">
        <AdSlot slotKey="loading" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function validDate(v: string) {
  if (!v) return { ok: false, msg: 'Please enter your birth date.' };
  const d = new Date(v);
  if (isNaN(d.getTime())) return { ok: false, msg: "That doesn't look like a valid date." };
  const year = d.getFullYear();
  if (year < 1900 || year > new Date().getFullYear()) return { ok: false, msg: 'Please enter a realistic year.' };
  return { ok: true as const };
}
