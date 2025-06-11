// src/lib/types.ts
export type NavLink = { href: string; label: string };
export type Project = {
  id: string;
  title: string;
  description?: string;
  totalRaised?: number;
};

export type Donation = {
  project: string;
  amount: number;
  date: string; // ISO string
};