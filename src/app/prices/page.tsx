
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Zap } from "lucide-react"
import { AnimatedText } from "@/components/AnimatedText";
import { useContactDialog } from "@/hooks/use-contact-dialog";

const packages = [
  {
    title: "Стандарт",
    description: "Межевание + Технический план",
    price: "21 450 ₽",
    oldPrice: "24 050 ₽",
    saving: "Экономия 11%",
    audience: "2-3 заявки",
    features: ["Межевание участка", "Технический план дома", "Подача документов", "Сопровождение до&nbsp;регистрации"],
    popular: false,
  },
  {
    title: "Популярный",
    description: "Групповой пакет",
    price: "19 500 ₽",
    oldPrice: "24 050 ₽",
    saving: "Экономия 19%",
    audience: "4-7 заявки",
    features: ["Все услуги пакета Стандарт", "Приоритетное обслуживание", "Персональный менеджер", "Скидка на&nbsp;дополнительные услуги"],
    popular: true,
  },
  {
    title: "Максимум",
    description: "Для больших объемов",
    price: "13 650 ₽",
    oldPrice: "24 050 ₽",
    saving: "Экономия 43%",
    audience: "20+ заявок",
    features: ["Все услуги предыдущих пакетов", "Индивидуальные условия", "Выездные консультации", "Круглосуточная поддержка"],
    popular: true,
    badge: "Максимальная скидка"
  },
];

const priceSections = [
  {
    title: "Кадастровые работы: Земельные участки",
    items: [
      { name: "Межевание (Уточнение границ) до 30 соток", price: "18 000 ₽", term: "" },
      { name: "Межевание (Уточнение границ) от 30 до 40 соток", price: "20 000 ₽", term: "" },
      { name: "Межевание (Уточнение границ) от 40 до 50 соток", price: "22 000 ₽", term: "" },
      { name: "Схема расположения ЗУ на КПТ (за 1 объект)", price: "12 000 ₽", term: "" },
      { name: "Вынос границ в натуру (выезд + до 8 точек)", price: "8 000 ₽", term: "" },
      { name: "Вынос границ в натуру (доп. точка сверх 8)", price: "500 ₽ / шт.", term: "" },
      { name: "Раздел / Объединение / Перераспределение (камерально)", price: "16 000 ₽", term: "" },
      { name: "Раздел / Объединение / Перераспределение (с геодезической съемкой)", price: "18 000 ₽", term: "" },
      { name: "Исправление реестровой ошибки (без выезда)", price: "16 000 ₽", term: "" },
      { name: "Исправление реестровой ошибки (с геодезической съемкой)", price: "18 000 ₽", term: "" },
      { name: "Межевание фермерских хозяйств (до 1 Га)", price: "16 000 ₽ / Га", term: "" },
      { name: "Межевание фермерских хозяйств (2–5 Га)", price: "14 000 ₽ / Га", term: "" },
      { name: "Межевание фермерских хозяйств (свыше 10 Га)", price: "10 000 ₽ / Га", term: "" },
    ],
  },
  {
    title: "Кадастровые работы: Здания и Сооружения (ОКС)",
    items: [
        { name: "Технический план дома / здания (до 200 кв.м)", price: "18 000 ₽", term: "" },
        { name: "Акт обследования (Снятие с учета/Снос)", price: "7 000 ₽", term: "" },
        { name: "Регистрация машиноместа", price: "18 000 ₽", term: "" },
        { name: "Технический паспорт", price: "6 500 ₽", term: "" },
    ],
  },
  {
    title: "Инженерная геодезия (Топография)",
    items: [
        { name: "Топографическая съемка (для газа/воды/света) до 15 соток", price: "18 000 ₽", term: "" },
        { name: "Топографическая съемка (для газа/воды/света) 15–25 соток", price: "20 000 ₽", term: "" },
        { name: "Топографическая съемка (для газа/воды/света) более 25 соток", price: "25 000 ₽", term: "" },
        { name: "Инженерно-геодезические изыскания (1:500) - Простые условия (поле)", price: "25 000 ₽ / Га", term: "" },
        { name: "Инженерно-геодезические изыскания (1:500) - Средняя сложность", price: "30 000 ₽ / Га", term: "" },
        { name: "Инженерно-геодезические изыскания (1:500) - Город / Коммуникации", price: "40 000 ₽ / Га", term: "" },
        { name: "Создание опорной геодезической сети (закладка пункта)", price: "10 000 ₽ / шт.", term: "" },
    ],
  },
];


export default function PricesPage() {
  const { onOpen } = useContactDialog();

  return (
    <div className="py-16 md:py-24 bg-gradient-hero" id="prices">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedText as="h1" text="Прайс-лист" className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Прозрачные цены без скрытых доплат. Групповые скидки до&nbsp;43%
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-heading font-semibold text-center mb-8 text-foreground">Пакетные предложения</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, index) => (
              <Card key={index} className={`flex flex-col p-6 relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 ${pkg.popular ? 'border-dashed border-border/50 hover:border-accent' : 'border-dashed border-border/50 hover:border-accent'}`}>
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold py-1 px-3 rounded-full">{pkg.badge || 'Выгодно'}</div>
                )}
                <div className="flex-grow">
                  <h3 className="text-xl font-heading font-semibold text-foreground">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="text-center py-4">
                    <div className="text-4xl font-heading font-bold text-accent">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground line-through">{pkg.oldPrice}</div>
                    <div className="text-sm font-medium text-accent mt-1">{pkg.saving}</div>
                    <div className="text-xs text-muted-foreground mt-1">{pkg.audience}</div>
                  </div>
                  
                  <ul className="space-y-3 text-sm mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: feature }}></span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className={`w-full mt-auto ${pkg.popular ? '' : 'bg-secondary text-secondary-foreground'}`} onClick={onOpen}>Выбрать пакет</Button>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-12">
          {priceSections.map((section, index) => (
            <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-2 border-dashed border-border/50 hover:border-accent transition-all duration-300 overflow-hidden">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-heading font-semibold text-foreground flex items-center gap-2">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-heading font-medium text-muted-foreground text-sm">Вид работ</th>
                        <th className="text-right p-4 font-heading font-medium text-muted-foreground text-sm">Стоимость</th>
                        <th className="text-right p-4 font-heading font-medium text-muted-foreground text-sm">Сроки</th>
                        <th className="w-28"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, i) => (
                        <tr key={i} className="border-b border-border/50 hover-gradient transition-colors duration-300 group">
                           <td className="p-4 pr-4 text-foreground relative">
                              <span className="block transition-transform duration-500 group-hover:translate-x-2" dangerouslySetInnerHTML={{ __html: item.name }}></span>
                            </td>
                            <td className="p-4 text-right font-semibold text-accent relative">
                               <span className="block transition-transform duration-500 group-hover:-translate-x-2" dangerouslySetInnerHTML={{ __html: item.price }}></span>
                            </td>
                          <td className="p-4 text-right text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.term }}></td>
                          <td className="p-4 pl-4 text-right">
                            <Button variant="outline" size="sm" onClick={onOpen}>Заказать</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-card/80 backdrop-blur-sm border-border/50 max-w-2xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-accent" />
              <h3 className="text-2xl font-heading font-bold text-foreground">Срочные работы</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">Выполним работы в&nbsp;кратчайшие сроки с&nbsp;доплатой 30%</p>
            <Button onClick={onOpen}>Срочный заказ</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
