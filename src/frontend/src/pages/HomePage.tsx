import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import type { PageName } from "../App";
import BreakingTicker from "../components/BreakingTicker";
import NewsCard from "../components/NewsCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useGNews } from "../hooks/useGNews";
import type { Article } from "../hooks/useQueries";
import { Category } from "../hooks/useQueries";

const FALLBACK_FEATURED: Article = {
  title: "World Leaders Gather at G20 Summit to Address Global Economic Crisis",
  summary:
    "Heads of state from 20 nations convene to tackle rising inflation, debt restructuring, and climate financing.",
  source: "Reuters",
  url: "https://reuters.com",
  imageUrl: "https://picsum.photos/seed/g20-summit-world/800/500",
  category: Category.world,
  isFeatured: true,
  isPinned: false,
  publishedAt: BigInt(Date.now()) * BigInt(1_000_000),
};

function SectionHeader({
  title,
  onViewAll,
}: { title: string; onViewAll: () => void }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="section-heading">{title}</h2>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.43 0.18 25) 0%, oklch(0.87 0 0) 60%)",
        }}
      />
      <button
        type="button"
        onClick={onViewAll}
        className="flex items-center gap-1 text-xs font-bold text-news-red hover:text-news-red-dark transition-colors uppercase tracking-widest whitespace-nowrap"
        data-ocid="section.link"
      >
        View All <ChevronRight size={14} />
      </button>
    </div>
  );
}

interface HomePageProps {
  onNavigate: (page: PageName) => void;
  onOpenArticle: (article: Article) => void;
}

