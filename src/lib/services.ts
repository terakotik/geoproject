import { type LucideIcon, DraftingCompass, Scale, FileText, Mountain, Calculator, Map, Building, ScanSearch, LandPlot, Star, CircleCheckBig, FilePenLine, Users, SquareCheckBig, Download, MessageCircle, Zap, Send, Phone, MessageSquare, ExternalLink, ArrowRight, Shield, MapPin as MapPinIcon, Ruler, FileText as FileTextIcon, TreePine, Factory, ListChecks } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
};

export const services: Service[] = [
  {
    title: "Межевание земельных участков",
    description: "Определение и закрепление границ земельных участков в натуре",
    icon: MapPinIcon,
    slug: "land-surveying",
  },
  {
    title: "Технические планы ОКС",
    description: "Оформление прав на дома, бани, гаражи и хозпостройки",
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
    description: "Определение зон с особыми условиями использования территорий",
    icon: FileTextIcon,
    slug: "zouit",
  },
  {
    title: "Фасадная съемка и 3D",
    description: "Трехмерное моделирование и фасадная съемка зданий",
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
    title: "Лесоустройство",
    description: "Работы по лесоустройству и лесопользованию",
    icon: TreePine,
    slug: "forest-management",
  },
  {
    title: "Промышленная геодезия",
    description: "Геодезическое сопровождение строительства и эксплуатации",
    icon: Factory,
    slug: "industrial-geodesy",
  },
  {
    title: "Кадастровая оценка",
    description: "Определение кадастровой стоимости объектов недвижимости",
    icon: Calculator,
    slug: "cadastral-valuation",
  },
];


type ServiceDetails = {
    longDescription: string;
    price: string;
    timeline: string;
    includes: string[];
}

const serviceDetails: Record<string, ServiceDetails> = {
    "land-surveying": {
        longDescription: "Полный комплекс работ по определению и юридическому закреплению границ вашего земельного участка. Услуга необходима для постановки на кадастровый учет, разрешения споров с соседями и при любых сделках с землей.",
        price: "от 12 500 ₽",
        timeline: "от 14 дней",
        includes: ["Выезд геодезистов", "Согласование границ", "Межевой план", "Подача в Росреестр"]
    },
    "technical-plans": {
        longDescription: "Изготовление технического плана для объектов капитального строительства (ОКС), необходимого для постановки на кадастровый учет и регистрации прав собственности на жилые дома, бани, гаражи и другие постройки.",
        price: "от 12 000 ₽",
        timeline: "от 5 дней",
        includes: ["Обмеры здания", "Технический план", "Регистрация прав", "Электронная подача"]
    },
    "topographic-survey": {
        longDescription: "Создание детальных топографических планов и карт местности в различных масштабах. Топосъемка является основой для проектирования, строительства, ландшафтного дизайна и получения разрешительной документации.",
        price: "от 10 000 ₽",
        timeline: "от 3 дней",
        includes: ["Полевые работы", "Камеральная обработка", "План в AutoCAD", "Различные масштабы"]
    },
    "zouit": {
        longDescription: "Определение нахождения вашего участка в зонах с особыми условиями использования территорий (ЗОУИТ). Мы выявляем все виды ограничений и готовим заключение для дальнейших действий.",
        price: "от 15 000 ₽",
        timeline: "от 10 дней",
        includes: ["Анализ факторов", "Расчет зон", "Картографический материал", "Согласования"]
    },
     "facade-survey": {
        longDescription: "Высокоточная фасадная съемка и создание трехмерных моделей зданий и сооружений для целей проектирования, реконструкции, реставрации и контроля за состоянием объектов.",
        price: "от 10 000 ₽",
        timeline: "от 3 дней",
        includes: ["3D-сканирование", "Фасадные планы", "Детальные обмеры", "Точные модели"]
    },
    "land-division-unification": {
        longDescription: "Кадастровые работы по разделу одного земельного участка на несколько или объединению нескольких смежных участков в один с последующей регистрацией в Росреестре.",
        price: "от 10 000 ₽",
        timeline: "от 14 дней",
        includes: ["Проект раздела", "Согласования", "Новые участки", "Кадастровый учет"]
    },
    "forest-management": {
        longDescription: "Комплекс работ по лесоустройству, включая таксацию лесов, проектирование лесных участков, отвод делянок и подготовку паспортов лесных участков.",
        price: "индивидуально",
        timeline: "от 20 дней",
        includes: ["Лесная таксация", "Планы лесонасаждений", "Отводы делянок", "Паспорта участков"]
    },
    "industrial-geodesy": {
        longDescription: "Полное геодезическое сопровождение на всех этапах строительства и эксплуатации промышленных и гражданских объектов, обеспечивающее точность и контроль качества.",
        price: "от 25 000 ₽",
        timeline: "от 7 дней",
        includes: ["Разбивочные работы", "Исполнительная съемка", "Наблюдения за деформациями", "Контроль качества"]
    },
    "cadastral-valuation": {
        longDescription: "Определение кадастровой стоимости земельных участков и объектов капитального строительства для целей налогообложения и совершения сделок.",
        price: "от 8 000 ₽",
        timeline: "от 5 дней",
        includes: ["Анализ рынка", "Расчет стоимости", "Отчет об оценке", "Экспертиза оценки"]
    }
}

export function getServiceDetails(slug: string): ServiceDetails | undefined {
    return serviceDetails[slug];
}
