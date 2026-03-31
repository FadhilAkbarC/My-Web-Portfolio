import React from 'react';
import { createRoot } from 'react-dom/client';
import '../src/lib/fadhilweblib/styles/theme.css';
import { Button, CollapsiblePanel, Tabs } from '../src/lib/fadhilweblib/client';
import {
  ActionGroup,
  Breadcrumbs,
  Container,
  EmptyState,
  Grid,
  HeaderShell,
  KeyValueList,
  Metric,
  Notice,
  ProgressBar,
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

function Chip({ children }: { children: React.ReactNode }) {
  return <Surface tone="neutral" density="compact">{children}</Surface>;
}

function ProjectCard({ title, url, image, stack }: { title: string; url: string; image: string; stack: string }) {
  return (
    <Surface tone="commercial">
      <StatusChip label={stack} tone="info" size="sm" />
      <img
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', borderRadius: '14px', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid var(--fwlb-tone-brand-border)' }}
      />
      <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="brand" size="sm">{url}</Button>
    </Surface>
  );
}

const projectCards = (keyPrefix = '') => (
  <Grid minItemWidth="220" gap="sm">
    {projects.map(([title, url, image, stack]) => <ProjectCard key={`${keyPrefix}${title}`} title={title} url={url} image={image} stack={stack} />)}
  </Grid>
);

function App() {
  const docs = (
    <Grid minItemWidth="220" gap="sm">
      {projects.slice(0, 3).map(([title, url]) => (
        <Surface key={`${title}-docs`} tone="neutral">
          <Metric label={title} value="Documentation" tone="brand" />
          <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="neutral" size="sm">Open Link</Button>
        </Surface>
      ))}
    </Grid>
  );
  const skillProgress = [
    ['TypeScript', 66],
    ['JavaScript', 82],
    ['HTML/CSS', 87],
    ['Luau/Lua', 78],
    ['Python', 62],
  ] as const;

  return (
    <ThemeScope theme="portfolio" debugTitle="Testing UI gagal dirender">
      <Container size="xl">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Testing', current: true }]}
          ariaLabel="Hidden testing breadcrumb"
        />
        <Section
          surface={false}
          actions={<ActionGroup align="end" wrap><Button as="a" href="#portfolio-testing" tone="neutral" size="sm">Portfolio</Button><Button as="a" href="mailto:FadhilAkbarCariearsaIndonesia@gmail.com" tone="brand" size="sm">Contact</Button></ActionGroup>}
        >
          <HeaderShell
            eyebrow="Hidden Release"
            title="Fadhil Akbar Cariearsa — Testing Portfolio"
            subtitle="Visual rework 100% fadhilweblib (akses manual via /testing)."
            meta={<StatusChip tone="success" label="Testing Only" />}
          />
        </Section>

        <Grid minItemWidth="160" gap="sm">
          <Metric label="Projects" value={`${projects.length}`} tone="brand" />
          <Metric label="Tools" value={`${tools.length}`} tone="info" />
          <Metric label="Soft Skills" value={`${softSkills.length}`} tone="success" />
          <Metric label="Languages" value={`${languages.length}`} tone="neutral" />
        </Grid>

        <Grid columns="minmax(0,1fr) minmax(0,1fr)" minItemWidth="320" gap="md">
          <Section title="About" description="I am currently learning TypeScript, JavaScript, HTML, CSS, Luau, Lua, and Python.">
            <Notice tone="info" title="Mode" description="Halaman ini tersembunyi dan hanya bisa diakses manual via URL /testing (alias /Testing)." />
            <Grid minItemWidth="120" gap="sm">{languages.map((language) => <Chip key={language}>{language}</Chip>)}</Grid>
            <Surface tone="neutral">
              <Metric label="Portfolio Rework" value="fadhilweblib 100%" tone="info" />
              <Grid minItemWidth="160" gap="sm">
                {skillProgress.map(([label, value]) => (
                  <ProgressBar key={label} label={label} value={value} max={100} tone="brand" />
                ))}
              </Grid>
            </Surface>

            <CollapsiblePanel title="Tools and Frameworks I Use" summary="Klik untuk expand" defaultOpen={false}>
              <Grid minItemWidth="180" gap="sm">
                {tools.map(([category, name]) => (
                  <Surface key={name} tone="utility" density="compact">
                    <KeyValueList items={[{ key: 'Category', value: category }, { key: 'Tool', value: name }]} />
                  </Surface>
                ))}
              </Grid>
            </CollapsiblePanel>

            <CollapsiblePanel title="My Soft Skills" summary="Klik untuk expand" defaultOpen={false}>
              <Grid minItemWidth="140" gap="sm">{softSkills.map((skill) => <Chip key={skill}>{skill}</Chip>)}</Grid>
            </CollapsiblePanel>
          </Section>

          <Section id="portfolio-testing" title="My Learning Portfolio" description="Konten dipertahankan, visual dirework full dengan fadhilweblib.">
            <Tabs
              defaultValue="projects"
              keepMounted
              items={[
                { value: 'projects', label: 'Projects', content: projectCards() },
                { value: 'image', label: 'Image', content: projectCards('image-') },
                { value: 'docs', label: 'Documentation', content: docs },
                {
                  value: 'notes',
                  label: 'Notes',
                  content: (
                    <EmptyState
                      title="Eksperimen desain tetap fleksibel"
                      description="Konten portfolio utama dipertahankan, area ini disiapkan untuk eksperimen visual tambahan di fadhilweblib."
                      action={<Button as="a" href="mailto:FadhilAkbarCariearsaIndonesia@gmail.com" tone="brand" size="sm">Submit Feedback</Button>}
                    />
                  ),
                },
              ]}
            />
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

try {
  createRoot(mountNode).render(<App />);
} catch (error) {
  mountNode.innerHTML = `
    <section style="max-width:760px;margin:40px auto;padding:20px;border-radius:16px;border:1px solid #334155;background:#0f172a;color:#e2e8f0;font-family:system-ui,sans-serif;">
      <h1 style="margin:0 0 12px;font-size:1.25rem;">Testing page gagal dimuat sempurna</h1>
      <p style="margin:0 0 12px;line-height:1.6;">Terjadi error runtime saat me-render portfolio rework. Silakan refresh halaman atau coba lagi beberapa saat.</p>
      <a href="/" style="display:inline-block;padding:10px 14px;border-radius:10px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;">Kembali ke halaman utama</a>
    </section>
  `;
  console.error('[testing-page] render failed:', error);
}
