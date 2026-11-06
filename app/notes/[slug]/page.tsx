import { fetchManifest, getNoteProxyUrl } from "@/lib/github";
import { notFound } from "next/navigation";
import SecureNoteViewer from "@/components/note-viewer/SecureNoteViewer";
import Link from "next/link";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";

export default async function NoteDetailPage({ params }: { params: { slug: string } }) {
  const manifest = await fetchManifest();
  const note = manifest.notes.find(n => n.slug === params.slug);
  
  if (!note) notFound();

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 py-8 border-b border-border">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">{note.specialties[0]}</span>
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">{note.difficulty}</span>
          <span className="text-xs text-text-secondary">{note.language === "bn" ? "বাংলা" : "English"}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">{note.title}</h1>
        <p className="text-text-secondary mb-6 text-lg">{note.description}</p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-lg hover:border-primary/50 transition text-sm">
            <Bookmark className="w-4 h-4" /> Bookmark
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-lg hover:border-primary/50 transition text-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </header>

      {/* Secure Note Viewer */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <SecureNoteViewer htmlUrl={getNoteProxyUrl(note.fileName)} />
      </section>
      
      {/* Medical Disclaimer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-text-secondary border-t border-border mt-12">
        <p className="mb-2 font-semibold text-secondary">⚠️ Educational Disclaimer</p>
        <p>Medical notes are intended for educational purposes only. Film and series portrayals may not accurately represent real clinical diagnosis, treatment, or disease mechanisms. Always consult authoritative medical textbooks, clinical guidelines, and qualified healthcare professionals.</p>
        <p className="mt-4 opacity-60">Source: {note.fileName} | MBBS Movies & Series Project</p>
      </footer>
    </main>
  );
}
