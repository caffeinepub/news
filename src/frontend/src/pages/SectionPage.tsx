import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { PageName } from "../App";
import BreakingTicker from "../components/BreakingTicker";
import NewsCard from "../components/NewsCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useGNews } from "../hooks/useGNews";

const SECTION_CONFIG: Record<
  string,
  { title: string; icon: string; description: string; bgClass: string }
> = {
  latest: {
    title: "Latest News",
    icon: "📰",
    description: "The most recent world news, updated live every 5 minutes",
    bgClass: "bg-background",
  },
  world: {
    title: "World News",
    icon: "🌍",
    description: "Global headlines from every corner of the world",
    bgClass: "bg-background",
  },
  sports: {
    title: "Sports News",
    icon: "⚽",
    description: "Global sports updates, results & highlights",
    bgClass: "bg-secondary",
  },
  cricket: {
    title: "Cricket & IPL",
    icon: "🏏",
    description: "Live scores, IPL updates & international cricket news",
    bgClass: "bg-background",
  },
};

interface SectionPageProps {
  section: "latest" | "world" | "sports" | "cricket";
  onNavigate: (page: PageName) => void;
  onBack: () => void;
}

export default function SectionPage({
  section,
  onNavigate,
  onBack,
}: SectionPageProps) {
  const {
    featured,
    headlines,
    world,
    sports,
    cricket,
    isLoading,
    error,
    refresh,
  } = useGNews();

  const config = SECTION_CONFIG[section];

  const articlesMap = {
    latest: world,
    world: world,
    sports: sports,
    cricket: cricket,
  };

  const articles = articlesMap[section] ?? [];

  const tickerHeadlines = [
    ...(featured ? [featured.title] : []),
    ...headlines.map((a) => a.title),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={onNavigate} currentPage={section} />
      <BreakingTicker headlines={tickerHeadlines} />

      {/* Error banner */}
      {error && (
        <div
          className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-sm"
          data-ocid="news.error_state"
        >
          <span className="text-yellow-800">
            ⚠️ Unable to fetch live news — showing cached data
          </span>
        </div>
      )}

      <main>
        {/* Section Hero Header */}
        <div className="bg-navy text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                data-ocid="section.secondary_button"
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-5xl">{config.icon}</span>
              <div>
                <h1 className="font-condensed font-bold text-3xl uppercase tracking-wide">
                  {config.title}
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  {config.description}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span className="bg-news-red text-white text-xs font-bold px-2 py-1 rounded-sm animate-pulse">
                  LIVE
                </span>
                <button
                  type="button"
                  onClick={refresh}
                  disabled={isLoading}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Refresh"
                  data-ocid="news.refresh_button"
                >
                  <RefreshCw
                    size={16}
                    className={isLoading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <section className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-ocid="section.loading_state"
            >
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
                <Skeleton key={k} className="h-80 rounded-sm" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="section.empty_state"
            >
              <p className="text-lg">No articles available right now.</p>
              <Button
                variant="outline"
                onClick={refresh}
                className="mt-4"
                data-ocid="section.primary_button"
              >
                Try refreshing
              </Button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-ocid="section.list"
            >
              {articles.map((article, i) => (
                <div key={article.title} data-ocid={`section.item.${i + 1}`}>
                  <NewsCard article={article} variant="grid" index={i + 100} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
