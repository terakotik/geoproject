import { cn } from '@/lib/utils';

export function Logo({ className, isFooter = false }: { className?: string, isFooter?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center", { 'bg-white': isFooter })}>
        <div className={cn("w-6 h-6 border-2 transform rotate-45", isFooter ? "border-black" : "border-primary")}></div>
      </div>
      <div>
        <h1 className={cn("font-heading font-bold text-xl", isFooter ? "text-white" : "text-foreground")}>ГЕОСТРОЙПРОЕКТ</h1>
        <p className={cn("text-sm", isFooter ? "text-white/80" : "text-muted-foreground")}>геодезическая компания</p>
      </div>
    </div>
  );
}
