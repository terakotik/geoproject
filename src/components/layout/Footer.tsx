
'use client'

import { Logo } from '@/components/Logo';
import { Facebook, Twitter, Linkedin, Send, MessageSquare, ExternalLink, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useContactSheet } from '@/hooks/use-contact-sheet';
import { AnimatedText } from '../AnimatedText';

export default function Footer() {
  const { onOpen } = useContactSheet();

  return (
    <footer className="bg-black text-white relative overflow-hidden sticky bottom-0">
      <div className="absolute inset-0 z-0 hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://pouch.jumpshare.com/preview/dUHg-gsRDslnFdT3XfFQYUj3M9PXnVuKIjURan0E7Tt9Heoa57PeFb-sbUHpmPWll8ZWyRtlbSgh2j3IOsSmh_aPcQXoRS15iWmHOM-M34oq3xv7xY6eKpTknO-BlLQ6JUqFZxAyzBKDkHpyYMX-zW6yjbN-I2pg_cnoHs_AmgI.mp4"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <Link href="/">
                <Logo isFooter={true} />
            </Link>
            <p className="text-sm text-white/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: 'Профессиональные геодезические услуги в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области. Полный спектр кадастровых работ и&nbsp;инженерных изысканий.' }}></p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <a href="https://t.me/zemla_yslygi" target="_blank" rel="noopener noreferrer"><Send className="h-4 w-4" /></a>
              </Button>
              <Button size="icon" variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <a href="https://wa.me/79522764940" target="_blank" rel="noopener noreferrer"><MessageSquare className="h-4 w-4" /></a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Услуги</h4>
            <div className="space-y-3 text-sm">
              <Link href="/services/land-surveying" className="block text-white/80 hover:text-accent transition-opacity">Межевание участков</Link>
              <Link href="/services/technical-plans" className="block text-white/80 hover:text-accent transition-opacity">Технические планы ОКС</Link>
              <Link href="/services/topographic-survey" className="block text-white/80 hover:text-accent transition-opacity">Топографическая съемка</Link>
              <Link href="/services/zouit" className="block text-white/80 hover:text-accent transition-opacity">ЗОУИТ</Link>
              <Link href="/services/facade-survey" className="block text-white/80 hover:text-accent transition-opacity">Фасадная съемка 3D</Link>
              <Link href="/services/cadastral-valuation" className="block text-white/80 hover:text-accent transition-opacity">Кадастровая оценка</Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-white/80" />
                <div className="text-sm">
                  <a href="tel:+79522764940" className="text-white hover:text-accent">+7 (952) 276-49-40</a>
                  <div className="text-white/80 text-xs">Основной</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-white/80" />
                <div className="text-sm">
                  <a href="mailto:danayn11@mail.ru" className="text-white hover:text-accent">danayn11@mail.ru</a>
                  <div className="text-white/80 text-xs">Общие вопросы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-white/80" />
                <div className="text-sm">
                  <div className="text-white" dangerouslySetInnerHTML={{ __html: 'Санкт-Петербург и&nbsp;ЛО' }}></div>
                  <div className="text-white/80 text-xs">Зона работы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-white/80" />
                <div className="text-sm">
                  <div className="text-white">10:00 - 20:00</div>
                  <div className="text-white/80 text-xs">Ежедневно</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Бесплатная консультация</h4>
            <Card className="p-6 bg-white/10 border-white/20">
              <p className="text-sm text-white/80 mb-4" dangerouslySetInnerHTML={{ __html: 'Получите профессиональную консультацию по&nbsp;вашему вопросу' }}></p>
              <Button className="w-full mb-3" onClick={onOpen}>
                Заказать звонок
              </Button>
              <div className="text-xs text-white/80 text-center" dangerouslySetInnerHTML={{ __html: 'Ответим в&nbsp;течение 15&nbsp;минут' }}></div>
            </Card>
            <div className="space-y-3 text-xs">
               <a href="#" className="flex items-center gap-2 text-white/80 hover:text-accent transition-opacity">
                 <ExternalLink className="h-3 w-3" />
                 Политика конфиденциальности
               </a>
               <a href="#" className="flex items-center gap-2 text-white/80 hover:text-accent transition-opacity">
                 <ExternalLink className="h-3 w-3" />
                 Пользовательское соглашение
               </a>
            </div>
          </div>

        </div>
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/80" dangerouslySetInnerHTML={{ __html: '© 2025 ООО&nbsp;"ГЕОСТРОЙПРОЕКТ". Все права защищены.' }}>
            </div>
            <a href="https://www.1target.ru/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80">
                <AnimatedText as="span" text="Разработано в 1TARGET" className="text-sm" endSymbol="🚀"/>
            </a>
            <div className="text-xs text-white/80 text-center lg:text-right" dangerouslySetInnerHTML={{ __html: 'Лицензированные кадастровые инженеры | Работаем с&nbsp;2003 года<br/>Геодезические услуги в&nbsp;Санкт-Петербурге и&nbsp;Ленинградской области' }}>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
