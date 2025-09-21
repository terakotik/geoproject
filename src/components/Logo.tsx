import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary rounded-sm transform rotate-45"></div>
      </div>
      <div>
        <h1 className="font-heading font-bold text-xl text-foreground">ГЕОСТРОЙПРОЕКТ</h1>
        <p className="text-sm text-muted-foreground">геодезическая компания</p>
      </div>
    </div>
  );
}
