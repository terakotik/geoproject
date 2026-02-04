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
import Script from 'next/script';

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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106619282', 'ym');

            ym(106619282, 'init', {
                ssr:true, 
                webvisor:true, 
                clickmap:true, 
                ecommerce:"dataLayer", 
                referrer: document.referrer, 
                url: location.href, 
                accurateTrackBounce:true, 
                trackLinks:true
            });
          `}
        </Script>
      </head>
      <body className={cn("font-body antialiased", ptSans.variable)}>
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/106619282" style={{ position: 'absolute', left: '-9999px' }} alt="" />
            </div>
          </noscript>
          
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
