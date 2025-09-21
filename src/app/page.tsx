import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock } from 'lucide-react';
import { services } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HorizontalScrollCarousel from '@/components/HorizontalScrollCarousel';

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
    price: "10 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 25%",
    audience: "4-7 заявок",
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
      { name: "Межевание земельного участка в СПб и ЛО", price: "от 12 500 ₽", term: "от 14 дней" },
      { name: "Межевание земель общего пользования в СНТ, ДНП", price: "индивидуально", term: "от 14 дней" },
      { name: "Раздел земельного участка", price: "от 10 000 ₽", term: "от 14 дней" },
      { name: "Объединение земельных участков", price: "от 10 000 ₽", term: "от 14 дней" },
      { name: "Перераспределение земельных участков", price: "от 8 000 ₽", term: "от 14 дней" },
      { name: "Формирование схемы участка на КПТ", price: "от 3 000 ₽", term: "2 дня" },
      { name: "Вынос границ в натуру (4 точки включены)", price: "от 7 000 ₽", term: "от 2 дней" },
    ],
  },
  {
    title: "Объекты капитального строительства",
    items: [
        { name: "Оформление прав собственности на дом, баню, гараж, хозпостройку", price: "от 12 000 ₽", term: "от 5 дней" },
        { name: "Изготовление технического плана на здание, сооружение, ОНС", price: "от 8 000 ₽", term: "от 5 дней" },
        { name: "Учет изменений ОКС (перепланировка, реконструкция)", price: "от 12 000 ₽", term: "от 5 дней" },
        { name: "Изготовление акта обследования", price: "от 5 000 ₽", term: "от 3 дней" },
        { name: "Регистрация загородной недвижимости", price: "от 8 500 ₽", term: "от 5 дней" },
    ],
  },
  {
    title: "Топографическая съемка",
    items: [
        { name: "Фасадная съемка и 3D", price: "от 10 000 ₽", term: "от 3 дней" },
        { name: "Съёмка для водоканала и газа", price: "от 10 000 ₽", term: "от 5 дней" },
        { name: "Съёмка для ландшафтного дизайна", price: "от 12 000 ₽", term: "от 5 дней" },
        { name: "Исполнительная топосъемка", price: "от 15 000 ₽", term: "от 3 дней" },
        { name: "Топосъемка М 1:500", price: "от 25 000 ₽", term: "от 7 дней" },
    ],
  },
  {
    title: "ЗОУИТ и специальные работы",
    items: [
        { name: "Определение зон с особыми условиями использования территорий", price: "от 15 000 ₽", term: "от 10 дней" },
        { name: "Расчет санитарно-защитных зон", price: "от 20 000 ₽", term: "от 14 дней" },
        { name: "Зоны охраны объектов культурного наследия", price: "от 25 000 ₽", term: "от 21 дня" },
        { name: "Водоохранные зоны", price: "от 18 000 ₽", term: "от 14 дней" },
    ],
  },
  {
    title: "Дополнительные услуги",
    items: [
        { name: "Регистрация машиноместа", price: "от 18 000 ₽", term: "от 10 дней" },
        { name: "Подготовка поэтажных планов", price: "от 3 000 ₽", term: "от 3 дней" },
        { name: "Изготовление технического паспорта объекта", price: "от 5 000 ₽", term: "от 3 дней" },
        { name: "Выписка из ЕГРН", price: "от 500 ₽", term: "1 день" },
        { name: "Справки и консультации", price: "бесплатно", term: "в день обращения" },
    ],
  },
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
      <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-medium">
                  <Star className="h-5 w-5 fill-current" />
                  <span>Нам доверяют с 2003 года</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Профессиональные
                  <span className="text-accent block">геодезические</span>
                  услуги
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Полный спектр кадастровых работ, инженерных изысканий и ЗОУИТ в Санкт-Петербурге и ЛО
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20">
                  <div className="text-2xl font-heading font-bold text-accent">2000+</div>
                  <div className="text-sm text-muted-foreground">выполненных проектов</div>
                </Card>
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20">
                  <div className="text-2xl font-heading font-bold text-accent">21</div>
                  <div className="text-sm text-muted-foreground">год на рынке</div>
                </Card>
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20">
                  <div className="text-2xl font-heading font-bold text-accent">14</div>
                  <div className="text-sm text-muted-foreground">дней средний срок</div>
                </Card>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Лицензированные кадастровые инженеры</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Работы любой сложности под ключ</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Электронная подача документов</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Бесплатная консультация</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+79522764940">
                    <Phone className="h-5 w-5 mr-2" />
                    +7 (952) 276-49-40
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/geodesist/800/1000"
                  alt="Профессиональный геодезист с геодезическим оборудованием"
                  width={800}
                  height={1000}
                  className="w-full h-[600px] object-cover"
                  data-ai-hint="surveyor equipment"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <Card className="absolute -bottom-6 -left-6 p-6 bg-card max-w-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-medium">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Выезд в день обращения</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Работаем по всему Санкт-Петербургу и Ленинградской области
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Предоставляем полный спектр геодезических и кадастровых услуг с гарантией качества и соблюдением сроков
            </p>
          </div>
        </div>
        <HorizontalScrollCarousel>
            {services.slice(0, 6).map((service, index) => (
              <div key={service.slug} className="min-w-[380px] md:min-w-[520px] px-4">
                <Link href={`/services/${service.slug}`} className="block group h-full">
                  <Card className="flex flex-col h-full p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm relative">
                    <div className="absolute top-6 left-6 text-9xl font-bold text-foreground/5 pointer-events-none">0{index + 1}</div>
                    <div className="flex items-start justify-between mb-6 mt-20">
                      <div className="p-3 rounded-lg">
                        <service.icon className="h-10 w-10 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">{service.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                    </div>
                    <div className="mt-auto pt-8">
                      <Button variant="outline" size="lg" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors text-lg py-6">
                        Подробнее <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
        </HorizontalScrollCarousel>
        <div className="container mx-auto px-4">
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">Все услуги</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Прайс-лист услуг</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Прозрачные цены без скрытых доплат. Групповые скидки до 43%
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-heading font-semibold text-center mb-8 text-foreground">Пакетные предложения</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg, index) => (
                <Card key={index} className={`group flex flex-col p-6 relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 ${pkg.popular ? 'border-transparent hover:border-accent' : 'border-border/50 hover:border-accent'}`}>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold py-1 px-3 rounded-full">{pkg.badge || 'Выгодно'}</div>
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
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
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
                          <tr key={i} className="border-b border-border/50 hover:bg-accent/10 transition-colors duration-300 group">
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
            <Card className="inline-block p-8 bg-gradient-accent text-accent-foreground max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="h-5 w-5" />
                <h3 className="text-2xl font-heading font-bold">Срочные работы</h3>
              </div>
              <p className="text-lg mb-4">Выполним работы в кратчайшие сроки с доплатой 30%</p>
              <Button variant="secondary">Срочный заказ</Button>
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
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-border -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 bg-muted">
                    <step.icon className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">0{index + 1}. {step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-gradient-accent text-accent-foreground max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-heading font-bold mb-4">Готовы начать работу?</h3>
            <p className="text-lg mb-6">
              Оставьте заявку на бесплатную консультацию и мы ответим на все ваши вопросы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
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
