import { type LucideIcon, DraftingCompass, Scale, FileText, Mountain, Calculator, Map, Building, ScanSearch, LandPlot } from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "ZOUIT Identification",
    description: "Determine if a property falls within a zone with special conditions of use (ZOUIT) and understand applicable regulations.",
    icon: ScanSearch,
  },
  {
    title: "Engineering & Geodetic Surveys",
    description: "Comprehensive surveys for construction, infrastructure projects, and land development, ensuring precision from start to finish.",
    icon: DraftingCompass,
  },
  {
    title: "Topographic Survey",
    description: "Detailed mapping of terrain and features, providing essential data for design and planning.",
    icon: Mountain,
  },
  {
    title: "Cadastral Plans & Works",
    description: "Creation and registration of cadastral plans for property boundary definition and legal registration.",
    icon: LandPlot,
  },
  {
    title: "As-Built Surveys",
    description: "Verifying that construction work has been completed according to the design plans.",
    icon: Building,
  },
  {
    title: "Stake-Out Services",
    description: "Precise marking of proposed structures or features on the ground before construction.",
    icon: Map,
  },
  {
    title: "Earthwork Volume Calculation",
    description: "Accurate calculation of cut and fill volumes for earthmoving projects, optimizing resource management.",
    icon: Calculator,
  },
  {
    title: "Technical Plans & Inspection Acts",
    description: "Preparation of technical documentation and inspection acts for real estate objects and capital construction.",
    icon: FileText,
  },
  {
    title: "Source Data Analysis",
    description: "Expert analysis of existing geodetic and cartographic data to inform project strategy and execution.",
    icon: Scale,
  },
];
