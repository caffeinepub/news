import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Article {
    url: string;
    title: string;
    source: string;
    publishedAt: Time;
    summary: string;
    imageUrl: string;
    isFeatured: boolean;
    category: Category;
    isPinned: boolean;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type ArticleId = bigint;
export interface UserProfile {
    name: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum Category {
    ipl = "ipl",
    tech = "tech",
    pakistan = "pakistan",
    cricket = "cricket",
    business = "business",
    sports = "sports",
    world = "world",
    politics = "politics"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addManualArticle(newArticle: Article): Promise<ArticleId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearArticles(): Promise<void>;
    deleteArticle(id: ArticleId): Promise<void>;
    fetchCricketNews(): Promise<string>;
    fetchHeadlines(): Promise<string>;
    fetchSportsNews(): Promise<string>;
    fetchTechNews(): Promise<string>;
    fetchWorldNews(): Promise<string>;
    getArticles(category: Category | null, limit: bigint | null): Promise<Array<Article>>;
    getBreakingNews(): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedArticle(): Promise<Article | null>;
    getPinnedArticles(): Promise<Array<Article>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setFeatured(id: ArticleId): Promise<void>;
    setPinned(id: ArticleId, pinned: boolean): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
