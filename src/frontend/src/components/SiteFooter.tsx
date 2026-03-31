import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SiFacebook,
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";
import type { PageName } from "../App";

const SECTIONS = [
  "Latest",
  "World",
  "Sports",
  "India",
  "Business",
  "Tech",
  "IPL",
  "Cricket",
];

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/NEWSglobal",
    icon: SiFacebook,
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    href: "https://instagram.com/NEWSglobal",
    icon: SiInstagram,
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    href: "https://x.com/NEWSglobal",
    icon: SiX,
    label: "Twitter/X",
    color: "hover:text-white",
  },
  {
    href: "https://youtube.com/@NEWSglobal",
    icon: SiYoutube,
    label: "YouTube",
    color: "hover:text-red-500",
  },
  {
    href: "https://t.me/NEWSglobal",
    icon: SiTelegram,
    label: "Telegram",
    color: "hover:text-sky-400",
  },
  {
    href: "https://whatsapp.com/channel/NEWSglobal",
    icon: SiWhatsapp,
    label: "WhatsApp",
    color: "hover:text-green-400",
  },
];

interface SiteFooterProps {
  onNavigate?: (page: PageName) => void;
}

export default function SiteFooter({ onNavigate }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "news";

  return (
    <footer className="bg-navy text-white mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-condensed font-bold text-lg uppercase mb-4 border-b border-news-red pb-2">
              About NEWS
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              NEWS is a premier digital news platform delivering real-time
              updates on global events, cricket, IPL, politics, technology, and
              beyond.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="news-logo-3d" style={{ fontSize: "1.2rem" }}>
                NEWS
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-condensed font-bold text-lg uppercase mb-4 border-b border-news-red pb-2">
              Sections
            </h3>
            <ul className="grid grid-cols-2 gap-1">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a
                    href={`#${s.toLowerCase()}`}
                    className="text-white/70 hover:text-news-red text-sm transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-condensed font-bold text-lg uppercase mb-4 border-b border-news-red pb-2">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("about")}
                  className="text-white/70 hover:text-news-red text-sm transition-colors text-left"
                  data-ocid="footer.about.link"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("contact")}
                  className="text-white/70 hover:text-news-red text-sm transition-colors text-left"
                  data-ocid="footer.contact.link"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("privacy")}
                  className="text-white/70 hover:text-news-red text-sm transition-colors text-left"
                  data-ocid="footer.privacy.link"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("terms")}
                  className="text-white/70 hover:text-news-red text-sm transition-colors text-left"
                  data-ocid="footer.terms.link"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-condensed font-bold text-lg uppercase mb-4 border-b border-news-red pb-2">
              Follow & Share
            </h3>
            <p className="text-white/60 text-xs mb-3">
              Follow us on all platforms for latest news updates:
            </p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/15 transition-all ${color}`}
                  aria-label={label}
                >
                  <Icon size={22} />
                  <span className="text-[10px] text-white/60">{label}</span>
                </a>
              ))}
            </div>

            <h3 className="font-condensed font-bold text-base uppercase mb-3 border-b border-news-red pb-2">
              Newsletter
            </h3>
            <p className="text-white/70 text-sm mb-3">
              Get top headlines delivered to your inbox daily.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm flex-1"
                data-ocid="newsletter.input"
              />
              <Button
                type="button"
                size="sm"
                className="bg-news-red hover:bg-news-red-dark border-none text-white"
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Site Banner */}
      <div
        className="border-t border-white/10 py-5"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-sm mb-3">
            Share NEWS with your friends & family:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u=https://news-r9d.caffeine.xyz"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#1877F2" }}
            >
              <SiFacebook size={14} /> Share on Facebook
            </a>
            <a
              href={
                "https://twitter.com/intent/tweet?url=https://news-r9d.caffeine.xyz&text=Get+latest+breaking+news+from+around+the+world+on+NEWS!"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#000" }}
            >
              <SiX size={14} /> Share on X
            </a>
            <a
              href={
                "https://api.whatsapp.com/send?text=Get+latest+breaking+news+from+around+the+world%21+%F0%9F%93%B0+https://news-r9d.caffeine.xyz"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#25D366" }}
            >
              <SiWhatsapp size={14} /> Share on WhatsApp
            </a>
            <a
              href={
                "https://t.me/share/url?url=https://news-r9d.caffeine.xyz&text=Get+latest+breaking+news+on+NEWS!"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#229ED9" }}
            >
              <SiTelegram size={14} /> Share on Telegram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            © {year} NEWS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate?.("privacy")}
              className="text-white/40 text-xs hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-white/20 text-xs">|</span>
            <button
              type="button"
              onClick={() => onNavigate?.("contact")}
              className="text-white/40 text-xs hover:text-white/70 transition-colors"
            >
              Contact
            </button>
          </div>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
