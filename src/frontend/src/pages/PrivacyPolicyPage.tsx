import { ArrowLeft } from "lucide-react";
import type { PageName } from "../App";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageName) => void;
}

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="section-heading mb-3">{title}</h2>
      <div className="text-foreground text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage({
  onNavigate,
}: PrivacyPolicyPageProps) {
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
            data-ocid="privacy.secondary_button"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h1 className="font-condensed font-bold text-4xl uppercase tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: March 2026</p>
        </div>
      </div>

      <main
        className="container mx-auto px-4 py-12 max-w-3xl"
        data-ocid="privacy.section"
      >
        <div
          className="rounded-sm p-5 mb-8 border-l-4 text-sm"
          style={{
            borderLeftColor: "oklch(0.43 0.18 25)",
            background: "oklch(0.97 0.005 25)",
          }}
        >
          <p className="text-foreground">
            This Privacy Policy explains how <strong>NEWS</strong> ("we", "us",
            or "our") collects, uses, and protects information when you visit
            our website. By using NEWS, you agree to the practices described in
            this policy.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>
            <strong>Automatically Collected Data:</strong> When you visit our
            website, our servers may automatically collect certain technical
            information including your browser type, IP address (anonymized),
            operating system, referring URLs, and pages visited. This data is
            used solely for website analytics and performance optimization.
          </p>
          <p>
            <strong>Information You Provide:</strong> If you contact us via our
            contact form, we collect your name, email address, and message
            content. This information is used only to respond to your inquiry.
          </p>
          <p>
            <strong>Newsletter:</strong> If you subscribe to our newsletter, we
            collect your email address to deliver news updates. You can
            unsubscribe at any time.
          </p>
        </Section>

        <Section title="2. Cookies">
          <p>
            NEWS uses cookies and similar tracking technologies to enhance your
            browsing experience. Cookies are small data files stored on your
            device.
          </p>
          <p>
            <strong>Essential Cookies:</strong> Required for the website to
            function properly (e.g., remembering your language preference).
          </p>
          <p>
            <strong>Analytics Cookies:</strong> Help us understand how visitors
            interact with our site so we can improve performance and content. We
            use anonymized analytics only.
          </p>
          <p>
            <strong>localStorage:</strong> We use browser localStorage to cache
            news content for up to 2 hours. This improves page load speed and
            reduces API calls. No personal data is stored in localStorage.
          </p>
          <p>
            You may disable cookies through your browser settings, though some
            site features may not function correctly as a result.
          </p>
        </Section>

        <Section title="3. News Content & Third-Party Sources">
          <p>
            NEWS aggregates news articles from third-party providers including
            the <strong>GNews API</strong> (gnews.io). When you click on a news
            article, you may be redirected to external websites operated by
            third parties. We are not responsible for the privacy practices or
            content of those external sites.
          </p>
          <p>
            Article content, images, and metadata are sourced from licensed news
            API providers. We do not claim ownership of third-party content.
          </p>
        </Section>

        <Section title="4. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Operate and improve the NEWS website</li>
            <li>Respond to inquiries submitted through our contact form</li>
            <li>Send newsletter emails to subscribers (with consent)</li>
            <li>Analyze site traffic and usage patterns in aggregate</li>
            <li>Ensure the technical stability and security of our platform</li>
          </ul>
        </Section>

        <Section title="5. Data Sharing & Sale">
          <p>
            <strong>We do not sell, trade, or rent your personal data</strong>{" "}
            to third parties under any circumstances.
          </p>
          <p>
            We may share anonymized, aggregated statistical data (not personal
            data) with analytics providers. We may disclose data if required by
            law or to protect the rights and safety of NEWS and its users.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            Contact form submissions are retained for up to 90 days and then
            securely deleted. Newsletter subscriber emails are retained until
            you unsubscribe. Anonymized analytics data may be retained
            indefinitely in aggregate form.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for newsletter communications at any time</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:privacy@news-global.com"
              className="text-news-red hover:underline"
            >
              privacy@news-global.com
            </a>
            .
          </p>
        </Section>

        <Section title="8. Third-Party Links">
          <p>
            Our website contains links to external news sources, social media
            platforms, and partner websites. These third-party sites have their
            own privacy policies, and we do not accept any responsibility or
            liability for their practices. We encourage you to review the
            privacy policy of any external site you visit.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            NEWS is intended for a general audience and is not directed at
            children under the age of 13. We do not knowingly collect personal
            information from children. If you believe a child has provided us
            with personal data, please contact us and we will delete it
            promptly.
          </p>
        </Section>

        <Section title="10. Security">
          <p>
            We implement appropriate technical and organizational measures to
            protect the information we collect against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            internet transmission is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated "Last updated" date. We
            encourage you to review this policy periodically. Continued use of
            NEWS after changes constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy, please contact us:
          </p>
          <div
            className="rounded-sm p-4 mt-2"
            style={{ background: "oklch(0.97 0.005 25)" }}
          >
            <p>
              <strong>NEWS — Global Digital Media</strong>
            </p>
            <p className="mt-1">
              Email:{" "}
              <a
                href="mailto:privacy@news-global.com"
                className="text-news-red hover:underline"
              >
                privacy@news-global.com
              </a>
            </p>
            <p>
              Website: <span className="font-medium">news-global.com</span>
            </p>
          </div>
        </Section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
