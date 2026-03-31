export type SpeculativeNavigationOptions = {
  hoverDelayMs?: number;
  cardSelector?: string;
  hrefResolver?: (card: Element) => string | null;
};

function supportsSpeculationRules(): boolean {
  if (typeof HTMLScriptElement === 'undefined') {
    return false;
  }

  return Boolean((HTMLScriptElement as typeof HTMLScriptElement & { supports?: (type: string) => boolean }).supports?.('speculationrules'));
}

function upsertSpeculationRule(urls: string[]): void {
  const id = 'fwlb-speculation-rules';
  const existing = document.getElementById(id);
  const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script');

  script.id = id;
  script.type = 'speculationrules';
  script.textContent = JSON.stringify({
    prerender: [
      {
        source: 'list',
        urls,
      },
    ],
  });

  if (!existing) {
    document.head.append(script);
  }
}

export function enableSpeculativeNavigation(options: SpeculativeNavigationOptions = {}): () => void {
  if (typeof document === 'undefined') {
    return () => undefined;
  }

  if (!supportsSpeculationRules()) {
    return () => undefined;
  }

  const { hoverDelayMs = 150, cardSelector = '[data-project-card]', hrefResolver } = options;
  const pendingTimers = new WeakMap<Element, number>();
  const trackedUrls = new Set<string>();

  const getHref = (card: Element): string | null => {
    if (hrefResolver) {
      return hrefResolver(card);
    }

    const link = card.matches('a[href]') ? card : card.querySelector('a[href]');
    return link instanceof HTMLAnchorElement ? link.href : null;
  };

  const onPointerEnter = (event: Event): void => {
    const card = (event.target as Element | null)?.closest(cardSelector);

    if (!card) {
      return;
    }

    const timerId = window.setTimeout(() => {
      const url = getHref(card);

      if (!url || trackedUrls.has(url)) {
        return;
      }

      trackedUrls.add(url);
      upsertSpeculationRule(Array.from(trackedUrls));
    }, hoverDelayMs);

    pendingTimers.set(card, timerId);
  };

  const clearTimer = (card: Element): void => {
    const timerId = pendingTimers.get(card);

    if (typeof timerId === 'number') {
      window.clearTimeout(timerId);
      pendingTimers.delete(card);
    }
  };

  const onPointerLeave = (event: Event): void => {
    const card = (event.target as Element | null)?.closest(cardSelector);

    if (card) {
      clearTimer(card);
    }
  };

  document.addEventListener('pointerenter', onPointerEnter, true);
  document.addEventListener('pointerleave', onPointerLeave, true);

  return () => {
    document.removeEventListener('pointerenter', onPointerEnter, true);
    document.removeEventListener('pointerleave', onPointerLeave, true);
  };
}
