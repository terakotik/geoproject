
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
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
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
            privacy: false,
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
            <SheetContent className="w-full sm:max-w-xl p-0 overflow-y-auto">
                <SheetHeader className="p-6 sm:p-8 border-b">
                    <SheetTitle className="text-3xl sm:text-4xl font-bold">Привет!</SheetTitle>
                    <SheetDescription className="text-3xl sm:text-4xl font-bold text-foreground">
                        Какая у вас задача?
                    </SheetDescription>
                    <p className="text-muted-foreground pt-2">
                        <a href="mailto:danayn11@mail.ru" className="hover:text-accent">danayn11@mail.ru</a>
                    </p>
                </SheetHeader>
                <div className="p-6 sm:p-8">
                {formState === 'success' ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Заявка успешно отправлена!</h3>
                        <p className="text-muted-foreground max-w-md">Спасибо! Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                         <Button onClick={onClose} className="mt-8">Закрыть</Button>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="name">ФИО *</Label>
                                <Input id="name" {...register("name")} placeholder="Иванов Иван" />
                                {errors.name && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.name.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Номер телефона *</Label>
                                <Input id="phone" {...register("phone")} placeholder="+7 (___) ___-__-__" />
                                {errors.phone && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.phone.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project">По какому проекту вы хотели бы проконсультироваться?</Label>
                            <Textarea id="project" {...register("project")} placeholder="Опишите детали вашего проекта, цели, сроки..." rows={4} />
                        </div>
                        
                        <div className="space-y-4 pt-4">
                             <div className="flex items-start space-x-3">
                                <input type="checkbox" id="privacy-sheet" {...register("privacy")} className="mt-1 h-4 w-4 rounded border-border" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="privacy-sheet" className="text-sm font-normal text-muted-foreground">
                                        Нажимая на&nbsp;кнопку, вы&nbsp;даете <Link href="#" className="underline">Согласие на&nbsp;обработку своих персональных данных</Link>
                                    </Label>
                                    {errors.privacy && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.privacy.message}</p>}
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={formState === 'submitting'}>
                                {formState === 'submitting' ? 'Отправка...' : 'Отправить'}
                            </Button>
                        </div>
                    </form>
                 )}
                 <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold text-center mb-4">Написать в WhatsApp</h3>
                    <div className="flex justify-center">
                        <Image
                            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1mKBDqAEo3ZgrUseu5xob-zcerfrLTmiy4f-nICu3k9yqN7tW8fI0DJ-36GzaExLCwP5lxuvRYqQNH0J5uQ7rkE8kOxityWueZpaSgeFx"
                            alt="WhatsApp QR Code"
                            width={150}
                            height={150}
                        />
                    </div>
                 </div>
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
