

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock, ListChecks, Linkedin, Twitter, FolderKanban, Award, User, Briefcase } from 'lucide-react';
import { services, getServiceDetails } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel';
import { HelpCircle } from 'lucide-react';
import { AnimatedText } from '@/components/AnimatedText';
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
import { useContactSheet } from '@/hooks/use-contact-sheet';
import ServiceCard from '@/components/ServiceCard';


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
    { value: "21 год", label: "на рынке кадастра", icon: Award },
    { value: "14 дней", label: "средний срок", icon: Clock },
];

const heroBenefits = [
    "Лицензированные кадастровые инженеры",
    "Работы любой сложности под&nbsp;ключ",
    "Электронная подача документов",
];

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


export default function Home() {
  const { onOpen } = useContactSheet();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
       <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/475657241_629620156102016_4129712510879142534_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=S4ER7sDDexsQ7kNvwGgmxAm&_nc_oc=Adk1V-tnH1cT7nuC4fs0R3ukx5Tg_F8f1j8NWLFsIej6vxS2eQkxl-JCFVFn8ETR_qk&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=propPRV5A-TX6UojyhDEnA&oh=00_AfcA45kv5F_2kDZdnxR_YoizNG6ni8YsDr8uyAxPGywSlQ&oe=68FF242F"
            alt="Команда инженеров-геодезистов"
            layout="fill"
            objectFit="cover"
            className="transform -scale-x-100"
            data-ai-hint="team engineers"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight text-foreground">
                 Профессиональные <span className="text-accent">геодезические</span> услуги
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-6" dangerouslySetInnerHTML={{ __html: 'Полный спектр кадастровых работ, инженерных изысканий и&nbsp;ЗОУИТ в&nbsp;Санкт-Петербурге и&nbsp;ЛО' }}></p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onOpen} className="text-lg py-7 px-8">
                  Бесплатная консультация
                </Button>
                 <Button size="lg" variant="ghost" asChild>
                    <Link href="#services" className="text-lg py-7 px-8">
                      Наши услуги <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 -mt-16 z-20 relative">
          <a href="https://yandex.com/maps/org/geostroyproyekt/144539023058/?ll=30.231738%2C59.920487&mode=search&sll=37.586554%2C55.796284&sspn=0.174408%2C0.060633&text=%D0%B3%D0%B5%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BF%D1%80%D0%BE%D0%B5%D0%B0%D1%82%20%D1%81%D0%B0%D0%BD%D0%BA%D1%82%20%D0%BF%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3&z=10" target="_blank" rel="noopener noreferrer" className="block h-full">
            <Card className="p-6 bg-card/80 backdrop-blur-sm h-full stat-card flex flex-col justify-center items-center">
                <CardHeader className="p-0 flex flex-row items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white text-2xl font-bold">Я</div>
                    <div>
                        <CardTitle className="text-xl">Яндекс Отзывы</CardTitle>
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-accent">5.0</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 mt-4 text-center">
                    <p className="text-sm text-muted-foreground">Более 100 реальных отзывов от наших клиентов.</p>
                </CardContent>
            </Card>
          </a>
          {heroStats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm p-6 text-center stat-card">
              <CardHeader className="p-0 items-center mb-4">
                  <stat.icon className="h-10 w-10 text-accent" />
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: stat.label }}></p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>


      {/* SEO Text Section */}
      <section className="pt-24 pb-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                 <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 relative">
                   <div className="flex flex-col lg:flex-row items-start gap-6">
                        <div className="flex-shrink-0">
                           <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-white">
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                src="https://d1dzlizqgbwk1w.cloudfront.net/videos/2025/10/22/oudbOxVP.mp4"
                              />
                            </div>
                        </div>
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
            <AnimatedText as="h2" text="Наши услуги" className="text-4xl md:text-5xl font-heading font-bold text-foreground text-left" />
            <p className="text-xl text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Предоставляем полный спектр геодезических и&nbsp;кадастровых услуг с&nbsp;гарантией качества и&nbsp;соблюдением сроков' }}>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
             <Card className="flex flex-col h-full justify-center items-center text-center p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="p-3 rounded-lg mb-4">
                  <HelpCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2" dangerouslySetInnerHTML={{ __html: 'Не&nbsp;нашли нужную услугу?' }}></h3>
                <p className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;выполняем любые виды геодезических работ под&nbsp;заказ' }}></p>
                <Button size="lg" onClick={onOpen}>
                  Получить консультацию
                </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 md:mb-16">
            <AnimatedText as="h2" text="Прайс-лист" className="text-4xl md:text-5xl font-heading font-bold text-foreground text-left" />
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
                  <Button className="w-full mt-auto" onClick={onOpen}>Выбрать пакет</Button>
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
                              <Button variant="outline" size="sm" onClick={onOpen}>Заказать</Button>
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
            
            <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm border-border/50 max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-accent" />
                <h3 className="text-2xl font-heading font-bold">Срочные работы</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: 'Выполним работы в&nbsp;кратчайшие сроки с&nbsp;доплатой 30%' }}></p>
              <Button variant="default" onClick={onOpen}>Срочный заказ</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 md:mb-16">
            <AnimatedText as="h2" text="Как мы работаем" className="text-4xl md:text-5xl font-heading font-bold text-foreground text-left" />
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
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border/50 max-w-4xl mx-auto text-center">
            <Image
              src="https://s1.hostingkartinok.com/uploads/images/2025/09/c884d8a66894d2a0daf1ce54d11355d2.png"
              alt="Призыв к действию"
              width={800}
              height={200}
              className="mx-auto mb-8"
            />
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Готовы начать работу?</h3>
            <p className="text-lg text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: 'Оставьте заявку на&nbsp;бесплатную консультацию и&nbsp;мы&nbsp;ответим на&nbsp;все ваши вопросы.' }}>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onOpen} size="lg" variant="default">
                Бесплатная консультация
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#prices">Рассчитать стоимость</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 md:py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-left mb-8">
            <AnimatedText as="h2" text="Работаем с крупными компаниями" className="text-4xl md:text-5xl font-heading font-bold text-foreground text-left" />
          </div>
          <ClientsMarquee />
        </div>
      </section>
    </div>
  );
}

    

    



    

    

    
