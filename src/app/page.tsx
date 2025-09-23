
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock, ListChecks, Linkedin, Twitter, FolderKanban, Award } from 'lucide-react';
import { services, getServiceDetails } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel';
import { HelpCircle } from 'lucide-react';
import { AnimatedSectionTitle } from '@/components/AnimatedSectionTitle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { ClientsMarquee } from '@/components/ClientsMarquee';


const packages = [
  {
    title: "Стандарт",
    description: "Межевание + Технический план",
    price: "12 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 11%",
    audience: "2-3 заявки",
    features: ["Межевание участка", "Технический план дома", "Подача документов", "Сопровождение до&nbsp;регистрации"],
    popular: false,
  },
  {
    title: "Популярный",
    description: "Групповой пакет",
    price: "11 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 18%",
    audience: "4-7 заявки",
    features: ["Все услуги пакета Стандарт", "Приоритетное обслуживание", "Персональный менеджер", "Скидка на&nbsp;дополнительные услуги"],
    popular: true,
  },
  {
    title: "Максимум",
    description: "Для больших объемов",
    price: "8 000 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 43%",
    audience: "20+ заявок",
    features: ["Все услуги предыдущих пакетов", "Индивидуальные условия", "Выездные консультации", "Круглосуточная поддержка"],
    popular: true,
    badge: "Максимальная скидка"
  },
];

const priceSections = [
  {
    title: "Земельные участки",
    items: [
      { name: "Межевание земельного участка в&nbsp;Спб и&nbsp;ЛО", price: "от 12500 руб.", term: "от 14 дней" },
      { name: "Межевание земель общего пользования в&nbsp;СНТ, ДНП", price: "индивидуально", term: "" },
      { name: "Раздел земельного участка", price: "от 10000 руб.", term: "от 14 дней" },
      { name: "Объединение земельных участков", price: "от 10000 руб.", term: "от 14 дней" },
      { name: "Перераспределение земельных участков", price: "от 8000 руб.", term: "от 14 дней" },
      { name: "Формирование схемы участка на&nbsp;КПТ", price: "от 3000 руб.", term: "2 дня" },
      { name: "Вынос границ в&nbsp;натуру (4&nbsp;точки включены)", price: "от 7000 руб.", term: "от 2 дней" },
    ],
  },
  {
    title: "Объекты капитального строительства",
    items: [
        { name: "Оформление прав собственности на&nbsp;дом, баню, гараж, хозпостройку", price: "от 12000 руб.", term: "от 5 дней" },
        { name: "Изготовление технического плана на&nbsp;здание, сооружение, объекта незавершенного строительства", price: "от 8000 руб.", term: "от 5 дней" },
        { name: "Учет изменений ОКС (перепланировка, реконструкция)", price: "от 12000 руб.", term: "от 5 дней" },
        { name: "Изготовление акта обследования", price: "от 5000 руб.", term: "от 3 дней" },
        { name: "Регистрация загородной недвижимости", price: "от 8500 руб.", term: "от 5 дней" },
    ],
  },
  {
    title: "Топографическая съемка",
    items: [
        { name: "Фасадная съемка и&nbsp;3D", price: "от 10000 руб.", term: "от 3 дней" },
        { name: "Съёмка для водоканала и&nbsp;газа", price: "от 10000 руб.", term: "от 5 дней" },
        { name: "Съёмка для ландшафтного дизайна", price: "от 12000 руб.", term: "от 5 дней" },
    ],
  },
    {
    title: "Дополнительные услуги",
    items: [
        { name: "Регистрация машиноместа", price: "от 18000 руб.", term: "от 10 дней" },
        { name: "Подготовка поэтажных планов", price: "от 3000 руб.", term: "от 3 дней" },
        { name: "Изготовление технического паспорта объекта", price: "от 5000 руб.", term: "от 3 дней" },
    ],
  },
];

