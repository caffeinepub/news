import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import type { ArticleId } from "../backend.d";
import type { Article } from "../hooks/useQueries";

function getImageUrl(article: Article, index = 0): string {
  if (article.imageUrl?.startsWith("http")) return article.imageUrl;
  const seed = article.title.slice(0, 20).replace(/\s+/g, "-");
  return `https://picsum.photos/seed/${seed}${index}/800/500`;
}

function formatTime(publishedAt: bigint): string {
  try {
    const ms = Number(publishedAt) / 1_000_000;
    return formatDistanceToNow(new Date(ms), { addSuffix: true });
  } catch {
    return "";
  }
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    pakistan: "Pakistan",
    world: "World",
    sports: "Sports",
    cricket: "Cricket",
    ipl: "IPL",
    politics: "Politics",
    business: "Business",
    tech: "Tech",
  };
  return map[cat] ?? cat;
}

interface NewsCardProps {
  article: Article;
  articleId?: ArticleId;
  index?: number;
  variant?: "hero" | "grid" | "small" | "sidebar";
  className?: string;
}

export default function NewsCard({
  article,
  index = 0,
  variant = "grid",
  className = "",
}: NewsCardProps) {
  const imgUrl = getImageUrl(article, index);
  const cat =
    typeof article.category === "string"
      ? article.category
      : (Object.keys(article.category)[0] ?? "");
  const catLabel = categoryLabel(cat);
  const timeAgo = formatTime(article.publishedAt);

  if (variant === "hero") {
    return (
      <article className={`relative overflow-hidden rounded-sm ${className}`}>
        <img
          src={imgUrl}
          alt={article.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="bg-news-red text-white border-none text-xs mb-3">
            {catLabel}
          </Badge>
          <h1 className="text-white font-condensed font-bold text-2xl md:text-3xl leading-tight mb-2 uppercase">
            {article.title}
          </h1>
          <p className="text-white/80 text-sm line-clamp-2 mb-3">
            {article.summary}
          </p>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span>{article.source}</span>
            {timeAgo && <span>• {timeAgo}</span>}
          </div>
          <a
            href={article.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-news-red text-white text-sm font-medium px-5 py-2 uppercase tracking-wide hover:bg-news-red-dark transition-colors"
            data-ocid="hero.primary_button"
          >
            Read More
          </a>
        </div>
      </article>
    );
  }

  if (variant === "sidebar") {
    return (
      <a
        href={article.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex gap-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors -mx-4 px-4 ${className}`}
      >
        <img
          src={imgUrl}
          alt={article.title}
          className="w-20 h-16 object-cover flex-shrink-0 rounded-sm"
        />
        <div className="flex-1 min-w-0">
          <Badge className="bg-news-red/10 text-news-red border-none text-xs px-1 py-0 mb-1">
            {catLabel}
          </Badge>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
            {article.title}
          </h3>
          <span className="text-muted-foreground text-xs">{timeAgo}</span>
        </div>
      </a>
    );
  }

  if (variant === "small") {
    return (
      <a
        href={article.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex gap-3 mb-3 hover:bg-muted/30 transition-colors rounded-sm p-2 -mx-2 ${className}`}
      >
        <img
          src={imgUrl}
          alt={article.title}
          className="w-24 h-18 object-cover flex-shrink-0 rounded-sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-snug line-clamp-3 text-foreground">
            {article.title}
          </h3>
          <span className="text-muted-foreground text-xs mt-1 block">
            {article.source} • {timeAgo}
          </span>
        </div>
      </a>
    );
  }

  // grid variant - fully clickable card
  return (
    <a
      href={article.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-card rounded-sm overflow-hidden shadow-card hover:shadow-md transition-all group block ${className}`}
    >
      <div className="overflow-hidden">
        <img
          src={imgUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <Badge className="bg-news-red text-white border-none text-xs mb-2">
          {catLabel}
        </Badge>
        <h3 className="font-semibold text-base leading-snug line-clamp-2 mb-1">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
          {article.summary}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span>{article.source}</span>
            {timeAgo && <span>• {timeAgo}</span>}
          </div>
          <span className="text-news-red text-xs font-medium group-hover:underline">
            Read →
          </span>
        </div>
      </div>
    </a>
  );
}
