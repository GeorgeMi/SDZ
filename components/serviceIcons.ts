import { Baby, Crown, Gem, Heart, Leaf, Microscope, Smile, Sparkles, Target, Wrench, Zap, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/lib/site";

export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  "profilaxie-dentara": Sparkles,
  "stomatologie-generala": Heart,
  "stomatologie-pediatrica": Baby,
  ortodontie: Smile,
  odontoterapie: Wrench,
  parodontologie: Leaf,
  endodontie: Target,
  "protetica-dentara": Crown,
  "estetica-dentara": Gem,
  implantologie: Zap,
  "chirurgie-dentara": Microscope,
};
