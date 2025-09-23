import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink, CircleCheckBig, Zap, Send } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');
  
  return (
    <div className="py-16 md:py-24 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Контакты</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Свяжитесь с нами удобным способом. Работаем ежедневно с 10:00 до 20:00</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <Card className="p-6 bg-gradient-accent text-accent-foreground">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6" />
                <h3 className="text-xl font-heading font-semibold">Режим работы</h3>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-medium">Ежедневно: 10:00 - 20:00</div>
                <div className="text-sm opacity-90">Выезд специалистов в любой день недели</div>
                <div className="text-sm opacity-90">Срочные выезды - круглосуточно</div>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-brand transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-primary rounded-lg">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">Телефоны</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Основной</div>
                            <div className="text-sm font-medium text-foreground">+7 (952) 276-49-40</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Дополнительный</div>
                            <div className="text-sm font-medium text-foreground">+7 (910) 824-78-48</div>
                        </div>
                         <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Резервный</div>
                            <div className="text-sm font-medium text-foreground">+7 (991) 681-58-99</div>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-brand transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-primary rounded-lg">
                           <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">Мессенджеры</h3>
                    </div>
                     <div className="space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Telegram</div>
                            <div className="text-sm font-medium text-foreground">@zemla_yslygi</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">WhatsApp</div>
                            <div className="text-sm font-medium text-foreground">+7 (952) 276-49-40</div>
                        </div>
                         <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Viber</div>
                            <div className="text-sm font-medium text-foreground">+7 (952) 276-49-40</div>
                        </div>
                    </div>
                </Card>
                 <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-brand transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-primary rounded-lg">
                           <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">Email</h3>
                    </div>
                     <div className="space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Общие вопросы</div>
                            <div className="text-sm font-medium text-foreground">danayn11@mail.ru</div>
                        </div>
                    </div>
                </Card>
                 <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-brand transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-primary rounded-lg">
                           <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground">Офис</h3>
                    </div>
                     <div className="space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Адрес</div>
                            <div className="text-sm font-medium text-foreground">Санкт-Петербург, ул. Ефимова, д. 1/4, офис 301</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Метро</div>
                            <div className="text-sm font-medium text-foreground">Сенная площадь</div>
                        </div>
                         <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Парковка</div>
                            <div className="text-sm font-medium text-foreground">Имеется</div>
                        </div>
                    </div>
                </Card>
            </div>
             <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><CircleCheckBig className="h-5 w-5 text-accent"/>Почему выбирают нас</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-accent" /><span>Опыт работы с 2003 года</span></div>
                    <div className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-accent" /><span>Лицензированные кадастровые инженеры</span></div>
                    <div className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-accent" /><span>Современное геодезическое оборудование</span></div>
                    <div className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-accent" /><span>Гарантия на все виды работ</span></div>
                    <div className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-accent" /><span>Электронная подача документов</span></div>
                </div>
            </Card>
          </div>
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 sticky top-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 text-center">Оставить заявку</h3>
              <p className="text-muted-foreground text-center mb-8">Получите бесплатную консультацию и расчет стоимости работ</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" className="bg-background/50 border-border focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Телефон *</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" required className="bg-background/50 border-border focus:border-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                   <Label htmlFor="email" className="text-foreground">Email</Label>
                   <Input id="email" type="email" placeholder="your@email.com" className="bg-background/50 border-border focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-foreground">Интересующая услуга</Label>
                  <Input id="service" placeholder="Межевание, ЗОУИТ, топосъемка..." className="bg-background/50 border-border focus:border-accent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Сообщение</Label>
                  <Textarea id="message" placeholder="Опишите ваш объект и какие работы необходимы..." rows={4} className="bg-background/50 border-border focus:border-accent resize-none" />
                </div>
                <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="privacy" required className="rounded border-border" />
                        <Label htmlFor="privacy" className="text-sm text-muted-foreground">
                            Согласен с <a href="#" className="text-accent hover:underline">обработкой персональных данных</a>
                        </Label>
                    </div>
                    <Button type="submit" className="w-full h-11 rounded-md px-8 bg-gradient-primary text-primary font-heading font-semibold shadow-brand hover:shadow-hero transform hover:scale-105 transition-all duration-300">
                        <Send className="h-5 w-5 mr-2" />
                        Отправить заявку
                    </Button>
                </div>
              </form>
              <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-4">Или свяжитесь с нами напрямую:</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1 h-11 rounded-md px-8 bg-accent text-accent-foreground font-heading font-semibold shadow-brand hover:bg-accent/90 hover:shadow-hero">
                          <Phone className="h-4 w-4 mr-2" />
                          Позвонить
                      </Button>
                      <Button variant="outline" className="flex-1 h-11 rounded-md px-8 bg-background border-2 border-primary text-primary font-heading font-medium hover:bg-primary hover:text-primary-foreground">
                         <MessageSquare className="h-4 w-4 mr-2" />
                         Telegram
                      </Button>
                  </div>
              </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
