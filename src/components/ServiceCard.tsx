
'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { services, getServiceDetails, Service } from '@/lib/services';
import { useContactSheet } from '@/hooks/use-contact-sheet';

type ServiceCardProps = {
  service: Service;
  index: number;
  useLink?: boolean;
};

const ServiceCard = React.memo(({ service, index, useLink = true }: ServiceCardProps) => {
  const { onOpen } = useContactSheet();
  const details = getServiceDetails(service.slug);
  if (!details) return null;

  const CardBody = () => (
     <Card className="flex flex-col h-full hover:border-accent transition-all duration-300 border bg-card relative group p-6">
        <div className="absolute top-2 left-2 text-7xl font-bold text-foreground/5 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:text-accent/10">
          0{index + 1}
        </div>
        <div className="mb-4">
          <service.icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-heading mb-2">{service.title}</CardTitle>
          <CardDescription className="text-base" dangerouslySetInnerHTML={{ __html: service.description }}></CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0 pt-6">
          <ul className="space-y-3 my-4 text-base">
            {details.includes.slice(0, 3).map((item, i) => ( // Show only first 3 items
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
           <Button variant="default" size="lg" className="w-full text-lg py-6 bg-accent text-accent-foreground hover:bg-accent/90" asChild={useLink} onClick={!useLink ? onOpen : undefined}>
            {useLink ? <Link href={`/services/${service.slug}`}>Заказать услугу</Link> : 'Заказать услугу'}
          </Button>
        </div>
      </Card>
  );

  return <CardBody />;
});

ServiceCard.displayName = 'ServiceCard';
export default ServiceCard;
