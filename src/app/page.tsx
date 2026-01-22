

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock, ListChecks, Linkedin, Twitter, FolderKanban, Award, User, Briefcase, FileUp } from 'lucide-react';
import { services, getServiceDetails } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel';
import { HelpCircle } from 'lucide-react';
import { AnimatedText } from '@/components/AnimatedText';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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
import { useState, useEffect, useRef } from 'react';
import { ClientsMarquee } from '@/components/ClientsMarquee';
import ServiceCard from '@/components/ServiceCard';
import { YandexReviews } from '@/components/YandexReviews';
import { useContactDialog } from "@/hooks/use-contact-dialog";


const packages = [
  {
    title: "Стандарт",
    description: "Межевание + Технический план",
    price: "21 450 ₽",
    oldPrice: "24 050 ₽",
    saving: "Экономия 11%",
    audience: "2-3 заявки",
    features: ["Межевание участка", "Технический план дома", "Подача документов", "Сопровождение до&nbsp;регистрации"],
    popular: false,
  },
  {
    title: "Популярный",
    description: "Групповой пакет",
    price: "19 500 ₽",
    oldPrice: "24 050 ₽",
    saving: "Экономия 19%",
    audience: "4-7 заявки",
    features: ["Все услуги пакета Стандарт", "Приоритетное обслуживание", "Персональный менеджер", "Скидка на&nbsp;дополнительные услуги"],
    popular: true,
  },
  {
    title: "Максимум",
    description: "Для больших объемов",
    price: "13 650 ₽",
    oldPrice: "24 050 ₽",
    saving: "Экономия 43%",
    audience: "20+ заявок",
    features: ["Все услуги предыдущих пакетов", "Индивидуальные условия", "Выездные консультации", "Круглосуточная поддержка"],
    popular: true,
    badge: "Максимальная скидка"
  },
];

