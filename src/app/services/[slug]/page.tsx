import { services, getServiceDetails } from '@/lib/services';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  const details = getServiceDetails(params.slug);

  if (!service || !details) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="mx-auto bg-muted text-muted-foreground rounded-full p-4 w-fit mb-6">
              <service.icon className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.title}</h1>
            <p className="mt-4 text-muted-foreground text-lg">{service.description}</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Описание услуги</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{details.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Что входит в услугу</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {details.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
                <CardHeader className="flex-row items-center justify-between p-6">
                    <div>
                        <CardTitle>Стоимость и сроки</CardTitle>
                        <CardDescription>Прозрачные цены и реалистичные сроки</CardDescription>
                    </div>
                     <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{details.price}</p>
                        <p className="text-sm text-muted-foreground">{details.timeline}</p>
                    </div>
                </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-16">
             <h2 className="text-2xl font-bold font-headline mb-4">Готовы начать?</h2>
            <Button asChild size="lg">
              <Link href="/contact">Заказать консультацию</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
