"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface QuotePrefill {
  projectType?: string;
  summary?: string;
  areaM2?: number;
  timeline?: string;
  zip?: string;
}

interface QuoteContextValue {
  prefill: QuotePrefill;
  setPrefill: (data: QuotePrefill) => void;
  requestQuote: (data: QuotePrefill) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuotePrefillProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefillState] = useState<QuotePrefill>({});

  const setPrefill = useCallback((data: QuotePrefill) => {
    setPrefillState((prev) => ({ ...prev, ...data }));
  }, []);

  const requestQuote = useCallback((data: QuotePrefill) => {
    setPrefillState((prev) => ({ ...prev, ...data }));
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const value = useMemo(
    () => ({ prefill, setPrefill, requestQuote }),
    [prefill, setPrefill, requestQuote]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuotePrefill() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuotePrefill must be used within QuotePrefillProvider");
  }
  return ctx;
}
