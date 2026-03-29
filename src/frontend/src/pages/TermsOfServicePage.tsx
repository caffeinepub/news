import { ArrowLeft } from "lucide-react";
import type { PageName } from "../App";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

interface TermsOfServicePageProps {
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

export default function TermsOfServicePage({
  onNavigate,
}: TermsOfServicePageProps) {
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
            data-ocid="terms.secondary_button"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h1 className="font-condensed font-bold text-4xl uppercase tracking-wide">
            Terms of Service
          </h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: March 2026</p>
        </div>
      </div>

      <main
        className="container mx-auto px-4 py-12 max-w-3xl"
        data-ocid="terms.section"
      >
        <div
          className="rounded-sm p-5 mb-8 border-l-4 text-sm"
          style={{
            borderLeftColor: "oklch(0.43 0.18 25)",
            background: "oklch(0.97 0.005 25)",
          }}
        >
          <p className="text-foreground">
            Please read these Terms of Service carefully before using the{" "}
            <strong>NEWS</strong> website. By accessing or using our service,
            you agree to be bound by these terms. If you do not agree to any
            part of the terms, you may not access the service.
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using NEWS, you accept and agree to be bound by
            these Terms of Service and our Privacy Policy. These terms apply to
            all visitors, users, and others who access or use the service.
          </p>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the site after changes constitutes acceptance of the updated
            terms.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            NEWS is a digital news aggregation platform that provides real-time
            news updates from various global news agencies and sources. Our
            service includes breaking news, world news, sports, cricket, IPL,
            technology, business, and India news sections.
          </p>
          <p>
            News content is sourced from third-party agencies including but not
            limited to ANI, PTI, NDTV, Times of India, Hindustan Times, Reuters,
            AP News, and other international news providers via the GNews API.
          </p>
        </Section>

        <Section title="3. Use of Content">
          <p>
            All news articles, images, and media displayed on NEWS are sourced
            from third-party news agencies and remain the intellectual property
            of their respective owners and publishers.
          </p>
          <p>
            You may read and share news articles for personal, non-commercial
            purposes. You may not reproduce, republish, or redistribute the
            content without prior written permission from the original content
            owners.
          </p>
          <p>
            Linking to original source articles is provided for reference. NEWS
            does not claim ownership of any third-party news content.
          </p>
        </Section>

        <Section title="4. User Conduct">
          <p>When using our service, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the site</li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              service
            </li>
            <li>
              Collect or harvest any personally identifiable information from
              the site
            </li>
            <li>
              Use automated scripts to collect information or interact with the
              service
            </li>
            <li>Transmit any viruses, malware, or other harmful code</li>
          </ul>
        </Section>

        <Section title="5. Third-Party Links and Sources">
          <p>
            NEWS contains links to third-party websites and news sources. These
            links are provided for your convenience and information only. We
            have no control over the content of those sites and accept no
            responsibility for them or for any loss or damage that may arise
            from your use of them.
          </p>
          <p>
            Inclusion of any linked website does not imply approval or
            endorsement of the linked website by NEWS.
          </p>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <p>
            The service is provided on an "as is" and "as available" basis
            without any warranties of any kind, either express or implied,
            including but not limited to implied warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            NEWS does not warrant that the service will be uninterrupted,
            timely, secure, or error-free. News content accuracy depends on
            source agencies and may vary.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, NEWS shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including without limitation, loss of profits,
            data, use, goodwill, or other intangible losses, resulting from your
            use of or inability to use the service.
          </p>
        </Section>

        <Section title="8. News Aggregation and API Usage">
          <p>
            NEWS aggregates news content using the GNews API service. News
            content is fetched automatically from global and Indian news
            agencies. The availability of live news depends on API service
            limits and connectivity.
          </p>
          <p>
            When live news is unavailable due to API quota limits, the site may
            display cached news or sample content to ensure a continuous user
            experience.
          </p>
        </Section>

        <Section title="9. Admin Panel">
          <p>
            NEWS includes an admin panel for content curation accessible only to
            authorized administrators. Unauthorized attempts to access the admin
            panel are strictly prohibited and may be subject to legal action.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms shall be governed and construed in accordance with
            applicable laws, without regard to conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have any questions about these Terms of Service, please
            contact us through our{" "}
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="text-news-red hover:underline font-medium"
            >
              Contact page
            </button>
            .
          </p>
        </Section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
