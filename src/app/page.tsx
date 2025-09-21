import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock } from 'lucide-react';
import { services } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
              <div className="relative rounded-2xl overflow-hidden shadow-hero">
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
              <Card className="absolute -bottom-6 -left-6 p-6 bg-card shadow-brand max-w-xs">
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
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Предоставляем полный спектр геодезических и кадастровых услуг с гарантией качества и соблюдением сроков
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <Link href={`/services/${service.slug}`} key={service.slug} className="block group">
                <Card className="flex flex-col h-full p-6 hover:shadow-brand transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">Все услуги</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="about" className="py-20 bg-gradient-hero">
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
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-brand z-10">
                    <step.icon className="h-7 w-7 text-primary" />
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
      <section className="py-20 bg-background">
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
