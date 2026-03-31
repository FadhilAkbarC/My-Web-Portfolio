export type AdaptiveHydrationTarget = {
  selector: string;
  loader: () => Promise<unknown>;
};

export type AdaptiveHydrationOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function createAdaptiveHydrationEngine(
  targets: AdaptiveHydrationTarget[],
  options: AdaptiveHydrationOptions = {}
): () => void {
  if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return () => undefined;
  }

  const { threshold = 0.2, rootMargin = '120px 0px' } = options;
  const loadedSelectors = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < threshold) {
          continue;
        }

        const element = entry.target as Element;
        const selector = element.getAttribute('data-hydrate-selector');

        if (!selector || loadedSelectors.has(selector)) {
          observer.unobserve(element);
          continue;
        }

        const target = targets.find((candidate) => candidate.selector === selector);

        if (!target) {
          observer.unobserve(element);
          continue;
        }

        loadedSelectors.add(selector);
        void target.loader();
        observer.unobserve(element);
      }
    },
    { threshold, rootMargin }
  );

  for (const target of targets) {
    const elements = document.querySelectorAll(target.selector);

    for (const element of elements) {
      element.setAttribute('data-hydrate-selector', target.selector);
      observer.observe(element);
    }
  }

  return () => {
    observer.disconnect();
  };
}
