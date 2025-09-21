
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/prices', label: 'Цены' },
    { href: '/#about', label: 'О нас' },
    { href: '/contact', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8">
             <Popover>
              <PopoverTrigger className="flex items-center text-foreground hover:text-accent transition-colors font-medium">
                Услуги <ChevronDown className="h-4 w-4 ml-1" />
              </PopoverTrigger>
              <PopoverContent className="w-[600px]">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group flex flex-col items-center text-center p-2 rounded-lg hover:bg-accent/10 transition-colors"
                    >
                      <div className="mb-2 p-2 bg-muted rounded-md">
                        <service.icon className="h-6 w-6 text-muted-foreground group-hover:text-accent" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-foreground hover:text-accent transition-colors font-medium">
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
                <SheetContent side="right">
                  <div className="flex flex-col h-full">
                    <div className="py-4 border-b">
                      <Logo />
                    </div>
                    <nav className="flex flex-col gap-4 py-6">
                       <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-foreground hover:text-accent transition-colors font-medium">
                          Услуги
                        </Link>
                      {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-foreground hover:text-accent transition-colors font-medium">
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto space-y-4">
                       <Button className="w-full" asChild>
                         <Link href="/contact">Заказать звонок</Link>
                       </Button>
                       <Button variant="outline" className="w-full" asChild>
                          <a href="tel:+79522764940" className="flex items-center gap-2">
                           <Phone className="h-4 w-4" />
                           +7 (952) 276-49-40
                          </a>
                       </Button>
                    </div>
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
