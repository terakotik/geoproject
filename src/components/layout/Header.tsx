
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ChevronDown } from 'lucide-react';
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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden lg:flex items-center gap-2">
             <Popover>
              <PopoverTrigger className="flex items-center text-foreground transition-colors font-medium px-3 py-2 rounded-md hover:bg-muted">
                Услуги <ChevronDown className="h-4 w-4 ml-1" />
              </PopoverTrigger>
              <PopoverContent className="w-[600px]">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group relative flex flex-col items-center text-center p-3 rounded-lg transition-colors hover:bg-muted"
                    >
                      <div className="absolute inset-0 hidden group-hover:block border-box group-hover:animate-move-border-once rounded-lg"></div>
                      <div className="mb-2 p-2 bg-background rounded-md">
                        <service.icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-foreground transition-colors font-medium px-3 py-2 rounded-md hover:bg-muted">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
               <Button asChild>
                <Link href="/contact">Заказать звонок</Link>
              </Button>
            </div>
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Открыть меню</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col p-0">
                  <div className="p-6 border-b">
                    <Link href="/" onClick={closeMobileMenu}>
                      <Logo />
                    </Link>
                  </div>
                  <ScrollArea className="flex-1">
                    <nav className="flex flex-col gap-2 p-6 text-xl">
                       <Link href="/services" onClick={closeMobileMenu} className="text-foreground transition-colors font-medium py-3">
                          Услуги
                        </Link>
                      {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="text-foreground transition-colors font-medium py-3">
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </ScrollArea>
                  <div className="p-6 mt-auto border-t space-y-4">
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
      </div>
    </header>
  );
}
