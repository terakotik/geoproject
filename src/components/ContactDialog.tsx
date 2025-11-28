
'use client'

import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog"
import { useContactDialog } from "@/hooks/use-contact-dialog"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, X, ArrowRight, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";
import { AnimatedText } from "./AnimatedText";
import { useToast } from "@/hooks/use-toast";
import { sendSheetForm } from "@/lib/actions";


const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не короче 2 символов." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
  task: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, { message: "Необходимо согласие на обработку данных." }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactDialog() {
    const { isOpen, onClose } = useContactDialog();
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            privacy: true,
        }
    });

     const onSubmit: SubmitHandler<FormData> = async (data) => {
        setFormState('loading');
        const result = await sendSheetForm(data);

        if (result.success) {
            setFormState('success');
            reset();
            toast({
                title: "Заявка отправлена!",
                description: "Мы скоро с вами свяжемся.",
            });
        } else {
            setFormState('error');
             toast({
                variant: "destructive",
                title: "Ошибка отправки",
                description: result.message || 'Ошибка аутентификации. Проверьте пароль приложения в .env и настройки почты Яндекса.',
            });
             setTimeout(() => {
                setFormState('idle');
            }, 3000);
        }
    };
    
    const handleClose = () => {
        onClose();
        if (formState === 'success' || formState === 'error') {
            setTimeout(() => {
                setFormState('idle');
            }, 500);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[90vw] max-w-5xl bg-white p-0 rounded-none border-none">
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

                    <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col p-8 pt-4">
                        {formState === 'success' ? (
                            <div className="flex flex-col items-center justify-center flex-grow text-center">
                                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-semibold mb-3">Заявка успешно отправлена!</h3>
                                <p className="text-xl text-muted-foreground max-w-lg">Мы скоро свяжемся с вами.</p>
                                <Button onClick={handleClose} className="mt-10 text-xl p-6 rounded-none">Закрыть</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col flex-grow gap-y-4">
                                <div className="grid grid-cols-[192px_1fr] gap-x-4">
                                     <div className="relative w-48 h-48 flex items-center justify-center rounded-none p-2 shrink-0">
                                         <div className="border-box absolute w-full h-full rounded-lg"></div>
                                         <Image src="https://cdn.qrcode-ai.com/qrcode/2ae6c24f24e3d22c22c9907ab56eecb3-1758686681778.png" alt="QR-код для связи в WhatsApp" width={180} height={180} className="rounded-none object-contain"/>
                                     </div>
                                     <div className="border border-input flex-1 h-48 flex flex-col p-4 rounded-none transition-colors">
                                         <Textarea
                                             id="task"
                                             {...register("task")}
                                             placeholder="Коротко о задаче"
                                             className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-3xl font-bold placeholder-gray-500 p-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                             disabled={formState === 'loading'}
                                         />
                                     </div>
                                 </div>
                                
                                 <div className="border border-input w-full h-24 flex items-center p-4 rounded-none transition-colors">
                                     <Input
                                         id="phone"
                                         type="tel"
                                         {...register("phone")}
                                         placeholder="Ваш телефон"
                                         className="w-full bg-transparent border-none focus:outline-none text-3xl font-bold placeholder-gray-500 p-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                         aria-invalid={errors.phone ? "true" : "false"}
                                         disabled={formState === 'loading'}
                                     />
                                 </div>
                                 {errors.phone && <p className="text-sm text-destructive flex items-center gap-1 -mt-2"><AlertCircle className="h-4 w-4" /> {errors.phone.message}</p>}

                                 <div className="border border-input w-full h-24 flex items-center p-4 relative rounded-none transition-colors">
                                     <Input
                                         id="name"
                                         {...register("name")}
                                         placeholder="Ваше имя"
                                         className="w-full bg-transparent border-none focus:outline-none text-3xl font-bold placeholder-gray-500 p-0 pr-24 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                         aria-invalid={errors.name ? "true" : "false"}
                                         disabled={formState === 'loading'}
                                     />
                                     <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                         <Button type="submit" size="icon" className="bg-primary text-primary-foreground h-16 w-16 hover:bg-primary/90 focus:outline-none rounded-none aspect-square" disabled={formState === 'loading'}>
                                            {formState === 'loading' ? <Loader2 className="h-8 w-8 animate-spin" /> : <ArrowRight className="h-8 w-8" />}
                                         </Button>
                                     </div>
                                 </div>
                                 {errors.name && <p className="text-sm text-destructive flex items-center gap-1 -mt-2"><AlertCircle className="h-4 w-4" /> {errors.name.message}</p>}
                                <div className="pt-2">
                                    <div className="flex items-start space-x-3">
                                        <input type="checkbox" id="privacy" {...register("privacy")} className="w-4 h-4 rounded-none border-border mt-0.5" defaultChecked disabled={formState === 'loading'}/>
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor="privacy" className="text-xs text-gray-500 font-normal">
                                                Нажимая на кнопку, вы даете согласие на обработку своих <Link href="#" className="text-primary hover:underline">персональных данных</Link>
                                            </Label>
                                            {errors.privacy && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.privacy.message}</p>}
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
