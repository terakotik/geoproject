import { Logo } from '@/components/Logo';
import { Facebook, Twitter, Linkedin, Send, MessageSquare, ExternalLink, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-6">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Профессиональные геодезические услуги в Санкт-Петербурге и Ленинградской области.
              Полный спектр кадастровых работ и инженерных изысканий.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" asChild>
                <a href="https://t.me/zemla_yslygi" target="_blank" rel="noopener noreferrer"><Send className="h-4 w-4" /></a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="https://wa.me/79522764940" target="_blank" rel="noopener noreferrer"><MessageSquare className="h-4 w-4" /></a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Услуги</h4>
            <div className="space-y-3 text-sm">
              <Link href="/services/land-surveying" className="block text-muted-foreground hover:text-accent transition-opacity">Межевание участков</Link>
              <Link href="/services/technical-plans" className="block text-muted-foreground hover:text-accent transition-opacity">Технические планы ОКС</Link>
              <Link href="/services/topographic-survey" className="block text-muted-foreground hover:text-accent transition-opacity">Топографическая съемка</Link>
              <Link href="/services/zouit" className="block text-muted-foreground hover:text-accent transition-opacity">ЗОУИТ</Link>
              <Link href="/services/facade-survey" className="block text-muted-foreground hover:text-accent transition-opacity">Фасадная съемка 3D</Link>
              <Link href="/services/cadastral-valuation" className="block text-muted-foreground hover:text-accent transition-opacity">Кадастровая оценка</Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <a href="tel:+79522764940" className="text-foreground hover:text-accent">+7 (952) 276-49-40</a>
                  <div className="text-muted-foreground text-xs">Основной</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <a href="mailto:danayn11@mail.ru" className="text-foreground hover:text-accent">danayn11@mail.ru</a>
                  <div className="text-muted-foreground text-xs">Общие вопросы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <div className="text-foreground">Санкт-Петербург и ЛО</div>
                  <div className="text-muted-foreground text-xs">Зона работы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <div className="text-foreground">10:00 - 20:00</div>
                  <div className="text-muted-foreground text-xs">Ежедневно</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Бесплатная консультация</h4>
            <Card className="p-4 bg-card/80 border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Получите профессиональную консультацию по вашему вопросу</p>
              <Button className="w-full mb-3" asChild>
                <Link href="/contact">Заказать звонок</Link>
              </Button>
              <div className="text-xs text-muted-foreground text-center">Ответим в течение 15 минут</div>
            </Card>
            <div className="space-y-3 text-xs">
               <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-opacity">
                 <ExternalLink className="h-3 w-3" />
                 Политика конфиденциальности
               </a>
               <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-opacity">
                 <ExternalLink className="h-3 w-3" />
                 Пользовательское соглашение
               </a>
            </div>
          </div>

        </div>
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 ООО "ГЕОСТРОЙПРОЕКТ". Все права защищены.
            </div>
            <div className="text-xs text-muted-foreground text-center lg:text-right">
              Лицензированные кадастровые инженеры | Работаем с 2003 года<br/>
              Геодезические услуги в Санкт-Петербурге и Ленинградской области
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
