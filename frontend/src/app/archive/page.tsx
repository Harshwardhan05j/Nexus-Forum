import Link from "next/link";
import Image from "next/image";
import { Camera, ChevronLeft } from "lucide-react";

const ARCHIVE_GALLERY = [
  { src: "/static/images/showcase/38e33fcd-af96-4ba9-a77c-9071ead7304f.jpg", title: "HackRonyX 2025: Opening Ceremony", category: "Flagship Event" },
  { src: "/static/images/showcase/790beb96-253a-45ba-bd21-03ccfc4c6a26.jpg", title: "The Grand Stage", category: "HackRonyX 2025" },
  { src: "/static/images/showcase/5efcc58e-5e49-4253-9188-0e1c8a72eab0.jpg", title: "Intense Coding Session", category: "Competition" },
  { src: "/static/images/showcase/1a3dc921-82ac-4e10-b5ed-592d387ff3e6.jpg", title: "Technical Keynote", category: "Inaugural" },
  { src: "/static/images/showcase/30eb48f8-d629-4490-bba0-4618a48594f5.jpg", title: "Nexus Core Team", category: "Community" },
  { src: "/static/images/showcase/5826a711-e31e-4b6c-977e-40108f4cfd63.jpg", title: "Main Hall Ceremony", category: "Venue" },
  { src: "/static/images/showcase/a5a2cec1-4d3b-401c-a6d4-a7c6bb0635c4.jpg", title: "Milestone Speech", category: "Milestone" },
  { src: "/static/images/showcase/e7274d5f-4a76-4f20-b712-8457aca31de8.jpg", title: "Planning Strategy", category: "Behind the Scenes" },
];

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-white transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-[3rem] md:text-[4rem] font-bold tracking-tighter leading-tight mb-4">
              The <span className="text-[#9333ea]">Nexus</span> Archive
            </h1>
            <p className="text-zinc-400 text-lg max-w-[600px] leading-relaxed">
              Preserving the legacy of UPES Computer Science through visual storytelling. 
              Explore years of hackathons, workshops, and technical breakthroughs.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <Camera className="w-5 h-5 text-[#9333ea]" />
            <span className="text-sm font-medium text-zinc-300">HackRonyX &bull; Technical Summits &bull; Community</span>
          </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ARCHIVE_GALLERY.map((img, i) => (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-[#9333ea]/30 ${
                i % 5 === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 md:blur-[2px] md:group-hover:blur-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={i < 2}
                />
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 py-12 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm italic mb-6">Are you in these photos? Tag us on social media.</p>
            <div className="flex justify-center gap-6 items-center">
                <a href="https://instagram.com/nexus_upes" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider" aria-label="Follow us on Instagram">Instagram</a>
                <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                <a href="https://linkedin.com/company/nexus-forum" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider" aria-label="Follow us on LinkedIn">LinkedIn</a>
                <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                <a href="mailto:nexus@upes.ac.in" className="text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider" aria-label="Email Us">Email</a>
            </div>
        </div>
      </div>
    </main>
  );
}
