import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Zap } from "lucide-react"

const packages = [
  {
    title: "Стандарт",
    description: "Межевание + Технический план",
    price: "13 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 4%",
    audience: "2-3 заявки",
    features: ["Межевание участка", "Технический план дома", "Подача документов", "Сопровождение до регистрации"],
    popular: false,
  },
  {
    title: "Популярный",
    description: "Групповой пакет",
    price: "12 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 11%",
    audience: "4-7 заявки",
    features: ["Все услуги пакета Стандарт", "Приоритетное обслуживание", "Персональный менеджер", "Скидка на дополнительные услуги"],
    popular: true,
  },
  {
    title: "Максимум",
    description: "Для больших объемов",
    price: "8 000 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 43%",
    audience: "20+ заявок",
    features: ["Все услуги предыдущих пакетов", "Индивидуальные условия", "Выездные консультации", "Круглосуточная поддержка"],
    popular: true,
    badge: "Максимальная скидка"
  },
];

const priceSections = [
  {
    title: "Земельные участки",
    items: [
      { name: "Межевание земельного участка в Спб и ЛО", price: "от 12500 руб.", term: "от 14 дней" },
      { name: "Межевание земель общего пользования в СНТ, ДНП", price: "индивидуально", term: "" },
      { name: "Раздел земельного участка", price: "от 10000 руб.", term: "от 14 дней" },
      { name: "Объединение земельных участков", price: "от 10000 руб.", term: "от 14 дней" },
      { name: "Перераспределение земельных участков", price: "от 8000 руб.", term: "от 14 дней" },
      { name: "Формирование схемы участка на КПТ", price: "от 3000 руб.", term: "2 дня" },
      { name: "Вынос границ в натуру ( 4 точки включены)", price: "от 7000 руб.", term: "от 2 дней" },
    ],
  },
  {
    title: "Объекты капитального строительства",
    items: [
        { name: "Оформление прав собственности на дом, баню, гараж, хозпостройку", price: "от 12000 руб.", term: "от 5 дней" },
        { name: "Изготовление технического плана на здание, сооружение, объекта незавершенного строительства", price: "от 8000 руб.", term: "от 5 дней" },
        { name: "Учет изменений ОКС (перепланировка, реконструкция)", price: "от 12000 руб.", term: "от 5 дней" },
        { name: "Изготовление акта обследования", price: "от 5000 руб.", term: "от 3 дней" },
        { name: "Регистрация загородной недвижимости", price: "от 8500 руб.", term: "от 5 дней" },
    ],
  },
  {
    title: "Топографическая съемка",
    items: [
        { name: "Фасадная съемка и 3D", price: "от 10000 руб.", term: "от 3 дней" },
        { name: "Съёмка для водоканала и газа", price: "от 10000 руб.", term: "от 5 дней" },
        { name: "Съёмка для ландшафтного дизайна", price: "от 12000 руб.", term: "от 5 дней" },
    ],
  },
    {
    title: "Дополнительные услуги",
    items: [
        { name: "Регистрация машиноместа", price: "от 18000 руб.", term: "от 10 дней" },
        { name: "Подготовка поэтажных планов", price: "от 3000 руб.", term: "от 3 дней" },
        { name: "Изготовление технического паспорта объекта", price: "от 5000 руб.", term: "от 3 дней" },
    ],
  },
];


export default function PricesPage() {
  return (
    <div className="py-16 md:py-24 bg-gradient-hero" id="prices">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Прайс-лист</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Прозрачные цены без скрытых доплат. Групповые скидки до 43%
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
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className={`w-full mt-auto ${pkg.popular ? '' : 'bg-secondary text-secondary-foreground'}`}>Выбрать пакет</Button>
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
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-300 group">
                           <td className="p-4 pr-4 text-foreground relative">
                              <span className="block transition-transform duration-500 group-hover:translate-x-2">{item.name}</span>
                            </td>
                            <td className="p-4 text-right font-semibold text-accent relative">
                               <span className="block transition-transform duration-500 group-hover:-translate-x-2">{item.price}</span>
                            </td>
                          <td className="p-4 text-right text-muted-foreground">{item.term}</td>
                          <td className="p-4 pl-4 text-right">
                            <Button variant="outline" size="sm">Заказать</Button>
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
            <p className="text-lg text-muted-foreground mb-6">Выполним работы в кратчайшие сроки с доплатой 30%</p>
            <Button>Срочный заказ</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
