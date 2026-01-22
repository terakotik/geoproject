'use client';

import { useAuditDialog } from '@/hooks/use-audit-dialog';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Phone, Check, Shield, X, Loader2, AlertCircle, CheckCircle2, FileUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function AuditModal() {
  const { isOpen, onClose } = useAuditDialog();
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSucceeded(false);
    }
  }, [isOpen]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    formData.append('source', 'Audit Modal');

    try {
      const response = await fetch("https://formspree.io/f/xlgrkbzl", {
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
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 max-w-lg bg-[#1e1e24] text-white border-[#333] shadow-2xl shadow-black/50 rounded-2xl">
        <div className="relative p-8 md:p-10">
          
          {succeeded ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Спасибо!</h2>
              <p className="text-[#a0a0a5]">Мы получили вашу заявку и скоро свяжемся с вами для проведения аудита.</p>
            </div>
          ) : (
            <>
              <DialogHeader className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 bg-[#fdd835]/10 text-[#fdd835] py-2 px-4 rounded-full text-sm font-semibold border border-[#fdd835]/20 w-fit mx-auto">
                  <Zap size={16} />
                  <span>Аудит за 5 минут</span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-extrabold text-center mt-4">Бесплатный Аудит участка 2026</DialogTitle>
                <DialogDescription className="text-center text-[#a0a0a5] mt-2">
                  Пришлите фотографии участка и выписку ЕГРН, и мы проведем экспресс-аудит.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="audit-name" className="text-white/80">Имя *</Label>
                      <Input id="audit-name" name="name" placeholder="Ваше имя" required disabled={submitting} className="bg-[#2b2b36] border-2 border-transparent text-white h-12 rounded-xl focus:ring-0 focus:border-[#fdd835] focus:bg-[#32323e] placeholder:text-[#555]"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="audit-phone" className="text-white/80">Телефон *</Label>
                      <Input id="audit-phone" name="phone" placeholder="+7 (___) ___-__-__" required disabled={submitting} className="bg-[#2b2b36] border-2 border-transparent text-white h-12 rounded-xl focus:ring-0 focus:border-[#fdd835] focus:bg-[#32323e] placeholder:text-[#555]"/>
                    </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-white/80">Фотография участка</Label>
                  <Input id="photo" name="photo" type="file" disabled={submitting} className="bg-[#2b2b36] border-2 border-transparent text-white rounded-xl focus:ring-0 focus:border-[#fdd835] focus:bg-[#32323e] file:text-white/80 file:bg-transparent file:border-0 file:font-semibold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="egrn" className="text-white/80">Выписка ЕГРН (PDF)</Label>
                  <Input id="egrn" name="egrn" type="file" accept=".pdf" disabled={submitting} className="bg-[#2b2b36] border-2 border-transparent text-white rounded-xl focus:ring-0 focus:border-[#fdd835] focus:bg-[#32323e] file:text-white/80 file:bg-transparent file:border-0 file:font-semibold" />
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-14 bg-[#fdd835] hover:bg-[#fbc02d] text-black text-lg font-bold rounded-xl shadow-[0_4px_15px_rgba(253,216,53,0.3)] hover:shadow-[0_6px_20px_rgba(253,216,53,0.4)] mt-6"
                  disabled={submitting}
                >
                  {submitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <span>Отправить на аудит</span>}
                </Button>
              </form>
              
              {error && (
                <div className="text-sm text-red-400 flex items-center justify-center gap-2 mt-3">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="flex items-start gap-3 mt-6">
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 bg-[#2b2b36] border border-[#444] rounded-sm flex items-center justify-center">
                  <Check size={12} className="text-[#fdd835]" />
                </div>
                <div className="text-xs text-[#666] leading-relaxed">
                  Отправляя данные, вы соглашаетесь с <Link href="/privacy-policy" className="text-[#888] border-b border-[#444] hover:text-white hover:border-white transition-all" target="_blank">политикой конфиденциальности</Link>.
                </div>
              </div>

            </>
          )}
        </div>
        <DialogClose className="absolute right-4 top-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[#a0a0a5] hover:bg-white/20 hover:text-white transition-all duration-300 ring-offset-background opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
