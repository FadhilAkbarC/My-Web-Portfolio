export type MotionKeyframe = {
  progress: number;
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
};

export type MotionConfig = {
  keyframes: MotionKeyframe[];
  clamp?: boolean;
};

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function interpolateKeyframe(keyframes: MotionKeyframe[], progress: number): Required<Omit<MotionKeyframe, 'progress'>> {
  const sorted = [...keyframes].sort((a, b) => a.progress - b.progress);
  const safeProgress = clamp(progress);

  let from = sorted[0];
  let to = sorted[sorted.length - 1];

  for (const frame of sorted) {
    if (frame.progress <= safeProgress) {
      from = frame;
    }

    if (frame.progress >= safeProgress) {
      to = frame;
      break;
    }
  }

  const span = Math.max(0.00001, to.progress - from.progress);
  const localProgress = clamp((safeProgress - from.progress) / span);

  return {
    x: lerp(from.x ?? 0, to.x ?? from.x ?? 0, localProgress),
    y: lerp(from.y ?? 0, to.y ?? from.y ?? 0, localProgress),
    scale: lerp(from.scale ?? 1, to.scale ?? from.scale ?? 1, localProgress),
    opacity: lerp(from.opacity ?? 1, to.opacity ?? from.opacity ?? 1, localProgress),
  };
}

export function applyZeroJankMotion(element: HTMLElement, scrollProgress: number, config: MotionConfig): void {
  const sampled = interpolateKeyframe(config.keyframes, config.clamp === false ? scrollProgress : clamp(scrollProgress));
  const transform = `translate3d(${sampled.x}px, ${sampled.y}px, 0) scale(${sampled.scale})`;

  element.style.willChange = 'transform, opacity';
  element.style.transform = transform;
  element.style.opacity = String(sampled.opacity);
}

export function createMotionStyle(config: { x?: number; y?: number; scale?: number; opacity?: number }): Record<string, string> {
  const x = config.x ?? 0;
  const y = config.y ?? 0;
  const scale = config.scale ?? 1;
  const opacity = config.opacity ?? 1;

  return {
    willChange: 'transform, opacity',
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    opacity: String(opacity),
  };
}
