import { useCallback, useEffect, useState } from "react";
import { useActor } from "./useActor";
import type { Article } from "./useQueries";
import { Category } from "./useQueries";

interface GNewsArticle {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string; url: string };
}

interface GNewsResponse {
  articles: GNewsArticle[];
}

function mapGNewsArticle(a: GNewsArticle, cat: Category): Article {
  return {
    title: a.title,
    summary: a.description ?? "",
    url: a.url,
    imageUrl:
      a.image ??
      `https://picsum.photos/seed/${encodeURIComponent(a.title.slice(0, 20))}/800/500`,
    source: a.source.name,
    category: cat,
    isFeatured: false,
    isPinned: false,
    publishedAt: BigInt(new Date(a.publishedAt).getTime()) * BigInt(1_000_000),
  };
}

async function parseBackendResponse(jsonStr: string): Promise<GNewsArticle[]> {
  const data: GNewsResponse = JSON.parse(jsonStr);
  return data.articles ?? [];
}

export interface LiveNews {
  featured: Article | null;
  headlines: Article[];
  world: Article[];
  sports: Article[];
  tech: Article[];
  cricket: Article[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useGNews(): LiveNews {
  const { actor, isFetching } = useActor();
  const [featured, setFeatured] = useState<Article | null>(null);
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [world, setWorld] = useState<Article[]>([]);
  const [sports, setSports] = useState<Article[]>([]);
  const [tech, setTech] = useState<Article[]>([]);
  const [cricket, setCricket] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!actor) return;
    setIsLoading(true);
    setError(null);
    try {
      const [headlinesJson, worldJson, sportsJson, techJson, cricketJson] =
        await Promise.all([
          actor.fetchHeadlines(),
          actor.fetchWorldNews(),
          actor.fetchSportsNews(),
          actor.fetchTechNews(),
          actor.fetchCricketNews(),
        ]);

      const [breakingRaw, worldRaw, sportsRaw, techRaw, cricketRaw] =
        await Promise.all([
          parseBackendResponse(headlinesJson),
          parseBackendResponse(worldJson),
          parseBackendResponse(sportsJson),
          parseBackendResponse(techJson),
          parseBackendResponse(cricketJson),
        ]);

      const breakingArticles = breakingRaw.map((a) =>
        mapGNewsArticle(a, Category.world),
      );
      const worldArticles = worldRaw.map((a) =>
        mapGNewsArticle(a, Category.world),
      );
      const sportsArticles = sportsRaw.map((a) =>
        mapGNewsArticle(a, Category.sports),
      );
      const techArticles = techRaw.map((a) =>
        mapGNewsArticle(a, Category.tech),
      );
      const cricketArticles = cricketRaw.map((a) =>
        mapGNewsArticle(a, Category.sports),
      );

      if (breakingArticles.length > 0) {
        const feat = { ...breakingArticles[0], isFeatured: true };
        setFeatured(feat);
        setHeadlines(breakingArticles.slice(1));
      } else if (worldArticles.length > 0) {
        const feat = { ...worldArticles[0], isFeatured: true };
        setFeatured(feat);
        setHeadlines(worldArticles.slice(1, 6));
      }

      setWorld(worldArticles);
      setSports(sportsArticles);
      setTech(techArticles);
      setCricket(cricketArticles);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load news");
    } finally {
      setIsLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) {
      load();
      // Auto-refresh every 30 minutes
      const interval = setInterval(load, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [actor, isFetching, load]);

  return {
    featured,
    headlines,
    world,
    sports,
    tech,
    cricket,
    isLoading,
    error,
    refresh: load,
  };
}
