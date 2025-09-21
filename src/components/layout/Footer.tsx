import { Logo } from '@/components/Logo';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Providing precision and reliability in every survey.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/portal" className="text-muted-foreground hover:text-primary">Client Portal</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Contact Us</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>123 Survey Lane, Geocity, 12345</li>
              <li>Email: contact@geoexpert.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GeoExpert. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
