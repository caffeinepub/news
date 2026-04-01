import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import type { PageName } from "../App";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

interface ContactPageProps {
  onNavigate: (page: PageName) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            data-ocid="contact.secondary_button"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h1 className="font-condensed font-bold text-4xl uppercase tracking-wide">
            Contact Us
          </h1>
          <p className="text-white/60 mt-2 text-base">
            We'd love to hear from you — news tips, inquiries, or feedback.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {submitted ? (
          <div className="text-center py-20" data-ocid="contact.success_state">
            <CheckCircle
              size={64}
              className="mx-auto mb-4"
              style={{ color: "oklch(0.43 0.18 25)" }}
            />
            <h2 className="font-condensed font-bold text-3xl uppercase tracking-wide mb-3">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-base mb-6 max-w-md mx-auto">
              Your message has been received. Our team will get back to you
              within 24–48 hours.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 uppercase tracking-widest transition-all hover:brightness-90"
              style={{ background: "oklch(0.43 0.18 25)" }}
              data-ocid="contact.primary_button"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <aside className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="section-heading mb-5">Get In Touch</h2>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div
                      className="p-2.5 rounded-sm text-white flex-shrink-0"
                      style={{ background: "oklch(0.43 0.18 25)" }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">
                        General Inquiries
                      </p>
                      <a
                        href="mailto:contact@news-global.com"
                        className="text-muted-foreground text-sm hover:text-news-red transition-colors"
                      >
                        contact@news-global.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div
                      className="p-2.5 rounded-sm text-white flex-shrink-0"
                      style={{ background: "oklch(0.43 0.18 25)" }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">
                        News Tips
                      </p>
                      <a
                        href="mailto:tips@news-global.com"
                        className="text-muted-foreground text-sm hover:text-news-red transition-colors"
                      >
                        tips@news-global.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div
                      className="p-2.5 rounded-sm text-white flex-shrink-0"
                      style={{ background: "oklch(0.43 0.18 25)" }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">
                        Business Inquiries
                      </p>
                      <a
                        href="mailto:business@news-global.com"
                        className="text-muted-foreground text-sm hover:text-news-red transition-colors"
                      >
                        business@news-global.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div
                      className="p-2.5 rounded-sm text-white flex-shrink-0"
                      style={{ background: "oklch(0.43 0.18 25)" }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Global Digital Media
                        <br />
                        Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="section-heading mb-5">Send a Message</h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="contact.panel"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-semibold uppercase tracking-wider"
                    >
                      Your Name *
                    </Label>
                    <Input
                      id="contact-name"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-semibold uppercase tracking-wider"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="contact.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-subject"
                    className="text-sm font-semibold uppercase tracking-wider"
                  >
                    Subject *
                  </Label>
                  <Select
                    required
                    value={form.subject}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, subject: v }))
                    }
                  >
                    <SelectTrigger
                      id="contact-subject"
                      data-ocid="contact.select"
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="news-tip">
                        Submit a News Tip
                      </SelectItem>
                      <SelectItem value="business">
                        Business Partnership
                      </SelectItem>
                      <SelectItem value="correction">
                        Request a Correction
                      </SelectItem>
                      <SelectItem value="privacy">Privacy Concern</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-semibold uppercase tracking-wider"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="contact-message"
                    required
                    rows={6}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    data-ocid="contact.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto font-bold uppercase tracking-widest text-white px-8"
                  style={{ background: "oklch(0.43 0.18 25)" }}
                  data-ocid="contact.submit_button"
                >
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        )}
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
