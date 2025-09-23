
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
import { useState }from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/prices', label: 'Цены' },
    { href: '/#about', label: 'О нас' },
    { href: '/contact', label: 'Контакты' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
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
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/contact">Заказать звонок</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col p-0 w-full max-w-xs">
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

                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="py-3 font-medium transition-colors hover:bg-muted rounded-md px-3">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </ScrollArea>
                <div className="p-4 mt-auto border-t space-y-3 bg-background">
                   <Button className="w-full" asChild size="lg">
                     <Link href="/contact" onClick={closeMobileMenu}>Заказать звонок</Link>
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
