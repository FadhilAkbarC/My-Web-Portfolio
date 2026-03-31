import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/lib/fadhilweblib/styles/theme.css';
import {
  applyHeroPriorityHint,
  applyZeroJankMotion,
  Button,
  CollapsiblePanel,
  createAdaptiveHydrationEngine,
  detectSmartMediaProfile,
  enableSpeculativeNavigation,
  installGhostPlaceholder,
  resolveSmartMediaSource,
  Tabs,
  type SmartMediaProfile,
} from '../src/lib/fadhilweblib/client';
import {
  ActionGroup,
  Container,
  Grid,
  Metric,
  Section,
  StatusChip,
  Surface,
  ThemeScope,
} from '../src/lib/fadhilweblib';

const languages = ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Luau', 'Lua', 'Python'];
const softSkills = ['Teamwork', 'Collaboration', 'Communication', 'Problem Solving', 'Flexibility', 'Multitasking', 'Reliability', 'Strategic Thinking', 'Integrity'];
const tools = [
  ['Game Dev', 'Roblox Studio'],
  ['Sync Tool', 'Rojo'],
  ['Editor', 'VS Code'],
  ['Framework', 'Next.js'],
  ['Hosting', 'Railway'],
  ['Hosting', 'Vercel'],
  ['Database', 'PostgreSQL'],
  ['Database', 'MongoDB'],
  ['Game Engine', 'Godot Engine'],
  ['Platform', 'GitHub'],
  ['Versioning', 'Git'],
  ['AI Tool', 'Codex'],
  ['Builder', 'F3X'],
  ['Toolkit', 'Lemonade'],
] as const;
const projects = [
  ['MindMapper', 'https://MindMapper.qzz.io', '/images/Mindmapper.jpg', 'Built: Vercel · Railway · PostgreSQL · DB'],
  ['WebWorlds', 'https://webworlds.vercel.app', '/images/WebWorlds.jpg', 'Built: Vercel · Railway · PostgreSQL · DB'],
  ['TemplateDatabases', 'https://templatedatabases.vercel.app/', '/images/TemplateDatabase.jpg', 'Built: Vercel · Railway · PostgreSQL · DB'],
  ['Fadhil Profile', 'https://fadhil.qzz.io/', '/images/WebWorlds.jpg', 'Built: Vercel'],
] as const;

const futuristicPalette = {
  appBackground:
    'radial-gradient(circle at 18% 10%, rgba(34,211,238,0.2), transparent 35%), radial-gradient(circle at 82% 0%, rgba(99,102,241,0.25), transparent 42%), linear-gradient(160deg, #020617 0%, #05081a 55%, #0a1028 100%)',
  textStrong: '#f8fbff',
  textSoft: '#ecfeff',
  textMuted: '#c9edff',
  toneNeutralBorder: 'rgba(186, 230, 253, 0.82)',
  toneBrandBorder: 'rgba(224, 242, 254, 0.98)',
  toneInfoBorder: 'rgba(224, 242, 254, 0.96)',
} as const;

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;
  const int = Number.parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const normalize = (channel: number) => {
    const v = channel / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return (0.2126 * normalize(r)) + (0.7152 * normalize(g)) + (0.0722 * normalize(b));
}

function contrastRatio(foreground: string, background: string) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const contrastChecks = [
  ['textStrong vs baseDark', contrastRatio(futuristicPalette.textStrong, '#020617')],
  ['textSoft vs panelDark', contrastRatio(futuristicPalette.textSoft, '#05081a')],
  ['textMuted vs panelDark', contrastRatio(futuristicPalette.textMuted, '#0a1028')],
];

const aboutQuote = 'As a tech enthusiast and dedicated hobbyist developer, I am passionate about mastering Luau, TypeScript, and Python. While I hold a solid foundation in web fundamentals and JavaScript, I find genuine joy in constantly honing my craft. I thrive on refining my code and expanding my technical toolkit to build cleaner, more efficient solutions every day.';
const uniformMinItemWidth = '112';
const uniformTileStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  minHeight: '1.22rem',
  padding: '0.04rem 0.14rem',
  fontSize: '0.46rem',
  lineHeight: 0.98,
  maxWidth: '100%',
  overflow: 'visible',
  overflowWrap: 'anywhere',
};

