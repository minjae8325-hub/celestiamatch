import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CelestiaMatch handles your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="px-5 py-16 md:py-20">
      <div className="max-w-2xl mx-auto prose-mystic">
        <div className="tag">Privacy</div>
        <h1 className="section-title mt-3">Your stars stay with you.</h1>
        <p>
          This page describes how CelestiaMatch ("we") handles information when you use our site.
          For the avoidance of doubt: we don't sell your data. We aim to collect as little of it as
          possible.
        </p>
        <h2>Information you enter</h2>
        <p>
          Birth details you enter into the quiz (date, time, place, names) are stored only in your
          browser's <code>sessionStorage</code>. They are used to generate your reading and are
          cleared when you close the tab. We do not send them to our servers.
        </p>
        <h2>Analytics</h2>
        <p>
          We use privacy-friendly site analytics to understand which articles resonate. Analytics do
          not include any birth information.
        </p>
        <h2>Advertising</h2>
        <p>
          We use Google AdSense to display ads. AdSense may place cookies and use identifiers to
          show relevant ads and measure their performance. You can learn more, and opt out, at{' '}
          <a href="https://policies.google.com/technologies/ads">
            policies.google.com/technologies/ads
          </a>.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about privacy? Email us at <code>privacy@celestiamatch.com</code>. We usually reply
          within a few days.
        </p>
        <p className="text-xs text-mist-500 mt-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
}
