import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for CelestiaMatch.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="px-5 py-16 md:py-20">
      <div className="max-w-2xl mx-auto prose-mystic">
        <div className="tag">Terms</div>
        <h1 className="section-title mt-3">Please read softly.</h1>
        <p>
          CelestiaMatch is provided for entertainment and self-reflection. Readings and articles on
          this site are not medical, psychological, legal, or financial advice. Please do not rely
          on them for major life decisions.
        </p>
        <h2>Fair use</h2>
        <p>
          You're welcome to share your reading with the people you love. Please don't scrape the
          site, republish our writing, or use our content for harassment or manipulation of others.
        </p>
        <h2>Disclaimer</h2>
        <p>
          We do our best to make our readings feel meaningful, but we cannot guarantee any
          particular outcome, accuracy, or relationship result. Astrology is a tradition, not a
          science.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms occasionally. Continued use of the site after changes means you
          accept the new terms.
        </p>
      </div>
    </div>
  );
}