const kadastrServices = [
    "Межевание земельных участков&nbsp;+&nbsp;подача документов",
    "Составление технических планов, получение уведомлений, регистрация в&nbsp;Росреестре.",
    "Вынос границ в&nbsp;натуру по&nbsp;законной границе, с&nbsp;выездом на&nbsp;объект установка колышков",
    "Акт обследования",
    "Техническая инвентаризация",
    "Схема расположения земельного участка",
];

const geoServices = [
    "Топографическая (геодезическая) съемка земельных участков и&nbsp;местности",
    "Топографическая (геодезическая) съемка для ландшафтного дизайна",
    "Создание геодезической разбивочной основы (ГРО)",
    "Съемка участка под газ, водопровод и&nbsp;другие инженерные сети",
    "Создание топографических планов с&nbsp;подземными коммуникациями",
    "Страхование всех видов",
];

const heroStats = [
    { value: "2000+", label: "выполненных проектов", icon: FolderKanban },
    { value: "21", label: "на рынке кадастра", icon: Award },
    { value: "14", label: "дней средний срок", icon: Clock },
];

const heroBenefits = [
    "Лицензированные кадастровые инженеры",
    "Работы любой сложности под&nbsp;ключ",
    "Электронная подача документов",
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  
  const processSteps = [
    {
      icon: FilePenLine,
      title: 'Заключение договора',
      description: 'Бесплатная консультация, осмотр объекта и&nbsp;подписание договора с&nbsp;фиксированной стоимостью',
      duration: 'В день обращения',
      points: ['Выезд на объект', 'Анализ документов', 'Расчет стоимости', 'Подписание договора']
    },
    {
      icon: Users,
      title: 'Выезд геодезистов',
      description: 'Квалифицированные специалисты выполняют полевые работы с&nbsp;современным оборудованием',
      duration: '1-2 дня',
      points: ['Геодезические измерения', 'Съемка границ', 'Фиксация точек', 'Фотофиксация']
    },
    {
      icon: SquareCheckBig,
      title: 'Согласование границ',
      description: 'Уведомление соседей и&nbsp;согласование границ участка в&nbsp;соответствии с&nbsp;требованиями закона',
      duration: '7-14 дней',
      points: ['Уведомление соседей', 'Выход на границы', 'Подписание актов', 'Устранение разногласий']
    },
    {
      icon: FileTextIcon,
      title: 'Подготовка документов',
      description: 'Изготовление межевого или технического плана, проверка и&nbsp;подготовка к&nbsp;подаче',
      duration: '3-5 дней',
      points: ['Камеральные работы', 'Подготовка планов', 'Проверка качества', 'Подготовка пакета документов']
    },
    {
      icon: Download,
      title: 'Получение документов',
      description: 'Электронная подача в&nbsp;Росреестр и&nbsp;получение готовых документов с&nbsp;правами собственности',
      duration: '10-12 дней',
      points: ['Подача в Росреестр', 'Отслеживание статуса', 'Получение документов', 'Передача клиенту']
    }
  ];

  const SurveyorDialog = ({ children }: { children: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Заходите к&nbsp;нам еще!</DialogTitle>
          <DialogDescription>
            Подписывайтесь на&nbsp;наши социальные сети, чтобы быть в&nbsp;курсе новостей и&nbsp;акций.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 py-4">
            <Button size="icon" variant="ghost" asChild className="text-foreground hover:bg-accent/10 hover:text-accent">
                <a href="https://t.me/zemla_yslygi" target="_blank" rel="noopener noreferrer"><Send className="h-6 w-6" /></a>
            </Button>
             <Button size="icon" variant="ghost" asChild className="text-foreground hover:bg-accent/10 hover:text-accent">
                <a href="#" target="_blank" rel="noopener noreferrer"><Twitter className="h-6 w-6" /></a>
            </Button>
             <Button size="icon" variant="ghost" asChild className="text-foreground hover:bg-accent/10 hover:text-accent">
                <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="h-6 w-6" /></a>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const details = getServiceDetails(service.slug);
    if (!details) return null;
    return (
      <Card className="flex flex-col h-full hover:border-accent transition-all duration-300 border bg-card relative group p-6">
        <div className="absolute top-4 left-4 text-8xl font-bold text-foreground/5 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:text-accent/10">
          0{index + 1}
        </div>
        <div className="mb-4">
          <service.icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-heading mb-2">{service.title}</CardTitle>
          <CardDescription className="text-base" dangerouslySetInnerHTML={{ __html: service.description }}></CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0 pt-6">
          <ul className="space-y-3 my-4 text-base">
            {details.includes.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item }}></span>
              </li>
            ))}
          </ul>
        </CardContent>
        <div className="mt-auto">
          <div className="flex justify-between items-center my-6 text-lg">
            <div className="font-bold text-accent" dangerouslySetInnerHTML={{ __html: details.price }}></div>
            <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: details.timeline }}></div>
          </div>
          <Button variant="default" size="lg" className="w-full text-lg py-6 bg-accent text-accent-foreground hover:bg-accent/90">
            Заказать услугу
          </Button>
        </div>
      </Card>
    );
  };
  

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
       <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center text-center md:text-left overflow-hidden bg-white">
        <div className="absolute top-0 right-0 h-full w-full md:w-1/2 z-0 mt-[60px] hidden md:block">
          <Image
            src="https://videos.openai.com/vg-assets/assets%2Ftask_01k5p47k6jfn0sx4zdqj1dtke6%2F1758458131_img_0.webp?st=2025-09-21T11%3A31%3A23Z&se=2025-09-27T12%3A31%3A23Z&sks=b&skt=2025-09-21T11%3A31%3A23Z&ske=2025-09-27T12%3A31%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=%2BvLVkEGDbgchPMBo4tpdNhineN%2Bel7Y9h8LoWnUrwOs%3D&az=oaivgprodscus"
            alt="Геодезические работы"
            layout="fill"
            objectFit="contain"
            className="md:absolute md:top-0 md:left-0 md:h-full md:w-full"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="py-20 max-w-full md:max-w-3xl">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center gap-2 text-accent font-semibold bg-accent/20 px-4 py-2 rounded-full text-lg">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <span className="text-accent" dangerouslySetInnerHTML={{ __html: 'Нам доверяют с&nbsp;2003 года' }}></span>
              </div>
              <a href="https://yandex.com/maps/org/geostroyproyekt/144539023058/?ll=30.231738%2C59.920487&mode=search&sll=37.586554%2C55.796284&sspn=0.174408%2C0.060633&text=%D0%B3%D0%B5%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BF%D1%80%D0%BE%D0%B5%D0%B0%D1%82%20%D1%81%D0%B0%D0%BD%D0%BA%D1%82%20%D0%BF%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3&z=10" target="_blank" rel="noopener noreferrer">
                <Card className="flex items-center gap-3 text-foreground font-semibold bg-white/90 px-4 py-2 rounded-full text-lg w-fit border">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <span className="font-bold text-red-500">Я</span>
                  </div>
                  <span>Яндекс Отзывы</span>
                  <span className="font-bold">5.0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />)}
                  </div>
                </Card>
              </a>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight text-foreground">
              Профессиональные <span className="text-accent">геодезические</span> услуги
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-6 mx-auto md:mx-0" dangerouslySetInnerHTML={{ __html: 'Полный спектр кадастровых работ, инженерных изысканий и&nbsp;ЗОУИТ в&nbsp;Санкт-Петербурге и&nbsp;ЛО' }}></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {heroStats.map((stat, index) => (
                <Card key={index} className="bg-background/30 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300 p-6 text-left h-full">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg flex items-center justify-center w-16 h-16">
                      <stat.icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground mt-1 w-24" dangerouslySetInnerHTML={{ __html: stat.label }}></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <ul className="space-y-3 my-8 text-foreground inline-block text-left">
              {heroBenefits.map(benefit => (
                <li key={benefit} className="flex items-center gap-3 text-lg">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: benefit }}></span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="/contact">Бесплатная консультация</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                 <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 relative">
                   <div className="flex flex-col lg:flex-row items-start gap-6">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg flex-shrink-0 mb-4 lg:mb-0"
                            src="https://pouch.jumpshare.com/preview/dUHg-gsRDslnFdT3XfFQYUj3M9PXnVuKIjURan0E7Tt9Heoa57PeFb-sbUHpmPWll8ZWyRtlbSgh2j3IOsSmh_aPcQXoRS15iWmHOM-M34oq3xv7xY6eKpTknO-BlLQ66lk3U0W71gNmmot0a0rduW6yjbN-I2pg_cnoHs_AmgI.mp4"
                        />
                        <div className="flex-grow">
                          <CardHeader className="p-0 mb-6 flex-grow">
                              <CardTitle className="text-3xl font-heading font-bold" dangerouslySetInnerHTML={{ __html: 'Геодезическая компания ООО&nbsp;"ГЕОСТРОЙПРОЕКТ"' }}></CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 text-muted-foreground space-y-4 text-lg">
                              <p dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;рады приветствовать вас на&nbsp;официальном сайте геодезической компании ООО&nbsp;«ГЕОСТРОЙПРОЕКТ» и&nbsp;готовы предложить бесплатную консультацию по&nbsp;вашему вопросу прямо сейчас!' }}></p>
                          </CardContent>
                        </div>
                    </div>
                    <CardContent className="p-0 text-muted-foreground space-y-4 text-lg mt-6">
                        <p dangerouslySetInnerHTML={{ __html: 'У&nbsp;нас работают только опытные кадастровые инженеры, готовые помочь в&nbsp;решении земельных вопросов качественно и&nbsp;в&nbsp;поставленные сроки. Не&nbsp;нужно устанавливать забор и&nbsp;делить землю самостоятельно&nbsp;- это может привести к&nbsp;ненужным разногласиям с&nbsp;соседями, следовательно, к&nbsp;потере денег и&nbsp;времени.' }}></p>
                        <p dangerouslySetInnerHTML={{ __html: 'Наши специалисты постоянно находятся в&nbsp;курсе последних изменений в&nbsp;законодательстве и&nbsp;всегда готовы оказать вам квалифицированную помощь в&nbsp;оформлении перепланировки квартиры, сопровождении сделок с&nbsp;недвижимостью, заказе межевого плана участка и&nbsp;проектировании домов.' }}></p>
                        <p dangerouslySetInnerHTML={{ __html: 'Инженерные изыскания&nbsp;- это неотъемлемая часть проектной деятельности, обеспечивающая всестороннее изучение природных и&nbsp;техногенных условий местности планируемого строительства.' }}></p>
                        <p dangerouslySetInnerHTML={{ __html: 'Проведение инженерных работ позволяет получить объем необходимых данных для аргументирования технической возможности и&nbsp;экономической целесообразности проектирования и&nbsp;застройки на&nbsp;конкретной территории. Информировать о&nbsp;возможных рисках и&nbsp;изменениях геологической ситуации и&nbsp;окружающей среды.' }}></p>
                        <p className="font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: 'Геодезическая фирма ООО&nbsp;«ГЕОСТРОЙПРОЕКТ» гарантирует качество и&nbsp;законность выполненных работ в&nbsp;г.&nbsp;Санкт-Петербург и&nbsp;Ленинградской области.' }}></p>
                    </CardContent>
                </Card>
              </div>
               <div className="lg:order-last flex flex-col gap-8">
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                      <CardHeader className="p-0 mb-4">
                          <CardTitle className="flex items-center gap-3 text-2xl font-heading"><ListChecks className="h-6 w-6 text-accent" />Кадастровые услуги</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                          <ul className="space-y-3">
                              {kadastrServices.map((service, i) => (
                                  <li key={i} className="flex items-center gap-3">
                                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                                      <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: service }}></span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
                   <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                      <CardHeader className="p-0 mb-4">
                          <CardTitle className="flex items-center gap-3 text-2xl font-heading"><ListChecks className="h-6 w-6 text-accent" />Геодезические услуги</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                          <ul className="space-y-3">
                              {geoServices.map((service, i) => (
                                  <li key={i} className="flex items-center gap-3">
                                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                                      <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: service }}></span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
              </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-left mb-12 md:mb-16">
            <AnimatedSectionTitle className="text-left">Наши услуги</AnimatedSectionTitle>
            <p className="text-xl text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Предоставляем полный спектр геодезических и&nbsp;кадастровых услуг с&nbsp;гарантией качества и&nbsp;соблюдением сроков' }}>
            </p>
          </div>
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div className="hidden md:block">
            <HorizontalScrollCarousel>
                {services.map((service, index) => (
                    <div key={service.slug} className="min-w-[420px] md:min-w-[480px] px-4">
                        <ServiceCard service={service} index={index} />
                    </div>
                ))}
                <div className="min-w-[420px] md:min-w-[480px] px-4">
                  <Card className="flex flex-col h-full justify-center items-center text-center p-8 bg-card/50 backdrop-blur-sm border-border/50">
                      <div className="p-3 rounded-lg mb-4">
                        <HelpCircle className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-foreground mb-2" dangerouslySetInnerHTML={{ __html: 'Не&nbsp;нашли нужную услугу?' }}></h3>
                      <p className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;выполняем любые виды геодезических работ под&nbsp;заказ' }}></p>
                      <Button size="lg" asChild>
                        <Link href="/contact">Получить консультацию</Link>
                      </Button>
                  </Card>
                </div>
                <div className="min-w-[420px] md:min-w-[480px] px-4 flex justify-center items-center">
                  <SurveyorDialog>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image src="https://st5.depositphotos.com/46655356/66209/v/450/depositphotos_662097198-stock-illustration-close-caucasian-worker-helmet-head.jpg" alt="Инженер-геодезист" width={400} height={400} className="object-contain cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Здравствуйте, жду именно ваш проект</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SurveyorDialog>
                </div>
            </HorizontalScrollCarousel>
        </div>

        {/* Mobile: Vertical Grid */}
        <div className="md:hidden container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
             <Card className="flex flex-col h-full justify-center items-center text-center p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="p-3 rounded-lg mb-4">
                  <HelpCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2" dangerouslySetInnerHTML={{ __html: 'Не&nbsp;нашли нужную услугу?' }}></h3>
                <p className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;выполняем любые виды геодезических работ под&nbsp;заказ' }}></p>
                <Button size="lg" asChild>
                  <Link href="/contact">Получить консультацию</Link>
                </Button>
            </Card>
            <div className="flex justify-center items-center mt-8">
              <SurveyorDialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image src="https://st5.depositphotos.com/46655356/66209/v/450/depositphotos_662097198-stock-illustration-close-caucasian-worker-helmet-head.jpg" alt="Инженер-геодезист" width={300} height={300} className="object-contain cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Здравствуйте, жду именно ваш проект</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SurveyorDialog>
            </div>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 md:mb-16">
            <AnimatedSectionTitle className="text-left">Прайс-лист</AnimatedSectionTitle>
            <p className="text-xl text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Прозрачные цены без скрытых доплат. Групповые скидки до&nbsp;43%' }}>
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-heading font-semibold text-center mb-8 text-foreground">Пакетные предложения</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg, index) => (
                <Card key={index} className={`flex flex-col p-6 relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 ${pkg.popular ? 'border-dashed border-border/50 hover:border-accent' : 'border-dashed border-border/50 hover:border-accent'}`}>
                  {pkg.popular && !pkg.badge && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold py-1 px-3 rounded-full">Выгодно</div>
                  )}
                  {pkg.badge && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold py-1 px-3 rounded-full">{pkg.badge}</div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-xl font-heading font-semibold text-foreground">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                    
                    <div className="text-center py-4">
                      <div className="text-4xl font-heading font-bold text-accent">{pkg.price}</div>
                      <div className="text-sm text-muted-foreground line-through">{pkg.oldPrice}</div>
                      <div className="text-sm font-medium text-accent mt-1">{pkg.saving}</div>
                      <div className="text-xs text-muted-foreground mt-1">{pkg.audience}</div>
                    </div>
                    
                    <ul className="space-y-3 text-sm mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: feature }}></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full mt-auto">Выбрать пакет</Button>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-12">
            {priceSections.map((section, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300 overflow-hidden">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl font-heading font-semibold text-foreground flex items-center gap-2">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 font-heading font-medium text-muted-foreground text-sm">Вид работ</th>
                          <th className="text-right p-4 font-heading font-medium text-muted-foreground text-sm">Стоимость</th>
                          <th className="text-right p-4 font-heading font-medium text-muted-foreground text-sm">Сроки</th>
                          <th className="w-28"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.items.map((item, i) => (
                          <tr key={i} className="border-b border-border/50 hover-gradient transition-colors duration-300 group">
                            <td className="p-4 pr-4 text-foreground relative">
                              <span className="block transition-transform duration-500 group-hover:translate-x-2" dangerouslySetInnerHTML={{ __html: item.name }}></span>
                            </td>
                            <td className="p-4 text-right font-semibold text-accent relative">
                               <span className="block transition-transform duration-500 group-hover:-translate-x-2" dangerouslySetInnerHTML={{ __html: item.price }}></span>
                            </td>
                            <td className="p-4 text-right text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.term }}></td>
                            <td className="p-4 pl-4 text-right">
                              <Button variant="outline" size="sm">Заказать</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16 flex flex-col items-center">
            <div className="relative w-full max-w-lg mb-4">
              <SurveyorDialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                        <Image 
                            src="https://s1.hostingkartinok.com/uploads/images/2025/09/c884d8a66894d2a0daf1ce54d11355d2.png" 
                            alt="Инженер-геодезист"
                            width={500}
                            height={300}
                            className="object-contain cursor-pointer"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Здравствуйте, жду именно ваш проект</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SurveyorDialog>
            </div>
            <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm border-border/50 max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-accent" />
                <h3 className="text-2xl font-heading font-bold">Срочные работы</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: 'Выполним работы в&nbsp;кратчайшие сроки с&nbsp;доплатой 30%' }}></p>
              <Button variant="default">Срочный заказ</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 md:mb-16">
            <AnimatedSectionTitle className="text-left">Как мы&nbsp;работаем</AnimatedSectionTitle>
            <p className="text-xl text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Прозрачный процесс работы без лишних этапов и&nbsp;дополнительных затрат' }}>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="flex flex-col text-center p-6 bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto bg-muted">
                  <step.icon className="h-7 w-7 text-muted-foreground" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg font-heading font-semibold text-foreground">0{index + 1}. {step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mt-16 mb-12">
            <SurveyorDialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="https://s1.hostingkartinok.com/uploads/images/2025/09/bd9ae8f1f2379ded19d127067b141970.png"
                      alt="Инженер-геодезист"
                      width={500}
                      height={300}
                      className="object-contain mx-auto cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Заходите к&nbsp;нам еще, подписывайтесь на&nbsp;соц сети</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SurveyorDialog>
          </div>
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border/50 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Готовы начать работу?</h3>
            <p className="text-lg text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: 'Оставьте заявку на&nbsp;бесплатную консультацию и&nbsp;мы&nbsp;ответим на&nbsp;все ваши вопросы.' }}>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="/contact">Бесплатная консультация</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/prices">Рассчитать стоимость</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 md:py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <AnimatedSectionTitle className="text-left">Работаем с&nbsp;крупными компаниями</AnimatedSectionTitle>
          </div>
          <ClientsMarquee />
        </div>
      </section>
    </div>
  );
}
