import { Logo } from '@/components/Logo';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Точность и надежность в каждом измерении.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Быстрые ссылки</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Услуги</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Контакты</Link></li>
              <li><Link href="/portal" className="text-muted-foreground hover:text-primary">Портал для клиентов</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Свяжитесь с нами</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>123 Геодезический переулок, Геогород, 12345</li>
              <li>Email: contact@geoexpert.com</li>
              <li>Телефон: (123) 456-7890</li>
            </ul>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GeoExpert. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
