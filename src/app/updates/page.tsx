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

export default function UpdatesPage() {
  const faqs = [
      {
          question: "За какие сроки проводится межевание участка?",
          answer: "Сроки проведения межевания зависят от сложности объекта и составляют от 14 дней. Мы всегда стараемся выполнять работы в кратчайшие сроки."
      },
      {
          question: "Какие документы нужны для проведения межевания?",
          answer: "Для межевания потребуются правоустанавливающие документы на земельный участок, паспорт собственника и СНИЛС."
      },
      {
          question: "Что нужно сделать для регистрации дома?",
          answer: "Для регистрации дома необходимо подготовить технический план объекта и подать заявление в Росреестр. Мы предоставляем полный комплекс услуг по регистрации."
      },
      {
          question: "Что такое ЗОУИТ и когда это нужно?",
          answer: "ЗОУИТ — это зоны с особыми условиями использования территорий. Определение таких зон необходимо при планировании строительства, чтобы избежать нарушений законодательства."
      },
      {
          question: "Что такое электронная подача документов?",
          answer: "Это современный способ подачи документов в Росреестр через интернет, который значительно ускоряет процесс регистрации и экономит ваше время."
      },
      {
          question: "Сколько стоят ваши услуги?",
          answer: "Стоимость услуг рассчитывается индивидуально в зависимости от объема и сложности работ. Оставьте заявку, и мы подготовим для вас подробный расчет."
      },
      {
          question: "Работаете ли вы в выходные дни?",
          answer: "Да, мы работаем ежедневно с 10:00 до 20:00. Выезд специалистов возможен в любой день недели по предварительной договоренности."
      },
       {
          question: "Предоставляете ли вы гарантию на работы?",
          answer: "Да, мы предоставляем гарантию на все виды выполненных работ и несем полную ответственность за их качество."
      },
       {
          question: "Можно ли заказать только полевые работы?",
          answer: "Да, вы можете заказать как полный комплекс услуг, так и отдельные виды работ, например, только полевые измерения."
      },
       {
          question: "Выезжаете ли вы в Ленинградскую область?",
          answer: "Да, мы работаем по всему Санкт-Петербургу и Ленинградской области. Стоимость выезда зависит от удаленности объекта."
      }
  ]

  return (
    <div className="py-16 md:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit mb-4">
               <Newspaper className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Часто задаваемые вопросы</h1>
            <p className="mt-4 text-muted-foreground">
             Ответы на популярные вопросы о наших услугах и процессе работы
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card/80 backdrop-blur-sm border-border/50 rounded-lg mb-2 px-4">
                <AccordionTrigger className="text-lg font-heading font-semibold text-foreground text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <div className="text-center mt-12">
                <Card className="inline-block p-8 bg-accent text-accent-foreground max-w-lg">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <MessageCircle className="h-6 w-6" />
                        <h3 className="text-xl font-heading font-semibold">Не нашли ответ?</h3>
                    </div>
                    <p className="text-lg mb-6">Получите бесплатную консультацию по вашему вопросу</p>
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
