import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type BreadcrumbSegment = {
  label: string;
  path?: string;
};

type BreadcrumbsProps = {
  segments: BreadcrumbSegment[];
  className?: string;
};

export function Breadcrumbs({ segments, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm text-muted-foreground', className)}>
      <ol className="flex items-center gap-1.5">
        {segments.map((segment, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {segment.path ? (
              <Link href={segment.path} className="hover:text-foreground transition-colors">
                {segment.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{segment.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
