
'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
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
            <SheetContent className="w-[90vw] max-w-[1600px] p-0 flex flex-col">
                <div className="flex-grow p-6 md:p-8 overflow-y-auto">
                {formState === 'success' ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center h-full">
                        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                        <h3 className="text-3xl font-semibold mb-3">Заявка успешно отправлена!</h3>
                        <p className="text-xl text-muted-foreground max-w-lg">Спасибо! Мы&nbsp;свяжемся с&nbsp;вами в&nbsp;ближайшее время для уточнения деталей.</p>
                         <Button onClick={onClose} className="mt-10 text-xl p-6">Закрыть</Button>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                        <div className="flex justify-between items-start gap-8 mb-8">
                            <div>
                                <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: 'Привет!' }}></h2>
                                <h3 className="text-4xl font-bold text-foreground mt-2" dangerouslySetInnerHTML={{ __html: 'Какая у&nbsp;вас задача?' }}>
                                </h3>
                                <p className="text-muted-foreground pt-4 text-lg">
                                    <a href="mailto:danayn11@mail.ru" className="hover:text-accent">danayn11@mail.ru</a>
                                </p>
                            </div>
                            <div className="hidden sm:block text-center flex-shrink-0">
                                 <Image
                                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1mKBDqAEo3ZgrUseu5xob-zcerfrLTmiy4f-nICu3k9yqN7tW8fI0DJ-36GzaExLCwP5lxuvRYqQNH0J5uQ7rkE8kOxityWueZpaSgeFx"
                                    alt="WhatsApp QR Code"
                                    width={150}
                                    height={150}
                                />
                                <p className="text-sm text-muted-foreground mt-2">Связь в&nbsp;WhatsApp</p>
                            </div>
                        </div>

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-3xl">ФИО *</Label>
                                <Input id="name" {...register("name")} placeholder="Иванов Иван" className="text-3xl h-20 p-4" />
                                {errors.name && <p className="text-lg text-destructive flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {errors.name.message}</p>}
                            </div>
                             <div className="space-y-3">
                                <Label htmlFor="phone" className="text-3xl">Номер телефона *</Label>
                                <Input id="phone" {...register("phone")} placeholder="+7 (___) ___-__-__" className="text-3xl h-20 p-4" />
                                {errors.phone && <p className="text-lg text-destructive flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {errors.phone.message}</p>}
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <Label htmlFor="project" className="text-3xl">По&nbsp;какому проекту вы&nbsp;хотели&nbsp;бы проконсультироваться?</Label>
                                <Textarea id="project" {...register("project")} placeholder="Опишите детали вашего проекта, цели, сроки..." rows={5} className="text-3xl p-4" />
                            </div>
                        </div>
                        
                        <div className="mt-auto pt-8 space-y-6">
                             <div className="flex items-start space-x-3">
                                <input type="checkbox" id="privacy-sheet" {...register("privacy")} className="mt-1 h-6 w-6 rounded border-border" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="privacy-sheet" className="text-lg font-normal text-muted-foreground">
                                        Нажимая на&nbsp;кнопку, вы&nbsp;даете <Link href="#" className="underline">Согласие на&nbsp;обработку своих персональных данных</Link>
                                    </Label>
                                    {errors.privacy && <p className="text-base text-destructive flex items-center gap-2"><AlertCircle className="h-5 w-5" /> {errors.privacy.message}</p>}
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full sm:w-auto text-3xl py-10 px-12" disabled={formState === 'submitting'}>
                                {formState === 'submitting' ? 'Отправка...' : 'Отправить'}
                            </Button>
                        </div>
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
