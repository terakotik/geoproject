import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
             <Link href={`/services/${service.slug}`} key={service.slug} className="block group">
             <Card className="service-card flex flex-col h-full p-8 transition-all duration-300 bg-card/50 backdrop-blur-sm">
               <div className="border-box"></div>
               <div className="flex items-start justify-between mb-6">
                 <div className="p-3 rounded-lg bg-muted">
                   <service.icon className="h-10 w-10 text-muted-foreground" />
                 </div>
               </div>
               <div>
                 <h3 className="text-3xl font-heading font-semibold text-foreground mb-4">{service.title}</h3>
                 <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
               </div>
               <div className="mt-auto pt-8">
                 <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors text-lg py-6">
                   Подробнее <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
               </div>
             </Card>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
