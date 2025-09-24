import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Layers, ZoomIn, ZoomOut, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function MapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-placeholder');

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden">
      <div className="absolute inset-0">
        {mapImage ? (
          <Image
            src={mapImage.imageUrl}
            alt={mapImage.description}
            fill
            className="object-cover"
            data-ai-hint={mapImage.imageHint}
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-background/20" />
      </div>

      <div className="absolute top-4 left-4 z-10 w-full max-w-sm">
        <Card>
          <CardContent className="p-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search address or parcel number" className="pl-10" />
             </div>
             <p className="mt-2 text-center text-sm text-muted-foreground">Интерактивная карта в разработке.</p>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Card>
          <CardContent className="p-2">
            <div className="flex flex-col gap-1">
              <Button variant="ghost" size="icon"><Layers className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><ZoomIn className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><ZoomOut className="h-5 w-5" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <Card>
          <CardContent className="p-2">
            <p className="text-sm text-muted-foreground">
              Map data © GeoExpert contributors
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    