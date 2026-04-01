import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, BookOpen, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import type { PageName } from "../App";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { STORY_GENRES, type Story, type StoryGenre } from "../data/storiesData";

const STORIES_CSS = `
  @keyframes genre3DFloat {
    0%, 100% { transform: perspective(600px) rotateX(0deg) translateZ(0px); }
    50% { transform: perspective(600px) rotateX(5deg) translateZ(10px); }
  }
  @keyframes genreGlowPulse {
    0%, 100% { opacity: 1; filter: brightness(1); }
    50% { opacity: 0.88; filter: brightness(1.4); }
  }
  @keyframes shimmer3D {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes heroFloat {
    0%, 100% { transform: perspective(800px) rotateX(0deg) translateY(0px) translateZ(0px); letter-spacing: 0.12em; }
    50% { transform: perspective(800px) rotateX(8deg) translateY(-6px) translateZ(20px); letter-spacing: 0.18em; }
  }
  @keyframes storyCardHover {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-6px) scale(1.02); }
  }
  .genre-header {
    animation: genre3DFloat 3s ease-in-out infinite, genreGlowPulse 3s ease-in-out infinite;
    display: inline-block;
    transform-style: preserve-3d;
  }
  .story-hero-title {
    animation: heroFloat 4s ease-in-out infinite;
    transform-style: preserve-3d;
    display: inline-block;
  }
  .story-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .story-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
`;

const GENRE_COLORS: Record<string, string> = {
  "hindi-stories": "#ff8c00",
  romantic: "#ff4466",
  "love-story": "#ff2244",
  thriller: "#ff8800",
  mystery: "#8844ff",
  horror: "#aa00cc",
  fantasy: "#00cc77",
  adventure: "#ccaa00",
  "sci-fi": "#0088ff",
  crime: "#cc5500",
  drama: "#dd2288",
  historical: "#aa8800",
  comedy: "#88cc00",
};

function StoryReaderModal({
  story,
  onClose,
}: { story: Story | null; onClose: () => void }) {
  if (!story) return null;
  const genreKey = story.genre.toLowerCase().replace(/\s+/g, "-");
  const genreColor = GENRE_COLORS[genreKey] || "#fff";

  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden border-0"
        style={{
          background: "oklch(0.14 0.055 240)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        data-ocid="stories.reader.modal"
      >
        {/* Cover Image */}
        <div className="relative flex-shrink-0" style={{ height: "300px" }}>
          <img
            src={`https://picsum.photos/seed/${story.coverSeed}/600/300`}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.14 0.055 240) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            }}
          />
          {/* Genre badge over image */}
          <div className="absolute top-4 left-4">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: `${genreColor}22`,
                color: genreColor,
                border: `1px solid ${genreColor}66`,
                backdropFilter: "blur(8px)",
              }}
            >
              {story.genre}
            </span>
          </div>
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
            data-ocid="stories.reader.close_button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto p-6"
          style={{ overscrollBehavior: "contain" }}
        >
          <DialogHeader className="mb-4 space-y-1 text-left">
            <DialogTitle
              className="text-2xl font-bold leading-tight"
              style={{ color: genreColor }}
            >
              {story.title}
            </DialogTitle>
            <p className="text-sm text-white/60">
              by{" "}
              <span className="text-white/80 font-medium">{story.author}</span>
              {story.reads && (
                <span className="ml-3 text-xs text-white/40">
                  · {story.reads}
                </span>
              )}
            </p>
          </DialogHeader>

          {/* Divider */}
          <div
            className="w-16 h-0.5 mb-4 rounded-full"
            style={{ background: genreColor }}
          />

          {/* Excerpt */}
          <p className="text-white/75 text-sm leading-relaxed mb-6">
            {story.excerpt}
          </p>

          {/* Source badge */}
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-xs border-white/20 text-white/50"
            >
              Source: {story.sourceSite}
            </Badge>
          </div>

          {/* CTA button */}
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded font-bold text-sm transition-opacity hover:opacity-85"
            style={{
              background: `linear-gradient(135deg, ${genreColor}, ${genreColor}cc)`,
              color: "#fff",
            }}
            data-ocid="stories.reader.read_button"
          >
            Read Full Story on {story.sourceSite}
            <ExternalLink size={14} />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StoryCard({
  story,
  index,
  onRead,
}: { story: Story; index: number; onRead: (story: Story) => void }) {
  const delay = (index % 4) * 0.1;
  return (
    <div
      className="story-card bg-card border border-border rounded overflow-hidden flex flex-col"
      style={{ animationDelay: `${delay}s` }}
      data-ocid={`stories.item.${index + 1}`}
    >
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: "133%" }}
      >
        <img
          src={`https://picsum.photos/seed/${story.coverSeed}/300/400`}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.3) 50%, transparent 100%)",
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold px-2 py-1 rounded"
            style={{
              background: "rgba(0,0,0,0.7)",
              color:
                GENRE_COLORS[story.genre.toLowerCase().replace(/\s+/g, "-")] ||
                "#fff",
              border: `1px solid ${
                GENRE_COLORS[story.genre.toLowerCase().replace(/\s+/g, "-")] ||
                "#fff"
              }44`,
            }}
          >
            {story.genre}
          </span>
        </div>
        {story.reads && (
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-black/70 text-white/80 px-2 py-1 rounded">
              {story.reads}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm text-foreground leading-tight mb-1 line-clamp-2">
          {story.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">by {story.author}</p>
        <p className="text-xs text-muted-foreground/80 line-clamp-3 mb-3 flex-1">
          {story.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto gap-2">
          <Badge
            variant="outline"
            className="text-xs border-white/20 text-muted-foreground"
          >
            {story.sourceSite}
          </Badge>
          <button
            type="button"
            onClick={() => onRead(story)}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded transition-all hover:opacity-80 whitespace-nowrap"
            style={{
              background: "oklch(0.43 0.18 25)",
              color: "#fff",
            }}
            data-ocid={`stories.read_button.${index + 1}`}
          >
            Read <BookOpen size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

function GenreSection({
  genre,
  animDelay,
  onRead,
}: { genre: StoryGenre; animDelay: number; onRead: (story: Story) => void }) {
  return (
    <section
      id={genre.id}
      className="mb-16"
      data-ocid={`stories.${genre.id}.section`}
    >
      {/* Genre Header */}
      <div
        className="rounded-sm px-6 py-5 mb-6 flex flex-wrap items-center gap-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.065 240) 0%, oklch(0.18 0.06 240) 100%)",
          borderLeft: `5px solid ${genre.color}`,
        }}
      >
        <span className="text-4xl">{genre.emoji}</span>
        <div className="flex-1">
          <h2
            className="genre-header font-bold uppercase tracking-widest text-2xl"
            style={{
              color: genre.color,
              textShadow: `0 0 20px ${genre.glowColor}, 0 0 40px ${genre.glowColor}`,
              animationDelay: `${animDelay}s`,
            }}
          >
            {genre.name}
          </h2>
          <p className="text-white/50 text-xs mt-1">
            {genre.stories.length} stories • Updated daily from{" "}
            {genre.sourceSite}
          </p>
        </div>
        <a
          href={genre.sourceSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded transition-opacity hover:opacity-80 whitespace-nowrap"
          style={{
            background: `${genre.color}22`,
            color: genre.color,
            border: `1px solid ${genre.color}44`,
          }}
          data-ocid={`stories.${genre.id}.link`}
        >
          <BookOpen size={13} />
          Browse on {genre.sourceSite}
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {genre.stories.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} onRead={onRead} />
        ))}
      </div>
    </section>
  );
}

