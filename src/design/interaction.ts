export const scrollThresholds = {
  stickyHeaderPx: 240,
  backToTopPx: 640,
} as const;

export const revealObserver = {
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.08,
} as const;

export const initiallyVisibleViewportFraction = 0.92;
