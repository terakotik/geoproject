
'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Newspaper, MessageCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedText } from "@/components/AnimatedText";
import { useContactDialog } from "@/hooks/use-contact-dialog";

export default function UpdatesPage() {
  const { onOpen } = useContactDialog();

  const faqs = [
      {
          question: "За какие сроки проводится межевание участка?",
          answer: "Сроки проведения межевания зависят от&nbsp;сложности объекта и&nbsp;составляют от&nbsp;14&nbsp;дней. Мы&nbsp;всегда стараемся выполнять работы в&nbsp;кратчайшие сроки."
      },
      {
          question: "Какие документы нужны для проведения межевания?",
          answer: "Для межевания потребуются правоустанавливающие документы на&nbsp;земельный участок, паспорт собственника и&nbsp;СНИЛС."
      },
      {
          question: "Что нужно сделать для регистрации дома?",
          answer: "Для регистрации дома необходимо подготовить технический план объекта и&nbsp;подать заявление в&nbsp;Росреестр. Мы&nbsp;предоставляем полный комплекс услуг по&nbsp;регистрации."
      },
      {
          question: "Что такое ЗОУИТ и когда это нужно?",
          answer: "ЗОУИТ&nbsp;- это зоны с&nbsp;особыми условиями использования территорий. Определение таких зон необходимо при планировании строительства, чтобы избежать нарушений законодательства."
      },
      {
          question: "Что такое электронная подача документов?",
          answer: "Это современный способ подачи документов в&nbsp;Росреестр через интернет, который значительно ускоряет процесс регистрации и&nbsp;экономит ваше время."
      },
      {
          question: "Сколько стоят ваши услуги?",
          answer: "Стоимость услуг рассчитывается индивидуально в&nbsp;зависимости от&nbsp;объема и&nbsp;сложности работ. Оставьте заявку, и&nbsp;мы&nbsp;подготовим для вас подробный расчет."
      },
      {
          question: "Работаете ли вы в выходные дни?",
          answer: "Да, мы&nbsp;работаем ежедневно с&nbsp;10:00 до&nbsp;20:00. Выезд специалистов возможен в&nbsp;любой день недели по&nbsp;предварительной договоренности."
      },
       {
          question: "Предоставляете ли вы гарантию на работы?",
          answer: "Да, мы&nbsp;предоставляем гарантию на&nbsp;все виды выполненных работ и&nbsp;несем полную ответственность за&nbsp;их&nbsp;качество."
      },
       {
          question: "Можно ли заказать только полевые работы?",
          answer: "Да, вы&nbsp;можете заказать как полный комплекс услуг, так и&nbsp;отдельные виды работ, например, только полевые измерения."
      },
       {
          question: "Выезжаете ли вы в Ленинградскую область?",
          answer: "Да, мы&nbsp;работаем по&nbsp;всему Санкт-Петербургу и&nbsp;Ленинградской области. Стоимость выезда зависит от&nbsp;удаленности объекта."
      }
  ]

  return (
    <div className="py-16 md:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit mb-6">
               <Newspaper className="h-10 w-10" />
            </div>
            <AnimatedText as="h1" text="Часто задаваемые вопросы" className="text-4xl md:text-5xl font-bold font-headline" />
            <p className="mt-4 text-muted-foreground text-lg">
             Ответы на&nbsp;популярные вопросы о&nbsp;наших услугах и&nbsp;процессе работы
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card/80 backdrop-blur-sm border-border/50 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-heading font-semibold text-foreground text-left hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-0 pb-6">
                   <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <div className="text-center mt-16">
                <Card className="inline-block p-8 bg-accent text-accent-foreground max-w-lg">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <MessageCircle className="h-6 w-6" />
                        <h3 className="text-xl font-heading font-semibold">Не&nbsp;нашли ответ?</h3>
                    </div>
                    <p className="text-lg mb-6">Получите бесплатную консультацию по&nbsp;вашему вопросу</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Button asChild><Link href="/contact">Задать вопрос</Link></Button>
                       <Button asChild variant="secondary"><a href="tel:+79522764940">+7 (952) 276-49-40</a></Button>
                    </div>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
