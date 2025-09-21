import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Building, Ruler, FileText as FileTextIcon, TreePine, Factory, Calculator, Clock } from 'lucide-react';
import { services } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-medium">
                  <Star className="h-5 w-5 fill-current" />
                  <span>Нам доверяют с 2003 года</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Профессиональные
                  <span className="text-accent block">геодезические</span>
                  услуги
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Полный спектр кадастровых работ, инженерных изысканий и ЗОУИТ в Санкт-Петербурге и ЛО
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20">
                  <div className="text-2xl font-heading font-bold text-accent">2000+</div>
                  <div className="text-sm text-muted-foreground">выполненных проектов</div>
                </Card>
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20">
                  <div className="text-2xl font-heading font-bold text-accent">21</div>
                  <div className="text-sm text-muted-foreground">год на рынке</div>
                </Card>
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20">
                  <div className="text-2xl font-heading font-bold text-accent">14</div>
                  <div className="text-sm text-muted-foreground">дней средний срок</div>
                </Card>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Лицензированные кадастровые инженеры</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Работы любой сложности под ключ</span>
                </div>
                <div className="flex items-center gap-3">
                  <CircleCheckBig className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Электронная подача документов</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Бесплатная консультация</Link>
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                  <Phone className="h-5 w-5 mr-2" />
                  +7 (952) 276-49-40
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-hero">
                <Image
                  src="https://picsum.photos/seed/geodesist/800/1000"
                  alt="Профессиональный геодезист с геодезическим оборудованием"
                  width={800}
                  height={1000}
                  className="w-full h-[600px] object-cover"
                  data-ai-hint="surveyor equipment"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <Card className="absolute -bottom-6 -left-6 p-6 bg-card shadow-brand max-w-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-medium">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Выезд в день обращения</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Работаем по всему Санкт-Петербургу и Ленинградской области
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
