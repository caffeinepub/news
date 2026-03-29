import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import type { PageName } from "../App";

const NAV_LINKS: { label: string; page: PageName }[] = [
  { label: "Home", page: "home" },
  { label: "Latest", page: "latest" },
  { label: "World", page: "world" },
  { label: "Sports", page: "sports" },
  { label: "Cricket & IPL", page: "cricket" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
];

interface SiteHeaderProps {
  onNavigate: (page: PageName) => void;
  currentPage?: PageName;
}

export default function SiteHeader({
  onNavigate,
  currentPage = "home",
}: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header>
      <div className="bg-navy text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <span className="news-logo-3d">NEWS</span>
          </button>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search news..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 w-48 h-8 text-sm"
                  data-ocid="header.search_input"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="text-white/80 hover:text-white transition-colors"
                data-ocid="header.search_input"
              >
                <Search size={18} />
              </button>
            )}

            <div
              className="flex items-center gap-1"
              data-ocid="header.language.select"
            >
              <Globe size={15} className="text-white/70" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-transparent border-white/20 text-white h-7 text-xs px-2 w-auto min-w-[80px] focus:ring-0 hover:bg-white/10 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-navy border-white/20">
                  {LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="text-white/90 hover:bg-white/10 focus:bg-white/10 cursor-pointer text-sm"
                    >
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              type="button"
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-navy-dark border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center justify-between">
            <ul className="flex">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.page)}
                    className={`block px-4 py-2 text-xs font-medium transition-colors uppercase tracking-wide ${
                      currentPage === link.page
                        ? "text-white bg-white/20"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <span className="text-white/50 text-xs">{dateStr}</span>
          </div>
          {mobileOpen && (
            <ul className="md:hidden py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(link.page);
                      setMobileOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-2 text-sm ${
                      currentPage === link.page
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
