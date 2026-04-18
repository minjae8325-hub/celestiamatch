/**
 * AdSense slot registry.
 *
 * How to wire up your real AdSense slots
 * ---------------------------------------
 * 1. In AdSense dashboard: Ads → By ad unit → Create new ad unit (Display / In-feed / In-article).
 * 2. After creation you'll get a "data-ad-slot" value like "1234567890".
 * 3. Paste it below (or expose via NEXT_PUBLIC_ADSENSE_SLOT_* env vars if you prefer).
 *
 * If `slot` is empty the <AdSlot /> component will render a styled PLACEHOLDER in dev,
 * so the layout stays intact while you wait for AdSense approval.
 */

export type AdSlotKey =
  | 'header'
  | 'resultTop'
  | 'resultMid'
  | 'resultBottom'
  | 'infeed'
  | 'sidebar'
  | 'loading'
  | 'blogInline';

export const AD_SLOTS: Record<AdSlotKey, { slot: string; format: string; responsive: boolean; label: string }> = {
  header:        { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER        || '', format: 'auto',     responsive: true,  label: 'Header banner' },
  resultTop:     { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_TOP    || '', format: 'auto',     responsive: true,  label: 'Result top' },
  resultMid:     { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_MID    || '', format: 'fluid',    responsive: true,  label: 'Result inline' },
  resultBottom:  { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT_BOTTOM || '', format: 'auto',     responsive: true,  label: 'Result bottom' },
  infeed:        { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED        || '', format: 'fluid',    responsive: true,  label: 'In-feed' },
  sidebar:       { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR       || '', format: 'vertical', responsive: true,  label: 'Sidebar (desktop)' },
  loading:       { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOADING       || '', format: 'auto',     responsive: true,  label: 'Loading interstitial' },
  blogInline:    { slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INLINE   || '', format: 'fluid',    responsive: true,  label: 'Blog inline' },
};
