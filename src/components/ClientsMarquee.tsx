import { cn } from '@/lib/utils';

const clients = [
  'ПАО Красная звезда',
  'ПАО Транснефть',
  'Министерство обороны РФ',
  'ФГУП Михайловский',
];

export const ClientsMarquee = () => {
  const extendedClients = [...clients, ...clients, ...clients, ...clients]; 

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-12">
      <div className="flex animate-marquee will-change-transform">
        {extendedClients.map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-max mx-8 text-2xl font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  );
};
