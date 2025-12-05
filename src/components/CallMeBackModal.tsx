'use client';

import { useContactDialog } from '@/hooks/use-contact-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket, Flame, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export function CallMeBackModal() {
  const { isOpen, onClose } = useContactDialog();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send data to an API
    console.log("Form submitted from modal");
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-sm bg-black text-white border-yellow-400/50 shadow-2xl shadow-yellow-400/20 rounded-2xl">
        <div className="p-8 text-center space-y-4">
          <div className="text-lg font-semibold flex items-center justify-center gap-2">
            <Rocket className="h-5 w-5 text-yellow-300" />
            Мы перезвоним через 30 секунд
          </div>
          <h2 className="text-2xl font-bold">Оставьте телефон — специалист уже на линии!</h2>
          <p className="text-neutral-400">(Геодезия СПб)</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className="bg-white/90 border-neutral-600 text-black text-center text-lg h-14 rounded-xl focus:ring-yellow-400"
              required
            />
            <Button
              type="submit"
              className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-bold rounded-xl flex items-center gap-2"
            >
              <Flame className="h-5 w-5" />
              ПОЗВОНИТЕ МНЕ СРОЧНО!
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-grow border-t border-neutral-700"></div>
            <span className="text-neutral-500 text-sm">ИЛИ</span>
            <div className="flex-grow border-t border-neutral-700"></div>
          </div>
          
          <Button
            variant="secondary"
            className="w-full h-14 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-xl flex items-center gap-2"
            asChild
          >
            <a href="https://wa.me/79108247848?text=Здравствуйте, у меня вопрос" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-5 w-5" />
              Напишите срочно в WhatsApp
            </a>
          </Button>

          <div className="text-xs text-neutral-400 pt-4">
            <label className="flex items-start justify-center gap-2">
              <input type="checkbox" defaultChecked required className="mt-0.5 h-4 w-4 rounded border-neutral-600 bg-neutral-800 accent-yellow-400" />
              <span>Я согласен с условиями <Link href="/privacy-policy" className="underline hover:text-yellow-300" target="_blank">Политики обработки персональных данных</Link> и даю <Link href="/user-agreement" className="underline hover:text-yellow-300" target="_blank">Согласие на обработку моих персональных данных</Link></span>
            </label>
          </div>

           <div className="text-yellow-300 text-sm font-semibold flex items-center justify-center gap-2 pt-2">
                <Star className="h-4 w-4" />
                500+ клиентов в СПб · 100% конфиденциально
            </div>
            
            <button onClick={onClose} className="text-yellow-400 hover:text-yellow-200 text-sm font-bold pt-2">
              Закрыть
            </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
