import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const SECTIONS = [
  "Latest",
  "World",
  "Sports",
  "Politics",
  "Business",
  "Tech",
  "IPL",
  "Cricket",
];

export default function SiteFooter() {
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
              Follow Us
            </h3>
            <div className="flex gap-3 mt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <SiX size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook size={22} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram size={22} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-condensed font-bold text-lg uppercase mb-4 border-b border-news-red pb-2">
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

      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            © {year} NEWS. All rights reserved.
          </p>
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
