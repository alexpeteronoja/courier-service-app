import type { LucideIcon } from "lucide-react";

export interface Value {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initial: string;
}

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CheckItem {
  text: string;
}
