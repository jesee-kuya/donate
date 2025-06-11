// src/lib/common.ts
import { writable, type Writable } from 'svelte/store';
import type { Project, Donation } from '$lib/types';

const PROJECTS_KEY = 'social_projects_data';
const DONATIONS_KEY = 'social_donations_data';

const initialProjects: Project[] = [
  {
    id: 'proj-edu',
    title: 'Education for All',
    description:
      'Providing books and learning materials to underprivileged children to foster a love for learning.',
    image: 'project-education.png',
    donated: 12500
  },
  {
    id: 'proj-health',
    title: 'Community Health',
    description:
      'Funding mobile health clinics to provide essential medical care in remote and underserved areas.',
    image: 'project-health.png',
    donated: 27800
  },
  {
    id: 'proj-env',
    title: 'Green Earth Initiative',
    description:
      'Supporting reforestation projects and conservation efforts to combat climate change.',
    image: 'project-environment.png',
    donated: 8950
  }
];

/** Initialize localStorage and Svelte stores */
export function initData(): void {
  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
  }
  if (!localStorage.getItem(DONATIONS_KEY)) {
    localStorage.setItem(DONATIONS_KEY, JSON.stringify([] as Donation[]));
  }
  projectsStore.set(getProjects());
  donationsStore.set(getDonations());
}

/** Non‐reactive getters (read straight from localStorage) */
export function getProjects(): Project[] {
  const json = localStorage.getItem(PROJECTS_KEY);
  return json ? (JSON.parse(json) as Project[]) : [];
}

export function getDonations(): Donation[] {
  const json = localStorage.getItem(DONATIONS_KEY);
  return json ? (JSON.parse(json) as Donation[]) : [];
}

/**
 * Add a donation, update localStorage, and update stores.
 * Returns the updated project or null if not found.
 */
export function addDonation(input: {
  projectId: string;
  amount: number;
}): { updatedProject: Project } | null {
  const projects = getProjects();
  const donations = getDonations();

  const project = projects.find((p) => p.id === input.projectId);
  if (!project) {
    console.error('Project not found');
    return null;
  }

  // 1) update project total
  project.donated += input.amount;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  projectsStore.set(projects);

  // 2) create donation record
  const newDonation: Donation = {
    id: project.id,
    project: project.title,
    amount: input.amount,
    date: new Date().toISOString()
  };
  donations.push(newDonation);
  localStorage.setItem(DONATIONS_KEY, JSON.stringify(donations));
  donationsStore.set(donations);

  return { updatedProject: project };
}

/** Svelte stores for reactive components */
export const projectsStore: Writable<Project[]> = writable([]);
export const donationsStore: Writable<Donation[]> = writable([]);
