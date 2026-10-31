"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function deterministicScrambleChar(text: string, index: number, charset: string): string {
  const code = (text.charCodeAt(index) * 31 + index * 17) % charset.length;
  return charset.charAt(code);
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const [state, setState] = useState<{ count: number; chars: string[] }>(() => ({
    count: 0,
    chars: text
      ? Array.from(text, (ch, idx) =>
          ch === " " ? " " : deterministicScrambleChar(text, idx, charset)
        )
      : [],
  }));

  useEffect(() => {
    if (!isInView || !text) return;

    const totalLength = text.length;
    const workingChars = Array.from(text, (ch) =>
      ch === " " ? " " : generateRandomCharacter(charset)
    );
    const startTime = performance.now();
    let lastFlipTime = startTime;
    let isCancelled = false;
    let rafId: number | null = null;

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTime;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      if (currentRevealCount >= totalLength) {
        setState({ count: totalLength, chars: workingChars.slice() });
        return;
      }

      const timeSinceLastFlip = now - lastFlipTime;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = currentRevealCount; index < totalLength; index += 1) {
          workingChars[index] =
            text[index] === " " ? " " : generateRandomCharacter(charset);
        }
        lastFlipTime = now;
      }

      setState({ count: currentRevealCount, chars: workingChars.slice() });
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      isCancelled = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isInView, text, revealDelayMs, charset, flipDelayMs]);

  if (!text) return null;

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {text.split("").map((char, index) => {
        const isRevealed = index < state.count;
        const displayChar = isRevealed
          ? char
          : char === " "
            ? " "
            : (state.chars[index] ?? deterministicScrambleChar(text, index, charset));

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        );
      })}
    </motion.span>
  );
};
