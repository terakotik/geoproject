
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock, ListChecks } from 'lucide-react';
import { services, getServiceDetails } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel';
import { HelpCircle } from 'lucide-react';

const packages = [
  {
    title: "Стандарт",
    description: "Межевание + Технический план",
    price: "12 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 11%",
    audience: "2-3 заявки",
    features: ["Межевание участка", "Технический план дома", "Подача документов", "Сопровождение до регистрации"],
    popular: false,
  },
  {
    title: "Популярный",
    description: "Групповой пакет",
    price: "11 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 18%",
    audience: "4-7 заявки",
    features: ["Все услуги пакета Стандарт", "Приоритетное обслуживание", "Персональный менеджер", "Скидка на дополнительные услуги"],
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
      { name: "Межевание земельного участка в Спб и ЛО", price: "от 12500 руб.", term: "от 14 дней" },
      { name: "Межевание земель общего пользования в СНТ, ДНП", price: "индивидуально", term: "" },
      { name: "Раздел земельного участка", price: "от 10000 руб.", term: "от 14 дней" },
      { name: "Объединение земельных участков", price: "от 10000 руб.", term: "от 14 дней" },
      { name: "Перераспределение земельных участков", price: "от 8000 руб.", term: "от 14 дней" },
      { name: "Формирование схемы участка на КПТ", price: "от 3000 руб.", term: "2 дня" },
      { name: "Вынос границ в натуру ( 4 точки включены)", price: "от 7000 руб.", term: "от 2 дней" },
    ],
  },
  {
    title: "Объекты капитального строительства",
    items: [
        { name: "Оформление прав собственности на дом, баню, гараж, хозпостройку", price: "от 12000 руб.", term: "от 5 дней" },
        { name: "Изготовление технического плана на здание, сооружение, объекта незавершенного строительства", price: "от 8000 руб.", term: "от 5 дней" },
        { name: "Учет изменений ОКС (перепланировка, реконструкция)", price: "от 12000 руб.", term: "от 5 дней" },
        { name: "Изготовление акта обследования", price: "от 5000 руб.", term: "от 3 дней" },
        { name: "Регистрация загородной недвижимости", price: "от 8500 руб.", term: "от 5 дней" },
    ],
  },
  {
    title: "Топографическая съемка",
    items: [
        { name: "Фасадная съемка и 3D", price: "от 10000 руб.", term: "от 3 дней" },
        { name: "Съёмка для водоканала и газа", price: "от 10000 руб.", term: "от 5 дней" },
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
    "Межевание земельных участков + подача документов",
    "Составление технических планов, получение уведомлений, регистрация в Росреестре.",
    "Вынос границ в натуру по законной границе, с выездом на объект установка колышков",
    "Акт обследования",
    "Техническая инвентаризация",
    "Схема расположения земельного участка",
];

const geoServices = [
    "Топографическая (геодезическая) съемка земельных участков и местности",
    "Топографическая (геодезическая) съемка для ландшафтного дизайна",
    "Создание геодезической разбивочной основы (ГРО)",
    "Съемка участка под газ, водопровод и другие инженерные сети",
    "Создание топографических планов с подземными коммуникациями",
    "Страхование всех видов",
];

const heroStats = [
    { value: "2000+", label: "выполненных проектов" },
    { value: "21", label: "год на рынке" },
    { value: "14", label: "дней средний срок" },
];

const heroBenefits = [
    "Лицензированные кадастровые инженеры",
    "Работы любой сложности под ключ",
    "Электронная подача документов",
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  
  const processSteps = [
    {
      icon: FilePenLine,
      title: 'Заключение договора',
      description: 'Бесплатная консультация, осмотр объекта и подписание договора с фиксированной стоимостью',
      duration: 'В день обращения',
      points: ['Выезд на объект', 'Анализ документов', 'Расчет стоимости', 'Подписание договора']
    },
    {
      icon: Users,
      title: 'Выезд геодезистов',
      description: 'Квалифицированные специалисты выполняют полевые работы с современным оборудованием',
      duration: '1-2 дня',
      points: ['Геодезические измерения', 'Съемка границ', 'Фиксация точек', 'Фотофиксация']
    },
    {
      icon: SquareCheckBig,
      title: 'Согласование границ',
      description: 'Уведомление соседей и согласование границ участка в соответствии с требованиями закона',
      duration: '7-14 дней',
      points: ['Уведомление соседей', 'Выход на границы', 'Подписание актов', 'Устранение разногласий']
    },
    {
      icon: FileTextIcon,
      title: 'Подготовка документов',
      description: 'Изготовление межевого или технического плана, проверка и подготовка к подаче',
      duration: '3-5 дней',
      points: ['Камеральные работы', 'Подготовка планов', 'Проверка качества', 'Подготовка пакета документов']
    },
    {
      icon: Download,
      title: 'Получение документов',
      description: 'Электронная подача в Росреестр и получение готовых документов с правами собственности',
      duration: '10-12 дней',
      points: ['Подача в Росреестр', 'Отслеживание статуса', 'Получение документов', 'Передача клиенту']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-white">
        <div className="absolute top-0 right-0 h-full w-1/2 z-0 mt-[60px]">
            <Image
              src="https://videos.openai.com/vg-assets/assets%2Ftask_01k5p47k6jfn0sx4zdqj1dtke6%2F1758458131_img_0.webp?st=2025-09-21T11%3A31%3A23Z&se=2025-09-27T12%3A31%3A23Z&sks=b&skt=2025-09-21T11%3A31%3A23Z&ske=2025-09-27T12%3A31%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=%2BvLVkEGDbgchPMBo4tpdNhineN%2Bel7Y9h8LoWnUrwOs%3D&az=oaivgprodscus"
              alt="Геодезические работы"
              layout="fill"
              objectFit="contain"
              className="md:absolute md:top-0 md:left-0 md:h-full md:w-full"
            />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="py-20 max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-accent font-semibold bg-accent/20 px-4 py-2 rounded-full text-lg self-start w-fit">
                      <Star className="h-5 w-5 fill-current text-yellow-400" />
                      <span className="text-accent">Нам доверяют с 2003 года</span>
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
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight text-foreground">
                Профессиональные <span className="text-accent">геодезические</span> услуги
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mt-6">
                Полный спектр кадастровых работ, инженерных изысканий и ЗОУИТ в Санкт-Петербурге и ЛО
              </p>

              <div className="grid sm:grid-cols-3 gap-4 my-8">
                  {heroStats.map(stat => (
                      <Card key={stat.label} className="text-center p-4 bg-muted border-dashed">
                          <div className="text-4xl font-bold text-accent">{stat.value}</div>
                          <div className="text-sm opacity-80 text-muted-foreground">{stat.label}</div>
                      </Card>
                  ))}
              </div>

              <ul className="space-y-3 my-8 text-foreground">
                  {heroBenefits.map(benefit => (
                      <li key={benefit} className="flex items-center gap-3 text-lg">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                          <span>{benefit}</span>
                      </li>
                  ))}
              </ul>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Бесплатная консультация</Link>
                  </Button>
              </div>
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                    <CardTitle className="text-3xl font-heading font-bold text-center lg:text-left">Геодезическая компания ООО "ГЕОСТРОЙПРОЕКТ"</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-lg">
                    <p>Мы рады приветствовать вас на официальном сайте геодезической компании ООО «ГЕОСТРОЙПРОЕКТ» и готовы предложить бесплатную консультацию по вашему вопросу прямо сейчас!</p>
                    <p>У нас работают только опытные кадастровые инженеры, готовые помочь в решении земельных вопросов качественно и в поставленные сроки. Не нужно устанавливать забор и делить землю самостоятельно — это может привести к ненужным разногласиям с соседями, следовательно, к потере денег и времени.</p>
                    <p>Наши специалисты постоянно находятся в курсе последних изменений в законодательстве и всегда готовы оказать вам квалифицированную помощь в оформлении перепланировки квартиры, сопровождении сделок с недвижимостью, заказе межевого плана участка и проектировании домов.</p>
                    <p>Инженерные изыскания – это неотъемлемая часть проектной деятельности, обеспечивающая всестороннее изучение природных и техногенных условий местности планируемого строительства.</p>
                    <p>Проведение инженерных работ позволяет получить объем необходимых данных для аргументирования технической возможности и экономической целесообразности проектирования и застройки на конкретной территории. Информировать о возможных рисках и изменениях геологической ситуации и окружающе.</p>
                    <p className="font-semibold text-foreground">Геодезическая фирма ООО «ГЕОСТРОЙПРОЕКТ» гарантирует качество и законность выполненных работ в г. Санкт-Петербург и Ленинградской области.</p>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-8">
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl font-heading"><ListChecks className="h-6 w-6 text-accent" />Кадастровые услуги</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {kadastrServices.map((service, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                                    <span className="text-muted-foreground">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl font-heading"><ListChecks className="h-6 w-6 text-accent" />Геодезические услуги</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {geoServices.map((service, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                                    <span className="text-muted-foreground">{service}</span>
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
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Предоставляем полный спектр геодезических и кадастровых услуг с гарантией качества и соблюдением сроков
            </p>
          </div>
        </div>
        <HorizontalScrollCarousel>
            {services.map((service, index) => {
              const details = getServiceDetails(service.slug);
              if (!details) return null;
              return (
                <div key={service.slug} className="min-w-[420px] md:min-w-[480px] px-4">
                  <Card className="flex flex-col h-full hover:border-accent transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm relative group">
                     <div className="absolute -top-8 -left-8 text-8xl font-bold text-foreground/5 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:text-accent/10">
                      0{index + 1}
                    </div>
                    <CardHeader>
                       <div className="p-3 rounded-lg mb-4 self-start">
                          <service.icon className="h-10 w-10 text-muted-foreground" />
                        </div>
                      <CardTitle className="text-2xl font-heading">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                       <ul className="space-y-3 mb-6">
                        {details.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                        <div className="flex justify-between items-center mb-4 text-lg">
                           <div className="font-bold text-accent">{details.price}</div>
                           <div className="text-muted-foreground">{details.timeline}</div>
                        </div>
                        <Button variant="outline" size="lg" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors text-lg py-6">
                          Заказать услугу
                        </Button>
                    </div>
                  </Card>
                </div>
              )
            })}
             <div className="min-w-[420px] md:min-w-[480px] px-4">
              <Card className="flex flex-col h-full justify-center items-center text-center p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="p-3 rounded-lg mb-4">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">Не нашли нужную услугу?</h3>
                  <p className="text-muted-foreground mb-6">Мы выполняем любые виды геодезических работ под заказ</p>
                  <Button size="lg" asChild>
                    <Link href="/contact">Получить консультацию</Link>
                  </Button>
              </Card>
            </div>
            <div className="min-w-[420px] md:min-w-[480px] px-4 flex justify-center items-center">
                <Image src="https://st5.depositphotos.com/46655356/66209/v/450/depositphotos_662097198-stock-illustration-close-caucasian-worker-helmet-head.jpg" alt="Инженер-геодезист" width={400} height={400} className="object-contain" />
            </div>
        </HorizontalScrollCarousel>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Прайс-лист</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Прозрачные цены без скрытых доплат. Групповые скидки до 43%
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
                      <div className="text-sm font-medium text-accent">{pkg.saving}</div>
                      <div className="text-xs text-muted-foreground mt-1">{pkg.audience}</div>
                    </div>
                    
                    <ul className="space-y-3 text-sm mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className={`w-full mt-auto ${pkg.popular ? '' : 'bg-secondary text-secondary-foreground'}`}>Выбрать пакет</Button>
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
                          <th className="text-left py-3 font-heading font-medium text-muted-foreground text-sm">Вид работ</th>
                          <th className="text-right py-3 font-heading font-medium text-muted-foreground text-sm">Стоимость</th>
                          <th className="text-right py-3 font-heading font-medium text-muted-foreground text-sm">Сроки</th>
                          <th className="w-28"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.items.map((item, i) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-300 group">
                            <td className="py-4 pr-4 text-foreground relative">
                              <span className="block transition-transform duration-500 group-hover:translate-x-2">{item.name}</span>
                            </td>
                            <td className="py-4 text-right font-semibold text-accent relative">
                               <span className="block transition-transform duration-500 group-hover:-translate-x-2">{item.price}</span>
                            </td>
                            <td className="py-4 text-right text-muted-foreground">{item.term}</td>
                            <td className="py-4 pl-4 text-right">
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

          <div className="text-center mt-16">
            <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm border-border/50 max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-accent" />
                <h3 className="text-2xl font-heading font-bold">Срочные работы</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-4">Выполним работы в кратчайшие сроки с доплатой 30%</p>
              <Button variant="default">Срочный заказ</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Как мы работаем</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Прозрачный процесс работы без лишних этапов и дополнительных затрат
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="flex flex-col text-center p-6 bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-muted">
                  <step.icon className="h-7 w-7 text-muted-foreground" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg font-heading font-semibold text-foreground">0{index + 1}. {step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">Готовы начать работу?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Оставьте заявку на бесплатную консультацию и мы ответим на все ваши вопросы.
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

    </div>
  );
}

    

    









