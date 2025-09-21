"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigationLinks = [
  { href: '/services', label: 'Услуги' },
  { href: '/map', label: 'Интерактивная карта' },
  { href: '/updates', label: 'Обновления' },
  { href: '/contact', label: 'Контакты' },
];

const aiToolsLinks = [
  { href: '/ai/zouit', label: 'Идентификация ЗОУИТ' },
  { href: '/ai/cost-estimator', label: 'Оценщик стоимости' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("transition-colors hover:text-primary", pathname === link.href ? "text-primary font-semibold" : "text-foreground/80")}
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary p-0 h-auto focus-visible:ring-inset">
                ИИ Инструменты
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {aiToolsLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-4">
           <Button asChild>
            <Link href="/portal">Портал для клиентов</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Открыть меню</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col items-center gap-4 p-4">
            {[...navigationLinks, ...aiToolsLinks].map(link => 
              <Link href={link.href} key={link.href} className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            )}
            <Button asChild className="w-full mt-4">
              <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)}>Портал для клиентов</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
