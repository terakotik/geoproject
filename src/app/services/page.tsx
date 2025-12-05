
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getServiceDetails } from '@/lib/services';
import ServiceCard from '@/components/ServiceCard';
import { AnimatedText } from '@/components/AnimatedText';

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
       <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs segments={[{ label: 'Главная', path: '/' }, { label: 'Услуги' }]} className="mb-8" />
        <div className="text-center mb-12 md:mb-16">
          <AnimatedText as="h1" text="Наши услуги" className="text-4xl md:text-5xl font-bold font-heading" />
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-lg" dangerouslySetInnerHTML={{ __html: 'Мы&nbsp;предлагаем полный спектр геодезических и&nbsp;кадастровых услуг, адаптированных для удовлетворения конкретных потребностей вашего проекта.' }} >
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
             <ServiceCard key={service.slug} service={service} index={index} useLink={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
