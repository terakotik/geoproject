import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Bot, SlidersHorizontal } from 'lucide-react';
import { services } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const featuredServices = services.slice(0, 3);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-foreground/50 z-10" />
          {heroImage &&
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          }
          <div className="relative z-20 container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
              Точность в каждом измерении
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-background">
              GeoExpert предоставляет передовые услуги в области геодезии и землеустройства, сочетая многолетний опыт с инновационными технологиями.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/services">Наши услуги</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary bg-transparent hover:bg-primary/10 text-white hover:text-primary">
                <Link href="/contact">Получить консультацию</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Комплексные геодезические решения</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                От первоначальных изысканий до сложных кадастровых работ, мы предоставляем полный спектр услуг для нужд вашего проекта.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                   <Link href={`/services/${service.slug}`} className="flex flex-col h-full">
                    <CardHeader>
                      <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit">
                        <service.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="link" className="text-primary text-lg">
                <Link href="/services">Все услуги &rarr;</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Tools Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-semibold">ИННОВАЦИИ</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">Используйте мощь ИИ</h2>
                <p className="mt-4 text-muted-foreground">
                  Наши передовые инструменты на базе ИИ предоставляют мгновенные данные и оценки, экономя ваше время и деньги. Получайте важную информацию за минуты, а не дни.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-accent/20 text-accent rounded-lg p-3 h-fit">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Идентификация ЗОУИТ</h3>
                      <p className="text-muted-foreground">Мгновенно проверяйте, подпадает ли ваша собственность под действие особых правил землепользования.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-accent/20 text-accent rounded-lg p-3 h-fit">
                      <SlidersHorizontal className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">AI-оценщик стоимости</h3>
                      <p className="text-muted-foreground">Получите предварительную оценку стоимости вашего проекта на основе его уникальных параметров.</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/ai/zouit">Попробовать наши ИИ-инструменты</Link>
                </Button>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                 <Image
                    src="https://picsum.photos/seed/ai-tools/800/600"
                    alt="Абстрактная визуализация ИИ"
                    fill
                    className="object-cover"
                    data-ai-hint="abstract technology"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ваш партнер в точности</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Мы стремимся предоставлять точные данные, надежный сервис и инновационные решения.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center p-4">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Гарантия точности</h3>
                <p className="mt-2 text-muted-foreground">Использование современного оборудования для получения результатов, которым можно доверять.</p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Опытная команда</h3>
                <p className="mt-2 text-muted-foreground">Наши сертифицированные специалисты привносят многолетний опыт в каждый проект.</p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Ориентация на клиента</h3>
                <p className="mt-2 text-muted-foreground">Специализированная поддержка и прозрачная коммуникация через наш клиентский портал.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold font-headline text-primary-foreground">Готовы начать ваш следующий проект?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/80">
              Давайте обсудим ваши требования и то, как GeoExpert может помочь вам в достижении ваших целей.
            </p>
            <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link href="/contact">Свяжитесь с нами сегодня</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
