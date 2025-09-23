
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
import { AlertCircle, CheckCircle2, X } from "lucide-react";
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
            <SheetContent className="w-[90vw] max-w-5xl p-0 bg-transparent border-none shadow-none">
                <div className="bg-white rounded-xl shadow-2xl w-full h-full p-12 md:p-16 relative flex flex-col">
                    <SheetClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 ring-offset-0 focus:ring-0">
                        <X className="w-8 h-8" />
                    </SheetClose>

                    {formState === 'success' ? (
                        <div className="text-center flex flex-col items-center justify-center flex-grow">
                            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-semibold mb-3">Заявка успешно отправлена!</h3>
                            <p className="text-xl text-muted-foreground max-w-lg">Спасибо! Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                            <Button onClick={onClose} className="mt-10 text-xl p-6">Закрыть</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
                            <div className="flex items-start mb-8 space-x-8">
                                <div className="flex flex-col items-center w-32 h-32 flex-shrink-0">
                                    <Image src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1mKBDqAEo3ZgrUseu5xob-zcerfrLTmiy4f-nICu3k9yqN7tW8fI0DJ-36GzaExLCwP5lxuvRYqQNH0J5uQ7rkE8kOxityWueZpaSgeFx" alt="QR-код для связи" width={128} height={128} className="w-32 h-32 rounded-lg" />
                                    <span className="text-xs text-gray-500 mt-1">Связь в WhatsApp</span>
                                </div>
                                <div className="flex-1">
                                    <Input 
                                      type="tel" 
                                      id="phone" 
                                      {...register("phone")}
                                      placeholder="+7 (___) ___ - __ - __" 
                                      className="w-full px-4 py-3 text-5xl border-2 border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                                      style={{ height: '128px' }} 
                                      aria-invalid={errors.phone ? "true" : "false"}
                                    />
                                     {errors.phone && <p className="text-sm text-destructive flex items-center gap-1 mt-1"><AlertCircle className="h-4 w-4" /> {errors.phone.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <Label htmlFor="name" className="block text-gray-700 font-medium mb-2">* Ваше имя</Label>
                                    <Input 
                                      type="text" 
                                      id="name" 
                                      {...register("name")}
                                      placeholder="Иванов Иван" 
                                      className="w-full px-4 py-3 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                      aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    {errors.name && <p className="text-sm text-destructive flex items-center gap-1 mt-1"><AlertCircle className="h-4 w-4" /> {errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="task" className="block text-gray-700 font-medium mb-2">Опишите задачу</Label>
                                    <Textarea 
                                      id="task" 
                                      {...register("task")}
                                      placeholder="Какой объект, какие работы необходимы..." 
                                      className="w-full px-4 py-3 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32 resize-none"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-auto flex flex-col items-center">
                                <div className="flex items-center mb-6 self-start">
                                    <input 
                                      id="privacy" 
                                      type="checkbox" 
                                      {...register("privacy")}
                                      className="h-4 w-4 rounded text-yellow-500 focus:ring-2 focus:ring-yellow-400 border-gray-300"
                                      aria-invalid={errors.privacy ? "true" : "false"}
                                    />
                                    <Label htmlFor="privacy" className="ml-2 text-sm text-gray-500 font-normal">
                                        Нажимая на кнопку, вы даете согласие на обработку своих <Link href="#" className="text-yellow-600 hover:underline">персональных данных</Link>
                                    </Label>
                                </div>
                                {errors.privacy && <p className="text-sm text-destructive flex items-center gap-1 mb-2 self-start"><AlertCircle className="h-4 w-4" /> {errors.privacy.message}</p>}
                                <Button 
                                  type="submit"
                                  disabled={formState === 'submitting'}
                                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-md shadow-lg transition-colors duration-200 text-xl h-auto"
                                >
                                    {formState === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
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
