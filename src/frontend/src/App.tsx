import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import SectionPage from "./pages/SectionPage";

export type PageName =
  | "home"
  | "latest"
  | "world"
  | "sports"
  | "cricket"
  | "admin";

const queryClient = new QueryClient();

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageName>("home");

  if (currentPage === "admin") {
    return <AdminPage onBack={() => setCurrentPage("home")} />;
  }

  if (
    currentPage === "latest" ||
    currentPage === "world" ||
    currentPage === "sports" ||
    currentPage === "cricket"
  ) {
    return (
      <SectionPage
        section={currentPage}
        onNavigate={setCurrentPage}
        onBack={() => setCurrentPage("home")}
      />
    );
  }

  return <HomePage onNavigate={setCurrentPage} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
