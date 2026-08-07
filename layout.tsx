import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spencer AI Widget',
  description: 'Talk to Spencer - Territory Builder, Reaches CEOs Cold',
  viewport: 'width=device-width, initial-scale=1',
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
