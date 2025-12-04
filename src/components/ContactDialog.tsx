'use client'

import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog"
import { useContactDialog } from "@/hooks/use-contact-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, X, Loader2, Send } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedText } from "./AnimatedText";


export function ContactDialog() {
    const { isOpen, onClose } = useContactDialog();
    const [submitting, setSubmitting] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (succeeded && isOpen) {
            // No auto-close, let user close it.
        }
        if (!isOpen) {
            // Reset state when dialog is closed
            setTimeout(() => {
                setSucceeded(false);
                setError(null);
            }, 300); // After animation
        }
    }, [succeeded, isOpen]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        const formData = new FormData(event.currentTarget);

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
          } else {
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                setError(data["errors"].map((error: any) => error["message"]).join(", "));
            } else {
                setError("Что-то пошло не так при отправке формы.");
            }
          }
        } catch (error) {
          setError("Не удалось отправить форму. Проверьте подключение к сети.");
        } finally {
          setSubmitting(false);
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                handleClose();
            }
        }}>
            <DialogContent className="w-[90vw] max-w-4xl bg-white p-0 rounded-none border-none">
                <div className="flex flex-col h-full">
                     <header className="p-8 flex justify-between items-start border-b">
                        <div>
                            <AnimatedText as="h2" className="text-4xl font-bold text-gray-800" text="Заказать звонок" endSymbol="" />
                            <p className="mt-2 text-sm text-gray-500 font-normal">
                                  Или <span className="font-bold text-green-500">отсканируйте</span>, QR код чтобы написать в WhatsApp
                            </p>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" onClick={handleClose}>
                              <X className="h-8 w-8 text-gray-500 cursor-pointer" />
                              <span className="sr-only">Закрыть</span>
                            </Button>
                        </DialogClose>
                    </header>

                    <form onSubmit={handleSubmit} className="flex-grow flex flex-col p-8 pt-4">
                        {succeeded ? (
                            <div className="flex flex-col items-center justify-center flex-grow text-center py-10">
                                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-semibold mb-3">Заявка успешно отправлена!</h3>
                                <p className="text-xl text-muted-foreground max-w-lg">Мы скоро свяжемся с вами.</p>
                                <Button onClick={handleClose} className="mt-10 text-xl p-6 rounded-none">Закрыть</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col flex-grow gap-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-[192px_1fr] gap-4">
                                     <div className="relative w-48 h-48 flex items-center justify-center rounded-none p-2 shrink-0 mx-auto">
                                         <div className="border-box absolute w-full h-full rounded-lg"></div>
                                         <Image src="https://cdn.qrcode-ai.com/qrcode/2ae6c24f24e3d22c22c9907ab56eecb3-1758686681778.png" alt="QR-код для связи в WhatsApp" width={180} height={180} className="rounded-none object-contain"/>
                                     </div>
                                     <div className="border border-input flex-1 h-48 flex flex-col p-4 rounded-none transition-colors">
                                         <Textarea
                                             id="task"
                                             name="task"
                                             placeholder="Коротко о задаче"
                                             className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-3xl font-bold placeholder-gray-500 p-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                             disabled={submitting}
                                         />
                                     </div>
                                 </div>
                                
                                 <div className="border border-input w-full h-24 flex items-center p-4 rounded-none transition-colors">
                                     <Input
                                         id="phone"
                                         type="tel"
                                         name="phone"
                                         placeholder="Ваш телефон"
                                         className="w-full bg-transparent border-none focus:outline-none text-3xl font-bold placeholder-gray-500 p-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                         required
                                         disabled={submitting}
                                     />
                                 </div>
                                 
                                 <div className="border border-input w-full h-24 flex items-center p-4 relative rounded-none transition-colors">
                                     <Input
                                         id="name"
                                         name="name"
                                         placeholder="Ваше имя"
                                         className="w-full bg-transparent border-none focus:outline-none text-3xl font-bold placeholder-gray-500 p-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                         required
                                         disabled={submitting}
                                     />
                                 </div>

                                {error && (
                                    <div className="text-sm text-destructive flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" /> {error}
                                    </div>
                                )}
                                 
                                <div className="pt-4 flex flex-col gap-4">
                                     <Button type="submit" size="lg" className="w-full h-20 text-2xl bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none rounded-none" disabled={submitting}>
                                        {submitting ? <Loader2 className="h-8 w-8 animate-spin" /> : <Send className="h-8 w-8 mr-3" />}
                                        {submitting ? 'Отправка...' : 'Отправить заявку'}
                                     </Button>
                                    <div className="flex items-start space-x-3">
                                        <input type="checkbox" id="privacy-dialog" name="privacy" className="w-4 h-4 rounded-none border-border mt-0.5" defaultChecked required disabled={submitting}/>
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor="privacy-dialog" className="text-xs text-gray-500 font-normal">
                                                Нажимая на кнопку, вы даете согласие на обработку своих <Link href="#" className="text-primary hover:underline">персональных данных</Link>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
