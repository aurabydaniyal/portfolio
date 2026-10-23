import { siteConfig } from "@/data/site-config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container foot">
        <div>
          <strong style={{ color: "var(--text)" }}>{siteConfig.name}</strong>
          <br />
          {siteConfig.tagline} · {siteConfig.location}
        </div>
        <div className="link-row" style={{ gap: 18 }}>
          {siteConfig.githubUrl && <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {siteConfig.linkedinUrl && <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
