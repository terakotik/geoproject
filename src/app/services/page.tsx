
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getServiceDetails } from '@/lib/services';

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
       <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs segments={[{ label: 'Главная', path: '/' }, { label: 'Услуги' }]} className="mb-8" />
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Наши услуги</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;предлагаем полный спектр геодезических и&nbsp;кадастровых услуг, адаптированных для удовлетворения конкретных потребностей вашего проекта.' }} >
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const details = getServiceDetails(service.slug);
            if (!details) return null;

            return (
              <Link href={`/services/${service.slug}`} key={service.slug} className="block group h-full">
                <Card className="flex flex-col h-full hover:border-accent transition-all duration-300 border bg-card relative p-6">
                  <div className="mb-4">
                    <service.icon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-heading mb-2">{service.title}</CardTitle>
                    <p className="text-base text-muted-foreground" dangerouslySetInnerHTML={{ __html: service.description }}></p>
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
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
