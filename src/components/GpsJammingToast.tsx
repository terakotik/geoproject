'use client';

import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Rocket } from 'lucide-react';

export function GpsJammingToast() {
  const { toast } = useToast();

  const showSecondToast = () => {
    toast({
      duration: 10000,
      className: 'w-full max-w-md p-6 bg-card border-accent/20',
      description: (
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
             <Rocket className="h-10 w-10 text-accent" />
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-base text-foreground">Работаем быстрее конкурентов</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Средний срок выполнения работ — 14 дней. Электронная подача документов в Росреестр.
            </p>
          </div>
        </div>
      ),
    });
  };

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem('gpsJammingToastShown');

    if (!hasBeenShown) {
      const { dismiss } = toast({
        duration: 15000, // 15 seconds
        className: 'w-full max-w-md p-6 bg-card border-primary/20',
        action: (
           <button
            onClick={() => {
              dismiss();
              showSecondToast();
            }}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Хорошо
          </button>
        ),
        description: (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
               <div className="relative">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 38C24 38 34 30 34 21C34 14.3726 29.5228 9 24 9C18.4772 9 14 14.3726 14 21C14 30 24 38 24 38Z" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 24C25.6569 24 27 22.6569 27 21C27 19.3431 25.6569 18 24 18C22.3431 18 21 19.3431 21 21C21 22.6569 22.3431 24 24 24Z" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M38 10L30 18" stroke="hsl(var(--destructive))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M30 10L38 18" stroke="hsl(var(--destructive))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-base text-foreground">Работаем в условиях глушения GPS</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Используем профессиональные базовые станции для точных измерений, даже когда спутниковый сигнал недоступен.
              </p>
            </div>
          </div>
        ),
      });
      sessionStorage.setItem('gpsJammingToastShown', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return null;
}
