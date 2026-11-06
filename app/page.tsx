import { fetchManifest } from "@/lib/github";
import Link from "next/link";

export default async function HomePage() {
  const manifest = await fetchManifest();
  const recentNotes = manifest.notes.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
            MBBS
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 font-light">
            Bachelor of Movies, Bachelor of Series
          </p>
          <p className="text-lg text-text-secondary/80 italic mb-10">
            "Every Story Has a Diagnosis. Every Movie Has a Lesson."
          </p>
          <Link href="/library" className="px-8 py-3 bg-primary text-background font-semibold rounded-full hover:opacity-90 transition shadow-lg shadow-primary/20">
            Explore Medical Notes
          </Link>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">Recently Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map(note => (
            <Link key={note.id} href={`/notes/${note.slug}`} className="group block">
              <article className="bg-surface border border-border rounded-xl p-6 hover:bg-surface-elevated hover:border-primary/50 transition-all h-full flex flex-col">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">{note.specialties[0]}</span>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">{note.language === 'bn' ? 'বাংলা' : 'English'}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition mb-2">{note.title}</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow line-clamp-3">{note.description}</p>
                <div className="flex items-center justify-between text-xs text-text-secondary mt-auto pt-4 border-t border-border">
                  <span>{note.movie} ({note.releaseYear})</span>
                  <span>{note.readingTime} min read</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