interface StoriesPageProps {
  onNavigate: (page: PageName) => void;
  onBack: () => void;
}

export default function StoriesPage({ onNavigate, onBack }: StoriesPageProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const visibleGenres = activeGenre
    ? STORY_GENRES.filter((g) => g.id === activeGenre)
    : STORY_GENRES;

  return (
    <div className="min-h-screen bg-background">
      <style>{STORIES_CSS}</style>
      <SiteHeader onNavigate={onNavigate} currentPage="stories" />

      {/* Story Reader Modal */}
      <StoryReaderModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          data-ocid="stories.back_button"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      {/* Hero Banner */}
      <div
        className="py-16 mb-2 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.065 240) 0%, oklch(0.14 0.05 260) 50%, oklch(0.20 0.07 240) 100%)",
          borderBottom: "3px solid oklch(0.43 0.18 25)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <span
              className="story-hero-title font-bold"
              style={{
                fontSize: "clamp(3rem, 10vw, 7rem)",
                background:
                  "linear-gradient(90deg, #ff4466 0%, #ff8800 20%, #ffcc00 40%, #00cc77 60%, #0088ff 80%, #ff4466 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation:
                  "heroFloat 4s ease-in-out infinite, shimmer3D 4s linear infinite",
                letterSpacing: "0.12em",
              }}
            >
              STORIES
            </span>
          </div>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Romantic, Thriller, Fantasy, Horror and more — updated daily from
            Wattpad, AO3, Royal Road and beyond.
          </p>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div
        className="sticky top-0 z-10 py-3 overflow-x-auto"
        style={{ background: "oklch(0.16 0.055 240)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-2 min-w-max">
            <button
              type="button"
              onClick={() => setActiveGenre(null)}
              className="text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap"
              style={{
                background:
                  activeGenre === null
                    ? "oklch(0.43 0.18 25)"
                    : "oklch(0.25 0.06 240)",
                color: "#fff",
                border:
                  activeGenre === null
                    ? "none"
                    : "1px solid oklch(0.35 0.06 240)",
              }}
              data-ocid="stories.all.tab"
            >
              All Genres
            </button>
            {STORY_GENRES.map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() =>
                  setActiveGenre(activeGenre === genre.id ? null : genre.id)
                }
                className="text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap"
                style={{
                  background:
                    activeGenre === genre.id
                      ? genre.color
                      : "oklch(0.22 0.06 240)",
                  color: activeGenre === genre.id ? "#fff" : genre.color,
                  border: `1px solid ${genre.color}44`,
                }}
                data-ocid={`stories.${genre.id}.tab`}
              >
                {genre.emoji} {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {visibleGenres.map((genre, i) => (
          <GenreSection
            key={genre.id}
            genre={genre}
            animDelay={i * 0.25}
            onRead={setSelectedStory}
          />
        ))}
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
