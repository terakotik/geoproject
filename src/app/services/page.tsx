import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Наши услуги</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Мы предлагаем полный спектр геодезических и кадастровых услуг, адаптированных для удовлетворения конкретных потребностей вашего проекта.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug} className="block">
              <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-primary/10 text-primary rounded-md p-3">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
