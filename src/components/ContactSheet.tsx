
'use client'

import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { useContactSheet } from "@/hooks/use-contact-sheet"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не короче 2 символов." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
  project: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, { message: "Необходимо согласие на обработку данных." }),
});

type FormData = z.infer<typeof formSchema>;

export const ContactSheet = () => {
    const { isOpen, onClose } = useContactSheet();
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            privacy: true,
        }
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setFormState('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
        // Simulate success
        setFormState('success');
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[90vw] max-w-[1600px] p-0 flex flex-col bg-card">
                <div className="flex-grow flex flex-col p-6 sm:p-10">
                {formState === 'success' ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center h-full">
                        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                        <h3 className="text-3xl font-semibold mb-3">Заявка успешно отправлена!</h3>
                        <p className="text-xl text-muted-foreground max-w-lg">Спасибо! Мы&nbsp;свяжемся с&nbsp;вами в&nbsp;ближайшее время для уточнения деталей.</p>
                         <Button onClick={onClose} className="mt-10 text-xl p-6">Закрыть</Button>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                        <header className="flex justify-between items-start gap-8 mb-10">
                            <div>
                                <h2 className="text-5xl font-bold" dangerouslySetInnerHTML={{ __html: 'Расскажите о&nbsp;вашей задаче' }}></h2>
                                <p className="text-muted-foreground pt-4 text-xl">
                                    Или напишите нам на <a href="mailto:danayn11@mail.ru" className="text-accent hover:underline">danayn11@mail.ru</a>
                                </p>
                            </div>
                            <div className="hidden sm:block text-center flex-shrink-0">
                                 <Image
                                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1mKBDqAEo3ZgrUseu5xob-zcerfrLTmiy4f-nICu3k9yqN7tW8fI0DJ-36GzaExLCwP5lxuvRYqQNH0J5uQ7rkE8kOxityWueZpaSgeFx"
                                    alt="WhatsApp QR Code"
                                    width={120}
                                    height={120}
                                />
                                <p className="text-sm text-muted-foreground mt-2">Связь в&nbsp;WhatsApp</p>
                            </div>
                        </header>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="flex flex-col gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-2xl font-medium">Ваше имя *</Label>
                                    <Input id="name" {...register("name")} placeholder="Иванов Иван" className="text-5xl h-24 p-4" />
                                    {errors.name && <p className="text-lg text-destructive flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {errors.name.message}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="text-2xl font-medium">Контактный телефон *</Label>
                                    <Input id="phone" {...register("phone")} placeholder="+7 (___) ___-__-__" className="text-5xl h-24 p-4" />
                                    {errors.phone && <p className="text-lg text-destructive flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {errors.phone.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-3 flex flex-col">
                                <Label htmlFor="project" className="text-2xl font-medium">Опишите задачу</Label>
                                <Textarea id="project" {...register("project")} placeholder="Какой объект, какие работы необходимы..." rows={5} className="text-3xl p-4 flex-grow" />
                            </div>
                        </div>
                        
                        <footer className="mt-auto pt-8 space-y-6">
                             <div className="flex items-start space-x-4">
                                <input type="checkbox" id="privacy-sheet" {...register("privacy")} className="mt-1 h-6 w-6 rounded border-border" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="privacy-sheet" className="text-base font-normal text-muted-foreground">
                                        Нажимая на&nbsp;кнопку, вы&nbsp;даете <Link href="#" className="underline hover:text-accent">согласие на&nbsp;обработку своих персональных данных</Link>
                                    </Label>
                                    {errors.privacy && <p className="text-base text-destructive flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {errors.privacy.message}</p>}
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full text-3xl py-10 px-12" disabled={formState === 'submitting'}>
                                {formState === 'submitting' ? 'Отправляем...' : 'Отправить заявку'}
                            </Button>
                        </footer>
                    </form>
                 )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export const ContactSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const [isClient, setIsClient] = useState(false);

    // Prevent hydration errors
    useState(() => {
        setIsClient(true);
    });

    if (!isClient) {
        return null;
    }
    
    return (
        <>
            {children}
            <ContactSheet />
        </>
    )
}
