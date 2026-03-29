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

function makeStaticArticle(
  title: string,
  summary: string,
  source: string,
  seed: string,
  cat: Category,
): Article {
  return {
    title,
    summary,
    source,
    url: "#",
    imageUrl: `https://picsum.photos/seed/${seed}/800/500`,
    category: cat,
    isFeatured: false,
    isPinned: false,
    publishedAt: BigInt(Date.now()) * BigInt(1_000_000),
  };
}

const FALLBACK_HEADLINES: Article[] = [
  makeStaticArticle(
    "G20 Leaders Commit to Climate Action Fund Worth $1 Trillion",
    "World leaders at the G20 summit pledged historic funding for climate mitigation and green energy infrastructure.",
    "Reuters",
    "g20-climate",
    Category.world,
  ),
  makeStaticArticle(
    "UN Security Council Holds Emergency Session on Regional Tensions",
    "The Security Council convened urgently as diplomatic efforts intensify to prevent further escalation.",
    "AP News",
    "un-security",
    Category.world,
  ),
  makeStaticArticle(
    "Global Inflation Eases as Central Banks Signal Rate Cuts",
    "Major central banks indicate a pivot in monetary policy as inflationary pressures moderate worldwide.",
    "Bloomberg",
    "inflation-rates",
    Category.world,
  ),
  makeStaticArticle(
    "Tech Giants Face New Antitrust Regulations in EU and US",
    "Regulators on both sides of the Atlantic move to curb the market dominance of major technology companies.",
    "The Guardian",
    "antitrust-tech",
    Category.tech,
  ),
  makeStaticArticle(
    "Breakthrough in Renewable Energy Storage Announced",
    "Scientists unveil a new battery technology that could make solar and wind power available round the clock.",
    "Nature",
    "battery-tech",
    Category.tech,
  ),
];

const FALLBACK_WORLD: Article[] = [
  makeStaticArticle(
    "NATO Summit Focuses on Eastern European Security",
    "Alliance members discuss defense spending commitments and strategic posture amid ongoing regional conflict.",
    "BBC News",
    "nato-summit",
    Category.world,
  ),
  makeStaticArticle(
    "Middle East Ceasefire Talks Resume in Cairo",
    "Diplomatic delegations gather for fresh negotiations as humanitarian groups urge an immediate halt to hostilities.",
    "Al Jazeera",
    "ceasefire-cairo",
    Category.world,
  ),
  makeStaticArticle(
    "China's Economy Posts Stronger-Than-Expected Growth",
    "GDP data for the latest quarter surprised analysts, boosted by robust export performance and domestic consumption.",
    "Reuters",
    "china-economy",
    Category.world,
  ),
  makeStaticArticle(
    "EU Strikes Trade Deal with South American Bloc",
    "The landmark agreement opens markets for agricultural goods, vehicles, and digital services on both continents.",
    "Financial Times",
    "eu-trade-deal",
    Category.world,
  ),
  makeStaticArticle(
    "India Launches Record Number of Satellites in Single Mission",
    "ISRO successfully deployed 104 satellites in one rocket launch, setting a new global record for space missions.",
    "NDTV",
    "india-satellites",
    Category.world,
  ),
];

const FALLBACK_SPORTS: Article[] = [
  makeStaticArticle(
    "Champions League: Real Madrid Edge Past Bayern in Thriller",
    "A late header from Vinicius Jr sealed a dramatic 3-2 victory sending Real Madrid into the semi-finals.",
    "ESPN",
    "champions-league-real",
    Category.sports,
  ),
  makeStaticArticle(
    "Wimbledon 2025: Djokovic Eyes Record 25th Grand Slam Title",
    "The Serbian legend begins his Wimbledon campaign as the heavy favourite in what could be a historic fortnight.",
    "Sky Sports",
    "wimbledon-djokovic",
    Category.sports,
  ),
  makeStaticArticle(
    "NBA Finals: Golden State Warriors Take Game 3 Lead",
    "Steph Curry scored 42 points as the Warriors dominated the fourth quarter to take a 2-1 series advantage.",
    "ESPN",
    "nba-finals-gsc",
    Category.sports,
  ),
  makeStaticArticle(
    "Formula 1: Verstappen Clinches Pole at Monaco Grand Prix",
    "The reigning champion set a blistering lap time to claim pole position on the most glamorous street circuit.",
    "F1.com",
    "f1-monaco-pole",
    Category.sports,
  ),
  makeStaticArticle(
    "Olympics 2028: LA Venues Undergo Major Upgrades",
    "Construction crews are transforming Los Angeles stadiums and arenas ahead of the next Summer Olympics.",
    "AP News",
    "olympics-la",
    Category.sports,
  ),
];

