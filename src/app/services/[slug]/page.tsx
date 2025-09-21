import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit mb-4">
              <service.icon className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.title}</h1>
            <p className="mt-4 text-muted-foreground">{service.description}</p>
          </div>

          <Card className="shadow-lg bg-card">
            <CardHeader>
              <CardTitle>Подробности услуги</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Здесь будет подробное описание услуги "{service.title}". Этот раздел можно дополнить информацией о процессе, используемых технологиях, примерах работ и преимуществах для клиента.
              </p>
              {/* You can add more detailed content here */}
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/contact">Заказать консультацию</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
