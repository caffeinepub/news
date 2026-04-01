import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Article } from "./hooks/useQueries";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import SectionPage from "./pages/SectionPage";
import StoriesPage from "./pages/StoriesPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

export type PageName =
  | "home"
  | "latest"
  | "world"
  | "sports"
  | "cricket"
  | "business"
  | "admin"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "india"
  | "stories";

const queryClient = new QueryClient();

const PAGE_TITLES: Record<PageName, string> = {
  home: "NEWS - Live World News, Breaking News & Latest Updates",
  latest: "Latest News - Live Breaking News | NEWS",
  world: "World News - Global Headlines | NEWS",
  sports: "Sports News - Live Sports Updates | NEWS",
  cricket: "Cricket News - IPL & World Cricket | NEWS",
  business: "Business News - Markets & Finance | NEWS",
  admin: "Admin Panel | NEWS",
  about: "About Us | NEWS",
  contact: "Contact Us | NEWS",
  privacy: "Privacy Policy | NEWS",
  terms: "Terms of Service | NEWS",
  india: "India News - Latest Headlines | NEWS",
  stories: "Stories - Romantic, Thriller, Love & More | NEWS",
};

function removeArticleJsonLd() {
  const s = document.getElementById("article-jsonld");
  if (s) s.remove();
}

function usePageMeta(currentPage: PageName, selectedArticle: Article | null) {
  useEffect(() => {
    if (!selectedArticle) {
      document.title = PAGE_TITLES[currentPage];
      removeArticleJsonLd();
      return;
    }

    document.title = `${selectedArticle.title} | NEWS`;

    // Inject NewsArticle JSON-LD structured data
    removeArticleJsonLd();

    const publishedDate =
      typeof selectedArticle.publishedAt === "bigint"
        ? new Date(
            Number(selectedArticle.publishedAt) / 1_000_000,
          ).toISOString()
        : new Date().toISOString();

    const script = document.createElement("script");
    script.id = "article-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: selectedArticle.title,
      description: selectedArticle.summary || selectedArticle.title,
      image: selectedArticle.imageUrl ? [selectedArticle.imageUrl] : [],
      datePublished: publishedDate,
      dateModified: publishedDate,
      author: [
        {
          "@type": "Organization",
          name: selectedArticle.source || "NEWS",
        },
      ],
      publisher: {
        "@type": "Organization",
        name: "NEWS",
        url: "https://news.icp0.io/",
      },
      url: selectedArticle.url || "https://news.icp0.io/",
    });
    document.head.appendChild(script);

    return () => {
      removeArticleJsonLd();
    };
  }, [currentPage, selectedArticle]);
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageName>("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  usePageMeta(currentPage, selectedArticle);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <ArticleDetailPage
        article={selectedArticle}
        onBack={handleBack}
        onNavigate={setCurrentPage}
      />
    );
  }

  if (currentPage === "admin") {
    return <AdminPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "about") {
    return <AboutPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "contact") {
    return <ContactPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "privacy") {
    return <PrivacyPolicyPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "terms") {
    return <TermsOfServicePage onNavigate={setCurrentPage} />;
  }

  if (currentPage === "stories") {
    return (
      <StoriesPage
        onNavigate={setCurrentPage}
        onBack={() => setCurrentPage("home")}
      />
    );
  }

  if (
    currentPage === "latest" ||
    currentPage === "world" ||
    currentPage === "sports" ||
    currentPage === "cricket" ||
    currentPage === "business" ||
    currentPage === "india"
  ) {
    return (
      <SectionPage
        section={currentPage}
        onNavigate={setCurrentPage}
        onBack={() => setCurrentPage("home")}
        onOpenArticle={handleOpenArticle}
      />
    );
  }

  return (
    <HomePage onNavigate={setCurrentPage} onOpenArticle={handleOpenArticle} />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
