'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink, CircleCheckBig, Zap, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не короче 2 символов." }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона." }),
  email: z.string().email({ message: "Введите корректный email." }).optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, { message: "Необходимо согласие на обработку данных." }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
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
    <div className="py-16 md:py-24 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Контакты</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Свяжитесь с&nbsp;нами удобным способом. Работаем ежедневно с&nbsp;10:00 до&nbsp;20:00</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-accent text-accent-foreground">
              <CardHeader className="p-0 mb-4 flex-row items-center gap-3">
                <Clock className="h-6 w-6" />
                <CardTitle className="text-xl">Режим работы</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <div className="text-lg font-medium">Ежедневно: 10:00&nbsp;- 20:00</div>
                <div className="text-sm opacity-90">Выезд специалистов в&nbsp;любой день недели</div>
                <div className="text-sm opacity-90">Срочные выезды&nbsp;- круглосуточно</div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-6">
                    <CardHeader className="p-0 flex-row items-center gap-3 mb-4">
                       <Phone className="h-5 w-5 text-accent" />
                       <CardTitle className="text-lg">Телефоны</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Основной</div>
                            <a href="tel:+79522764940" className="text-sm font-medium text-foreground hover:text-accent">+7 (952) 276-49-40</a>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Дополнительный</div>
                             <a href="tel:+79108247848" className="text-sm font-medium text-foreground hover:text-accent">+7 (910) 824-78-48</a>
                        </div>
                         <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Резервный</div>
                             <a href="tel:+79916815899" className="text-sm font-medium text-foreground hover:text-accent">+7 (991) 681-58-99</a>
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-6">
                     <CardHeader className="p-0 flex-row items-center gap-3 mb-4">
                       <MessageSquare className="h-5 w-5 text-accent" />
                       <CardTitle className="text-lg">Мессенджеры</CardTitle>
                    </CardHeader>
                     <CardContent className="p-0 space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Telegram</div>
                            <a href="https://t.me/zemla_yslygi" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-accent">@zemla_yslygi</a>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">WhatsApp</div>
                            <a href="https://wa.me/79522764940" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-accent">+7 (952) 276-49-40</a>
                        </div>
                         <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Viber</div>
                            <span className="text-sm font-medium text-foreground">+7 (952) 276-49-40</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="p-6">
                    <CardHeader className="p-0 flex-row items-center gap-3 mb-4">
                        <Mail className="h-5 w-5 text-accent" />
                        <CardTitle className="text-lg">Email</CardTitle>
                    </CardHeader>
                     <CardContent className="p-0 space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Общие вопросы</div>
                            <a href="mailto:danayn11@mail.ru" className="text-sm font-medium text-foreground hover:text-accent">danayn11@mail.ru</a>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="p-6">
                    <CardHeader className="p-0 flex-row items-center gap-3 mb-4">
                       <MapPin className="h-5 w-5 text-accent" />
                       <CardTitle className="text-lg">Офис</CardTitle>
                    </CardHeader>
                     <CardContent className="p-0 space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Адрес</div>
                            <div className="text-sm font-medium text-foreground">Санкт-Петербург, ул. Ефимова, д.&nbsp;1/4, офис&nbsp;301</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Метро</div>
                            <div className="text-sm font-medium text-foreground">Сенная площадь</div>
                        </div>
                         <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Парковка</div>
                            <div className="text-sm font-medium text-foreground">Имеется</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2 text-lg"><CircleCheckBig className="h-5 w-5 text-accent"/>Почему выбирают нас</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Опыт работы с&nbsp;2003 года</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Лицензированные кадастровые инженеры</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Современное геодезическое оборудование</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Гарантия на&nbsp;все виды работ</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Электронная подача документов</span></div>
                </CardContent>
            </Card>
          </div>
          
          <Card className="p-8 sticky top-8">
            <CardHeader className="p-0 text-center mb-6">
              <CardTitle className="text-2xl">Оставить заявку</CardTitle>
              <p className="text-muted-foreground">Получите бесплатную консультацию и&nbsp;расчет стоимости работ</p>
            </CardHeader>
            <CardContent className="p-0">
              {formState === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Заявка успешно отправлена!</h3>
                  <p className="text-muted-foreground">Спасибо! Мы&nbsp;свяжемся с&nbsp;вами в&nbsp;ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Имя *</Label>
                      <Input id="name" {...register("name")} placeholder="Ваше имя" aria-invalid={errors.name ? "true" : "false"} />
                      {errors.name && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Телефон *</Label>
                      <Input id="phone" {...register("phone")} placeholder="+7 (___) ___-__-__" aria-invalid={errors.phone ? "true".toString() : "false"}/>
                      {errors.phone && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email" className="text-foreground">Email</Label>
                     <Input id="email" type="email" {...register("email")} placeholder="your@email.com" aria-invalid={errors.email ? "true" : "false"} />
                     {errors.email && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground">Интересующая услуга</Label>
                    <Input id="service" {...register("service")} placeholder="Межевание, ЗОУИТ, топосъемка..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Сообщение</Label>
                    <Textarea id="message" {...register("message")} placeholder="Опишите ваш объект и какие работы необходимы..." rows={4} className="resize-none" />
                  </div>
                  <div className="space-y-4 pt-2">
                      <div className="flex items-start space-x-3">
                          <input type="checkbox" id="privacy" {...register("privacy")} className="mt-1 h-4 w-4 rounded border-border" aria-invalid={errors.privacy ? "true" : "false"} />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="privacy" className="text-sm font-medium text-muted-foreground">
                                Согласен с&nbsp;<Link href="#" className="text-accent hover:underline">обработкой персональных данных</Link>
                            </Label>
                            {errors.privacy && <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.privacy.message}</p>}
                          </div>
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={formState === 'submitting'}>
                          <Send className="h-5 w-5 mr-2" />
                          {formState === 'submitting' ? 'Отправка...' : 'Отправить заявку'}
                      </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
