"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6 ", className)}
      aria-hidden="true"
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6 ", className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40 px-6">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className={cn("text-left flex items-center gap-3.5 mb-4")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={distance > 0 ? true : undefined}
          >
            <div className="shrink-0">
              {index > value && (
                <CheckIcon className="text-[var(--text-3)]" />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-[var(--text-2)]",
                    value === index &&
                      "text-[var(--accent)] opacity-100 drop-shadow-[0_0_10px_var(--glow-lg)]"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-[var(--text-2)] text-base sm:text-lg tracking-tight",
                value === index && "text-[var(--text)] opacity-100 font-semibold"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
  value,
  className,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
  value?: number;
  className?: string;
}) => {
  const [currentState, setCurrentState] = useState(0);
  const controlled = typeof value === "number";

  useEffect(() => {
    if (controlled || !loading) return;
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration, controlled]);

  const step = !loading
    ? 0
    : controlled
      ? Math.min(Math.max(value, 0), loadingStates.length - 1)
      : currentState;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className={cn(
            "w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl",
            className
          )}
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">{loadingStates[step]?.text}</span>
          <div className="h-96 relative">
            <LoaderCore value={step} loadingStates={loadingStates} />
          </div>

          <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-[var(--bg)] h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