const FALLBACK_CRICKET: Article[] = [
  makeStaticArticle(
    "IPL 2025: Mumbai Indians vs Chennai Super Kings — Match Preview",
    "The two most storied franchises in IPL history clash in what promises to be an electrifying encounter.",
    "Cricinfo",
    "ipl-mi-csk",
    Category.sports,
  ),
  makeStaticArticle(
    "India Beats Australia by 5 Wickets in Test Series Decider",
    "Shubman Gill's century anchored the chase as India claimed the Border-Gavaskar Trophy on Australian soil.",
    "BCCI",
    "india-australia-test",
    Category.sports,
  ),
  makeStaticArticle(
    "IPL Auction 2025: Rishabh Pant Becomes Highest-Paid Cricketer",
    "Delhi Capitals broke the bank to retain their star wicketkeeper-batter in a record-shattering IPL mini-auction.",
    "Cricbuzz",
    "ipl-auction-pant",
    Category.sports,
  ),
  makeStaticArticle(
    "England Named T20 World Cup Favourites After Asia Cup Win",
    "The Three Lions topped the Asia Cup in dominant fashion, cementing their status as the team to beat globally.",
    "Sky Sports",
    "england-t20-wc",
    Category.sports,
  ),
  makeStaticArticle(
    "Rohit Sharma Announces Retirement from Test Cricket",
    "India's captain bids farewell to the longest format after 17 illustrious years, ending a record-studded career.",
    "Cricinfo",
    "rohit-retirement",
    Category.sports,
  ),
];

const FALLBACK_TECH: Article[] = [
  makeStaticArticle(
    "OpenAI Unveils GPT-5 With Advanced Reasoning Capabilities",
    "The latest model demonstrates near-human reasoning on complex multi-step problems and scientific benchmarks.",
    "TechCrunch",
    "openai-gpt5",
    Category.tech,
  ),
  makeStaticArticle(
    "Apple Vision Pro 2 Leaks Reveal Lighter Design and Eye Tracking",
    "Leaked schematics suggest Apple's next spatial computing headset will be 30% lighter with improved sensors.",
    "9to5Mac",
    "apple-vision-pro2",
    Category.tech,
  ),
  makeStaticArticle(
    "Google Quantum Processor Achieves New Computational Milestone",
    "Willow processor solved a problem in 5 minutes that would take classical supercomputers 10 septillion years.",
    "Wired",
    "google-quantum",
    Category.tech,
  ),
  makeStaticArticle(
    "Elon Musk's xAI Raises $6 Billion in Latest Funding Round",
    "The artificial intelligence venture plans to use the capital to expand Grok's capabilities and data center capacity.",
    "Bloomberg",
    "xai-funding",
    Category.tech,
  ),
  makeStaticArticle(
    "Meta's AR Glasses Set for Mass Consumer Launch in 2026",
    "Meta confirms a consumer-ready augmented reality glasses product is on track for a broad international rollout.",
    "The Verge",
    "meta-ar-glasses",
    Category.tech,
  ),
];

