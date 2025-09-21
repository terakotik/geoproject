import { type LucideIcon, DraftingCompass, Scale, FileText, Mountain, Calculator, Map, Building, ScanSearch, LandPlot } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
};

export const services: Service[] = [
  {
    title: "Идентификация ЗОУИТ",
    description: "Определение, попадает ли объект в зону с особыми условиями использования территорий (ЗОУИТ), и разъяснение действующих ограничений.",
    icon: ScanSearch,
    slug: "zouit-identification",
  },
  {
    title: "Инженерно-геодезические изыскания",
    description: "Комплексные изыскания для строительства, инфраструктурных проектов и освоения территорий, гарантирующие точность на всех этапах.",
    icon: DraftingCompass,
    slug: "engineering-geodetic-surveys",
  },
  {
    title: "Топографическая съемка",
    description: "Детальное картографирование рельефа и объектов местности для проектно-изыскательских работ.",
    icon: Mountain,
    slug: "topographic-survey",
  },
  {
    title: "Кадастровые планы и работы",
    description: "Формирование и регистрация кадастровых планов для установления границ собственности и юридического оформления.",
    icon: LandPlot,
    slug: "cadastral-plans-works",
  },
  {
    title: "Исполнительная съемка",
    description: "Контрольная съемка завершенных строительных объектов для проверки соответствия проектной документации.",
    icon: Building,
    slug: "as-built-surveys",
  },
  {
    title: "Вынос в натуру",
    description: "Точная разбивка и закрепление на местности проектных точек и осей зданий и сооружений перед началом строительства.",
    icon: Map,
    slug: "stake-out-services",
  },
  {
    title: "Расчет объемов земляных работ",
    description: "Точный подсчет объемов выемки и насыпи грунта для оптимизации земляных работ и ресурсов.",
    icon: Calculator,
    slug: "earthwork-volume-calculation",
  },
  {
    title: "Технические планы и акты обследования",
    description: "Подготовка технической документации и актов обследования для объектов недвижимости и капитального строительства.",
    icon: FileText,
    slug: "technical-plans-inspection-acts",
  },
  {
    title: "Анализ исходных данных",
    description: "Экспертный анализ существующих геодезических и картографических материалов для разработки стратегии проекта.",
    icon: Scale,
    slug: "source-data-analysis",
  },
];
