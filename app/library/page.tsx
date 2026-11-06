import { fetchManifest } from "@/lib/github";
import Link from "next/link";

export default async function LibraryPage() {
  const manifest = await fetchManifest();

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Medical Library</h1>
      <p className="text-text-secondary mb-8">Total Notes: {manifest.notes.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {manifest.notes.map(note => (
          <Link key={note.id} href={`/notes/${note.slug}`} className="group block">
            <article className="bg-surface border border-border rounded-xl p-6 hover:bg-surface-elevated hover:border-primary/50 transition-all h-full flex flex-col">
              <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition mb-2">{note.title}</h3>
              <p className="text-sm text-text-secondary mb-4 flex-grow">{note.description}</p>
              <div className="flex items-center justify-between text-xs text-text-secondary mt-auto pt-4 border-t border-border">
                <span>{note.movie}</span>
                <span>{note.readingTime} min</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
