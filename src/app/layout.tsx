import type { Metadata } from 'next';

import './globals.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'PUAGME Festival - African Golden 13th Month Celebration',
  description:
    'Join us for the PUAGME Street Festival in Addis Ababa. Experience 5 days of peace, love, pan-Africanism, community activities, and cultural celebration from September 6-10, 2025 at Entoto Park.',
  openGraph: {
    title: 'PUAGME Festival - African Golden 13th Month Celebration',
    description:
      'Join us for the PUAGME Street Festival in Addis Ababa. Experience 5 days of peace, love, pan-Africanism, community activities, and cultural celebration from September 6-10, 2025 at Entoto Park.',
    type: 'website',
    url: 'https://puagmae-festival-e6ql.onrender.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUAGME Festival - African Golden 13th Month Celebration',
    description:
      'Join us for the PUAGME Street Festival in Addis Ababa. Experience 5 days of peace, love, pan-Africanism, community activities, and cultural celebration from September 6-10, 2025 at Entoto Park.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
