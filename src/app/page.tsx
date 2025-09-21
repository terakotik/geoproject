import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Bot, SlidersHorizontal } from 'lucide-react';
import { services } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  const featuredServices = services.slice(0, 3);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-foreground/50 z-10" />
          {heroImage &&
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          }
          <div className="relative z-20 container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
              Precision in Every Dimension
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-background">
              GeoExpert delivers cutting-edge geodesy and land surveying services, combining decades of experience with innovative technology.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/services">Our Services</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary bg-transparent hover:bg-primary/10 text-white hover:text-primary">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Comprehensive Geodetic Solutions</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                From initial site surveys to complex cadastral work, we provide a full spectrum of services to meet your project's needs.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                  <CardHeader>
                    <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="link" className="text-primary text-lg">
                <Link href="/services">Explore All Services &rarr;</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AI Tools Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-semibold">INNOVATION</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">Harness the Power of AI</h2>
                <p className="mt-4 text-muted-foreground">
                  Our advanced AI-powered tools provide instant insights and estimates, saving you time and money. Get critical information in minutes, not days.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-accent/20 text-accent rounded-lg p-3 h-fit">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">ZOUIT Identification</h3>
                      <p className="text-muted-foreground">Instantly check if your property is subject to special land use regulations.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-accent/20 text-accent rounded-lg p-3 h-fit">
                      <SlidersHorizontal className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">AI Cost Estimator</h3>
                      <p className="text-muted-foreground">Receive a preliminary cost estimate for your project based on its unique parameters.</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/ai/zouit">Try Our AI Tools</Link>
                </Button>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                 <Image
                    src="https://picsum.photos/seed/ai-tools/800/600"
                    alt="Abstract AI visualization"
                    fill
                    className="object-cover"
                    data-ai-hint="abstract technology"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Your Partner in Precision</h2>
              <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                We are committed to delivering accurate data, reliable service, and innovative solutions.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center p-4">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Accuracy Guaranteed</h3>
                <p className="mt-2 text-muted-foreground">Utilizing state-of-the-art equipment for results you can trust.</p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Experienced Team</h3>
                <p className="mt-2 text-muted-foreground">Our certified professionals bring years of expertise to every project.</p>
              </div>
              <div className="text-center p-4">
                <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Client-Focused</h3>
                <p className="mt-2 text-muted-foreground">Dedicated support and transparent communication through our client portal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold font-headline text-primary-foreground">Ready to start your next project?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/80">
              Let's discuss your requirements and how GeoExpert can help you achieve your goals.
            </p>
            <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
