'use client';

import { useEffect, useRef } from 'react';
import { AD_SLOTS, type AdSlotKey } from '@/lib/adSlots';

type Props = {
  slotKey: AdSlotKey;
  className?: string;
  /** Hide the ad entirely when no AdSense client is configured. */
  hideWhenEmpty?: boolean;
  /** Optional eyebrow label above the ad (helps with "ad above-the-fold" transparency per AdSense policy). */
  showLabel?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Reusable AdSense placement.
 *
 * When NEXT_PUBLIC_ADSENSE_CLIENT and the individual slot ID are both set,
 * renders a real AdSense <ins> element and pushes to the adsbygoogle queue.
 *
 * When the slot is not configured yet, renders a styled placeholder so the
 * layout stays intact during development and AdSense review.
 */
export function AdSlot({ slotKey, className = '', hideWhenEmpty = false, showLabel = true }: Props) {
  const ref = useRef<HTMLModElement | null>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const def = AD_SLOTS[slotKey];
  const configured = Boolean(client && def.slot);

  useEffect(() => {
    if (!configured) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // swallow — AdSense will retry on its own scan
    }
  }, [configured]);

  if (!configured) {
    if (hideWhenEmpty) return null;
    return (
      <div
        className={`w-full rounded-xl border border-dashed border-mist-500/25 bg-night-800/30 text-center text-xs uppercase tracking-widest text-mist-400 px-4 py-8 ${className}`}
        aria-hidden="true"
      >
        {showLabel && <div className="mb-1 text-[10px] opacity-70">Advertisement</div>}
        ad placeholder · {def.label}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="mb-1 text-[10px] uppercase tracking-widest text-mist-400/70 text-center">
          Advertisement
        </div>
      )}
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={def.slot}
        data-ad-format={def.format}
        data-full-width-responsive={def.responsive ? 'true' : 'false'}
      />
    </div>
  );
}