const priceSections = [
  {
    title: "Кадастровые работы: Земельные участки",
    items: [
      { name: "Межевание (Уточнение границ) до 30 соток", price: "18 000 ₽", term: "14 дн." },
      { name: "Межевание (Уточнение границ) от 30 до 40 соток", price: "20 000 ₽", term: "14 дн." },
      { name: "Межевание (Уточнение границ) от 40 до 50 соток", price: "22 000 ₽", term: "14 дн." },
      { name: "Схема расположения ЗУ на КПТ (за 1 объект)", price: "12 000 ₽", term: "3-5 дн." },
      { name: "Вынос границ в натуру (выезд + до 8 точек)", price: "8 000 ₽", term: "1-2 дн." },
      { name: "Вынос границ в натуру (доп. точка сверх 8)", price: "500 ₽ / шт.", term: "1-2 дн." },
      { name: "Раздел / Объединение / Перераспределение (камерально)", price: "16 000 ₽", term: "14 дн." },
      { name: "Раздел / Объединение / Перераспределение (с геодезической съемкой)", price: "18 000 ₽", term: "14 дн." },
      { name: "Исправление реестровой ошибки (без выезда)", price: "16 000 ₽", term: "14 дн." },
      { name: "Исправление реестровой ошибки (с геодезической съемкой)", price: "18 000 ₽", term: "14 дн." },
      { name: "Межевание фермерских хозяйств (до 1 Га)", price: "16 000 ₽ / Га", term: "" },
      { name: "Межевание фермерских хозяйств (2–5 Га)", price: "14 000 ₽ / Га", term: "" },
      { name: "Межевание фермерских хозяйств (свыше 10 Га)", price: "10 000 ₽ / Га", term: "" },
    ],
  },
  {
    title: "Кадастровые работы: Здания и Сооружения (ОКС)",
    items: [
        { name: "Технический план дома / здания (до 200 кв.м)", price: "18 000 ₽", term: "5 дн." },
        { name: "Акт обследования (Снятие с учета/Снос)", price: "7 000 ₽", term: "1-2 дн." },
        { name: "Регистрация машиноместа", price: "18 000 ₽", term: "10 дн." },
        { name: "Технический паспорт", price: "6 500 ₽", term: "3 дн." },
    ],
  },
  {
    title: "Инженерная геодезия (Топография)",
    items: [
        { name: "Топографическая съемка (для газа/воды/света) до 15 соток", price: "18 000 ₽", term: "3-5 дн." },
        { name: "Топографическая съемка (для газа/воды/света) 15–25 соток", price: "20 000 ₽", term: "3-5 дн." },
        { name: "Топографическая съемка (для газа/воды/света) более 25 соток", price: "25 000 ₽", term: "3-5 дн." },
        { name: "Инженерно-геодезические изыскания (1:500) - Простые условия (поле)", price: "25 000 ₽ / Га", term: "" },
        { name: "Инженерно-геодезические изыскания (1:500) - Средняя сложность", price: "30 000 ₽ / Га", term: "" },
        { name: "Инженерно-геодезические изыскания (1:500) - Город / Коммуникации", price: "40 000 ₽ / Га", term: "" },
        { name: "Создание опорной геодезической сети (закладка пункта)", price: "10 000 ₽ / шт.", term: "" },
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

const heroVideos = [
    'https://d1dzlizqgbwk1w.cloudfront.net/videos/2025/12/05/ByjmlPeR.mp4',
    'https://d1dzlizqgbwk1w.cloudfront.net/videos/2025/12/05/xGmJGWAG.mp4',
];


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const certificateImages = PlaceHolderImages.filter(p => p.id.startsWith('certificate-'));
  const [videoSrc, setVideoSrc] = useState(heroVideos[0]);
  const { onOpen: onContactOpen } = useContactDialog();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAuditInfo, setShowAuditInfo] = useState(false);
  const auditTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setVideoSrc(heroVideos[Math.floor(Math.random() * heroVideos.length)]);
    
    return () => {
      if (auditTimeoutRef.current) {
        clearTimeout(auditTimeoutRef.current);
      }
    };
  }, []);
  
  const handleAuditClick = () => {
    if (showAuditInfo) return;

    setShowAuditInfo(true);
    
    auditTimeoutRef.current = setTimeout(() => {
        window.open('https://t.me/Danayn11', '_blank');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
       <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={videoSrc}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight text-foreground">
                 Профессиональные <span className="text-accent">геодезические</span> услуги
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-6" dangerouslySetInnerHTML={{ __html: 'Полный спектр кадастровых работ, инженерных изысканий и&nbsp;ЗОУИТ в&nbsp;Санкт-Петербурге и&nbsp;ЛО' }}></p>
              
              <div className="mt-8 inline-flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" fill="currentColor" />
                <span className="font-semibold text-foreground">Работаем с лицензией</span>
              </div>

              <div className="mt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleAuditClick} className="shadow-lg shadow-primary/30">
                    <FileUp className="mr-2 h-5 w-5" />
                    Бесплатный Аудит участка 2026 за 5 минут
                  </Button>
                  <Button size="lg" variant="outline" onClick={onContactOpen}>
                    Бесплатная консультация <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAuditInfo ? 'max-h-96 mt-4' : 'max-h-0 mt-0'}`}>
                    <Card className="p-4 bg-muted border-accent">
                        <CardHeader className="p-0">
                            <CardTitle className="text-base font-semibold">Подготовьте файлы для аудита</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-2">
                            <p className="text-sm text-muted-foreground">Пожалуйста, пришлите в чат Telegram:</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                                <li>Фотографии вашего участка</li>
                                <li>Выписку из ЕГРН (если есть)</li>
                            </ul>
                            <p className="text-xs text-muted-foreground/80 mt-3">Перенаправление в Telegram через 5 секунд...</p>
                        </CardContent>
                    </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 -mt-16 z-20 relative">
          <a href="https://yandex.com/maps/org/geostroyproyekt/144539023058/reviews/?indoorLevel=1&ll=30.316916%2C59.926206&z=16" target="_blank" rel="noopener noreferrer" className="block h-full">
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
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: stat.label }}></p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>


      {/* SEO Text Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                 <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 relative">
                   <div className="flex flex-col lg:flex-row items-start gap-6">
                        <div className="flex-shrink-0">
                           <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg border-4 border-white">
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
                          <CardHeader className="p-0 mb-4 md:mb-6 flex-grow">
                              <CardTitle className="text-2xl md:text-3xl font-heading font-bold" dangerouslySetInnerHTML={{ __html: 'Геодезическая компания ООО&nbsp;"ГЕОСТРОЙПРОЕКТ"' }}></CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 text-muted-foreground space-y-4 text-base">
                              <p dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;рады приветствовать вас на&nbsp;официальном сайте геодезической компании ООО&nbsp;«ГЕОСТРОЙПРОЕКТ» и&nbsp;готовы предложить бесплатную консультацию по&nbsp;вашему вопросу прямо сейчас!' }}></p>
                          </CardContent>
                        </div>
                    </div>
                     <CardContent className="p-0 text-muted-foreground space-y-4 text-base mt-6">
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
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-left mb-12">
            <AnimatedText as="h2" text="Наши услуги" className="text-3xl md:text-4xl font-heading font-bold text-foreground text-left" />
            <p className="text-lg text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Предоставляем полный спектр геодезических и&nbsp;кадастровых услуг с&nbsp;гарантией качества и&nbsp;соблюдением сроков' }}>
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
                <Button size="lg" onClick={onContactOpen}>Получить консультацию</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-12 md:py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <AnimatedText as="h2" text="Прайс-лист" className="text-3xl md:text-4xl font-heading font-bold text-foreground text-left" />
            <p className="text-lg text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Прозрачные цены без скрытых доплат. Групповые скидки до&nbsp;43%' }}>
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-heading font-semibold text-center mb-8 text-foreground">Пакетные предложения</h2>
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
                  <Button className="w-full mt-auto" onClick={onContactOpen}>Выбрать пакет</Button>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-12">
            {priceSections.map((section, index) => (
              <Card key={index} className="p-4 md:p-6 bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300 overflow-hidden">
                <CardHeader className="p-0 mb-6 px-2 md:px-0">
                  <CardTitle className="text-2xl font-heading font-semibold text-foreground flex items-center gap-2">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto -mx-4 px-4">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 font-heading font-medium text-muted-foreground text-sm">Вид работ</th>
                          <th className="text-right p-4 font-heading font-medium text-muted-foreground text-sm">Стоимость</th>
                          <th className="text-right p-4 font-heading font-medium text-muted-foreground text-sm">Сроки</th>
                          <th className="w-24 md:w-28"></th>
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
                              <Button variant="outline" size="sm" onClick={onContactOpen}>Заказать</Button>
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
              <Button variant="default" onClick={onContactOpen}>Срочный заказ</Button>
            </Card>
          </div>
        </div>
      </section>

      
      {/* Licenses and Certificates Section */}
      <section id="licenses" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <AnimatedText as="h2" text="Лицензии и сертификаты" className="text-3xl md:text-4xl font-heading font-bold text-foreground text-left" />
            <p className="text-lg text-muted-foreground max-w-3xl text-left mt-4">
              Мы обладаем всеми необходимыми лицензиями и сертификатами для проведения геодезических и кадастровых работ.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {certificateImages.map((image, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                  <div className="p-1 cursor-pointer" onClick={() => setSelectedImage(image.imageUrl)}>
                    <Card>
                      <CardContent className="relative flex h-40 items-center justify-center p-2 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* Process Section */}
      <section id="about" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <AnimatedText as="h2" text="Как мы работаем" className="text-3xl md:text-4xl font-heading font-bold text-foreground text-left" />
            <p className="text-lg text-muted-foreground max-w-3xl text-left mt-4" dangerouslySetInnerHTML={{ __html: 'Прозрачный процесс работы без лишних этапов и&nbsp;дополнительных затрат' }}>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="flex flex-col text-center p-6 bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto bg-muted">
                  <step.icon className="h-6 w-6 md:h-7 md:w-7 text-muted-foreground" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-base md:text-lg font-heading font-semibold text-foreground">0{index + 1}. {step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: step.description }}></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <YandexReviews />
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border/50 max-w-4xl mx-auto text-center rounded-lg">
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
              <Button size="lg" variant="default" onClick={onContactOpen}>
                Бесплатная консультация
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#prices">Рассчитать стоимость</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 md:py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-left mb-8">
            <AnimatedText as="h2" text="Работаем с крупными компаниями" className="text-3xl md:text-4xl font-heading font-bold text-foreground text-left" />
          </div>
          <ClientsMarquee />
        </div>
      </section>
      
      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 bg-transparent border-none shadow-none">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Enlarged certificate"
              fill
              className="object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

    

    




    








