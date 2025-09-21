import { cn } from '@/lib/utils';

export function Logo({ className, isFooter = false }: { className?: string, isFooter?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative w-10 h-10 rounded-lg flex items-center justify-center")}>
        <div className="border-box absolute w-full h-full rounded-lg"></div>
        <div className={cn("text-2xl font-bold", isFooter ? "text-white" : "text-black")}>G</div>
      </div>
      <div>
        <h1 className={cn("font-heading font-bold text-xl", isFooter ? "text-white" : "text-foreground")}>ГЕОСТРОЙПРОЕКТ</h1>
        <p className={cn("text-sm", isFooter ? "text-white/80" : "text-muted-foreground")}>геодезическая компания</p>
      </div>
    </div>
  );
}
