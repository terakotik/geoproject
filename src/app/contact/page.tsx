'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink, CircleCheckBig, Zap, Send, AlertCircle, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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


  if (succeeded) {
      return (
          <div className="py-16 md:py-24 bg-background flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Спасибо за вашу заявку!</h3>
                  <p className="text-muted-foreground">Мы скоро свяжемся с вами.</p>
                  <Button asChild className="mt-6">
                      <Link href="/">Вернуться на главную</Link>
                  </Button>
              </div>
          </div>
      );
  }

  return (
    <div className="py-16 md:py-24 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Контакты</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">Свяжитесь с нами удобным способом. Работаем ежедневно с 10:00 до 20:00</p>
        </div>
        
        <div className="text-center mb-8">
            <Button asChild size="lg">
                <Link href="/memo">
                    <FileText className="mr-2 h-5 w-5" />
                    Памятка по регистрации дома (тех. план)
                </Link>
            </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-accent text-accent-foreground">
              <CardHeader className="p-0 mb-4 flex-row items-center gap-3">
                <Clock className="h-6 w-6" />
                <CardTitle className="text-xl">Режим работы</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <div className="text-lg font-medium">Ежедневно: 10:00 - 20:00</div>
                <div className="text-sm opacity-90">Выезд специалистов в любой день недели</div>
                <div className="text-sm opacity-90">Срочные выезды - круглосуточно</div>
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
                            <a href="https://wa.me/79108247848" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-accent">+7 (910) 824-78-48</a>
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
                            <div className="text-sm font-medium text-foreground">Санкт-Петербург, ул. Ефимова, д. 1/4, офис 301</div>
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
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Опыт работы с 2003 года</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Лицензированные кадастровые инженеры</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Современное геодезическое оборудование</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Гарантия на все виды работ</span></div>
                    <div className="flex items-start gap-3"><CircleCheckBig className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" /><span>Электронная подача документов</span></div>
                </CardContent>
            </Card>
          </div>
          
          <Card className="p-8 sticky top-8">
            <CardHeader className="p-0 text-center mb-6">
              <CardTitle className="text-2xl">Оставить заявку</CardTitle>
              <p className="text-muted-foreground">Получите бесплатную консультацию и расчет стоимости работ</p>
            </CardHeader>
            <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Имя *</Label>
                      <Input id="name" name="name" placeholder="Ваше имя" required disabled={submitting} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Телефон *</Label>
                      <Input id="phone" name="phone" placeholder="+7 (___) ___-__-__" required disabled={submitting}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email" className="text-foreground">Email</Label>
                     <Input id="email" type="email" name="email" placeholder="your@email.com" disabled={submitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground">Интересующая услуга</Label>
                    <Input id="service" name="service" placeholder="Межевание, ЗОУИТ, топосъемка..." disabled={submitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Сообщение</Label>
                    <Textarea id="message" name="message" placeholder="Опишите ваш объект и какие работы необходимы..." rows={4} className="resize-none" disabled={submitting} />
                  </div>
                  {error && (
                    <div className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> {error}
                    </div>
                  )}
                  <div className="space-y-4 pt-2">
                      <div className="flex items-start space-x-3">
                          <input type="checkbox" id="privacy" name="privacy" defaultChecked required className="mt-1 h-4 w-4 rounded border-border" disabled={submitting} />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="privacy" className="text-sm font-medium text-muted-foreground">
                                Я согласен с условиями <Link href="/privacy-policy" className="text-accent hover:underline" target="_blank">Политики обработки персональных данных</Link> и даю <Link href="/user-agreement" className="text-accent hover:underline" target="_blank">Согласие на обработку моих персональных данных</Link>
                            </Label>
                          </div>
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                          {submitting ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Send className="h-5 w-5 mr-2" />}
                          {submitting ? 'Отправка...' : 'Отправить заявку'}
                      </Button>
                  </div>
                </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
