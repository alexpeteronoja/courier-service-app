import type { FC } from "react";

export interface ContactChannel {
  icon: FC<{ size?: number; className?: string }>;
  label: string;
  value: string;
  sub: string;
}

export interface ReachOption {
  icon: FC<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  cta: string;
  accent: boolean;
  buttonLink: string;
}

export interface FAQ {
  q: string;
  a: string;
}
