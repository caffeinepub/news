import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
  SiX,
} from "react-icons/si";
import type { PageName } from "../App";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import type { Article } from "../hooks/useQueries";

function getImageUrl(article: Article, index = 0): string {
  if (article.imageUrl?.startsWith("http")) return article.imageUrl;
  const seed = article.title.slice(0, 20).replace(/\s+/g, "-");
  return `https://picsum.photos/seed/${seed}${index}/1200/600`;
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
    tech: "Technology",
  };
  return map[cat] ?? cat;
}

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export default function ArticleDetailPage({
  article,
  onBack,
  onNavigate,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const imgUrl = getImageUrl(article, 0);
  const cat =
    typeof article.category === "string"
      ? article.category
      : (Object.keys(article.category)[0] ?? "");
  const catLabel = categoryLabel(cat);
  const timeAgo = formatTime(article.publishedAt);

  const publishedDate = (() => {
    try {
      const ms = Number(article.publishedAt) / 1_000_000;
      return new Date(ms).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  })();

  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://news-r9d.caffeine.xyz";
  const shareText = encodeURIComponent(`${article.title} | NEWS`);
  const shareUrl = encodeURIComponent(pageUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const SHARE_BUTTONS = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: SiFacebook,
      bg: "#1877F2",
    },
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      icon: SiX,
      bg: "#000",
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${shareText}+${shareUrl}`,
      icon: SiWhatsapp,
      bg: "#25D366",
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
      icon: SiTelegram,
      bg: "#229ED9",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com",
      icon: SiInstagram,
      bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={onNavigate} currentPage="home" />

      {/* Back button bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="article.secondary_button"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>

      <main>
        {/* Hero Image */}
        <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
          <img
            src={imgUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: "oklch(0.43 0.18 25)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <Badge className="bg-news-red text-white border-none text-xs mb-3 uppercase tracking-wider">
              {catLabel}
            </Badge>
            <h1 className="text-white font-condensed font-bold text-2xl md:text-4xl leading-tight max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Body */}
        <article className="container mx-auto px-4 py-10 max-w-3xl">
          {/* Byline */}
          <div className="flex items-center gap-3 text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
            <span
              className="font-bold text-foreground text-base"
              style={{ color: "oklch(0.43 0.18 25)" }}
            >
              {article.source}
            </span>
            {publishedDate && (
              <>
                <span>•</span>
                <span>{publishedDate}</span>
              </>
            )}
            {timeAgo && (
              <>
                <span>•</span>
                <span>{timeAgo}</span>
              </>
            )}
          </div>

          {/* Social Share Buttons */}
          <div className="mb-8 p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Share this news on:
            </p>
            <div className="flex flex-wrap gap-2">
              {SHARE_BUTTONS.map(({ label, href, icon: Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: bg }}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90 hover:scale-105 border border-border text-foreground"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Summary / Story Body */}
          <div className="prose prose-lg max-w-none">
            <p
              className="text-foreground text-lg leading-relaxed font-serif"
              style={{ lineHeight: "1.85" }}
            >
              {article.summary}
            </p>
          </div>

          {/* Read Full Article CTA */}
          <div
            className="mt-10 rounded-sm p-6 border-l-4"
            style={{
              borderLeftColor: "oklch(0.43 0.18 25)",
              background: "oklch(0.97 0.005 25)",
            }}
            data-ocid="article.panel"
          >
            <p className="text-sm text-muted-foreground mb-1 uppercase tracking-widest font-semibold">
              Summary Preview
            </p>
            <p className="text-foreground font-medium mb-4">
              This is a summary of the article. To read the complete story,
              visit{" "}
              <span
                className="font-bold"
                style={{ color: "oklch(0.43 0.18 25)" }}
              >
                {article.source}
              </span>
              .
            </p>
            <a
              href={article.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 uppercase tracking-widest transition-all hover:brightness-90"
              style={{ background: "oklch(0.43 0.18 25)" }}
              data-ocid="article.primary_button"
            >
              Read Full Article on {article.source}
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Bottom Share Reminder */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-pink-50 dark:from-blue-950/20 dark:to-pink-950/20 border border-border">
            <p className="text-sm font-semibold text-foreground mb-3">
              Liked this news? Share it! 📲
            </p>
            <div className="flex flex-wrap gap-2">
              {SHARE_BUTTONS.slice(0, 4).map(
                ({ label, href, icon: Icon, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: bg }}
                  >
                    <Icon size={13} />
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>
        </article>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
