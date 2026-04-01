import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Article, type ArticleId, Category } from "../backend.d";
import { useActor } from "./useActor";

export { Category };
export type { Article, ArticleId };

export function useGetArticles(category: Category | null, limit = 10) {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles", category, limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticles(category, BigInt(limit));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5 * 60 * 1000, // 5 min
  });
}

export function useGetFeaturedArticle() {
  const { actor, isFetching } = useActor();
  return useQuery<Article | null>({
    queryKey: ["featuredArticle"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFeaturedArticle();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5 * 60 * 1000,
  });
}

export function useGetPinnedArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["pinnedArticles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPinnedArticles();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5 * 60 * 1000,
  });
}

export function useGetBreakingNews() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["breakingNews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBreakingNews();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2 * 60 * 1000, // 2 min for breaking
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRefreshNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // Invalidate all queries to trigger a fresh fetch
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}

export function useSetFeatured() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ArticleId) => {
      if (!actor) throw new Error("No actor");
      await actor.setFeatured(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["featuredArticle"] });
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useSetPinned() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, pinned }: { id: ArticleId; pinned: boolean }) => {
      if (!actor) throw new Error("No actor");
      await actor.setPinned(id, pinned);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pinnedArticles"] });
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ArticleId) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteArticle(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useAddManualArticle() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (article: Article) => {
      if (!actor) throw new Error("No actor");
      return actor.addManualArticle(article);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}
