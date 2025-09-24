import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ContactSheet } from '@/components/ContactSheet';

export const metadata: Metadata = {
  title: 'ГЕОСТРОЙПРОЕКТ - Кадастровые работы и геодезические услуги в Санкт-Петербурге',
  description: 'Профессиональные геодезические услуги с 2003 года: межевание, топосъемка, ЗОУИТ, технические планы в СПб и ЛО',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <ContactSheet />
        <div vaul-drawer-wrapper="" className="min-h-screen flex flex-col">
          <Header />
          <div className="relative flex-grow flex flex-col">
            <main className="relative z-10 flex-grow bg-background">{children}</main>
            <Footer />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
