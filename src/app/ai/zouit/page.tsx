import { ZouitForm } from './ZouitForm';
import { ScanSearch } from 'lucide-react';

export default function ZouitPage() {
  return (
    <div className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit mb-4">
               <ScanSearch className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">ZOUIT Identification</h1>
            <p className="mt-4 text-muted-foreground">
              Enter a property address or coordinates to instantly determine if it falls within a Zone with Special Conditions of Use (ZOUIT) and view applicable regulations.
            </p>
          </div>
          <ZouitForm />
        </div>
      </div>
    </div>
  );
}
