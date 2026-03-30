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

const chipSyntax = 'surface(bg:surface(elevated), border:tone(brand, border), radius:14, shadow:shadow(panel)); spacing(px:10, py:8);';
const projectSyntax = 'surface(bg:surface(base), border:tone(brand, border), radius:20, shadow:shadow(panel)); spacing(p:sm); layout(display:grid, gap:sm);';
const docSyntax = 'surface(border:tone(brand, border), radius:16); spacing(p:md);';

function Chip({ children }: { children: React.ReactNode }) {
  return <Surface tone="neutral" density="compact" syntax={chipSyntax}>{children}</Surface>;
}

function ProjectCard({ title, url, image, stack }: { title: string; url: string; image: string; stack: string }) {
  return (
    <Surface tone="commercial" syntax={projectSyntax}>
      <StatusChip label={stack} tone="info" size="sm" />
      <img
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', borderRadius: '14px', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid var(--fwlb-tone-brand-border)' }}
      />
      <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="brand" size="sm" syntax="layout(width:100%);">{url}</Button>
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
        <Surface key={`${title}-docs`} tone="neutral" syntax={docSyntax}>
          <Metric label={title} value="Documentation" tone="brand" />
          <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="neutral" size="sm" syntax="spacing(mt:sm); layout(width:100%);">Open Link</Button>
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
    <ThemeScope theme="portfolio" syntax="layout(minH:100dvh); surface(bg:gradient(160deg, #fdfdfd, #edf1f6 42%, #dbdeea)); spacing(py:lg);">
      <Container size="xl" syntax="layout(maxW:1200); spacing(px:md);">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Testing', current: true }]}
          ariaLabel="Hidden testing breadcrumb"
          syntax="spacing(mb:sm);"
        />
        <Section
          surface={false}
          syntax="spacing(mb:md);"
          actions={<ActionGroup align="end" wrap><Button as="a" href="#portfolio-testing" tone="neutral" size="sm">Portfolio</Button><Button as="a" href="mailto:FadhilAkbarCariearsaIndonesia@gmail.com" tone="brand" size="sm">Contact</Button></ActionGroup>}
        >
          <HeaderShell
            eyebrow="Hidden Release"
            title="Fadhil Akbar Cariearsa — Testing Portfolio"
            subtitle="Visual rework 100% fadhilweblib (akses manual via /testing)."
            meta={<StatusChip tone="success" label="Testing Only" />}
            syntax="surface(bg:surface(base), border:tone(brand, border), radius:24, shadow:shadow(floating)); spacing(p:lg);"
          />
        </Section>

        <Grid minItemWidth="160" gap="sm" syntax="spacing(mb:md);">
          <Metric label="Projects" value={`${projects.length}`} tone="brand" />
          <Metric label="Tools" value={`${tools.length}`} tone="info" />
          <Metric label="Soft Skills" value={`${softSkills.length}`} tone="success" />
          <Metric label="Languages" value={`${languages.length}`} tone="neutral" />
        </Grid>

        <Grid columns="minmax(0,1fr) minmax(0,1fr)" minItemWidth="320" gap="md">
          <Section title="About" description="I am currently learning TypeScript, JavaScript, HTML, CSS, Luau, Lua, and Python." syntax="layout(h:100%);" slotSyntax={{ description: 'text(fs:15, fg:text(muted));' }}>
            <Notice tone="info" title="Mode" description="Halaman ini tersembunyi dan hanya bisa diakses manual via URL /testing (alias /Testing)." />
            <Grid minItemWidth="120" gap="sm" syntax="spacing(mt:sm);">{languages.map((language) => <Chip key={language}>{language}</Chip>)}</Grid>
            <Surface tone="neutral" syntax="spacing(mt:sm, p:sm); surface(border:tone(info, border), radius:16);">
              <Metric label="Portfolio Rework" value="fadhilweblib 100%" tone="info" />
              <Grid minItemWidth="160" gap="sm" syntax="spacing(mt:sm);">
                {skillProgress.map(([label, value]) => (
                  <ProgressBar key={label} label={label} value={value} max={100} tone="brand" />
                ))}
              </Grid>
            </Surface>

            <CollapsiblePanel title="Tools and Frameworks I Use" summary="Klik untuk expand" defaultOpen={false} syntax="spacing(mt:md);" slotSyntax={{ content: 'spacing(pt:sm);' }}>
              <Grid minItemWidth="180" gap="sm">
                {tools.map(([category, name]) => (
                  <Surface key={name} tone="utility" density="compact" syntax="surface(border:tone(info, border), radius:14); spacing(p:sm);">
                    <KeyValueList items={[{ key: 'Category', value: category }, { key: 'Tool', value: name }]} />
                  </Surface>
                ))}
              </Grid>
            </CollapsiblePanel>

            <CollapsiblePanel title="My Soft Skills" summary="Klik untuk expand" defaultOpen={false} syntax="spacing(mt:sm);" slotSyntax={{ content: 'spacing(pt:sm);' }}>
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
              slotSyntax={{ list: 'spacing(mb:sm);', panel: 'layout(minH:420);' }}
            />
          </Section>
        </Grid>
      </Container>
    </ThemeScope>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
