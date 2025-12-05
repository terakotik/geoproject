
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Phone } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { services } from '@/lib/services';
import { useState, useEffect }from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useContactDialog } from '@/hooks/use-contact-dialog.tsx';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { onOpen } = useContactDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#about', label: 'О нас' },
    { href: '/prices', label: 'Цены' },
    { href: '/updates', label: 'Вопросы' },
    { href: '/contact', label: 'Контакты' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" onClick={closeMobileMenu}>
            <Logo />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
             <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Услуги <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[600px] p-0">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group relative flex flex-col items-center text-center p-3 rounded-lg transition-colors hover:bg-muted"
                    >
                      <div className="mb-2 p-2 bg-background rounded-md">
                        <service.icon className="h-6 w-6 text-muted-foreground group-hover:text-accent" />
                      </div>
                      <span className="text-sm font-medium text-foreground leading-tight">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-4">
                <a href="tel:+79522764940" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">+7 (952) 276-49-40</a>
                <Button className="hidden sm:inline-flex" onClick={onOpen}>
                  Заказать звонок
                </Button>
             </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col p-0 w-full max-w-xs bg-background">
                <div className="p-4 border-b">
                  <Link href="/" onClick={closeMobileMenu}>
                    <Logo />
                  </Link>
                </div>
                <ScrollArea className="flex-1">
                  <nav className="flex flex-col p-4 text-lg">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="services" className="border-b-0">
                        <AccordionTrigger className="py-3 font-medium hover:no-underline">Услуги</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-1 pl-4">
                            {services.map(service => (
                              <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMobileMenu} className={cn("flex items-center justify-between rounded-md p-2 text-base transition-colors hover:bg-muted", pathname === `/services/${service.slug}` && "bg-muted")}>
                                {service.title}
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {navLinks.filter(link => link.label !== 'Услуги').map((link) => (
                      <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="py-3 font-medium transition-colors hover:bg-muted rounded-md px-3">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </ScrollArea>
                <div className="p-4 mt-auto border-t space-y-3 bg-background">
                    <Button className="w-full" asChild size="lg">
                       <a href="https://api.whatsapp.com/send/?phone=79108247848&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C+%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE+%D1%81%D1%82%D0%BE%D0%B8%D1%82%3F&type=phone_number&app_absent=0" onClick={closeMobileMenu} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Написать в WhatsApp
                       </a>
                    </Button>
                   <Button variant="outline" className="w-full" asChild size="lg">
                      <a href="tel:+79522764940" onClick={closeMobileMenu} className="flex items-center gap-2">
                       <Phone className="h-4 w-4" />
                       +7 (952) 276-49-40
                      </a>
                   </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
