import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import HoldCopyEmail from "@/components/ui/HoldCopyEmail";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { mailtoHref, siteConfig } from "@/data/site-config";

export default function ContactSection() {
  const mailto = mailtoHref();
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <Glass radius={28} className="contact-glass">
            <div className="contact-box">
              <p className="eyebrow">06 — Contact</p>
              <h2 className="h-section">Have an idea worth building?</h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                Let&apos;s turn a practical problem into a thoughtful AI-powered product — AI applications, computer
                vision, internships or software projects.
              </p>
              <div className="cta-row">
                {mailto && (
                  <a href={mailto} className="btn btn-primary" id="lets-connect">
                    Let’s Connect →
                  </a>
                )}
                <a href="#work" className="btn">Explore My Work</a>
              </div>
              <div className="cta-row social-row">
                {siteConfig.githubUrl && (
                  <a
                    href={siteConfig.githubUrl}
                    className="btn btn-social"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                  >
                    <GitHubIcon /> GitHub
                  </a>
                )}
                {siteConfig.linkedinUrl && (
                  <a
                    href={siteConfig.linkedinUrl}
                    className="btn btn-social"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                  >
                    <LinkedInIcon /> LinkedIn
                  </a>
                )}
              </div>
              {(siteConfig.email || siteConfig.resumeUrl) && (
                <div className="contact-actions">
                  {siteConfig.email && <HoldCopyEmail email={siteConfig.email} />}
                  {siteConfig.resumeUrl && (
                    <a
                      href={siteConfig.resumeUrl}
                      download="Muhammad-Daniyal-Resume.pdf"
                      className="btn btn-social btn-download"
                      id="download-resume"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5" />
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                      </svg>
                      Download Resume
                    </a>
                  )}
                </div>
              )}
              <div className="link-row">
                {siteConfig.email && <a href={mailto ?? `mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
                {siteConfig.whatsappUrl && <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
                {siteConfig.socialLinks.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
