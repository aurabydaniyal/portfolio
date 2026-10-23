"use client";

import { useEffect, useRef, useState } from "react";
import HoldButton from "@/components/HoldButton";

type Status = "idle" | "copying" | "copied" | "failed";

/** Writes to the clipboard, falling back to a hidden textarea + execCommand for older / insecure contexts. */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Hold-to-copy: a deliberately "special" secondary action. Contact itself stays a plain
 * mailto link, so nothing essential depends on a long press.
 */
export default function HoldCopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const busy = useRef(false);
  const timer = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (status === "failed") inputRef.current?.select();
  }, [status]);

  const copy = async () => {
    if (busy.current) return; // ignore duplicate triggers while a copy is in flight
    busy.current = true;
    window.clearTimeout(timer.current);
    setStatus("copying");
    const ok = await writeClipboard(email);
    setStatus(ok ? "copied" : "failed");
    busy.current = false;
    if (ok) timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  };

  const doneLabel = status === "copied" ? "Email copied!" : status === "failed" ? "Copy failed" : "Copying…";

  return (
    <div className="hold-copy">
      <HoldButton
        size="md"
        radius={999}
        holdTime={1200}
        resetAfter={1800}
        fillDirection="right"
        backgroundColor="rgba(255,255,255,0.06)"
        fillColor="var(--lime)"
        textColor="#f4f7fa"
        fillTextColor="#0b0f06"
        doneLabel={doneLabel}
        onHold={copy}
        className="hold-copy__btn"
      >
        Hold to copy email
      </HoldButton>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" ? "Email copied to clipboard" : status === "failed" ? "Could not copy the email automatically" : ""}
      </span>
      {status === "failed" && (
        <div className="hold-copy__fallback">
          <label htmlFor="manual-email">Copy manually:</label>
          <input
            id="manual-email"
            ref={inputRef}
            readOnly
            value={email}
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
}
