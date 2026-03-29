import { ArrowLeft } from "lucide-react";
import type { PageName } from "../App";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

interface AboutPageProps {
  onNavigate: (page: PageName) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={onNavigate} currentPage="home" />

      {/* Page Hero */}
      <div
        className="text-white py-12"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.065 240) 0%, oklch(0.27 0.06 240) 100%)",
          borderBottom: "4px solid oklch(0.43 0.18 25)",
        }}
      >
        <div className="container mx-auto px-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-4"
            data-ocid="about.secondary_button"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h1 className="font-condensed font-bold text-4xl uppercase tracking-wide">
            About Us
          </h1>
          <p className="text-white/60 mt-2 text-base">
            Your trusted source for global news, unbiased and independent.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Mission */}
        <section className="mb-10" data-ocid="about.section">
          <h2 className="section-heading mb-4">Our Mission</h2>
          <p className="text-foreground leading-relaxed text-base">
            NEWS is a global digital news aggregator committed to delivering
            accurate, real-time news from every corner of the world. We believe
            in the power of informed citizens and strive to make trustworthy
            journalism accessible to everyone, everywhere — free of charge, free
            of bias.
          </p>
          <p className="text-foreground leading-relaxed text-base mt-4">
            Founded on the principles of editorial independence and factual
            reporting, NEWS aggregates content from reputable international
            sources to give you a comprehensive view of world events as they
            unfold.
          </p>
        </section>

        {/* What We Cover */}
        <section className="mb-10">
          <h2 className="section-heading mb-4">What We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🌍",
                title: "World News",
                desc: "Breaking international headlines from G20, USA, EU, China, India, Middle East, and beyond.",
              },
              {
                icon: "⚽",
                title: "Sports",
                desc: "Live scores, match updates, and analysis from global sporting events worldwide.",
              },
              {
                icon: "🏏",
                title: "Cricket & IPL",
                desc: "Real-time cricket scores, IPL standings, player news, and international fixtures.",
              },
              {
                icon: "💼",
                title: "Business",
                desc: "Market movements, financial news, trade updates, and economic analysis.",
              },
              {
                icon: "💻",
                title: "Technology",
                desc: "The latest in AI, startups, gadgets, cybersecurity, and the digital economy.",
              },
              {
                icon: "📰",
                title: "Breaking News",
                desc: "Instant alerts on major global events as they happen, 24 hours a day.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-sm p-5 hover:border-news-red transition-colors"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-condensed font-bold text-base uppercase tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Policy */}
        <section className="mb-10">
          <h2 className="section-heading mb-4">Editorial Policy</h2>
          <div
            className="rounded-sm p-6 border-l-4"
            style={{
              borderLeftColor: "oklch(0.43 0.18 25)",
              background: "oklch(0.97 0.005 25)",
            }}
          >
            <ul className="space-y-3 text-foreground text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-news-red font-bold mt-0.5">✓</span>
                <span>
                  <strong>Neutrality:</strong> We do not support any political
                  party, government, religion, or ideology. Our content is
                  selected based on newsworthiness, not political alignment.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-news-red font-bold mt-0.5">✓</span>
                <span>
                  <strong>Accuracy:</strong> All articles are sourced from
                  established news outlets. We do not fabricate or
                  sensationalize stories.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-news-red font-bold mt-0.5">✓</span>
                <span>
                  <strong>Independence:</strong> NEWS operates independently
                  with no financial or ideological ties to any government or
                  corporate entity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-news-red font-bold mt-0.5">✓</span>
                <span>
                  <strong>Global Coverage:</strong> We cover news from every
                  country and region, ensuring no single nation's perspective
                  dominates our feed.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-news-red font-bold mt-0.5">✓</span>
                <span>
                  <strong>Corrections:</strong> If an error is brought to our
                  attention, we correct it promptly and transparently.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="mb-10">
          <h2 className="section-heading mb-4">Our Team</h2>
          <p className="text-foreground leading-relaxed text-base">
            NEWS is built and maintained by a globally distributed team of
            journalists, engineers, and digital media professionals who are
            passionate about open access to information. Our editorial team
            works around the clock across multiple time zones to ensure you
            never miss an important story.
          </p>
          <p className="text-foreground leading-relaxed text-base mt-4">
            We are headquartered in the digital world — accessible from
            anywhere, serving readers everywhere.
          </p>
        </section>

        {/* Contact CTA */}
        <section
          className="rounded-sm p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.27 0.06 240) 0%, oklch(0.22 0.065 240) 100%)",
          }}
        >
          <h3 className="font-condensed font-bold text-xl uppercase tracking-wide text-white mb-2">
            Have a Question?
          </h3>
          <p className="text-white/70 text-sm mb-4">
            Reach out to our team for news tips, business inquiries, or general
            questions.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 uppercase tracking-widest transition-all hover:brightness-90"
            style={{ background: "oklch(0.43 0.18 25)" }}
            data-ocid="about.primary_button"
          >
            Contact Us
          </button>
        </section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