export default function HomePage({ onNavigate, onOpenArticle }: HomePageProps) {
  const {
    featured,
    headlines,
    world,
    sports,
    cricket,
    business,
    isLoading,
    error,
    refresh,
  } = useGNews();
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [lastUpdated] = useState(() => new Date());

  const featuredArticle = featured ?? FALLBACK_FEATURED;
  const headlinesList = headlines.length > 0 ? headlines : [];
  const latestList = world.slice(0, 4);
  const sportsList = sports;
  const worldList = world.slice(0, 4);
  const businessList = business.slice(0, 4);

  const tickerHeadlines = [
    ...(featured ? [featured.title] : []),
    ...headlines.map((a) => a.title),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={onNavigate} currentPage="home" />
      <BreakingTicker headlines={tickerHeadlines} />

      {/* Error banner */}
      {error && !errorDismissed && (
        <div
          className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-center justify-between text-sm"
          data-ocid="news.error_state"
        >
          <span className="text-yellow-800">
            📰 Showing sample news — live updates will resume shortly
          </span>
          <button
            type="button"
            onClick={() => setErrorDismissed(true)}
            className="text-yellow-600 hover:text-yellow-900 font-bold ml-4 text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* Last updated + refresh */}
      <div className="container mx-auto px-4 pt-3 pb-1 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={refresh}
          disabled={isLoading}
          aria-label="Refresh news"
          data-ocid="news.refresh_button"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <main id="home">
        {/* Hero + Sidebar */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {isLoading ? (
                <Skeleton
                  className="w-full h-[400px] rounded-sm"
                  data-ocid="hero.loading_state"
                />
              ) : (
                <NewsCard
                  article={featuredArticle}
                  variant="hero"
                  index={0}
                  onOpen={onOpenArticle}
                />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-sm p-4 h-full">
                <h2
                  className="font-condensed font-bold text-sm uppercase tracking-widest text-white px-3 py-2.5 -mx-4 -mt-4 mb-4 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.27 0.06 240), oklch(0.35 0.065 240))",
                  }}
                >
                  <span className="inline-block w-1.5 h-4 bg-news-red rounded-sm" />
                  TOP HEADLINES
                </h2>
                {isLoading ? (
                  <div data-ocid="headlines.loading_state">
                    {["a", "b", "c", "d"].map((k) => (
                      <div
                        key={k}
                        className="flex gap-3 py-3 border-b border-border"
                      >
                        <Skeleton className="w-20 h-16 flex-shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="h-3 mb-1" />
                          <Skeleton className="h-3 w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div data-ocid="headlines.list">
                    {headlinesList.slice(0, 5).map((article, i) => (
                      <div
                        key={article.title}
                        data-ocid={`headlines.item.${i + 1}`}
                      >
                        <NewsCard
                          article={article}
                          variant="sidebar"
                          index={i + 10}
                          onOpen={onOpenArticle}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section id="latest" className="container mx-auto px-4 py-8">
          <SectionHeader
            title="Latest News"
            onViewAll={() => onNavigate("latest")}
          />
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="latest.loading_state"
            >
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-72 rounded-sm" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="latest.list"
            >
              {latestList.map((article, i) => (
                <div key={article.title} data-ocid={`latest.item.${i + 1}`}>
                  <NewsCard
                    article={article}
                    variant="grid"
                    index={i + 20}
                    onOpen={onOpenArticle}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate("latest")}
              className="border-news-red text-news-red hover:bg-news-red hover:text-white font-bold uppercase tracking-wider"
              data-ocid="latest.secondary_button"
            >
              View All Latest News <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </section>

        {/* Sports News */}
        <section id="sports" className="section-tinted py-10">
          <div className="container mx-auto px-4">
            <div
              className="text-white rounded-sm px-6 py-5 mb-6 flex items-center gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.27 0.06 240) 0%, oklch(0.22 0.065 240) 100%)",
                borderLeft: "5px solid oklch(0.43 0.18 25)",
              }}
            >
              <span className="text-3xl">⚽</span>
              <div>
                <h2 className="font-condensed font-bold text-xl uppercase tracking-widest">
                  Sports News
                </h2>
                <p className="text-white/60 text-sm">
                  Global sports updates, results & highlights
                </p>
              </div>
              <div className="ml-auto flex gap-3 items-center">
                <span className="bg-news-red text-white text-xs font-bold px-2 py-1 rounded-sm animate-pulse">
                  LIVE
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("sports")}
                  className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  data-ocid="sports.link"
                >
                  View All <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                data-ocid="sports.loading_state"
              >
                <Skeleton className="h-80 rounded-sm lg:col-span-1" />
                <div className="lg:col-span-2 space-y-3">
                  {["a", "b", "c"].map((k) => (
                    <Skeleton key={k} className="h-24" />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                data-ocid="sports.list"
              >
                <div data-ocid="sports.item.1">
                  {sportsList[0] && (
                    <NewsCard
                      article={sportsList[0]}
                      variant="grid"
                      index={30}
                      onOpen={onOpenArticle}
                    />
                  )}
                </div>
                <div className="lg:col-span-2 space-y-4">
                  {sportsList.slice(1, 4).map((article, i) => (
                    <div key={article.title} data-ocid={`sports.item.${i + 2}`}>
                      <NewsCard
                        article={article}
                        variant="small"
                        index={i + 31}
                        onOpen={onOpenArticle}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-5 text-center">
              <Button
                variant="outline"
                onClick={() => onNavigate("sports")}
                className="border-navy text-navy hover:bg-navy hover:text-white font-bold uppercase tracking-wider"
                data-ocid="sports.secondary_button"
              >
                View All Sports <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Cricket & IPL */}
        <section id="ipl" className="container mx-auto px-4 py-10">
          <div
            className="text-white rounded-sm px-6 py-5 mb-6 flex items-center gap-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.27 0.06 240) 0%, oklch(0.22 0.065 240) 100%)",
              borderLeft: "5px solid oklch(0.43 0.18 25)",
            }}
          >
            <span className="text-3xl">🏏</span>
            <div>
              <h2 className="font-condensed font-bold text-xl uppercase tracking-widest">
                Cricket &amp; IPL
              </h2>
              <p className="text-white/60 text-sm">
                Live scores, IPL updates &amp; international cricket news
              </p>
            </div>
            <div className="ml-auto flex gap-3 items-center">
              <span className="bg-news-red text-white text-xs font-bold px-2 py-1 rounded-sm animate-pulse">
                LIVE
              </span>
              <button
                type="button"
                onClick={() => onNavigate("cricket")}
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                data-ocid="cricket.link"
              >
                View All <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="ipl.loading_state"
            >
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-72 rounded-sm" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="ipl.list"
            >
              {cricket.slice(0, 4).map((article, i) => (
                <div key={article.title} data-ocid={`ipl.item.${i + 1}`}>
                  <NewsCard
                    article={article}
                    variant="grid"
                    index={i + 50}
                    onOpen={onOpenArticle}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate("cricket")}
              className="border-news-red text-news-red hover:bg-news-red hover:text-white font-bold uppercase tracking-wider"
              data-ocid="cricket.secondary_button"
            >
              View All Cricket & IPL <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </section>

        {/* Business News */}
        <section id="business" className="section-tinted py-10">
          <div className="container mx-auto px-4">
            <div
              className="text-white rounded-sm px-6 py-5 mb-6 flex items-center gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.27 0.06 240) 0%, oklch(0.22 0.065 240) 100%)",
                borderLeft: "5px solid oklch(0.43 0.18 25)",
              }}
            >
              <span className="text-3xl">💼</span>
              <div>
                <h2 className="font-condensed font-bold text-xl uppercase tracking-widest">
                  Business News
                </h2>
                <p className="text-white/60 text-sm">
                  Markets, economy, trade &amp; finance updates
                </p>
              </div>
              <div className="ml-auto flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => onNavigate("business")}
                  className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  data-ocid="business.link"
                >
                  View All <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                data-ocid="business.loading_state"
              >
                {["a", "b", "c", "d"].map((k) => (
                  <Skeleton key={k} className="h-72 rounded-sm" />
                ))}
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                data-ocid="business.list"
              >
                {businessList.map((article, i) => (
                  <div key={article.title} data-ocid={`business.item.${i + 1}`}>
                    <NewsCard
                      article={article}
                      variant="grid"
                      index={i + 60}
                      onOpen={onOpenArticle}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-5 text-center">
              <Button
                variant="outline"
                onClick={() => onNavigate("business")}
                className="border-navy text-navy hover:bg-navy hover:text-white font-bold uppercase tracking-wider"
                data-ocid="business.secondary_button"
              >
                View All Business <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* World News */}
        <section id="world" className="container mx-auto px-4 py-10">
          <SectionHeader
            title="Worldwide News"
            onViewAll={() => onNavigate("world")}
          />
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="world.loading_state"
            >
              {["a", "b", "c", "d"].map((k) => (
                <Skeleton key={k} className="h-72 rounded-sm" />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              data-ocid="world.list"
            >
              {worldList.map((article, i) => (
                <div key={article.title} data-ocid={`world.item.${i + 1}`}>
                  <NewsCard
                    article={article}
                    variant="grid"
                    index={i + 40}
                    onOpen={onOpenArticle}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 text-center">
            <Button
              variant="outline"
              onClick={() => onNavigate("world")}
              className="border-news-red text-news-red hover:bg-news-red hover:text-white font-bold uppercase tracking-wider"
              data-ocid="world.secondary_button"
            >
              View All World News <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
