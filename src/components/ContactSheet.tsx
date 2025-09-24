'use client'

import {
    Sheet,
    SheetContent,
    SheetClose,
} from "@/components/ui/sheet"
import { useContactSheet } from "@/hooks/use-contact-sheet"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, X, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не короче 2 символов." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
  task: z.string().optional(),
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
            <SheetContent className="w-[90vw] max-w-5xl bg-white p-0">
                 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full p-8 md:p-12 space-y-4">
                    {formState === 'success' ? (
                        <div className="flex flex-col items-center justify-center flex-grow text-center">
                            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-semibold mb-3">Заявка успешно отправлена!</h3>
                            <p className="text-xl text-muted-foreground max-w-lg">Спасибо! Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                             <Button onClick={() => { onClose(); setFormState('idle'); }} className="mt-10 text-xl p-6 rounded-none">Закрыть</Button>
                        </div>
                    ) : (
                        <>
                            <header className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-800">Заказать звонок</h1>
                                </div>
                                <SheetClose>
                                    <X className="h-8 w-8 text-gray-500 cursor-pointer" />
                                    <span className="sr-only">Закрыть</span>
                                </SheetClose>
                            </header>

                             <div className="flex-grow space-y-4 flex flex-col">
                                <p className="text-xs text-gray-500">Отсканируйте, чтобы написать в WhatsApp</p>
                                
                                <div className="grid grid-cols-[192px_1fr] gap-4">
                                     <div className="w-48 h-48 border-2 border-primary flex items-center justify-center">
                                         <Image src="https://placehold.co/192x192/000000/FFFFFF?text=QR" alt="QR-код для связи" width={192} height={192} />
                                     </div>
                                    <div className="border-2 border-input h-48 flex flex-col">
                                        <Textarea
                                            id="task"
                                            {...register("task")}
                                            placeholder="Коротко о задаче"
                                            className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-3xl font-bold placeholder-gray-500 p-4 rounded-none"
                                        />
                                    </div>
                                </div>
                                
                                <div className="border-2 border-input w-full h-24 flex items-center">
                                    <Input
                                        id="phone"
                                        type="tel"
                                        {...register("phone")}
                                        placeholder="Ваш телефон"
                                        className="w-full bg-transparent border-none focus:outline-none text-3xl font-bold placeholder-gray-500 p-4 rounded-none"
                                        aria-invalid={errors.phone ? "true" : "false"}
                                    />
                                    
                                </div>
                                {errors.phone && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.phone.message}</p>}


                                <div className="border-2 border-input w-full h-24 flex items-center relative">
                                    <Input
                                        id="name"
                                        type="text"
                                        {...register("name")}
                                        placeholder="Ваше имя"
                                        className="w-full bg-transparent border-none focus:outline-none text-3xl font-bold placeholder-gray-500 p-4 pr-24 rounded-none"
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Button type="submit" disabled={formState === 'submitting'} size="icon" className="bg-primary text-primary-foreground h-16 w-16 hover:bg-primary/90 focus:outline-none rounded-none aspect-square">
                                            <ArrowRight className="h-8 w-8" />
                                        </Button>
                                    </div>
                                </div>
                                 {errors.name && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.name.message}</p>}
                            </div>

                           <footer className="mt-2">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="privacy" {...register("privacy")} className="w-4 h-4 rounded-none border-border" />
                                    <Label htmlFor="privacy" className="text-xs text-gray-500 font-normal">
                                        Нажимая на кнопку, вы даете согласие на обработку своих <Link href="#" className="text-primary hover:underline">персональных данных</Link>
                                    </Label>
                                </div>
                                {errors.privacy && <p className="text-sm text-destructive flex items-center gap-1 mt-1"><AlertCircle className="h-4 w-4" /> {errors.privacy.message}</p>}
                            </footer>
                        </>
                    )}
                </form>
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