const FALLBACK_BUSINESS: Article[] = [
  makeStaticArticle(
    "S&P 500 Hits All-Time High as Fed Signals Rate Pause",
    "Wall Street rallied sharply after the Federal Reserve indicated it would hold interest rates steady for the remainder of the year.",
    "CNBC",
    "sp500-ath",
    Category.world,
  ),
  makeStaticArticle(
    "OPEC+ Agrees to Extend Oil Production Cuts Through 2025",
    "The alliance of oil producers extended existing supply curbs to support crude prices amid demand uncertainties.",
    "Reuters",
    "opec-cuts",
    Category.world,
  ),
  makeStaticArticle(
    "Amazon Expands Same-Day Delivery to 20 New Cities",
    "The e-commerce giant is accelerating its logistics network as competition from Walmart and Shein intensifies.",
    "Forbes",
    "amazon-delivery",
    Category.world,
  ),
  makeStaticArticle(
    "Electric Vehicle Sales Surpass 20% of Global Market",
    "EVs crossed a major adoption threshold last quarter as Chinese brands flood international markets with affordable models.",
    "Financial Times",
    "ev-sales-global",
    Category.world,
  ),
  makeStaticArticle(
    "IMF Upgrades World Growth Forecast to 3.2% for 2025",
    "The International Monetary Fund raised its global outlook citing resilient consumer spending in the US and emerging markets.",
    "IMF",
    "imf-growth",
    Category.world,
  ),
];

async function parseBackendResponse(jsonStr: string): Promise<GNewsArticle[]> {
  const data: GNewsResponse = JSON.parse(jsonStr);
  return data.articles ?? [];
}

const GNEWS_CACHE_KEY = "gnews_cache_v2";
const CACHE_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

type SerializedArticle = Omit<Article, "publishedAt"> & { publishedAt: string };

interface GNewsCache {
  timestamp: number;
  headlines: SerializedArticle[];
  world: SerializedArticle[];
  sports: SerializedArticle[];
  tech: SerializedArticle[];
  cricket: SerializedArticle[];
  business: SerializedArticle[];
  india: SerializedArticle[];
}

function serializeArticle(a: Article): SerializedArticle {
  return { ...a, publishedAt: a.publishedAt.toString() };
}

function deserializeArticle(a: SerializedArticle): Article {
  return { ...a, publishedAt: BigInt(a.publishedAt) };
}

function loadNewsCache(): GNewsCache | null {
  try {
    const raw = localStorage.getItem(GNEWS_CACHE_KEY);
    if (!raw) return null;
    const entry: GNewsCache = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION_MS) return null;
    return entry;
  } catch {
    return null;
  }
}

