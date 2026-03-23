import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Counter Test',
  description: 'A Next.js counter application with TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
