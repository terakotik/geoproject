'use client';

import { services, getServiceDetails } from '@/lib/services';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, ArrowRight, Phone } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useContactDialog } from '@/hooks/use-contact-dialog';

export default function ServicePageClient({ slug }: { slug: string }) {
  const { onOpen } = useContactDialog();
  const service = services.find((s) => s.slug === slug);
  const details = getServiceDetails(slug);

  if (!service || !details) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs
          segments={[
            { label: 'Главная', path: '/' },
            { label: 'Услуги', path: '/services' },
            { label: service.title },
          ]}
          className="mb-8"
        />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="mx-auto bg-muted text-muted-foreground rounded-full p-4 w-fit mb-6">
              <service.icon className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading">{service.title}</h1>
            <p
              className="mt-4 text-muted-foreground text-lg"
              dangerouslySetInnerHTML={{ __html: service.description }}
            ></p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Описание услуги</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-muted-foreground whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: details.longDescription }}
                  ></p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Что входит в&nbsp;услугу</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {details.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <span
                          className="text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item }}
                        ></span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 md:sticky md:top-24 self-start">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Стоимость и&nbsp;сроки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Стоимость</p>
                    <p
                      className="text-2xl font-bold text-primary"
                      dangerouslySetInnerHTML={{ __html: details.price }}
                    ></p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Сроки</p>
                    <p
                      className="text-xl font-semibold text-foreground"
                      dangerouslySetInnerHTML={{ __html: details.timeline }}
                    ></p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Готовы начать?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Получите бесплатную консультацию и&nbsp;точный расчет для вашего объекта.
                  </p>
                  <Button onClick={onOpen} size="lg" className="w-full">
                    Заказать консультацию <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <a href="tel:+79522764940">
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
