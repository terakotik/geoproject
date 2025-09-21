import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Zap } from "lucide-react"

const packages = [
  {
    title: "Стандарт",
    description: "Межевание + Технический план",
    price: "12 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 11%",
    audience: "2-3 заявки",
    features: ["Межевание участка", "Технический план дома", "Подача документов", "Сопровождение до регистрации"],
    popular: false,
  },
  {
    title: "Популярный",
    description: "Групповой пакет",
    price: "10 500 ₽",
    oldPrice: "14 000 ₽",
    saving: "Экономия 25%",
    audience: "4-7 заявок",
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
      { name: "Межевание земельного участка в СПб и ЛО", price: "от 12 500 ₽", term: "от 14 дней" },
      { name: "Межевание земель общего пользования в СНТ, ДНП", price: "индивидуально", term: "от 14 дней" },
      { name: "Раздел земельного участка", price: "от 10 000 ₽", term: "от 14 дней" },
      { name: "Объединение земельных участков", price: "от 10 000 ₽", term: "от 14 дней" },
      { name: "Перераспределение земельных участков", price: "от 8 000 ₽", term: "от 14 дней" },
      { name: "Формирование схемы участка на КПТ", price: "от 3 000 ₽", term: "2 дня" },
      { name: "Вынос границ в натуру (4 точки включены)", price: "от 7 000 ₽", term: "от 2 дней" },
    ],
  },
  {
    title: "Объекты капитального строительства",
    items: [
        { name: "Оформление прав собственности на дом, баню, гараж, хозпостройку", price: "от 12 000 ₽", term: "от 5 дней" },
        { name: "Изготовление технического плана на здание, сооружение, ОНС", price: "от 8 000 ₽", term: "от 5 дней" },
        { name: "Учет изменений ОКС (перепланировка, реконструкция)", price: "от 12 000 ₽", term: "от 5 дней" },
        { name: "Изготовление акта обследования", price: "от 5 000 ₽", term: "от 3 дней" },
        { name: "Регистрация загородной недвижимости", price: "от 8 500 ₽", term: "от 5 дней" },
    ],
  },
  {
    title: "Топографическая съемка",
    items: [
        { name: "Фасадная съемка и 3D", price: "от 10 000 ₽", term: "от 3 дней" },
        { name: "Съёмка для водоканала и газа", price: "от 10 000 ₽", term: "от 5 дней" },
        { name: "Съёмка для ландшафтного дизайна", price: "от 12 000 ₽", term: "от 5 дней" },
        { name: "Исполнительная топосъемка", price: "от 15 000 ₽", term: "от 3 дней" },
        { name: "Топосъемка М 1:500", price: "от 25 000 ₽", term: "от 7 дней" },
    ],
  },
  {
    title: "ЗОУИТ и специальные работы",
    items: [
        { name: "Определение зон с особыми условиями использования территорий", price: "от 15 000 ₽", term: "от 10 дней" },
        { name: "Расчет санитарно-защитных зон", price: "от 20 000 ₽", term: "от 14 дней" },
        { name: "Зоны охраны объектов культурного наследия", price: "от 25 000 ₽", term: "от 21 дня" },
        { name: "Водоохранные зоны", price: "от 18 000 ₽", term: "от 14 дней" },
    ],
  },
  {
    title: "Дополнительные услуги",
    items: [
        { name: "Регистрация машиноместа", price: "от 18 000 ₽", term: "от 10 дней" },
        { name: "Подготовка поэтажных планов", price: "от 3 000 ₽", term: "от 3 дней" },
        { name: "Изготовление технического паспорта объекта", price: "от 5 000 ₽", term: "от 3 дней" },
        { name: "Выписка из ЕГРН", price: "от 500 ₽", term: "1 день" },
        { name: "Справки и консультации", price: "бесплатно", term: "в день обращения" },
    ],
  },
];


export default function PricesPage() {
  return (
    <div className="py-20 bg-gradient-hero" id="prices">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Прайс-лист услуг</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Прозрачные цены без скрытых доплат. Групповые скидки до 43%
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-heading font-semibold text-center mb-8 text-foreground">Пакетные предложения</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, index) => (
              <Card key={index} className={`flex flex-col p-6 relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 transition-all duration-300 ${pkg.popular ? 'border-transparent hover:border-accent' : 'border-border/50'}`}>
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold py-1 px-3 rounded-full">{pkg.badge || 'Выгодно'}</div>
                )}
                <div className="flex-grow">
                  <h3 className="text-xl font-heading font-semibold text-foreground">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="text-center py-4">
                    <div className="text-4xl font-heading font-bold text-accent">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground line-through">{pkg.oldPrice}</div>
                    <div className="text-sm font-medium text-accent">{pkg.saving}</div>
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
            <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
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
                        <th className="text-left py-3 font-heading font-medium text-muted-foreground text-sm">Вид работ</th>
                        <th className="text-right py-3 font-heading font-medium text-muted-foreground text-sm">Стоимость</th>
                        <th className="text-right py-3 font-heading font-medium text-muted-foreground text-sm">Сроки</th>
                        <th className="w-28"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="py-4 pr-4 text-foreground">{item.name}</td>
                          <td className="py-4 text-right font-semibold text-accent">{item.price}</td>
                          <td className="py-4 text-right text-muted-foreground">{item.term}</td>
                          <td className="py-4 pl-4 text-right">
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
          <Card className="inline-block p-8 bg-gradient-accent text-accent-foreground max-w-2xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="h-5 w-5" />
              <h3 className="text-2xl font-heading font-bold">Срочные работы</h3>
            </div>
            <p className="text-lg mb-4">Выполним работы в кратчайшие сроки с доплатой 30%</p>
            <Button variant="secondary">Срочный заказ</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
