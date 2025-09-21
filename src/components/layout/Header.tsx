"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Clock, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/services', label: 'Услуги' },
    { href: '#prices', label: 'Цены' },
    { href: '#about', label: 'О нас' },
    { href: '/contact', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-border/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Ежедневно с 10:00 до 20:00</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Санкт-Петербург и ЛО</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+79522764940" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              +7 (952) 276-49-40
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-foreground hover:text-accent transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <div className="text-lg font-heading font-semibold text-foreground">+7 (952) 276-49-40</div>
              <div className="text-sm text-muted-foreground">Бесплатная консультация</div>
            </div>
            <Button>Заказать звонок</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