function saveNewsCache(data: {
  headlines: Article[];
  world: Article[];
  sports: Article[];
  tech: Article[];
  cricket: Article[];
  business: Article[];
  india: Article[];
}) {
  try {
    const entry: GNewsCache = {
      timestamp: Date.now(),
      headlines: data.headlines.map(serializeArticle),
      world: data.world.map(serializeArticle),
      sports: data.sports.map(serializeArticle),
      tech: data.tech.map(serializeArticle),
      cricket: data.cricket.map(serializeArticle),
      business: data.business.map(serializeArticle),
      india: data.india.map(serializeArticle),
    };
    localStorage.setItem(GNEWS_CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage full — ignore
  }
}

export interface LiveNews {
  featured: Article | null;
  headlines: Article[];
  world: Article[];
  sports: Article[];
  tech: Article[];
  cricket: Article[];
  business: Article[];
  india: Article[];
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
  const [business, setBusiness] = useState<Article[]>([]);
  const [india, setIndia] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyArticles = useCallback(
    (
      breakingArticles: Article[],
      worldArticles: Article[],
      sportsArticles: Article[],
      techArticles: Article[],
      cricketArticles: Article[],
      businessArticles: Article[],
      indiaArticles: Article[],
    ) => {
      if (breakingArticles.length > 0) {
        setFeatured({ ...breakingArticles[0], isFeatured: true });
        setHeadlines(breakingArticles.slice(1));
      } else if (worldArticles.length > 0) {
        setFeatured({ ...worldArticles[0], isFeatured: true });
        setHeadlines(worldArticles.slice(1, 6));
      }
      setWorld(worldArticles);
      setSports(sportsArticles);
      setTech(techArticles);
      setCricket(cricketArticles);
      setBusiness(businessArticles);
      setIndia(indiaArticles);
    },
    [],
  );

  const load = useCallback(async () => {
    if (!actor) return;
    setIsLoading(true);
    setError(null);
    try {
      const results = await Promise.allSettled([
        actor.fetchHeadlines(),
        actor.fetchWorldNews(),
        actor.fetchSportsNews(),
        actor.fetchTechNews(),
        actor.fetchCricketNews(),
        actor.fetchBusinessNews(),
        actor.fetchIndiaNews(),
      ]);

      const getValue = (r: PromiseSettledResult<string>) =>
        r.status === "fulfilled" ? r.value : null;

      const [
        headlinesJson,
        worldJson,
        sportsJson,
        techJson,
        cricketJson,
        businessJson,
        indiaJson,
      ] = results.map(getValue);

      const safeparse = async (
        json: string | null,
      ): Promise<GNewsArticle[]> => {
        if (!json) return [];
        try {
          return await parseBackendResponse(json);
        } catch {
          return [];
        }
      };

      const [
        breakingRaw,
        worldRaw,
        sportsRaw,
        techRaw,
        cricketRaw,
        businessRaw,
        indiaRaw,
      ] = await Promise.all([
        safeparse(headlinesJson),
        safeparse(worldJson),
        safeparse(sportsJson),
        safeparse(techJson),
        safeparse(cricketJson),
        safeparse(businessJson),
        safeparse(indiaJson),
      ]);

      const totalLive =
        breakingRaw.length +
        worldRaw.length +
        sportsRaw.length +
        techRaw.length +
        cricketRaw.length +
        businessRaw.length +
        indiaRaw.length;

      if (totalLive > 0) {
        // Got real live data — map, save to localStorage, display
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
        const businessArticles = businessRaw.map((a) =>
          mapGNewsArticle(a, Category.world),
        );
        const indiaArticles = indiaRaw.map((a) =>
          mapGNewsArticle(a, Category.world),
        );

        saveNewsCache({
          headlines: breakingArticles,
          world: worldArticles,
          sports: sportsArticles,
          tech: techArticles,
          cricket: cricketArticles,
          business: businessArticles,
          india: indiaArticles,
        });

        applyArticles(
          breakingArticles.length > 0
            ? breakingArticles
            : worldArticles.slice(0, 1),
          worldArticles,
          sportsArticles,
          techArticles,
          cricketArticles,
          businessArticles,
          indiaArticles,
        );
        // No error — live data available
      } else {
        // API returned no articles (quota likely exceeded) — try localStorage
        const cached = loadNewsCache();
        if (cached) {
          applyArticles(
            cached.headlines.map(deserializeArticle),
            cached.world.map(deserializeArticle),
            cached.sports.map(deserializeArticle),
            cached.tech.map(deserializeArticle),
            cached.cricket.map(deserializeArticle),
            cached.business.map(deserializeArticle),
            (cached.india ?? []).map(deserializeArticle),
          );
          // No error banner — showing previously fetched real news
        } else {
          // No cache either — show static fallback with banner
          setError("fallback");
          applyArticles(
            FALLBACK_HEADLINES,
            FALLBACK_WORLD,
            FALLBACK_SPORTS,
            FALLBACK_TECH,
            FALLBACK_CRICKET,
            FALLBACK_BUSINESS,
            [],
          );
        }
      }
    } catch (e) {
      // Network/canister error — try localStorage first
      const cached = loadNewsCache();
      if (cached) {
        applyArticles(
          cached.headlines.map(deserializeArticle),
          cached.world.map(deserializeArticle),
          cached.sports.map(deserializeArticle),
          cached.tech.map(deserializeArticle),
          cached.cricket.map(deserializeArticle),
          cached.business.map(deserializeArticle),
          (cached.india ?? []).map(deserializeArticle),
        );
      } else {
        setError("fallback");
        applyArticles(
          FALLBACK_HEADLINES,
          FALLBACK_WORLD,
          FALLBACK_SPORTS,
          FALLBACK_TECH,
          FALLBACK_CRICKET,
          FALLBACK_BUSINESS,
          [],
        );
      }
      console.error("GNews load failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, [actor, applyArticles]);

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
    business,
    india,
    isLoading,
    error,
    refresh: load,
  };
}
