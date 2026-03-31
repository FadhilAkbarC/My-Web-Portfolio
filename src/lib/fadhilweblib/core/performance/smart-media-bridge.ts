export type NetworkTier = 'fast' | 'slow' | 'unknown';

export type SmartMediaProfile = {
  readonly format: 'avif' | 'webp';
  readonly networkTier: NetworkTier;
  readonly saveData: boolean;
  readonly allowVideoBackground: boolean;
  readonly fetchPriority: 'high' | 'auto';
};

type MediaSupport = {
  avif: boolean;
  webp: boolean;
};

const AVIF_TEST_IMAGE = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFtaWFn';
const WEBP_TEST_IMAGE = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA=';

function canUseImageDecoder(): boolean {
  return typeof Image !== 'undefined';
}

function probeImageSupport(src: string): Promise<boolean> {
  if (!canUseImageDecoder()) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

function getNetworkTier(): { tier: NetworkTier; saveData: boolean } {
  const connection =
    typeof navigator !== 'undefined'
      ? ((navigator as Navigator & {
          connection?: { effectiveType?: string; saveData?: boolean };
          mozConnection?: { effectiveType?: string; saveData?: boolean };
          webkitConnection?: { effectiveType?: string; saveData?: boolean };
        }).connection ||
        (navigator as Navigator & { mozConnection?: { effectiveType?: string; saveData?: boolean } }).mozConnection ||
        (navigator as Navigator & { webkitConnection?: { effectiveType?: string; saveData?: boolean } }).webkitConnection)
      : undefined;

  const effectiveType = connection?.effectiveType ?? '';
  const saveData = Boolean(connection?.saveData);

  if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
    return { tier: 'slow', saveData };
  }

  if (effectiveType === '4g' || effectiveType === '5g') {
    return { tier: 'fast', saveData };
  }

  return { tier: 'unknown', saveData };
}

export async function detectSmartMediaProfile(): Promise<SmartMediaProfile> {
  const [avif, webp] = await Promise.all([probeImageSupport(AVIF_TEST_IMAGE), probeImageSupport(WEBP_TEST_IMAGE)]);
  const support: MediaSupport = { avif, webp };
  const { tier, saveData } = getNetworkTier();

  const prefersCompression = saveData || tier === 'slow';
  const preferredFormat = !prefersCompression && support.avif ? 'avif' : support.webp ? 'webp' : support.avif ? 'avif' : 'webp';

  return {
    format: preferredFormat,
    networkTier: tier,
    saveData,
    allowVideoBackground: !prefersCompression,
    fetchPriority: prefersCompression ? 'auto' : 'high',
  };
}

export function resolveSmartMediaSource(sources: { avif?: string; webp?: string; fallback: string }, profile: SmartMediaProfile): string {
  if (profile.format === 'avif' && sources.avif) {
    return sources.avif;
  }

  if (sources.webp) {
    return sources.webp;
  }

  return sources.fallback;
}

export function applyHeroPriorityHint(image: HTMLImageElement, profile: SmartMediaProfile): void {
  image.setAttribute('fetchpriority', profile.fetchPriority);
}
