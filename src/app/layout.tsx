import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { GpsJammingToast } from '@/components/GpsJammingToast';
import CallMeBackButton from '@/components/CallMeBackButton';
import { ContactDialogProvider } from '@/hooks/use-contact-dialog.tsx';
import { PT_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'ГЕОСТРОЙПРОЕКТ - Кадастровые работы и геодезические услуги в Санкт-Петербурге',
  description: 'Профессиональные геодезические услуги с 2003 года: межевание, топосъемка, ЗОУИТ, технические планы в СПб и ЛО',
};

const ptSans = PT_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn("font-body antialiased", ptSans.variable)}>
        <ContactDialogProvider>
          <CallMeBackButton />
          <div vaul-drawer-wrapper="" className="min-h-screen flex flex-col">
            <Header />
            <div className="relative flex-grow flex flex-col">
              <main className="relative z-10 flex-grow bg-background">{children}</main>
              <Footer />
            </div>
          </div>
          <Toaster />
          <GpsJammingToast />
        </ContactDialogProvider>
      </body>
    </html>
  );
}
