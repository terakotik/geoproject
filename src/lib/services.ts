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
    title: "Лесоустройство",
    description: "Работы по&nbsp;лесоустройству и&nbsp;лесопользованию",
    icon: TreePine,
    slug: "forest-management",
  },
  {
    title: "Промышленная геодезия",
    description: "Геодезическое сопровождение строительства и&nbsp;эксплуатации",
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
        longDescription: "Полный комплекс работ по&nbsp;определению и&nbsp;юридическому закреплению границ вашего земельного участка. Услуга необходима для постановки на&nbsp;кадастровый учет, разрешения споров с&nbsp;соседями и&nbsp;при любых сделках с&nbsp;землей.",
        price: "от&nbsp;12&nbsp;500&nbsp;₽",
        timeline: "от&nbsp;14&nbsp;дней",
        includes: ["Выезд геодезистов", "Согласование границ", "Межевой план", "Подача в&nbsp;Росреестр"]
    },
    "technical-plans": {
        longDescription: "Изготовление технического плана для объектов капитального строительства (ОКС), необходимого для постановки на&nbsp;кадастровый учет и&nbsp;регистрации прав собственности на&nbsp;жилые дома, бани, гаражи и&nbsp;другие постройки.",
        price: "от&nbsp;12&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;5&nbsp;дней",
        includes: ["Обмеры здания", "Технический план", "Регистрация прав", "Электронная подача"]
    },
    "topographic-survey": {
        longDescription: "Создание детальных топографических планов и&nbsp;карт местности в&nbsp;различных масштабах. Топосъемка является основой для проектирования, строительства, ландшафтного дизайна и&nbsp;получения разрешительной документации.",
        price: "от&nbsp;10&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;3&nbsp;дней",
        includes: ["Полевые работы", "Камеральная обработка", "План в&nbsp;AutoCAD", "Различные масштабы"]
    },
    "zouit": {
        longDescription: "Определение нахождения вашего участка в&nbsp;зонах с&nbsp;особыми условиями использования территорий (ЗОУИТ). Мы&nbsp;выявляем все виды ограничений и&nbsp;готовим заключение для дальнейших действий.",
        price: "от&nbsp;15&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;10&nbsp;дней",
        includes: ["Анализ факторов", "Расчет зон", "Картографический материал", "Согласования"]
    },
     "facade-survey": {
        longDescription: "Высокоточная фасадная съемка и&nbsp;создание трехмерных моделей зданий и&nbsp;сооружений для целей проектирования, реконструкции, реставрации и&nbsp;контроля за&nbsp;состоянием объектов.",
        price: "от&nbsp;10&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;3&nbsp;дней",
        includes: ["3D-сканирование", "Фасадные планы", "Детальные обмеры", "Точные модели"]
    },
    "land-division-unification": {
        longDescription: "Кадастровые работы по&nbsp;разделу одного земельного участка на&nbsp;несколько или объединению нескольких смежных участков в&nbsp;один с&nbsp;последующей регистрацией в&nbsp;Росреестре.",
        price: "от&nbsp;10&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;14&nbsp;дней",
        includes: ["Проект раздела", "Согласования", "Новые участки", "Кадастровый учет"]
    },
    "forest-management": {
        longDescription: "Комплекс работ по&nbsp;лесоустройству, включая таксацию лесов, проектирование лесных участков, отвод делянок и&nbsp;подготовку паспортов лесных участков.",
        price: "индивидуально",
        timeline: "от&nbsp;20&nbsp;дней",
        includes: ["Лесная таксация", "Планы лесонасаждений", "Отводы делянок", "Паспорта участков"]
    },
    "industrial-geodesy": {
        longDescription: "Полное геодезическое сопровождение на&nbsp;всех этапах строительства и&nbsp;эксплуатации промышленных и&nbsp;гражданских объектов, обеспечивающее точность и&nbsp;контроль качества.",
        price: "от&nbsp;25&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;7&nbsp;дней",
        includes: ["Разбивочные работы", "Исполнительная съемка", "Наблюдения за&nbsp;деформациями", "Контроль качества"]
    },
    "cadastral-valuation": {
        longDescription: "Определение кадастровой стоимости земельных участков и&nbsp;объектов капитального строительства для целей налогообложения и&nbsp;совершения сделок.",
        price: "от&nbsp;8&nbsp;000&nbsp;₽",
        timeline: "от&nbsp;5&nbsp;дней",
        includes: ["Анализ рынка", "Расчет стоимости", "Отчет об&nbsp;оценке", "Экспертиза оценки"]
    }
}

export function getServiceDetails(slug: string): ServiceDetails | undefined {
    return serviceDetails[slug];
}
