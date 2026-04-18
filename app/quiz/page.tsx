import type { Metadata } from 'next';
import { QuizFlow } from '@/components/QuizFlow';

export const metadata: Metadata = {
  title: 'Free compatibility reading',
  description:
    "Answer a few gentle questions about you and the person you're curious about. We'll read the resonance between your Western astrology charts in about a minute.",
  alternates: { canonical: '/quiz' },
};

export default function QuizPage() {
  return (
    <div className="relative px-5 py-10 md:py-16">
      <div className="max-w-xl mx-auto">
        <QuizFlow />
      </div>
    </div>
  );
}
