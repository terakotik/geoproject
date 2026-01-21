'use client';

import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Send } from 'lucide-react';
import { Button } from './ui/button';

export function GpsJammingToast() {
  const { toast } = useToast();

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem('telegramToastShown');

    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        toast({
          duration: 15000, // 15 seconds
          className: 'w-full max-w-md p-6 bg-card border-blue-500/20 shadow-lg',
          description: (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                 <div className="p-3 bg-blue-500/10 rounded-full">
                    <Send className="h-6 w-6 text-blue-500" />
                 </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-base text-foreground">Присоединяйтесь к нашему Telegram-каналу!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Мы всегда отвечаем на комментарии и пишем много полезного.
                </p>
                <Button asChild size="sm" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                  <a href="https://t.me/zemla_yslygi" target="_blank" rel="noopener noreferrer">Перейти в канал</a>
                </Button>
              </div>
            </div>
          ),
        });
        sessionStorage.setItem('telegramToastShown', 'true');
      }, 7000); // Show after 7 seconds

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return null;
}
