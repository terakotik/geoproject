import { services } from '@/lib/services';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

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

  return <ServicePageClient slug={params.slug} />;
}
