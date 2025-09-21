import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Newspaper } from 'lucide-react';

export default function UpdatesPage() {
  const updates = [
    {
      date: 'October 1, 2023',
      title: 'New Federal Regulations on Wetland Delineation',
      content: 'The federal government has issued new guidelines for wetland delineation, impacting development projects near protected water bodies. These changes require updated survey techniques and reporting standards. Our team is fully trained on these new requirements.'
    },
    {
      date: 'September 15, 2023',
      title: 'State-level Changes to Cadastral Mapping Standards',
      content: 'The state has adopted a new digital standard for all cadastral maps filed after January 1, 2024. All new surveys must comply with the Geo-XYZ data format. We have updated our software and processes to ensure full compliance.'
    },
    {
      date: 'August 28, 2023',
      title: 'Introduction of New ZOUIT Category: Urban Green Zones',
      content: 'Several municipalities have introduced a new ZOUIT category for "Urban Green Zones". These zones have strict limitations on new construction and land modification. Use our ZOUIT identification tool to check if your property is affected.'
    },
    {
      date: 'July 5, 2023',
      title: 'Updated Drone Usage Policies for Aerial Surveying',
      content: 'The aviation authority has released updated regulations for commercial drone operations, including new flight ceiling restrictions and data privacy requirements for aerial surveys. GeoExpert is fully licensed and compliant with all new rules.'
    }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit mb-4">
               <Newspaper className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Regulatory Updates</h1>
            <p className="mt-4 text-muted-foreground">
              Stay informed about the latest changes in land use regulations, surveying standards, and ZOUIT classifications.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {updates.map((update, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">{update.date}</span>
                    <span>{update.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-4 border-l-2 ml-2 border-primary">
                  {update.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
