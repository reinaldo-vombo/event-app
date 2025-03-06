import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/lib/provider/SessionWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'http://localhost:3000';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME, AUTHOR_NAME } = process.env;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_CREATOR,
      site: TWITTER_SITE
    }
  }),
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  applicationName: 'Eventify',
  description: 'Descubra e participe dos melhores eventos ao seu redor! Conecte-se com pessoas, explore experiências exclusivas e fique por dentro das últimas novidades em eventos sociais, conferências, shows e muito mais.',
  authors: {
    name: AUTHOR_NAME,
    url: 'https://github.com/reinaldo-vombo'
  },
  keywords: ['Eventos', 'Networking', 'Ingressos', 'Shows', 'Conferências', 'Festivais', 'Palestras', 'Comunidade', 'Experiências', 'Agenda de Eventos',],
  creator: 'Reinaldo Vombo',
  publisher: 'Reinaldo Vombo',
  alternates: {
    canonical: '/',
    languages: {
      'pt': '/pt-PT'
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="pt">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          {children}
          <Toaster richColors position='bottom-center' />
        </body>
      </html>
    </SessionWrapper>
  );
}
