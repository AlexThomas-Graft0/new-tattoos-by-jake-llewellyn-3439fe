import { CookieBanner } from "@/components/CookieBanner";
import './globals.css';
import { Playfair_Display, JetBrains_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
});

export const metadata = {
  title: 'New Tattoos by Jake Llewellyn',
  description: 'New Tattoos by Jake Llewellyn',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-white text-[#111827] antialiased min-h-screen flex flex-col">
        {children}
              <CookieBanner />
      </body>
    </html>
  );
}