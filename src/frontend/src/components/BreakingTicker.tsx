import { useGetBreakingNews, useGetPinnedArticles } from "../hooks/useQueries";

const FALLBACK_HEADLINES = [
  "Global markets rally as inflation eases in major economies",
  "World leaders gather at G20 summit to address economic crisis",
  "Tech giants report record earnings amid AI investment surge",
  "Climate summit reaches historic agreement on carbon neutrality",
  "Sports: Champions League final set for dramatic showdown",
];

interface BreakingTickerProps {
  headlines?: string[];
}

export default function BreakingTicker({
  headlines: propHeadlines,
}: BreakingTickerProps) {
  const { data: breaking } = useGetBreakingNews();
  const { data: pinned } = useGetPinnedArticles();

  let displayHeadlines: string[];

  if (propHeadlines && propHeadlines.length > 0) {
    displayHeadlines = propHeadlines;
  } else {
    const backendHeadlines = [
      ...(breaking?.map((a) => a.title) ?? []),
      ...(pinned?.map((a) => a.title) ?? []),
    ];
    displayHeadlines =
      backendHeadlines.length > 0 ? backendHeadlines : FALLBACK_HEADLINES;
  }

  return (
    <div className="bg-white border-b border-border flex items-center overflow-hidden h-9">
      <div className="bg-news-red text-white text-xs font-bold px-3 py-1 flex-shrink-0 uppercase tracking-wider h-full flex items-center">
        Breaking News
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-scroll text-sm font-medium text-foreground py-1 px-4">
          {displayHeadlines.map((h) => (
            <span key={h}>
              <span className="text-news-red font-bold mx-2">●</span>
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
