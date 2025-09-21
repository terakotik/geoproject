import { Logo } from '@/components/Logo';
import { Facebook, Twitter, Linkedin, Send, MessageSquare, ExternalLink, Clock, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-6">
            <Logo />
            <p className="text-sm opacity-80 leading-relaxed">
              Профессиональные геодезические услуги в Санкт-Петербурге и Ленинградской области.
              Полный спектр кадастровых работ и инженерных изысканий.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Send className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Услуги</h4>
            <div className="space-y-3 text-sm">
              <Link href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Межевание участков</Link>
              <Link href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Технические планы ОКС</Link>
              <Link href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Топографическая съемка</Link>
              <Link href="#" className="block opacity-80 hover:opacity-100 transition-opacity">ЗОУИТ</Link>
              <Link href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Фасадная съемка 3D</Link>
              <Link href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Кадастровая оценка</Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 opacity-80" />
                <div className="text-sm">
                  <div>+7 (952) 276-49-40</div>
                  <div className="opacity-60">Основной</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 opacity-80" />
                <div className="text-sm">
                  <div>danayn11@mail.ru</div>
                  <div className="opacity-60">Email</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 opacity-80" />
                <div className="text-sm">
                  <div>Санкт-Петербург и ЛО</div>
                  <div className="opacity-60">Зона работы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 opacity-80" />
                <div className="text-sm">
                  <div>10:00 - 20:00</div>
                  <div className="opacity-60">Ежедневно</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Бесплатная консультация</h4>
            <Card className="p-4 bg-primary-foreground/10 border-primary-foreground/20">
              <p className="text-sm mb-4 opacity-80">Получите профессиональную консультацию по вашему вопросу</p>
              <Button className="w-full mb-3" variant="secondary">Заказать звонок</Button>
              <div className="text-xs opacity-60 text-center">Ответим в течение 15 минут</div>
            </Card>
            <div className="space-y-3 text-xs">
               <a href="#" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                 <ExternalLink className="h-3 w-3" />
                 Политика конфиденциальности
               </a>
               <a href="#" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                 <ExternalLink className="h-3 w-3" />
                 Пользовательское соглашение
               </a>
            </div>
          </div>

        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm opacity-60">
              © 2024 ООО "ГЕОСТРОЙПРОЕКТ". Все права защищены.
            </div>
            <div className="text-xs opacity-60 text-center lg:text-right">
              Лицензированные кадастровые инженеры | Работаем с 2003 года<br/>
              Геодезические услуги в Санкт-Петербурге и Ленинградской области
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
