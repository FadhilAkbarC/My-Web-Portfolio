import React from 'react';
import { createRoot } from 'react-dom/client';
import '../src/lib/fadhilweblib/styles/theme.css';
import { Button, CollapsiblePanel, Tabs } from '../src/lib/fadhilweblib/client';
import {
  ActionGroup,
  Container,
  Grid,
  HeaderShell,
  KeyValueList,
  Metric,
  Notice,
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

function ProjectCard({ title, url, image, stack }: { title: string; url: string; image: string; stack: string }) {
  return (
    <Surface tone="neutral" style={{ display: 'grid', gap: '0.6rem' }}>
      <StatusChip label="Stack" value={stack} tone="info" />
      <img
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover', border: '1px solid var(--fwlb-border-soft)' }}
      />
      <Button as="a" href={url} target="_blank" rel="noopener noreferrer" tone="brand" size="sm">Open {title}</Button>
    </Surface>
  );
}

const projectGrid = (keyPrefix = '') => (
  <Grid minItemWidth="240" gap="sm">
    {projects.map(([title, url, image, stack]) => (
      <ProjectCard key={`${keyPrefix}${title}`} title={title} url={url} image={image} stack={stack} />
    ))}
  </Grid>
);

function App() {
  return (
    <ThemeScope theme="commercial" debugTitle="Testing UI gagal dirender">
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
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container size="xl">
          <ActionGroup align="center" justify="between" wrap>
            <StatusChip label="Secret" value="/testing" tone="warning" />
            <ActionGroup align="center" wrap>
              <Button as="a" href="#about-testing" tone="neutral" size="sm">About</Button>
              <Button as="a" href="#portfolio-testing" tone="neutral" size="sm">Portfolio</Button>
              <Button as="a" href="mailto:FadhilAkbarCariearsaIndonesia@gmail.com" tone="brand" size="sm">Contact</Button>
            </ActionGroup>
          </ActionGroup>
        </Container>
      </Surface>

      <Container size="xl" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <Section
          surface={false}
          actions={<StatusChip label="Mode" value="Hidden Testing" tone="success" />}
        >
          <HeaderShell
            eyebrow="Replica Mode"
            title="Fadhil Akbar Cariearsa | Testing Replica"
            subtitle="Replikasi konten utama fadhil.qzz.io memakai 100% komponen fadhilweblib dengan kontrol layout penuh."
          />
        </Section>

        <Grid minItemWidth="170" gap="sm" style={{ marginBottom: '0.8rem' }}>
          <Metric label="Projects" value={`${projects.length}`} tone="brand" />
          <Metric label="Tools" value={`${tools.length}`} tone="info" />
          <Metric label="Soft Skills" value={`${softSkills.length}`} tone="success" />
          <Metric label="Languages" value={`${languages.length}`} tone="neutral" />
        </Grid>

        <Grid columns="0.95fr 1.05fr" minItemWidth="320" gap="md">
          <Section id="about-testing" title="About" description="I am currently learning TypeScript, JavaScript, HTML, CSS, Luau, Lua, and Python.">
            <Notice tone="info" title="Akses Rahasia" description="Halaman ini tersembunyi dan hanya bisa diakses manual via URL /testing." />

            <Grid minItemWidth="130" gap="sm">
              {languages.map((language) => (
                <Surface key={language} tone="neutral" density="compact">{language}</Surface>
              ))}
            </Grid>

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
              <Grid minItemWidth="140" gap="sm">
                {softSkills.map((skill) => (
                  <Surface key={skill} tone="neutral" density="compact">{skill}</Surface>
                ))}
              </Grid>
            </CollapsiblePanel>
          </Section>

          <Section id="portfolio-testing" title="My Learning Portfolio" description="Replikasi tab portfolio utama.">
            <Tabs
              defaultValue="projects"
              keepMounted
              items={[
                { value: 'projects', label: 'Projects', content: projectGrid() },
                { value: 'image', label: 'Image', content: projectGrid('image-') },
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
