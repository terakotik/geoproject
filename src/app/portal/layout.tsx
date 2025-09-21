import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("font-body antialiased min-h-screen bg-background")}>
      {children}
      <Toaster />
    </div>
  );
}
