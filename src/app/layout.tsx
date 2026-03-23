import type { Metadata } from 'next';
import { ThemeProvider, STORAGE_KEY } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Counter Test',
  description: 'A Next.js counter application with TypeScript',
};

/**
 * Inline script executed synchronously before the first paint.
 * It reads the persisted theme from localStorage (or falls back to the
 * OS-level prefers-color-scheme) and sets data-theme on <html> immediately,
 * so the correct CSS custom properties are applied before any content is
 * rendered — eliminating any flash of the wrong theme.
 */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (_) {}
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Blocking script: runs before CSS/paint so the correct theme token
            is applied from the very first frame — no flash of wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
