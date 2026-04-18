import type { Metadata } from 'next';
import { ResultView } from '@/components/ResultView';

export const metadata: Metadata = {
  title: 'Your cosmic compatibility reading',
  description:
    'A personalized Western astrology reading of your compatibility, written for the two of you — not a horoscope. Free and takes a minute.',
  alternates: { canonical: '/result' },
  robots: { index: false, follow: true }, // personalized, not indexable
};

export default function ResultPage() {
  return (
    <div className="relative px-5 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <ResultView />
      </div>
    </div>
  );
}
