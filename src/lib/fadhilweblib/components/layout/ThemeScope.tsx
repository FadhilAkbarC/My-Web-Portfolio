import React from 'react';
import type { LayoutElement, ThemeScopeProps } from '../../core/types';
import { cx } from '../../core/cx';
import { composeSyntax, resolveSyntax } from '../../core/syntax';

interface ThemeScopeErrorBoundaryState {
  error: Error | null;
  componentStack: string;
}

class ThemeScopeErrorBoundary extends React.Component<{
  children?: React.ReactNode;
  debugTitle?: React.ReactNode;
}, ThemeScopeErrorBoundaryState> {
  constructor(props: { children?: React.ReactNode; debugTitle?: React.ReactNode }) {
    super(props);
    this.state = { error: null, componentStack: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { error, componentStack: '' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, componentStack: info.componentStack ?? '' });
    console.error('[fadhilweblib] ThemeScope render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <section style={{ maxWidth: '1100px', margin: '16px auto', padding: '18px', border: '1px solid #b91c1c', borderRadius: '14px', background: '#140a0a', color: '#fee2e2', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
        <h2 style={{ margin: '0 0 10px', fontFamily: 'system-ui,sans-serif', color: '#fecaca' }}>{this.props.debugTitle ?? 'fadhilweblib debug render error'}</h2>
        <p style={{ margin: '0 0 10px', fontFamily: 'system-ui,sans-serif', lineHeight: 1.5 }}>
          Komponen gagal dirender. Detail error ditampilkan agar mudah dianalisa.
        </p>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>
{`${this.state.error.name}: ${this.state.error.message}

${this.state.error.stack ?? 'No stack trace available'}

Component stack:
${this.state.componentStack || 'No component stack available'}`}
        </pre>
      </section>
    );
  }
}

export function ThemeScope({
  as = 'div',
  theme = 'base',
  debugBoundary = true,
  debugTitle,
  syntax,
  recipe,
  className,
  style,
  children,
  ...props
}: ThemeScopeProps) {
  const Component = as as LayoutElement;
  const rootSyntax = resolveSyntax(composeSyntax(recipe?.syntax, syntax));

  return (
    <Component
      {...(recipe?.attrs as Record<string, unknown> | undefined)}
      {...(rootSyntax.attrs as Record<string, unknown> | undefined)}
      {...props}
      className={cx(className)}
      style={{ ...rootSyntax.style, ...style }}
      data-fwlb-theme={theme}
      data-slot={(props as Record<string, unknown>)['data-slot'] ?? 'theme-scope'}
    >
      {debugBoundary ? (
        <ThemeScopeErrorBoundary debugTitle={debugTitle}>{children}</ThemeScopeErrorBoundary>
      ) : children}
    </Component>
  );
}
