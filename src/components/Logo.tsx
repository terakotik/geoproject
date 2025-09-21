import { DraftingCompass } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold text-foreground", className)}>
      <DraftingCompass className="h-8 w-8 text-accent" />
      <span className="font-headline">GeoExpert</span>
    </Link>
  );
}
