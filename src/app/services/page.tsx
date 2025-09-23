import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
       <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs segments={[{ label: 'Главная', path: '/' }, { label: 'Услуги' }]} className="mb-8" />
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Наши услуги</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-lg">
            Мы&nbsp;предлагаем полный спектр геодезических и&nbsp;кадастровых услуг, адаптированных для удовлетворения конкретных потребностей вашего проекта.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
             <Link href={`/services/${service.slug}`} key={service.slug} className="block group">
             <Card className="flex flex-col h-full p-6 md:p-8 transition-all duration-300 hover:border-accent hover:shadow-lg">
               <CardHeader className="p-0 flex-row items-start justify-between mb-4">
                 <div className="p-3 rounded-lg bg-muted group-hover:bg-accent/10 transition-colors">
                   <service.icon className="h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors" />
                 </div>
               </CardHeader>
               <CardContent className="p-0 flex-grow">
                 <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{service.title}</h3>
                 <p className="text-muted-foreground text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: service.description }}></p>
               </CardContent>
               <div className="mt-6 pt-6 border-t border-border">
                 <div className="flex items-center justify-between text-accent font-semibold group-hover:text-primary transition-colors">
                  <span>Подробнее</span> 
                  <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                 </div>
               </div>
             </Card>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
