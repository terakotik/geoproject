
import { type LucideIcon, File, DraftingCompass, Scale, FileText, Mountain, Calculator, Map, Building, ScanSearch, LandPlot, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Ruler, FileText as FileTextIcon, TreePine, Factory, ListChecks, Gavel } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
};

export const services: Service[] = [
  {
    title: "Межевание земельных участков",
    description: "Определение и&nbsp;закрепление границ земельных участков в&nbsp;натуре",
    icon: MapPinIcon,
    slug: "land-surveying",
  },
  {
    title: "Технические планы ОКС",
    description: "Оформление прав на&nbsp;дома, бани, гаражи и&nbsp;хозпостройки",
    icon: Building,
    slug: "technical-plans",
  },
  {
    title: "Топографическая съемка",
    description: "Создание топографических планов местности различного масштаба",
    icon: Ruler,
    slug: "topographic-survey",
  },
  {
    title: "ЗОУИТ (зоны действия факторов)",
    description: "Определение зон с&nbsp;особыми условиями использования территорий",
    icon: FileTextIcon,
    slug: "zouit",
  },
  {
    title: "Сервитут",
    description: "Установление права ограниченного пользования чужим земельным участком",
    icon: Scale,
    slug: "servitut",
  },
  {
    title: "Фасадная съемка и 3D",
    description: "Трехмерное моделирование и&nbsp;фасадная съемка зданий",
    icon: ScanSearch,
    slug: "facade-survey",
  },
  {
    title: "Раздел и объединение участков",
    description: "Перераспределение земельных участков согласно требованиям",
    icon: LandPlot,
    slug: "land-division-unification",
  },
  {
    title: "Промышленная геодезия",
    description: "Геодезическое сопровождение строительства и&nbsp;эксплуатации",
    icon: Factory,
    slug: "industrial-geodesy",
  },
  {
    title: "Кадастровые работы",
    description: "Комплекс работ для внесения сведений в&nbsp;ЕГРН",
    icon: Calculator,
    slug: "cadastral-works",
  },
  {
    title: "Технические паспорта",
    description: "Изготовление и оформление технических паспортов на объекты недвижимости",
    icon: File,
    slug: "technical-passports",
  }
];


type ServiceDetails = {
    longDescription: string;
    price: string;
    timeline: string;
    includes: string[];
}

const serviceDetails: Record<string, ServiceDetails> = {
    "land-surveying": {
        longDescription: "Полный комплекс работ по&nbsp;определению и&nbsp;юридическому закреплению границ вашего земельного участка. Услуга необходима для постановки на&nbsp;кадастровый учет, разрешения споров с&nbsp;соседями и&nbsp;при любых сделках с&nbsp;землей.",
        price: "от&nbsp;18&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;14&nbsp;дней",
        includes: ["Выезд геодезистов", "Согласование границ", "Межевой план", "Подача в&nbsp;Росреестр"]
    },
    "technical-plans": {
        longDescription: "Изготовление технического плана для объектов капитального строительства (ОКС), необходимого для постановки на&nbsp;кадастровый учет и&nbsp;регистрации прав собственности на&nbsp;жилые дома, бани, гаражи и&nbsp;другие постройки.",
        price: "от&nbsp;18&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;5&nbsp;дней",
        includes: ["Обмеры здания", "Технический план", "Регистрация прав", "Электронная подача"]
    },
    "topographic-survey": {
        longDescription: "Создание детальных топографических планов и&nbsp;карт местности в&nbsp;различных масштабах. Топосъемка является основой для проектирования, строительства, ландшафтного дизайна и&nbsp;получения разрешительной документации.",
        price: "от&nbsp;18&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;3&nbsp;дней",
        includes: ["Полевые работы", "Камеральная обработка", "План в&nbsp;AutoCAD", "Различные масштабы"]
    },
    "zouit": {
        longDescription: "Определение нахождения вашего участка в&nbsp;зонах с&nbsp;особыми условиями использования территорий (ЗОУИТ). Мы&nbsp;выявляем все виды ограничений и&nbsp;готовим заключение для дальнейших действий.",
        price: "от&nbsp;15&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;10&nbsp;дней",
        includes: ["Анализ факторов", "Расчет зон", "Картографический материал", "Согласования"]
    },
    "servitut": {
        longDescription: "Сервитут — это право ограниченного пользования чужим земельным участком. Предоставляя сервитут, собственник участка может брать плату с того, кто пользуется землей, устанавливать штрафы за его нарушение.\n\nВиды сервитутов:\n• Частный сервитут — сервитут на проход или проезд установленного лица.\n• Публичный сервитут — сервитут на неопределенное количество лиц. Его чаще устанавливает государство для доступа к водоему или прокладки инженерных сетей.\n\nПо времени наложения:\n• Временный сервитут — устанавливается на определенный срок. Например, для строительных работ.\n• Постоянный — устанавливается на неустановленный срок.",
        price: "от 30 000 ₽",
        timeline: "от 2 мес.",
        includes: ["Соглашение и межевой план"]
    },
     "facade-survey": {
        longDescription: "Высокоточная фасадная съемка и&nbsp;создание трехмерных моделей зданий и&nbsp;сооружений для целей проектирования, реконструкции, реставрации и&nbsp;контроля за&nbsp;состоянием объектов.",
        price: "от&nbsp;10&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;3&nbsp;дней",
        includes: ["3D-сканирование", "Фасадные планы", "Детальные обмеры", "Точные модели"]
    },
    "land-division-unification": {
        longDescription: "Кадастровые работы по&nbsp;разделу одного земельного участка на&nbsp;несколько или объединению нескольких смежных участков в&nbsp;один с&nbsp;последующей регистрацией в&nbsp;Росреестре.",
        price: "от&nbsp;16&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;14&nbsp;дней",
        includes: ["Проект раздела/объединения", "Согласования", "Новые межевые планы", "Кадастровый учет"]
    },
    "industrial-geodesy": {
        longDescription: "Полное геодезическое сопровождение на&nbsp;всех этапах строительства и&nbsp;эксплуатации промышленных и&nbsp;гражданских объектов, обеспечивающее точность и&nbsp;контроль качества.",
        price: "от&nbsp;25&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;7&nbsp;дней",
        includes: ["Разбивочные работы", "Исполнительная съемка", "Наблюдения за&nbsp;деформациями", "Контроль качества"]
    },
    "cadastral-works": {
        longDescription: "Комплекс работ для внесения или изменения сведений в Едином государственном реестре недвижимости (ЕГРН), включая исправление реестровых ошибок, межевание и подготовку технических планов.",
        price: "от&nbsp;16&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;5&nbsp;дней",
        includes: ["Анализ документов", "Геодезическая съемка", "Подготовка планов", "Взаимодействие с Росреестром"]
    },
    "technical-passports": {
        longDescription: "Подготовка и оформление технического паспорта на квартиру, дом, здание или помещение. Технический паспорт содержит основные технические характеристики объекта и требуется для различных юридических процедур.",
        price: "от&nbsp;6&nbsp;500&nbsp;₽",
        timeline: "от&nbsp;3&nbsp;дней",
        includes: ["Выезд техника", "Проведение замеров", "Оформление паспорта", "Регистрация в БТИ (при необходимости)"]
    }
}

export function getServiceDetails(slug: string): ServiceDetails | undefined {
    if (slug === 'cadastral-valuation') {
        return serviceDetails['cadastral-works'];
    }
    return serviceDetails[slug];
}
