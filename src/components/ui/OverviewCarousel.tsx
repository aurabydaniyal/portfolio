"use client";

import { useEffect, useState } from "react";
import FlexCarousel from "@/components/FlexCarousel";
import { useIsDark } from "@/lib/use-theme";
import type { CarouselItem } from "@/components/FlexCarousel";
import type { OverviewCard } from "@/data/overview";

const W = 480;
const H = 640; // 3:4 portrait, matches FlexCarousel fit="portrait"
const SCALE = 2;

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
/** Monochrome ramp: bright white → soft grey (dark) or black → graphite (light). */
function accentAt(t: number, dark: boolean): string {
  const a = hexToRgb(dark ? "#ffffff" : "#0a0a0a");
  const b = hexToRgb(dark ? "#b8b8be" : "#4a4a52");
  const m = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${m.join(",")})`;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s?\S*$/, "…");
  }
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draws a text-only glass card to a canvas and returns a data URL (no photographs involved). */
function drawCard(card: OverviewCard, i: number, total: number, sans: string, mono: string, dark: boolean): string {
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);
  const accent = accentAt(total > 1 ? i / (total - 1) : 0, dark);
  const ink = dark ? "255,255,255" : "0,0,0";
  const pad = 36;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, dark ? "#17171a" : "#ffffff");
  bg.addColorStop(1, dark ? "#09090a" : "#e9e9e6");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.9, 0, 0, W * 0.9, 0, W * 0.9);
  glow.addColorStop(0, accent.replace("rgb", "rgba").replace(")", ",0.28)"));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // subtle grid texture
  ctx.strokeStyle = `rgba(${ink},0.05)`;
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  ctx.strokeStyle = accent.replace("rgb", "rgba").replace(")", ",0.45)");
  ctx.lineWidth = 2;
  roundRect(ctx, 1, 1, W - 2, H - 2, 24);
  ctx.stroke();

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = accent;
  ctx.font = `600 20px ${mono}`;
  ctx.fillText(card.kind.toUpperCase(), pad, 62);

  ctx.fillStyle = `rgba(${ink},0.14)`;
  ctx.font = `700 64px ${mono}`;
  ctx.textAlign = "right";
  ctx.fillText(String(i + 1).padStart(2, "0"), W - pad, 70);
  ctx.textAlign = "left";

  ctx.fillStyle = dark ? "#f5f5f5" : "#0a0a0a";
  ctx.font = `700 42px ${sans}`;
  const titleLines = wrap(ctx, card.title, W - pad * 2, 4);
  let y = 150;
  for (const l of titleLines) { ctx.fillText(l, pad, y); y += 50; }

  ctx.fillStyle = dark ? "#b4b4ba" : "#4a4a52";
  ctx.font = `400 26px ${sans}`;
  y += 14;
  for (const l of wrap(ctx, card.text, W - pad * 2, 5)) { ctx.fillText(l, pad, y); y += 36; }

  // tags
  ctx.font = `500 21px ${mono}`;
  let tx = pad;
  let ty = H - pad - 12;
  const rows: { t: string; x: number; y: number; w: number }[] = [];
  const tagRows: string[][] = [[]];
  let rowW = 0;
  for (const t of card.tags) {
    const w = ctx.measureText(t).width + 26;
    if (rowW + w > W - pad * 2 && tagRows[tagRows.length - 1].length) { tagRows.push([]); rowW = 0; }
    tagRows[tagRows.length - 1].push(t);
    rowW += w + 10;
  }
  ty = H - pad - 12 - (tagRows.length - 1) * 44;
  for (const row of tagRows) {
    tx = pad;
    for (const t of row) {
      const w = ctx.measureText(t).width + 26;
      rows.push({ t, x: tx, y: ty, w });
      tx += w + 10;
    }
    ty += 44;
  }
  for (const r of rows) {
    ctx.fillStyle = `rgba(${ink},0.07)`;
    roundRect(ctx, r.x, r.y - 26, r.w, 36, 18);
    ctx.fill();
    ctx.strokeStyle = accent.replace("rgb", "rgba").replace(")", ",0.4)");
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = dark ? "#f0f0f2" : "#18181b";
    ctx.fillText(r.t, r.x + 13, r.y);
  }
  return canvas.toDataURL("image/png");
}

export default function OverviewCarousel({ cards }: { cards: OverviewCard[] }) {
  const [items, setItems] = useState<CarouselItem[] | null>(null);
  const [webgl, setWebgl] = useState(true);
  const dark = useIsDark();

  useEffect(() => {
    let alive = true;
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2")) {
      queueMicrotask(() => alive && setWebgl(false));
      return () => {
        alive = false;
      };
    }
    const sans = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim() || "ui-monospace, monospace";
    const monoStack = `${mono}, ui-monospace, monospace`;
    const ready = async () => {
      try {
        await Promise.all([
          document.fonts.load(`700 42px ${sans}`),
          document.fonts.load(`400 26px ${sans}`),
          document.fonts.load(`600 20px ${monoStack}`),
        ]);
      } catch {
        /* fall back to whatever is available */
      }
      if (!alive) return;
      setItems(
        cards.map((c, i) => ({
          src: drawCard(c, i, cards.length, sans, monoStack, dark),
          title: c.title,
          alt: `${c.kind}: ${c.title}. ${c.text} ${c.tags.join(", ")}`,
        })),
      );
    };
    ready();
    return () => {
      alive = false;
    };
  }, [cards, dark]);

  if (!webgl) {
    return (
      <ul className="overview-fallback">
        {cards.map((c) => (
          <li key={c.title} className="glass-lite">
            <span className="mono overview-kind">{c.kind}</span>
            <strong>{c.title}</strong>
            <span>{c.text}</span>
            <span className="overview-tags">{c.tags.join(" · ")}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="overview-stage">
      {items ? (
        <FlexCarousel
          items={items}
          preset="ribbon"
          intro="bloom"
          fit="portrait"
          cardHeight={0.7}
          gap={14}
          radius={22}
          focusOnClick={false}
          captureWheel={false}
          autoplay
          interval={5}
        />
      ) : (
        <p className="overview-loading mono">Loading overview…</p>
      )}
    </div>
  );
}
