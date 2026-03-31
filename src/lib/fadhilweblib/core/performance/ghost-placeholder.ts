export type GhostPlaceholderOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  fadeDurationMs?: number;
  blurPx?: number;
};

export type GhostPlaceholderController = {
  disconnect: () => void;
};

function createBlurSvgDataUri(hexColor: string, blurPx: number): string {
  const safeColor = hexColor || '#111827';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 20" preserveAspectRatio="none"><defs><filter id="b"><feGaussianBlur stdDeviation="${blurPx}"/></filter></defs><rect width="32" height="20" fill="${safeColor}" filter="url(#b)"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function installGhostPlaceholder(
  selector = 'img[data-src]',
  options: GhostPlaceholderOptions = {}
): GhostPlaceholderController {
  if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return { disconnect: () => undefined };
  }

  const {
    root = null,
    rootMargin = '200px 0px',
    threshold = 0.1,
    fadeDurationMs = 260,
    blurPx = 10,
  } = options;

  const nodes = Array.from(document.querySelectorAll<HTMLImageElement>(selector));

  for (const image of nodes) {
    const dominantColor = image.dataset.placeholderColor ?? '#0f172a';
    const dataUri = createBlurSvgDataUri(dominantColor, blurPx);

    if (!image.src) {
      image.src = dataUri;
    }

    image.style.filter = `blur(${blurPx}px)`;
    image.style.transform = 'scale(1.02)';
    image.style.transition = `opacity ${fadeDurationMs}ms ease, filter ${fadeDurationMs}ms ease, transform ${fadeDurationMs}ms ease`;
    image.style.opacity = image.dataset.loaded === 'true' ? '1' : '0.88';
  }

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        const image = entry.target as HTMLImageElement;
        const highResSrc = image.dataset.src;

        if (!highResSrc) {
          observer.unobserve(image);
          continue;
        }

        const preloaded = new Image();
        preloaded.src = highResSrc;

        try {
          if (typeof preloaded.decode === 'function') {
            await preloaded.decode();
          }
        } catch {
          // Silent fallback: browser may decode on paint.
        }

        image.src = highResSrc;
        image.dataset.loaded = 'true';
        image.style.filter = 'blur(0px)';
        image.style.transform = 'scale(1)';
        image.style.opacity = '1';
        image.removeAttribute('data-src');
        image.removeAttribute('data-placeholder-color');
        observer.unobserve(image);
      }
    },
    { root, rootMargin, threshold }
  );

  for (const image of nodes) {
    observer.observe(image);
  }

  return {
    disconnect: () => {
      observer.disconnect();
    },
  };
}
