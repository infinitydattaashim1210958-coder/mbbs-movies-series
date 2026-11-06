export interface NoteMeta {
  id: string;
  title: string;
  slug: string;
  language: "bn" | "en";
  movie: string;
  releaseYear: number;
  specialties: string[];
  topics: string[];
  diagnoses: string[];
  difficulty: string;
  description: string;
  fileName: string;
  tags: string[];
  readingTime: number;
  hasFeynman: boolean;
  hasQuiz: boolean;
  published: boolean;
}

export interface Manifest {
  schemaVersion: number;
  lastUpdated: string;
  notes: NoteMeta[];
}

export async function fetchManifest(): Promise<Manifest> {
  // Fetches from the public folder, which is updated by the GitHub Action
  const res = await fetch('/manifest.json', { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch manifest");
  return res.json();
}

export function getNoteProxyUrl(fileName: string): string {
  // Routes through our Vercel API to bypass GitHub CORS restrictions
  return `/api/note?file=${encodeURIComponent(fileName)}`;
}
