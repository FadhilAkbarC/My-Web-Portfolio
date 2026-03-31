export { createAdaptiveHydrationEngine } from './adaptive-hydration';
export type { AdaptiveHydrationOptions, AdaptiveHydrationTarget } from './adaptive-hydration';

export { installGhostPlaceholder } from './ghost-placeholder';
export type { GhostPlaceholderController, GhostPlaceholderOptions } from './ghost-placeholder';

export { applyHeroPriorityHint, detectSmartMediaProfile, resolveSmartMediaSource } from './smart-media-bridge';
export type { NetworkTier, SmartMediaProfile } from './smart-media-bridge';

export { enableSpeculativeNavigation } from './speculative-navigation';
export type { SpeculativeNavigationOptions } from './speculative-navigation';

export { applyZeroJankMotion, createMotionStyle } from './zero-jank-motion';
export type { MotionConfig, MotionKeyframe } from './zero-jank-motion';