for (const [label, ratio] of contrastChecks) {
  if (ratio < 7) {
    throw new Error(`Contrast check failed for ${label}: ${ratio.toFixed(2)} (minimum 7.00).`);
  }
}

function ProjectCard({ title, url, image, stack, mediaProfile }: { title: string; url: string; image: string; stack: string; mediaProfile: SmartMediaProfile | null }) {
  const resolvedImage = useMemo(
    () => resolveSmartMediaSource(
      { avif: undefined, webp: undefined, fallback: image },
      mediaProfile ?? { format: 'webp', networkTier: 'unknown', saveData: false, allowVideoBackground: true, fetchPriority: 'auto' }
    ),
    [image, mediaProfile]
  );

  return (
    <Surface tone="neutral" style={{ display: 'grid', gap: '0.6rem' }} data-project-card>
      <StatusChip label="Stack" value={stack} tone="info" />
      <img
        data-src={resolvedImage}
        data-placeholder-color="#0f172a"
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        width={1600}
        height={900}
        style={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid var(--fwlb-border-soft)' }}
      />
      <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="brand" size="sm">Open {title}</Button>
    </Surface>
  );
}

const projectGrid = (mediaProfile: SmartMediaProfile | null, keyPrefix = '') => (
  <Grid minItemWidth="240" gap="sm">
    {projects.map(([title, url, image, stack]) => (
      <ProjectCard key={`${keyPrefix}${title}`} title={title} url={url} image={image} stack={stack} mediaProfile={mediaProfile} />
    ))}
  </Grid>
);

function App() {
  const [mediaProfile, setMediaProfile] = useState<SmartMediaProfile | null>(null);

  useEffect(() => {
    let isMounted = true;
    const cleanups: Array<() => void> = [];
    let aboutMotionCleanup: (() => void) | null = null;

    void detectSmartMediaProfile().then((profile) => {
      if (!isMounted) {
        return;
      }

      setMediaProfile(profile);
      const heroImage = document.querySelector<HTMLImageElement>('#portfolio-testing img[data-src]');
      if (heroImage) {
        applyHeroPriorityHint(heroImage, profile);
      }
    });

    cleanups.push(installGhostPlaceholder('img[data-src]').disconnect);
    cleanups.push(enableSpeculativeNavigation({ hoverDelayMs: 150, cardSelector: '[data-project-card]' }));
    cleanups.push(
      createAdaptiveHydrationEngine(
        [
          {
            selector: '[data-about-interactive]',
            loader: async () => {
              if (aboutMotionCleanup) {
                return;
              }

              const motionTargets = document.querySelectorAll<HTMLElement>('[data-scroll-motion]');
              const onScroll = () => {
                const viewportHeight = Math.max(window.innerHeight, 1);
                for (const target of motionTargets) {
                  const rect = target.getBoundingClientRect();
                  const progress = Math.min(1, Math.max(0, 1 - rect.top / viewportHeight));
                  applyZeroJankMotion(target, progress, {
                    keyframes: [
                      { progress: 0, y: 24, opacity: 0.4, scale: 0.98 },
                      { progress: 1, y: 0, opacity: 1, scale: 1 },
                    ],
                  });
                }
              };

              onScroll();
              window.addEventListener('scroll', onScroll, { passive: true });
              aboutMotionCleanup = () => {
                window.removeEventListener('scroll', onScroll);
              };
            },
          },
        ],
        { threshold: 0.2 }
      )
    );

    return () => {
      isMounted = false;
      for (const cleanup of cleanups) {
        cleanup();
      }
      if (aboutMotionCleanup) {
        aboutMotionCleanup();
      }
    };
  }, []);

  return (
    <ThemeScope
      theme="game"
      debugTitle="Testing UI gagal dirender"
      style={{
        minHeight: '100vh',
        overflowX: 'clip',
        background: futuristicPalette.appBackground,
        color: futuristicPalette.textStrong,
        '--fwlb-surface-base': 'linear-gradient(180deg, rgba(6, 10, 28, 0.97), rgba(2, 6, 23, 0.97))',
        '--fwlb-surface-elevated': 'linear-gradient(180deg, rgba(10, 16, 38, 0.98), rgba(4, 8, 24, 0.98))',
        '--fwlb-surface-muted': 'rgba(10, 20, 48, 0.78)',
        '--fwlb-border-soft': 'rgba(159, 247, 255, 0.55)',
        '--fwlb-border-strong': 'rgba(186, 230, 253, 0.85)',
        '--fwlb-text-strong': futuristicPalette.textStrong,
        '--fwlb-text-soft': futuristicPalette.textSoft,
        '--fwlb-text-muted': futuristicPalette.textMuted,
        '--fwlb-text-accent': '#67e8f9',
        '--fwlb-tone-neutral-bg': 'linear-gradient(180deg, rgba(8, 15, 36, 0.98), rgba(4, 8, 26, 0.98))',
        '--fwlb-tone-neutral-fg': futuristicPalette.textStrong,
        '--fwlb-tone-neutral-border': futuristicPalette.toneNeutralBorder,
        '--fwlb-tone-brand-bg': 'linear-gradient(135deg, rgba(30, 64, 175, 0.98), rgba(34, 211, 238, 0.95))',
        '--fwlb-tone-brand-fg': futuristicPalette.textStrong,
        '--fwlb-tone-brand-border': futuristicPalette.toneBrandBorder,
        '--fwlb-tone-info-bg': 'linear-gradient(135deg, rgba(67, 56, 202, 0.96), rgba(56, 189, 248, 0.94))',
        '--fwlb-tone-info-fg': futuristicPalette.textStrong,
        '--fwlb-tone-info-border': futuristicPalette.toneInfoBorder,
        '--fwlb-button-default-box-shadow': 'none',
        '--fwlb-button-hover-box-shadow': 'none',
        '--fwlb-button-active-box-shadow': 'none',
        '--fwlb-button-focus-box-shadow': 'none',
        '--fwlb-button-open-box-shadow': 'none',
        '--fwlb-button-current-state-box-shadow': 'none',
        '--fwlb-button-loading-box-shadow': 'none',
        '--fwlb-button-disabled-box-shadow': 'none',
        '--fwlb-button-hover-transform': 'none',
        '--fwlb-button-active-transform': 'none',
        '--fwlb-button-focus-ring-width': '2px',
      } as React.CSSProperties}
    >
      <Surface
        tone="neutral"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          padding: '0.2rem 0',
          minHeight: '2.1rem',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container size="xl">
          <ActionGroup align="center" justify="between" wrap>
            <StatusChip label="Secret" value="/testing" tone="warning" />
            <ActionGroup align="center" wrap>
              <Button as="a" href="#about-testing" tone="neutral" size="xs">About</Button>
              <Button as="a" href="#portfolio-testing" tone="neutral" size="xs">Portfolio</Button>
              <Button as="a" href="mailto:FadhilAkbarCariearsaIndonesia@gmail.com" tone="brand" size="xs">Contact</Button>
            </ActionGroup>
          </ActionGroup>
        </Container>
      </Surface>

      <Container size="xl" style={{ paddingTop: '0.55rem', paddingBottom: '1.6rem' }}>

        <Grid columns="0.95fr 1.05fr" minItemWidth="320" gap="md">
          <Section
            id="about-testing"
            eyebrow="Fadhil Akbar Cariearsa"
            title="About me"
            data-about-interactive
            description={(
              <span style={{ display: 'block', fontSize: '0.8rem', lineHeight: 1.45 }} data-scroll-motion>
                <span style={{ color: 'var(--fwlb-text-accent)', fontWeight: 900 }}>&ldquo;</span>
                {aboutQuote}
                <span style={{ color: 'var(--fwlb-text-accent)', fontWeight: 900 }}>&rdquo;</span>
              </span>
            )}
          >
            <Grid minItemWidth={uniformMinItemWidth} gap="sm">
              {languages.map((language) => (
                <Surface
                  key={language}
                  tone="neutral"
                  density="compact"
                  style={uniformTileStyle}
                >
                  {language}
                </Surface>
              ))}
            </Grid>

            <CollapsiblePanel title="Tools and Frameworks I Use" summary="Klik untuk expand" defaultOpen={false}>
              <Grid minItemWidth={uniformMinItemWidth} gap="sm">
                {tools.map(([category, name]) => (
                  <Surface key={name} tone="utility" density="compact" style={uniformTileStyle}>
                    <div style={{ display: 'grid', gap: '0.1rem', minWidth: 0, width: '100%' }}>
                      <div style={{ fontSize: '0.4rem', lineHeight: 0.95, letterSpacing: '0.015em', color: 'var(--fwlb-text-muted)', overflowWrap: 'anywhere' }}>
                        {category}
                      </div>
                      <div style={{ fontSize: '0.44rem', lineHeight: 0.95, color: 'var(--fwlb-text-strong)', overflowWrap: 'anywhere' }}>
                        {name}
                      </div>
                    </div>
                  </Surface>
                ))}
              </Grid>
            </CollapsiblePanel>

            <CollapsiblePanel title="My Soft Skills" summary="Klik untuk expand" defaultOpen={false}>
              <Grid minItemWidth={uniformMinItemWidth} gap="sm">
                {softSkills.map((skill) => (
                  <Surface
                    key={skill}
                    tone="neutral"
                    density="compact"
                    style={uniformTileStyle}
                  >
                    {skill}
                  </Surface>
                ))}
              </Grid>
            </CollapsiblePanel>
          </Section>

          <Section id="portfolio-testing" title="My Learning Portfolio">
            <StatusChip
              label="Media"
              value={mediaProfile ? `${mediaProfile.format.toUpperCase()} · ${mediaProfile.networkTier}` : 'Detecting'}
              tone={mediaProfile?.allowVideoBackground === false ? 'warning' : 'info'}
            />
            <Tabs
              defaultValue="projects"
              keepMounted
              items={[
                { value: 'projects', label: 'Projects', content: projectGrid(mediaProfile) },
                { value: 'image', label: 'Image', content: projectGrid(mediaProfile, 'image-') },
                {
                  value: 'docs',
                  label: 'Documentation',
                  content: (
                    <Grid minItemWidth="220" gap="sm">
                      {projects.slice(0, 3).map(([title, url]) => (
                        <Surface key={`${title}-docs`} tone="neutral">
                          <Metric label={title} value="Documentation" tone="brand" />
                          <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="neutral" size="sm">Open Link</Button>
                        </Surface>
                      ))}
                    </Grid>
                  ),
                },
              ]}
            />
            <Surface
              tone="neutral"
              density="compact"
              style={{ marginTop: '0.55rem', padding: '0.35rem', boxShadow: 'none' }}
            >
              <Grid columns="repeat(4, minmax(0, 1fr))" minItemWidth="90" gap="sm">
                <Metric label="Projects" value={`${projects.length}`} tone="brand" density="compact" />
                <Metric label="Tools" value={`${tools.length}`} tone="info" density="compact" />
                <Metric label="Soft Skills" value={`${softSkills.length}`} tone="success" density="compact" />
                <Metric label="Languages" value={`${languages.length}`} tone="neutral" density="compact" />
              </Grid>
            </Surface>
          </Section>
        </Grid>
      </Container>
    </ThemeScope>
  );
}

const mountNode = document.getElementById('app');
if (!mountNode) {
  throw new Error('Missing #app mount node for /testing page.');
}
createRoot(mountNode).render(<App />);
