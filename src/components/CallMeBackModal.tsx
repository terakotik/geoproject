'use client';

import { useContactDialog } from '@/hooks/use-contact-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Phone, MessageSquare, Check, Shield, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function CallMeBackModal() {
  const { isOpen, onClose } = useContactDialog();
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPhone('+7 (');
    }
  }, [isOpen]);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (!value.startsWith('7')) {
      value = '7' + value.substring(1);
    }
    
    if (value.length > 0) formattedValue = '+7';
    if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
    if (value.length >= 5) formattedValue += ') ' + value.substring(4, 7);
    if (value.length >= 8) formattedValue += '-' + value.substring(7, 9);
    if (value.length >= 10) formattedValue += '-' + value.substring(9, 11);

    setPhone(formattedValue);
  };
  
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && e.currentTarget.value.replace(/\D/g, '').length <= 1) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phone.replace(/\D/g, '').length < 11) {
      setError("Пожалуйста, введите полный номер телефона.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    formData.set('phone', phone); // Ensure formatted phone is in form data

    try {
      const response = await fetch("https://formspree.io/f/mjknobdj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setSucceeded(true);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          setError(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setError("Что-то пошло не так. Попробуйте снова.");
        }
      }
    } catch (error) {
      setError("Не удалось отправить. Проверьте подключение к сети.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSucceeded(false);
    setError(null);
    setPhone('');
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 max-w-md bg-[#1e1e24] text-white border-[#333] shadow-2xl shadow-black/50 rounded-2xl">
        <div className="relative p-8 md:p-10">
          <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[#a0a0a5] hover:bg-white/20 hover:text-white transition-all duration-300">
            <X size={18} />
          </button>
          
          {succeeded ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Спасибо!</h2>
              <p className="text-[#a0a0a5]">Мы получили вашу заявку и скоро свяжемся с вами.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#fdd835]/10 text-[#fdd835] py-2 px-4 rounded-full text-sm font-semibold border border-[#fdd835]/20">
                  <Zap size={16} />
                  <span>Перезвоним за 28 сек</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">Специалист на линии</h2>
              <p className="text-center text-[#a0a0a5] mb-8">Введите номер для консультации по геодезии</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a0a0a5] transition-colors duration-300" />
                  <Input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneInput}
                    onKeyDown={handlePhoneKeyDown}
                    placeholder="+7 (___) ___-__-__"
                    className="bg-[#2b2b36] border-2 border-transparent text-white text-lg h-16 rounded-xl focus:ring-0 focus:border-[#fdd835] focus:bg-[#32323e] pl-12 placeholder:text-[#555] tracking-wider"
                    required
                    disabled={submitting}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-16 bg-[#fdd835] hover:bg-[#fbc02d] text-black text-lg font-bold rounded-xl shadow-[0_4px_15px_rgba(253,216,53,0.3)] hover:shadow-[0_6px_20px_rgba(253,216,53,0.4)]"
                  disabled={submitting}
                >
                  {submitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <span>Жду звонка!</span>}
                </Button>
              </form>
              
              {error && (
                <div className="text-sm text-red-400 flex items-center justify-center gap-2 mt-3">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="flex items-center text-[#a0a0a5] text-sm my-5 uppercase tracking-wider">
                <div className="flex-grow h-px bg-[#333]"></div>
                <span className="px-4">или</span>
                <div className="flex-grow h-px bg-[#333]"></div>
              </div>
              
              <Button
                variant="secondary"
                className="w-full h-16 bg-[#25d366] hover:bg-[#1ebc57] text-white text-lg font-bold rounded-xl shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.3)]"
                asChild
              >
                <a href="https://wa.me/79108247848?text=Здравствуйте, у меня вопрос" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={20} />
                  <span>Открыть WhatsApp</span>
                </a>
              </Button>

              <div className="flex items-start gap-3 mt-6">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 bg-[#2b2b36] border border-[#444] rounded-sm flex items-center justify-center">
                  <Check size={12} className="text-[#fdd835]" />
                </div>
                <div className="text-xs text-[#666] leading-relaxed">
                  Отправляя данные, вы соглашаетесь с <Link href="/privacy-policy" className="text-[#888] border-b border-[#444] hover:text-white hover:border-white transition-all" target="_blank">политикой конфиденциальности</Link>.
                </div>
              </div>

              <div className="text-[#fdd835] text-sm font-semibold flex items-center justify-center gap-2 mt-5 opacity-90">
                <Shield size={16} />
                100% конфиденциально
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
